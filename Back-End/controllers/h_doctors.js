const H_doctors = require("../models/h_doctors");
const _ = require("lodash")

const createDoctor = async (req,res)=>{
    const doctorExists = await H_doctors.findOne({
        fullname: req.body.fullname
    })
    if(doctorExists){
        return res.status(403).json({error: "Doctor already exists"});
    }
    const doctor = new H_doctors(req.body)
    await doctor.save()
    res.status(200).json({Message:"Doctor succesfully created"});
};

const getDoctor = (req,res)=>{
    return res.json(req.profile);
}; 


const getAllDoctors = (req,res)=>{
    H_doctors.find((err,doctors)=>{
        if(err||!doctors){ 
            return res.status(400).json({error: err});
        }
        res.json(doctors);
    }).select("fullname post education available startTime endTime phoneNumber");
};

const deleteDoctor = (req,res)=>{
    let doctor = req.profile;
    doctor.remove((err, doctor)=>{
        if(err){
            return res.status(400).json({error: err})
        }
    });
    res.json({Message:"Doctor deleted successfully"});
}

const getDoctorById = (req,res,next,id)=>{
    H_doctors.findById(id).exec((err,doctor)=>{
        if(err||!doctor){
            return res.status(400).json({error:"Doctor does not exist"});
        }
        req.profile = doctor
        next();
    });
};

module.exports = {createDoctor,getAllDoctors,deleteDoctor,getDoctorById,getDoctor};