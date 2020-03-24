import React,{Component} from "react"

class  Signup extends Component{
    constructor(){
        super()
        this.state = {
            username:"",
            email:"",
            password:"",
            error:"",
            open:false
        }
    }

    handleChange = name=>event=>{
        this.setState({[name]: event.target.value}); 
        this.setState({error:""});
    };

    clickSubmit = event =>{
        event.preventDefault()
        const{username,email,password} = this.state
        const user = {
            username:username,
            email:email,
            password:password
        };
        console.log(user)
        this.signup(user)
        .then(data =>{
            if(data.error) this.setState({error: data.error});
            else this.setState({
                error:"",
                username:"",
                password:"",
                email:"",
                open:true
            });
        });
    };

    signup = user =>{
        return fetch("http://localhost:8080/signUp",{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response =>{
            return response.json()
        }) 
        .catch(err => console.log(err))
    };

    render(){
        const {username,email,password,error,open} = this.state
        return (
            <div className="container">
                <h2 className = "mt-5 mb-5">SignUp here</h2>
                <div className="alert alert-danger" style={{display: error?"":"none"}}>
                    {error}
                </div>
                <form>
                    <div className="form-group">
                        <label >Name</label>
                        <input type="text" onChange={this.handleChange("username")} value = {username} className="form-control"></input>
                    </div>
                    
                    <div className="form-group"> 
                        <label >Email</label>
                        <input type="email" onChange={this.handleChange("email")} value = {email} className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" onChange={this.handleChange("password")} value = {password} className="form-control"></input>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
                <div className="alert alert-info" style={{display: open?"":"none"}}>
                    New Account is successfully created ! Please login.
                </div>
            </div>
        );
    }
}

export default Signup;