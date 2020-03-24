import React from "react"
import {Link,withRouter} from "react-router-dom"
import {isActive,isAuthenticated,signout} from "../auth/index"

const Menu = ({history})=>(
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <label className="navbar-brand"><b>RJK Hospital</b></label>
  <div className="collapse navbar-collapse" >
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/" style={isActive(history,"/")}>Home</Link>
      </li>


      {!isAuthenticated() && (
      <>
      <li className="nav-item">
      <Link className="nav-link" style={isActive(history,"/signin")} to="/signin">SignIn</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/signup"style={isActive(history,"/signup")}>SignUp</Link>
      </li>
      </>)}

      {isAuthenticated() &&(
      <>
      <li className="nav-item">
      <Link className="nav-link"to="/add-patient" style={(isActive(history,"/add-patient"))}>
          Add Patient</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link"to="/view-patient" style={(isActive(history,"/view-patient"))}>
          patient details</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/apppointment/select-doctor"style={(isActive(history,"/apppointment/select-doctor"))}>
          Make an appointment</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/add-doctor"style={(isActive(history,"/add-doctor"))}>
          Add Doctor</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link"to="/view-doctor" style={(isActive(history,"/view-doctor"))}>
          View Doctors</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/doctors/appointment"style={(isActive(history,"/doctors/appointment"))}>
          Doctor's appointments</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/bill/choosePatient"style={(isActive(history,"/bill/choosePatient"))}>
          Generate Bill</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="">{isAuthenticated().user.username}</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to=""style={(isActive(history,"/Signout"))} onClick={()=> signout(()=> history.push("/"))}>
          Signout</Link>
      </li>
      </>
      )} 

    </ul>
  </div>
</nav>
);

export default withRouter(Menu);

