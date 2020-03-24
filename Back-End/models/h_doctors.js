const mongoose = require("mongoose");

h_doctorSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        trim:true
    },
    post:{
        type: String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    available:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    created:{ 
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model("h_doctors",h_doctorSchema);