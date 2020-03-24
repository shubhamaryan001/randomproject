import React,{Component} from "react"
import {list} from "./billingFunctions"
import { isAuthenticated } from "../auth"
import {Link} from "react-router-dom"
class ViewDoctor extends Component{
    constructor(){
        super()
        this.state={
            
            bills:[],
            open:false
        }
    }
    componentDidMount(){
        const patientId = this.props.match.params.patientId
        const token = isAuthenticated().token
        list(patientId,token).then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log(data)
                this.setState({bills:data,open:true})
            }
        })
    }
    render(){
        const {bills,open} = this.state
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Bills</h2>
                <div style={{display: open?"":"none"}}> 
                <div className="form-group">
                    {
                        bills.map((bills,i)=>{
                           return <div key={i}>
                                <ul className="list-group bmd-list-group-sm">
                                <div className="list-group-item"> 
                                <div className="bmd-list-group-col">
                                <p className="list-group-item-heading">{bills.DoctorName}</p>
                                <p className="list-group-item-text">Education: {bills.DoctorCharge}</p>
                                <p className="list-group-item-text">Working days: {bills.RoomCharge}</p>
                                <p className="list-group-item-text">From: {bills.ExtraCharge}</p>
                                <Link to={`/billing/pay/${bills._id}`} className="btn btn-raised btn-primary">Make payment</Link>
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

export default ViewDoctor;