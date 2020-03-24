const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//config file
dotenv.config();
//starting the app
const app = express();

const authorizationError = function(err,req,res,next){
    console.log(err.name);
    if(err.name === 'UnauthorizedError'){
       return res.status(401).json({error:"Unauthorized"});
    }
}

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());
app.use(cookieParser());

//Connecting to mongoDB
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{console.log("DB connected")})
.catch(err =>{console.log(err)});

const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patients");
const doctorRoutes = require("./routes/doctors");
const appointmentRoutes = require("./routes/appointments");
const billing = require("./routes/billing")
//routes
app.use("/",authRoutes);
app.use("/",patientRoutes);
app.use("/",doctorRoutes);
app.use("/",appointmentRoutes);
app.use("/",billing);

//authorization error
app.use(authorizationError);

//port number
const port =  process.env.PORT || 3000;

app.listen(port, ()=>{console.log(`Listening at port: ${port}`)});



