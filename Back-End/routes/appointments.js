const express = require("express");
const {createAppointment,getAppointments} = require("../controllers/h_appointments")
const {getDoctorById} = require("../controllers/h_doctors");
const {appointmentValidator} = require("../validator/index")
const {requireSignin} = require("../controllers/auth");
const router = express.Router();
 
router.post("/appointment/create/:doctorId",requireSignin,appointmentValidator,createAppointment);
router.get("/appointment/:doctorId",requireSignin,getAppointments);

router.param("doctorId",getDoctorById);

module.exports = router;