    const mongoose = require("mongoose");
    const {ObjectId} = mongoose.Schema;
    h_appointmentSchema = new mongoose.Schema({
        doctor:{
            type: ObjectId,
            ref:"h_doctors"
        },
        date:{
            type:Date,
            required:true,
            trim:true
        }, 
        time:{
            type:String,
            required:true,
            trim:true
        },
        patientName:{
            type:String,
            required:true,
            trim:true
        },
        created:{
            type:Date,
            default:Date.now
        }
    });

    module.exports = mongoose.model("h_appointments",h_appointmentSchema);