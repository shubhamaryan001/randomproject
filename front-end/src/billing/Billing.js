import React,{Component} from "react"
import { isAuthenticated } from "../auth";
import { read } from "../patient/patientFunction";

class Billing extends Component{
  constructor(){
    super()
    this.state={
      patient_id:"",
    DoctorName:"",
    DoctorCharge:"",  
    RoomCharge:"",
    ExtraCharge:"",
    phoneNumber:"",
    error:"",
    open:false
    }
  }
  handleChange = name=>event=>{
    this.setState({[name]:event.target.value});
    this.setState({error:""});
  }

  clickSubmit = event =>{
    event.preventDefault()
    const {patient_id,DoctorName,DoctorCharge,RoomCharge,ExtraCharge,phoneNumber} = this.state
    const bill = {
        patient_id: patient_id,
        DoctorName:DoctorName,
        DoctorCharge:DoctorCharge,
        RoomCharge:RoomCharge,
        ExtraCharge:ExtraCharge,
        phoneNumber:phoneNumber
    }
   console.log(bill)
    this.generateBill(bill)
    .then(data=>{
      if(data.error)this.setState({error:data.error})
      else this.setState({
        DoctorName:"",
        DoctorCharge:"",
        RoomCharge:"",
        phoneNumber:"",
        open:true
      })
    })
  }

  generateBill = bill =>{
    return fetch(`http://localhost:8080/billing/create/${this.state.patient_id}`,{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json" ,
        Authorization:`Bearer ${isAuthenticated().token}` 
      },
      body: JSON.stringify(bill)
    })
    .then(response=>{
      return response.json()
    })
    .catch(err=> console.log(err))  
  }

 init = patientId=>{
   const token = isAuthenticated().token;
   read(patientId,token)
   .then(data=>{
     if(data.error){
       console.log("Some problem occured")
     }
     else{
       this.setState({patient_id:data._id, phoneNumber:data.phoneNumber})
     }
   })
 }

  componentDidMount(){
    const patientId = this.props.match.params.patientId
    this.init(patientId)
  }

  render(){
    const {DoctorName,DoctorCharge,RoomCharge,ExtraCharge,phoneNumber,open,error} = this.state
    return(
     
      <div className="container">
      <h2 className = "mt-5 mb-5">Billing Summary</h2>  
          <div className="form-group">
          <form > 
          <div className="alert alert-danger" style={{display: error?"":"none"}}>
                {error}
        </div>
              <label className="text-muted">Doctor Incharge</label>
              <input type="text" className="form-control"onChange={this.handleChange("DoctorName")}value={DoctorName}></input>
              <label className="text-muted">Doctor's Charges</label>
              <input type="text" className="form-control" onChange={this.handleChange("DoctorCharge")} value={DoctorCharge}></input>
              <label className="text-muted">Room Charges</label>
              <input  type="text" className="form-control"onChange={this.handleChange("RoomCharge")}value={RoomCharge}></input>
              <label className="text-muted">Extra Charges</label>
              <input  type="text"className="form-control"onChange={this.handleChange("ExtraCharge")} value={ExtraCharge}></input>
              <label className="text-muted">Mobile Number</label>
              <input type="text" className="form-control"onChange={this.handleChange("mobileNumber")}value={phoneNumber}></input>
            </form>
          </div>
          <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
          <div className="alert alert-info" style={{display: open?"":"none"}}>
                    Bill successfully generated! Please view the bill.
                </div>  
  </div>
    );
  }
}
export default Billing;