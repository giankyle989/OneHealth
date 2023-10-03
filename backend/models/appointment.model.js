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
    patientFirstName: { 
      type: String,
      required: true,
      trim:true
    },
    patientLastName: { 
      type: String,
      required: true,
      trim:true
    },
    email: { 
      type: String,
      trim:true
    },
    mobileNumber: { 
      type: String,
      trim:true
    },
    appointmentDateTime: { 
      type: Date,
      required: true
    },
    reason: { 
      type: String,
      required: true,
      trim:true
    },
    diagnosis: { 
      type: String,
      trim:true
    },
    appt_status: {
      type: String,
      enum:["Upcoming", "Done"],
      default:"Upcoming",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


const AppointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = AppointmentModel;
