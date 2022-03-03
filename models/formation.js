const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const formationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Cible:{
        type: String,
        required: true,
    },
    duree:{
        type: String,
        required: true,
    }
});

const Formation = mongoose.model("Formation",formationSchema);

module.exports = Formation;