const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");

// GET all medicines
router.get("/", async (req, res) => {
    try {
        const meds = await Medicine.find().sort({ createdAt: -1 });
        res.json(meds);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// POST new medicine
router.post("/", async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        if (!name || price === undefined || stock === undefined) return res.status(400).json({ message: "All fields required" });

        const newMed = new Medicine({ name, price, stock });
        await newMed.save();
        res.status(201).json(newMed);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// PUT update stock
router.put("/:id", async (req, res) => {
    try {
        const { stock } = req.body;
        if (stock === undefined || stock < 0) return res.status(400).json({ message: "Invalid stock value" });

        const updatedMed = await Medicine.findByIdAndUpdate(req.params.id, { stock }, { new: true });
        if (!updatedMed) return res.status(404).json({ message: "Medicine not found" });

        res.json(updatedMed);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE medicine
router.delete("/:id", async (req, res) => {
    try {
        const deletedMed = await Medicine.findByIdAndDelete(req.params.id);
        if (!deletedMed) return res.status(404).json({ message: "Medicine not found" });

        res.json({ message: "Medicine deleted", deletedMed });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
