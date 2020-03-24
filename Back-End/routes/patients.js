const express = require("express");
const {getPatient,findPatient,createPatient,deletePatient,patientById,updatePatient} = require("../controllers/h_patient");
const {requireSignin} = require("../controllers/auth");
const {patientCreateValidator} = require("../validator/index");
const router = express.Router();

router.post("/patient/create",requireSignin,patientCreateValidator,createPatient);
router.post("/patient/details",requireSignin,findPatient);
router.get("/patient/:patientId",requireSignin,getPatient);
router.delete("/patient/:patientId",requireSignin,deletePatient);
router.put("/patient/:patientId",requireSignin,patientCreateValidator,updatePatient);

router.param("patientId",patientById);

module.exports = router;    