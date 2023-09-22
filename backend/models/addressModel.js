const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    address_line_1: {
      type: String,
      required: true,
      trim: true,
    },
    address_line_2: {
      type: String,
      required: true,
      trim: true,
    },
    barangay: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    province: {
      type: String,
      required: true,
      trim: true,
  },
  },
  {
    timestamps: true,
  }
);

const AddressModel = mongoose.model("address", addressSchema);

module.exports = AddressModel;
