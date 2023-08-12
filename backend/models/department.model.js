const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ['General Medicine', 'Internal Medicine', 'Pediatrics', 'OB-GYN'],
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const DepartmentModel = mongoose.model("department", departmentSchema);

module.exports = DepartmentModel;
