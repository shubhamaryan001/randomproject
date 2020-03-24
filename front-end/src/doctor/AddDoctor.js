import React,{Component} from "react"
import {isAuthenticated} from "../auth/index";
class AddDoctor extends Component{
    constructor(){
        super()
        this.state={
            fullname:"",
            post:"",
            education:"",
            available:"",
            startTime:"",
            endTime:"",
            phoneNumber:"",
            error:""
    }
}

clickSubmit = event=>{
    event.preventDefault()
    const {fullname,post,education,available,startTime,endTime,phoneNumber} = this.state
    const doctor = {
        fullname:fullname,
        post:post,
        education:education,
        available:available,
        startTime:startTime,
        endTime:endTime,
        phoneNumber:phoneNumber
    }
    console.log(`This is doctor${doctor}`);
    this.AddDoctor(doctor)
    .then(data=>{
        console.log(data)
        if(data.error)this.setState({error: data.error});
        else this.setState({
            fullname:"",
            post:"",
            education:"",
            available:"",
            startTime:"",
            endTime:"",
            phoneNumber:""
        })
    })
}

AddDoctor = doctor =>{
    return fetch("http://localhost:8080/doctor/create",{
        "method":"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${isAuthenticated().token}`
        },
        body: JSON.stringify(doctor)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=> console.log(err))
}

handleChange = name=>event=>{
    this.setState({[name]:event.target.value});
    this.setState({error:""});
}
    render(){
        const {fullname,post,education,available,startTime,endTime,phoneNumber,error} = this.state
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Add new Doctor</h2>
                <div className="form-group">
                <div className="alert alert-danger" style={{display: error?"":"none"}}>
                {error}
            </div>
                    <form>
                        <label className="text-muted">Full Name</label>
                        <input type="text" className="form-control"onChange={this.handleChange("fullname")}value={fullname}></input>
                        <label className="text-muted">Post</label>
                        <input type="text" className="form-control"onChange={this.handleChange("post")}value={post}></input>
                        <label className="text-muted">Education</label>
                        <input type="text" className="form-control"onChange={this.handleChange("education")}value={education}></input>
                        <label className="text-muted">Days of work</label>
                        <input type="text" className="form-control" onChange={this.handleChange("available")} value={available}></input>
                        <label className="text-muted">Working from</label>
                        <input type="time" className="form-control"onChange={this.handleChange("startTime")}value={startTime}></input>
                        <label className="text-muted">To</label>
                        <input type="time" className="form-control"onChange={this.handleChange("endTime")}value={endTime}></input>
                        <label className="text-muted">Phone number</label>
                        <input type="text" className="form-control"onChange={this.handleChange("phoneNumber")}value={phoneNumber}></input>
                    </form>
                    <button className="btn btn-raised btn-primary" onClick={this.clickSubmit}>Add doctor</button>
                </div>
            </div>
        )
    }
}

export default AddDoctor;