import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { election } from './models/election.js'
import { party } from './models/party.js'
import { Vote } from './models/Votes.js'
import authRoutes from './routes/auth.js'

const app = express()
const port = 4000
dotenv.config()

async function connectDB() {
    try {
        // console.log(process.env.DATABASE_URI)
        await mongoose.connect(process.env.DATABASE_URI).then(() => {
            console.log('Connection to the database established');
        })
    }
    catch (error) {
        console.log('Couldn\'t connect to the database, Error:', error);
    }
}

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/addelections', async (req, res) => {
    const data = req.body;
    const now = new Date();
    // Add active key based on current time vs startTime
    const active = now >= new Date(data.startTime);

    const newElection = new election({
        ...data,
        active
    });
    await newElection.save();

    res.send({ success: true, message: 'Election added successfully', data: newElection });
})

app.delete('/elections/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedElection = await election.findByIdAndDelete(id);

        if (!deletedElection) {
            return res.status(404).json({ success: false, message: 'Election not found' });
        }

        return res.status(200).json({ success: true, message: 'Election deleted successfully', data: deletedElection });
    } catch (error) {
        console.error('Error deleting election:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// PUT /elections/:id
app.put('/elections/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    // console.log(updatedData);

    try {
        const updatedElection = await election.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
            runValidators: true
        });
        // console.log(updatedElection);

        if (!updatedElection) {
            return res.status(404).json({ success: false, message: 'Election not found' });
        }

        res.status(200).json({ success: true, data: updatedElection });
    } catch (error) {
        console.error('Error updating election:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


app.patch('/controlelection', async (req, res) => {
    const { id } = req.body;
    try {
        const data = await election.findById(id);
        if (!data) {
            return res.status(404).send({ success: false, message: 'Election not found' });
        }

        data.active = !data.active;
        await data.save();

        res.send({ success: true, data });
    } catch (err) {
        res.status(500).send({ success: false, error: err.message });
    }
});

app.get('/getelections', async (req, res) => {
    try {
        const elections = await election.find({});

        const now = new Date();

        // Update the active status of ended elections
        const updatePromises = elections.map(async (e) => {
            if (e.endTime < now && e.active) {
                e.active = false;
                await e.save(); // Update the database
            }
            return e;
        });

        const updatedElections = await Promise.all(updatePromises);

        res.status(200).json({ success: true, data: updatedElections });
    } catch (error) {
        console.error('Error fetching elections:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch elections' });
    }
});

app.get('/getelections/:id', async (req, res) => {
    const electionId = req.params.id;

    try {
        // Fetch election
        const data = await election.findById(electionId);
        if (!data) {
            return res.status(404).json({ success: false, message: 'Election not found' });
        }

        // Fetch parties belonging to that election
        const parties = await party.find({ electionID: electionId });

        // Format response
        const response = {
            id: data._id,
            name: data.name,
            description: data.description,
            endTime: data.endTime,
            active: data.active,
            parties: parties.map((party, idx) => ({
                id: party._id,
                name: party.name,
                head: party.headname,
            })),
        };

        res.json({ success: true, data: response });
    } catch (error) {
        console.error('Error fetching election and parties:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// POST /parties
app.post('/parties', async (req, res) => {
    try {
        const newParty = new party(req.body);
        const savedParty = await newParty.save();
        res.status(201).json({ success: true, data: savedParty });
    } catch (error) {
        console.error('Error creating party:', error);
        res.status(500).json({ success: false, message: 'Failed to create party' });
    }
});

// GET /parties/:electionID
app.get('/parties/:electionID', async (req, res) => {
    const { electionID } = req.params;

    try {
        const parties = await party.find({ electionID }).sort({votes: -1});
        res.status(200).json({ success: true, data: parties });
    } catch (error) {
        console.error('Error fetching parties for election:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch parties' });
    }
});

// DELETE /parties/:id
app.delete('/parties/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedParty = await party.findByIdAndDelete(id);
        if (!deletedParty) {
            return res.status(404).json({ success: false, message: 'Party not found' });
        }
        res.status(200).json({ success: true, message: 'Party deleted successfully' });
    } catch (error) {
        console.error('Error deleting party:', error);
        res.status(500).json({ success: false, message: 'Failed to delete party' });
    }
});

app.post('/vote', async (req, res) => {
    const { voterID, electionID, partyID } = req.body;

    try {
        // Check if the user has already voted in this election (optional)
        const alreadyVoted = await Vote.findOne({ voterID, electionID });
        if (alreadyVoted) {
            return res.status(400).json({ success: false, message: 'You have already voted in this election.' });
        }

        // Increment vote count for the selected party
        const updatedParty = await party.findByIdAndUpdate(
            partyID,
            { $inc: { votes: 1 } },
            { new: true }
        );

        if (!updatedParty) {
            return res.status(404).json({ success: false, message: 'Party not found' });
        }

        // Record the vote
        const newVote = new Vote({ voterID, electionID, partyID });
        await newVote.save();

        res.status(200).json({ success: true, data: updatedParty });
    } catch (error) {
        console.error('Error recording vote:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.get('/vote/:voterID/:electionID', async (req, res) => {
    const { voterID, electionID } = req.params;

    try {
        const vote = await Vote.findOne({ voterID, electionID });

        if (!vote) {
            return res.status(404).json({ success: false, message: 'No vote found' });
        }

        res.status(200).json({ success: true, data: vote });
    } catch (error) {
        console.error('Error fetching vote:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})