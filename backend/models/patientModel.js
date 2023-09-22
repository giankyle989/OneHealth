const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
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
    },
    address: {
      type: String,
      required: true,
      trim: true,
  },
  phone_number: {
    type: String,
    required: true,
    trim: true,
},
  birthday: {
    type: Date,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  },
  {
    timestamps: true,
  }
);

const PatientModel = mongoose.model("patient", patientSchema);

module.exports = PatientModel;
