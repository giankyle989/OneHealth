const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const doctorSchema = new Schema(
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
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref: 'admin'
    },
    dept_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'department'
    },
  },
  {
    timestamps: true,
  },

);

doctorSchema.virtual('department', {
  ref: 'department',
  localField: 'dept_id',
  foreignField: '_id', 
  justOne: true,
})



const DoctorModel = mongoose.model("doctor", doctorSchema);

module.exports = DoctorModel;
