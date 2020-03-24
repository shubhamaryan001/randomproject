import React,{Component} from "react"
import Particles from 'react-particles-js'

const particleOpt = {
    particles:{
        number:{
            value:150,
            density:{
                enable:true,
                value_area:800
            }
        }
    }
}

class Background extends Component{
    render(){
        return(
            <div>
                <Particles 
              params={particleOpt}
            />
            </div>
        )
    }
}

export default Background;