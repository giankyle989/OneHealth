const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
    patientName: { 
      type: String,
      required: true,
      trim:true
    },
    appointmentDateTime: { 
      type: Date,
      required: true
    },
    appt_status: {
      type: String,
      required: true,
      enum: ["Pending", "Approved", "Declined"],
      default: "Pending",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


const AppointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = AppointmentModel;
