const asyncHandler = require("express-async-handler");
const Medicine = require('../models/medicineModel')


const createMedicine = asyncHandler(async (req, res) => {
    const { prescriptionId, medicineName, dosage, quantity, notes } = req.body;

    if (!prescriptionId || !medicineName || !dosage || !quantity || !notes) {
        res.status(400).json("Please fill all fields!");
        return;
    }

    const newMedicine = new Medicine({
        prescriptionId,
        medicineName,
        dosage,
        quantity,
        notes
    });

    try {
        await newMedicine.save();
        res.json("Created new medicine");
    } catch (err) {
        res.status(400).json("Error: " + err);
    }
});

  

module.exports = {
    createMedicine
}