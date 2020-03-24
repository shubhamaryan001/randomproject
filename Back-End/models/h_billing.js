
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

h_billingSchema = new mongoose.Schema({
    patient_id:{
        type: ObjectId,
        ref: "h_patients"
        },
    DoctorName:{                                   
        type:String,
        trim:true,
        required:true
    },
    DoctorCharge:{
        type:Number,
        required: true 
    },
    RoomCharge:{ 
        type: Number,
        required: true
    },
    ExtraCharge:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    paid:{
        type: Boolean,
        default: false
    },
    created:{
        type:Date,
        default:Date.now
    },
    updated: Date
});

module.exports = mongoose.model("h_billing",h_billingSchema);