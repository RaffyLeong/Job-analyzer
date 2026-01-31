import mongoose from "mongoose"

const HistorySchema = new mongoose.Schema({
    role: String,
    experience: String,
    skills: [String],
    description: String,
    matchPercentage: String,
    createdAt: {type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const History = mongoose.model("History", HistorySchema)
export default History