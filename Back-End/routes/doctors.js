const express = require("express");
const {createDoctor,getAllDoctors,getDoctorById,deleteDoctor,getDoctor} = require("../controllers/h_doctors");
const {requireSignin} = require("../controllers/auth");
const {doctortCreateValidator} = require("../validator/index")
const router = express.Router();

router.post("/doctor/create",requireSignin,doctortCreateValidator,createDoctor);
router.get("/doctors/all",getAllDoctors);
router.get("/doctor/:doctorId",getDoctor);
router.delete("/doctor/:doctorId",requireSignin,deleteDoctor);

router.param("doctorId",getDoctorById); 

module.exports = router;     