import React,{Component} from "react"
import {isAuthenticated} from "../auth/index";
import {read} from "./patientFunction"
class EditPatient extends Component{
    constructor(){
        super()
        this.state ={
            firstname:"",
            lastname:"",
            gender:"",
            dob:"",
            age:"",
            occupation:"",
            phoneNumber:"",
            error:"",
            _id:"",
            open:false
        }
    }

    handleChange = name=>event=>{
        this.setState({[name]:event.target.value});
        this.setState({error:""});
      }    
    
    editPatient = patient =>{
        return fetch(`http://localhost:8080/patient/${this.state._id}`,{
            method: "PUT",
            headers:{
                Accept:"applicatoion/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${isAuthenticated().token}`
            },
            body: JSON.stringify(patient)
        }) 
        .then(response=>{ 
            return response.json()  
        })
        .catch(err=>console.log(err))
    };  
     
    clickSubmit = event=>{
        event.preventDefault()
        const{firstname,lastname,gender,age,dob,occupation,phoneNumber} = this.state
        const patient={
            firstname:firstname,
            lastname:lastname,
            gender:gender,
            dob:dob,
            age:age,
            occupation:occupation, 
            phoneNumber:phoneNumber
        }
        console.log(patient);
        this.editPatient(patient)
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


    init = patientId =>{
        const token = isAuthenticated().token;
        read(patientId,token).then(data=>{
            if(data.error) this.setState({redirectToSignin: true});
            else this.setState({
    _id:data._id, firstname:data.firstname,lastname:data.lastname,gender:data.gender,dob:data.dob,age:data.age,occupation:data.occupation,phoneNumber:data.phoneNumber});
    });
    };

    componentDidMount(){
        const patientId =this.props.match.params.patientId
        this.init(patientId);
    }
    render(){
        const {firstname,lastname,gender,age,dob,occupation,phoneNumber,error,open} = this.state
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Patient Profile</h2>
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
                    Patient successfully updated
                </div>
          </div>
            </div>
        )
    }
}

export default EditPatient;