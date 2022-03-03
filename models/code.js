const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const codeSchema = new Schema({
    content: {
        type: String,
        required: true,
        unique: true
    },
   
});

const code = mongoose.model("code", codeSchema);



module.exports =  code ;