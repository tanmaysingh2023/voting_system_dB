import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
    voterID: {type: String, required: true},
    electionID: {type: String, required: true},
    partyID: {type: String, required: true},
})

export const Vote = mongoose.models.Vote || mongoose.model('Vote', voteSchema);