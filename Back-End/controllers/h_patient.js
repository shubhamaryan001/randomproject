const H_patients = require("../models/h_patients");

const _ = require("lodash")


const createPatient = async (req,res)=>{
    const patientExists = await H_patients.findOne({
        firstname: req.body.firstname
    })
    if(patientExists){
        return res.status(403).json({error: "Patient already exists"});
    }
    const patient = new H_patients(req.body)
    await patient.save()
    res.status(200).json({Message:"Patient succesfully created"});
};

const findPatient =(req,res)=>{
    const patient = H_patients.findOne({
        firstname: req.body.firstname
    },(err,patient)=>{ 
        if(err)
        res.status(404).json(err);
        if(!patient)
        res.status(400).json({error:"No patient found"});
        else
        res.status(200).json({patient:patient});
    })
};
 

const getPatient = (req,res)=>{
    return res.json(req.profile);
}; 


const updatePatient = (req,res,next)=>{
    let patient = req.profile
    patient = _.extend(patient, req.body)
    patient.updated = Date.now()
    patient.save((err)=>{
        if(err){
            return res.status(400).json(err)
        }
        res.json({patient});
    })
}

const deletePatient = (req,res)=>{
    let patient = req.profile;
    patient.remove((err,patient)=>{
        if(err){
            return res.status(400).json({error:err});
        }
    });
    res.json({Message : "Patient deleted successfuly"});
};

const patientById = (req,res,next,id)=>{
    H_patients.findById(id).exec((err,patient)=>{
        if(err||!patient){
            return res.status(400).json({Message:"No patient found"});
        }
        req.profile = patient;
        next();
    });
};


module.exports = {createPatient,findPatient,getPatient,deletePatient,patientById,updatePatient};