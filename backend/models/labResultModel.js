const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labResultSchema = new Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointment",
      required: true,
    },
    filename: { type: String },
    url: { type: String },
  },
  {
    timestamps: true,
  }
);

const LabResultModel = mongoose.model("labResult", labResultSchema);

module.exports = LabResultModel;
