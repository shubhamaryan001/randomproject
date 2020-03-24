import React,{Component} from "react"
import { isAuthenticated } from "../auth"
import {read} from "../appointment/AppointmentFunction"

class AddAppointment extends Component{
    constructor(){
        super()
        this.state = { 
            date:"",
            time:"", 
            patientName:"",
            error:"",
            doctorId :"",
            open:false
        }
    }
    
    handleChange = name=>event=>{
        this.setState({[name]:event.target.value});
        this.setState({error:""});
      }
    
    clickSubmit = event =>{
        event.preventDefault()
        const {date,time,patientName,doctorId} = this.state
        const appointment ={
            doctor:doctorId,
            date:date,
            time:time,
            patientName:patientName
        }
        console.log(appointment)
        this.makeAppointment(appointment)
        .then(data=>{
            if(data.error)this.setState({error:data.error})
            else this.setState({
                doctor:"",
                date:"",
                time:"",
                patientName:"",
                open:true
            })
        })

    }
    makeAppointment = appointment =>{
        return fetch(`http://localhost:8080/appointment/create/${this.state.doctorId}`,{
          method:"POST",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json" ,
            Authorization:`Bearer ${isAuthenticated().token}` 
          },
          body: JSON.stringify(appointment)
        })
        .then(response=>{
          return response.json()
        })
        .catch(err=> console.log(err))  
      }

    init = doctorId=>{
        const token = isAuthenticated().token;
        read(doctorId,token).then(data=>{
            if(data.error){this.setState({RedirectToSignin: true})}
            else this.setState({
                doctorId: doctorId
            })
        })
    } 

    componentDidMount(){
        const doctorId = this.props.match.params.doctorId
        this.init(doctorId)
    }

    render(){
        const {date,time,patientName,error,open} = this.state
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Create appointment</h2>
                <div className="form-group"> 
                <form>
                <div className="alert alert-danger" style={{display: error?"":"none"}}>
                    {error}
                </div>
                <label className="text-muted">Date: </label>
                <input type="date" className="form-control" onChange={this.handleChange("date")} value={date}></input>
                <label className="text-muted">time: </label>
                <input type="time" className="form-control"onChange={this.handleChange("time")} value={time}></input>
                <label className="text-muted">patient name: </label>
                <input type="text" className="form-control" onChange={this.handleChange("patientName")}value={patientName}></input>
                </form>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Create appointment</button>
                    <div className="alert alert-info" style={{display: open?"":"none"}}>
                                 Appointment has been confirmed
                </div>
                </div>
            </div>
        )
    }
}

export default AddAppointment;