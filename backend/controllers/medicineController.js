const Medicine = require("../models/Medicine");

// GET /api/medicines
exports.getAllMedicines = async (req, res) => {
    try {
        const meds = await Medicine.find().sort({ createdAt: -1 });
        res.json(meds);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// GET /api/medicines/:id
exports.getMedicineById = async (req, res) => {
    try {
        const med = await Medicine.findById(req.params.id);
        if (!med) return res.status(404).json({ message: "Medicine not found" });
        res.json(med);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// POST /api/medicines
exports.createMedicine = async (req, res) => {
    try {
        const { name, stock, price } = req.body;

        if (!name || stock == null || price == null) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const med = await Medicine.create({ name, stock, price });
        res.status(201).json(med);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// PUT /api/medicines/:id
exports.updateMedicine = async (req, res) => {
    try {
        const med = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!med) return res.status(404).json({ message: "Medicine not found" });
        res.json(med);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE /api/medicines/:id
exports.deleteMedicine = async (req, res) => {
    try {
        const med = await Medicine.findById(req.params.id);
        if (!med) return res.status(404).json({ message: "Medicine not found" });

        await med.deleteOne();
        res.json({ message: "Medicine removed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
