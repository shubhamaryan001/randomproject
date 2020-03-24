import React from "react"
import {Switch,Route} from "react-router-dom"
import Home from "./core/Home"
import Signup from "./users/Signup"
import Signin from "./users/Signin"
import Menu from "./core/Menu"
import AddPatient from "./patient/AddPatient"
import ViewPatient from "./patient/ViewPatient"
import EditPatient from "./patient/EditPatient"
import AddDoctor from "./doctor/AddDoctor"
import ViewDoctor from "./doctor/ViewDoctors"
import ChooseDoctor from "./appointment/ChooseDoctor"
import AddAppointment from "./appointment/AddAppointment"
import Billing from "./billing/Billing"
import ChoosePatient from "./billing/ChoosePatient"
import DoctorAppointment from "./appointment/DoctorAppointment" 
import ViewAppointment from "./appointment/ViewAppointment"
import ViewBills from "./billing/ViewBills"
import MakePayement from "./billing/MakePayement"
const MainRouter = ()=>(
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            <Route exact path="/add-patient" component={AddPatient}></Route>
            <Route exact path="/view-patient" component={ViewPatient}></Route>
            <Route exact path="/add-doctor" component={AddDoctor}></Route>
            <Route exact path="/view-doctor" component={ViewDoctor}></Route>
            <Route exact path="/edit-patient/:patientId" component={EditPatient}></Route>
            <Route exact path="/apppointment/select-doctor" component={ChooseDoctor}></Route>
            <Route exact path="/appointment/add/:doctorId" component={AddAppointment}></Route>
            <Route exact path="/bill/choosePatient" component={ChoosePatient}></Route>
            <Route exact path="/create/bill/:patientId" component={Billing}></Route>
            <Route exact path="/doctors/appointment" component={DoctorAppointment}></Route>
            <Route exact path="/appointment/view/:doctorId"component={ViewAppointment}></Route>
            <Route exact path="/view/bill/:patientId"component={ViewBills}></Route>
            <Route exact path="/billing/pay/:billId"component={MakePayement}></Route>
        </Switch>
    </div>
);

export default MainRouter;