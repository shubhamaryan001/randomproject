import React,{Component} from "react"
import {list} from "./doctorFunction"
class ViewDoctor extends Component{
    constructor(){
        super()
        this.state={
            doctors:[]
        }
    }
    componentDidMount(){
        list().then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log(data)
                this.setState({doctors:data})
            }
        })
    }
    render(){
        const {doctors} = this.state
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Doctors</h2>
                <div className="form-group">
                    {
                        doctors.map((doctor,i)=>{
                           return <div key={i}>
                                <ul className="list-group bmd-list-group-sm">
                                <div className="list-group-item">
                                <div className="bmd-list-group-col">
                                <p className="list-group-item-heading">{doctor.fullname}</p>
                                <p className="list-group-item-text">Education: {doctor.education}</p>
                                <p className="list-group-item-text">Working days: {doctor.available}</p>
                                <p className="list-group-item-text">From: {doctor.startTime}</p>
                                <p className="list-group-item-text">To:{doctor.endTime}</p>
                                <p className="list-group-item-text">Phone Number:{doctor.phoneNumber}</p>
                                </div>
                                </div>
                                </ul>
                            </div>
                        }) 
                    }
                </div>
            </div>

        )
    }
}

export default ViewDoctor;