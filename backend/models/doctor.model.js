const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const doctorSchema = new Schema(
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
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref: 'Admin'
    },
    dept_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
  },
  {
    timestamps: true,
  },

);

doctorSchema.virtual('department', {
  ref: 'Department',
  localField: 'dept_id',
  foreignField: '_id', 
  justOne: true,
})



const DoctorModel = mongoose.model("doctor", doctorSchema);

module.exports = DoctorModel;
