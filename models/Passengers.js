const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  passportNumber: {
    type: String,
  },
  nationality: {
    type: String,
  },
 
});

module.exports = mongoose.model("Passenger", passengerSchema);
