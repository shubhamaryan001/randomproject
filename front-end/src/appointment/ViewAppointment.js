import React,{Component} from "react"
import {appointment} from "./AppointmentFunction"
import {isAuthenticated} from "../auth/index"
class ViewAppointment extends Component{
    constructor(){
        super()
        this.state={
            appointments:[],
            doctor:"",
            message:"",
            error:"",
            open:false
        }
    }
    
    handleChange = name=>event=>{
        this.setState({[name]:event.target.value});
        this.setState({error:""});
      }

    init = doctorId =>{
        const token = isAuthenticated().token;
        appointment(doctorId,token).then(data=>{
            if(data.message) this.setState({message: data.message})
        else this.setState({appointments:data,open:true})
        })
    }
    componentDidMount(){
        const doctorId = this.props.match.params.doctorId
        this.init(doctorId)
    }
    render(){
        const {appointments,message,open} = this.state
        return(
            <div className="container">
            <h2 className="mt-5 mb-5">Your Appointments</h2>
            <div className="form-group">
            <div className="alert alert-danger" style={{display: message?"":"none"}}>
                    {message}
            </div>
            <div style={{display:open?"":"none"}}>
                {
                    appointments.map((appointments,i)=>{ 
                       return <div key={i}>
                            <ul className="list-group bmd-list-group-sm">
                            <div className="list-group-item">
                            <div className="bmd-list-group-col">
                            <p className="list-group-item-heading">Patient Name: {appointments.patientName}</p>
                            <p className="list-group-item-text">Date: {appointments.date}</p>
                            <p className="list-group-item-text">time: {appointments.time}</p>
                            </div>
                            </div>
                            </ul>
                        </div>
                    }) 
                }
            </div>
            </div>
        </div>

        )
    }
}

export default ViewAppointment;