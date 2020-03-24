exports.userSignupValidator = (req,res,next)=>{
    // name is not null and between 4-10 characters
    req.check("username","Username is required").notEmpty();
    // Email is not null, valid and normalized
    req.check("email","Email must be between 3-32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email should contain @")
    .isLength({
        min:4,
        max:2000
    })
    req.check("password","Password is required").notEmpty();
    req.check("password")
    .isLength({min: 6})
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password should contain numbers")
    const error = req.validationErrors();
    if(error){
        const firstError = error.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next();
};

exports.patientCreateValidator = (req,res,next)=>{
    req.check("firstname","firstname is required").notEmpty()
    .isLength({min:4,max:15})
    .matches(/^[A-Za-z]+$/)
    .withMessage("Only alphabets to be used in firstname")
    req.check("lastname","lastname is required").notEmpty()
    .isLength({min:4,max:15})
    .matches(/^[A-Za-z]+$/)
    .withMessage("Only alphabets to be used in lastname")
    req.check("age","enter a valid age")
    .isLength({min:1,max:3})
    .matches(/^(0|[1-9][0-9]*)$/)
    .withMessage("Only numeric values")
    req.check("occupation","occupation is required").notEmpty()
    .isLength({min:4,max:30})
    .matches(/^[A-Za-z]+$/)
    .withMessage("Only alphabets to be used in occupation")
    req.check("phoneNumber","Please enter the mobile number").notEmpty()
    .isLength({min:10,max:10})
    .withMessage("Invalid mobile number")
    .matches(/^(0|[1-9][0-9]*)$/)
    .withMessage("Only number values in the phone number")
    const error = req.validationErrors();
    if(error){
        const firstError = error.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next();
};

exports.doctortCreateValidator = (req,res,next)=>{
    req.check("fullname","fullname is required").notEmpty()
    .isLength({min:4,max:20})
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
    .withMessage("Enter the full name please")
    req.check("post","post is required").notEmpty()
    .isLength({min:4,max:15})
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
    .withMessage("Post must be at least 2 words")
    req.check("education","education is required").notEmpty()
    .isLength({min:4,max:30})
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) 
    .withMessage("Education must be at least 2 words")
    req.check("phoneNumber","Please enter the mobile number").notEmpty()
    .isLength({min:10,max:10})
    .withMessage("Invalid mobile number")
    .matches(/^(0|[1-9][0-9]*)$/)
    .withMessage("Only number values in the phone number")
    req.check("available","Please enter the days available").notEmpty()
    .matches(/^[a-zA-Z\s]+\,[a-zA-Z\s]+$/)
    .withMessage("Only alphabets to be used in days available and special characters")
    req.check("startTime","Please enter the time alloted").notEmpty()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)
    .withMessage("Please correct the start time")
    req.check("endTime","Please enter the time alloted").notEmpty()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)
    .withMessage("Please correct the end time")
    const error = req.validationErrors();
    if(error){
        const firstError = error.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next();
};

exports.appointmentValidator = (req,res,next)=>{
    req.check("date","please enter the appointment date").notEmpty()
    req.check("time","please select the time").notEmpty()
    .matches(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)
    .withMessage("Please select a valid time")
    req.check("patientName","Please fill in the patient name").notEmpty()
    .matches(/^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/)
    .withMessage("Only characters allowed")
    const error = req.validationErrors();
    if(error){
        const firstError = error.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next();
}
