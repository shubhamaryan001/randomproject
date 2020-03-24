const express = require("express");
const {signUp, singIn, signOut} = require("../controllers/auth");
const {userSignupValidator} = require("../validator/index");
const router = express.Router();

router.post("/signUp",userSignupValidator,signUp);
router.post("/signIn",singIn);
router.get("/signOut",signOut);

module.exports = router;
