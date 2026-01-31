import express from "express";
import History from "../models/History.ts";

const router = express.Router()

// Get all the history
router.get('/', async (req, res) => {
    try {
        const history = await History.find().sort({ createdAt: -1 });
        res.json(history)
    } catch (error) {
        res.status(500).json({error: 'Failed to get history'})
    }
})

// Save new history
router.post('/', async(req, res) => {
    console.log("POST /api/history received:", req.body)
    console.log("Headers:", req.headers)

    try {
        const {role, experience, skills, description, matchPercentage } = req.body

        const newHistory = new History({
            role,
            experience,
            skills,
            description,
            matchPercentage
        })

        await newHistory.save()
        res.status(201).json(newHistory)
    } catch (error) {
        res.status(500).json({error: 'Failed to save history'})
    }
})

// Delete one history 
router.delete("/:id", async(req, res) => {
    try {
        await History.findByIdAndDelete(req.params.id)
        res.json({message: 'Deleted'})
    } catch (error) {
        res.status(500).json({ error: "Failed to delete"})
    }
})

// clear all history
router.delete("/", async(req, res) => {
    try {
        await History.deleteMany({})
        res.json({message: 'All history cleared'})
    } catch (error) {
        res.status(500).json({ error: "Failed to clear history"})
    }
})

export default router;