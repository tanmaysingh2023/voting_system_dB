import mongoose from "mongoose";

const electionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    active: {type: Boolean, required: true, default: false},
})

export const election = mongoose.models.election || mongoose.model('election', electionSchema);