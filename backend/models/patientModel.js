const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const PatientModel = mongoose.model("patient", patientSchema);

module.exports = PatientModel;
