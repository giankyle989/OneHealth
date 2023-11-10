const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const medicineSchema = new Schema(
  {
    prescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "prescription",
      required: true,
    },
    medicineName:{
        type: String,
        required: true,
        trim: true
    },
    dosage:{
        type: String,
        required: true,
        trim: true
    },
    quantity:{
        type: String,
        required: true,
        trim: true
    },
    notes:{
        type: String,
        required: true,
        trim: true
    },
    
  },
  {
    timestamps: true,
  }
);

const MedicineModel = mongoose.model("medicine", medicineSchema);

module.exports = MedicineModel;
