import React,{Component} from "react"
import {Link} from "react-router-dom"
import {isAuthenticated} from "../auth/index";
class ViewPatient extends Component{
    constructor(){
        super()
        this.state={
        _id:"",
        firstname:"",
        lastname:"",
        gender:"",
        dob:"",
        age:"",
        occupation:"",
        phoneNumber:"",
        error:"",
        created:"",
        available:false
        }
      }

    getPatient = event =>{
        event.preventDefault()
        const {firstname} = this.state
        const name = {
            firstname:firstname
        }
        this.getDetails(name)
        .then(data=>{
            if(data.error){this.setState({error:data.error})
            this.setState({available:false})
        }
            else{
                this.setState({
                    _id:data.patient._id,
                    firstname:firstname,
                    lastname:data.patient.lastname,
                    dob:data.patient.dob,
                    age:data.patient.age,
                    gender:data.patient.gender,
                    occupation:data.patient.occupation,
                    phoneNumber:data.patient.phoneNumber,
                    created:data.patient.created,
                    available:true
                })
            }
        })
    }
    getDetails = patient =>{
        return fetch("http://localhost:8080/patient/details",{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${isAuthenticated().token}`
            },
            body: JSON.stringify(patient)
        })
        .then(response =>{
            return response.json()
        }) 
        .catch(err => console.log(err))
    };

        handleChange = name=>event=>{
            this.setState({[name]: event.target.value}); 
            this.setState({error:""});
        };

    render(){
        const {_id,firstname,lastname,gender,dob,age,occupation,phoneNumber,error,created,available} = this.state
        return(
           <div className="container">
               <h2 className="mt-5 mb-5">Find Patient</h2>
               <div className="alert alert-danger" style={{display: error?"":"none"}}>
                    {error}
                </div>
               <div className="form-group">
                   <form>
                   <label className="text-muted">Enter patient Name here</label>
                   <input className="form-control" type="text" onChange={this.handleChange("firstname")} value={firstname}></input>
                   </form>
                   <button onClick={this.getPatient} className="btn btn-raised btn-primary">Find</button>
               </div>
               <div style={{display:available?"":"none"}}>
               <Link to={`/edit-patient/${_id}`} className="btn btn-raised btn-primary">Update user</Link>
               <h2 className="mt-5 mb-5">Patient details</h2>
               <dl className="row">
                   <dt className="col-sm-3">First Name:</dt>
                   <dd className="col-sm-9">{firstname}</dd>
                   <dt className="col-sm-3">Last Name:</dt>
                   <dd className="col-sm-9">{lastname}</dd>
                   <dt className="col-sm-3">Gender:</dt>
                   <dd className="col-sm-9">{gender}</dd>
                   <dt className="col-sm-3">Date of Birth:</dt>
                   <dd className="col-sm-9">{`${new Date(dob).toDateString()}`}</dd>
                   <dt className="col-sm-3">Age:</dt>
                   <dd className="col-sm-9">{age}</dd>
                   <dt className="col-sm-3">Occupation:</dt>
                   <dd className="col-sm-9">{occupation}</dd>
                   <dt className="col-sm-3">Phone number:</dt>
                   <dd className="col-sm-9">{phoneNumber}</dd>
                   <dt className="col-sm-3">Added on:</dt>
                   <dd className="col-sm-9">{`${new Date(created).toDateString()}`}</dd>
               </dl>
            </div>
           </div>
        )
    }
    
}

export default ViewPatient; 