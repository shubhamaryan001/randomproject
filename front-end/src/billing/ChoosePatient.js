import React,{Component} from "react"
import {Link} from "react-router-dom"
import {isAuthenticated} from "../auth/index";
class ChoosePatient extends Component{
    constructor(){
        super()
        this.state={
        _id:"",
        firstname:"",
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
        const {_id,firstname,error,available} = this.state
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
               <div className="alert alert-info">
                    Patient exists
                </div>
               <Link to={`/create/bill/${_id}`} className="btn btn-raised btn-primary">Generate the bill</Link>
               <Link to={`/view/bill/${_id}`} className="btn btn-raised btn-primary">VIew Bills</Link>
            </div>
           </div>
        )
    }
    
}

export default ChoosePatient; 