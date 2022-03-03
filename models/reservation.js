const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    Email:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true, 
    },
    LastName :{
        type: String,
        required: true, 
    },
    FormationName:{
        type: String,
        required: true,
    },
    userNumber:{
        type: String,
        required: true,
    }
})

const Reservation = mongoose.model("Reservation",ReservationSchema);
module.exports = Reservation;