const mongoose = require("mongoose");



const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true,
        unique: true,
    },
    departureDate: {
        type: Date,
        required: true,
    },
    arrivalDate: {
        type: Date,
        required: true,
    },
    departureAirport: {
        type: String,
        required: true,
    },
    arrivalAirport: {
        type: String,
        required: true,
    },
    airlineName: {
        type: String,
        required: true,
    },
    duration:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    }
})



module.exports=mongoose.model("Flight",flightSchema)

