const mongoose = require("mongoose");

h_patientSchema = new mongoose.Schema({
    firstname : {
        type:String,
        trim:true,
        required:true
    },
    lastname : {           
        type:String,
        trim:true,
        required:true
    },
    gender:{                                   
        type:String,
        trim:true,
        required:true
    },
    dob:{
        type:Date,
        required: true 
    },
    age:{
        type: Number,
        required: true
    },
    occupation:{
        type:String,
        required:true,
        trim:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    created:{
        type:Date,
        default:Date.now
    },
    updated: Date
});

module.exports = mongoose.model("h_patients",h_patientSchema);