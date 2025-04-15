import mongoose from "mongoose";

const partySchema = new mongoose.Schema({
    name: {type: String, required: true},
    agenda: {type: String, required: true},
    headname: {type: String, required: true},
    members: {type: Array, required: true},
    electionID: {type: String, required: true},
    votes: {type: Number, default: 0},
})

export const party = mongoose.models.party || mongoose.model('party', partySchema);