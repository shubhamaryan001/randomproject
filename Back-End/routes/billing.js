const express = require("express");
const {createBill,getBill,payBill,BillById} = require("../controllers/h_billing")
const {patientById} = require("../controllers/h_patient");
const {requireSignin} = require("../controllers/auth");
const router = express.Router();

router.post("/billing/create/:patientId",requireSignin,createBill); 
router.get("/billing/get/:patientId",requireSignin,getBill);
router.put("/billing/pay/:billId",requireSignin,payBill)

router.param("billId",BillById);
router.param("patientId",patientById);

module.exports = router;


