import React,{Component} from "react"
import {isAuthenticated} from "../auth/index"
class Patient extends Component{
  constructor(){
    super()
    this.state={
    firstname:"",
    lastname:"",
    gender:"",
    dob:"",
    age:"",
    occupation:"",
    phoneNumber:"",
    error:"",
    open:false
    }
  }
  handleChange = name=>event=>{
    this.setState({[name]:event.target.value});
    this.setState({error:""});
  }

  clickSubmit = event=>{
      event.preventDefault()
      const {firstname,lastname,gender,dob,age,occupation,phoneNumber} = this.state
      const patient = {
          firstname:firstname,
          lastname:lastname,
          gender:gender,
          dob:dob,
          age:age,
          occupation:occupation, 
          phoneNumber:phoneNumber
      }
      console.log(patient);
      this.addPatient(patient)
      .then(data=>{
          console.log(data)
          if(data.error)this.setState({error: data.error});
          else this.setState({
            firstname:"",
            lastname:"",
            gender:"",
            dob:"",
            age:"",
            occupation:"",
            phoneNumber:"",
            open:true
          })
      })
  }


  addPatient = patient=>{
      return fetch("http://localhost:8080/patient/create",{
          method:"POST",
          headers:{
              Accept:"application/json",
              "Content-Type":"application/json" ,
              Authorization:`Bearer ${isAuthenticated().token}`
          },
          body: JSON.stringify(patient)
      })
      .then(response=>{ 
          return response.json()  
      })
      .catch(err=>console.log(err))
  };

  render(){
    const {firstname,lastname,gender,age,dob,occupation,phoneNumber,error,open} = this.state
    return(
      <div className="container">
      <h2 className = "mt-5 mb-5">Patient Registration</h2>  
          <div className="form-group">
          <form  >
          <div className="alert alert-danger" style={{display: error?"":"none"}}>
                {error}
        </div>
              <label  className="text-muted">First Name</label>
              <input  type="text" className="form-control"onChange={this.handleChange("firstname")}value={firstname}></input>
              <label className="text-muted">Last Name</label>
              <input type="text" className="form-control"onChange={this.handleChange("lastname")}value={lastname}></input>
              <label className="text-muted">Gender</label>
              <select className="form-control"onChange={this.handleChange("gender")}value={gender}>
              <option value="">--select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
              </select>
              <label className="text-muted">Date of birth</label>
              <input  type="date" className="form-control"onChange={this.handleChange("dob")}value={dob}></input>
              <label className="text-muted">Age</label>
              <input  type="text" className="form-control"onChange={this.handleChange("age")}value={age}></input>
              <label className="text-muted">Occupation</label>
              <input  type="text"className="form-control"onChange={this.handleChange("occupation")}value={occupation}></input>
              <label className="text-muted">Mobile Number</label>
              <input  type="number" className="form-control"onChange={this.handleChange("phoneNumber")}value={phoneNumber}></input>
              </form>
              <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
              <div className="alert alert-info" style={{display: open?"":"none"}}>
                    Patient successfully added
                </div>
          </div>
  </div>

    );
  }
} 
export default Patient;
