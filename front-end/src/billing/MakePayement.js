import React,{Component} from "react"
import { isAuthenticated } from "../auth"
import {pay} from "./billingFunctions"

class MakePayement extends Component{
    componentDidMount(){
        const billId = this.props.match.params.billId
        const token = isAuthenticated().token
        pay(billId,token)
    }
    render(){
        return(
            <div>
                <h2>Payment Successful</h2>
            </div>
        )
    }
}

export default MakePayement;