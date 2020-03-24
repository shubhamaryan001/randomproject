import React,{Component} from "react"
import {Redirect} from "react-router-dom"
import {signin,authenticate} from "../auth/index"
class  Signin extends Component{
    constructor(){
        super()
        this.state = {
            username:"",
            password:"",
            error:"",
            redirectToReferer:false,
            loading:false
        }
    }

    handleChange = name=>event=>{
        this.setState({[name]: event.target.value}); 
        this.setState({error:""});
    };


    clickSubmit = event =>{
        event.preventDefault()
        this.setState({loading:true})
        const{username,password} = this.state
        const user = {
            username:username,
            password:password
        };
        console.log(user)
        signin(user)
        .then(data =>{
            if(data.error) this.setState({error: data.error,loading:false});
            else{
                    authenticate(data,()=>{
                    this.setState({redirectToReferer:true})
                })
            }
        });
    };

    render(){
        const {username,password,error,redirectToReferer,loading} = this.state
        if(redirectToReferer){
            return <Redirect to="/"/>
        }
        return (
            <div className="container">
                <h2 className = "mt-5 mb-5">Signin Here</h2>
                {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div>:""}
                <div className="alert alert-danger" style={{display: error?"":"none"}}>
                    {error}
                </div>
                <form>
                    <div className="form-group">
                        <label >Username</label>
                        <input type="email" onChange={this.handleChange("username")} value = {username} className="form-control"></input>
                        <label >Password</label>
                        <input type="password" onChange={this.handleChange("password")} value = {password} className="form-control"></input>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        );
    } 
}

export default Signin;