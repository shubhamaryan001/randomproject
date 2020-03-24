const H_appointment = require("../models/h_appointments");

const createAppointment = async (req,res)=>{
    const appointmentExists = await H_appointment.findOne({
        patientName: req.body.patientName,
        doctor: req.profile._id,
        time: req.body.time
    })   
    if(appointmentExists){ 
        return res.status(403).json({error:"Patient already has an appointment"})
    }
    const doctor = await new H_appointment(req.body)
    doctor.doctor = req.profile
    await doctor.save((err,result)=>{
        if(err){
            return res.status(400).json({error:err});
        }
        res.json(result);
    });
};

const getAppointments = (req,res)=>{
    H_appointment.find({doctor: req.profile._id})
    .populate("doctor","fullname post")
    .sort("created")
    .exec((err, appointments)=>{
        if(err){
            res.status(400).json(err);
        } 
        if(appointments==""){
            res.json({message:"No appointments"})
        }
        else res.json(appointments);
    });
};

const deleteAppointment = ()=>{

}

module.exports = {createAppointment,getAppointments}