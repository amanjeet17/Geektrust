import React,{ Component } from 'react';
import { Link } from 'react-router-dom'
class Result extends Component{
    constructor(props){
        super(props)
        this.state={
            result:{status:"false"},
            time:0
        }
    }

    componentDidMount(){
        if(this.props.location.state !==undefined){
        const result = this.props.location.state.referrer
        const time = this.props.location.state.time
        this.setState({
            result,
            time
        })
      }
    }

    render(){
        return(
            <div className="App">
            {
                this.state.result.status === "false" ? 
                <div>
                    <h1>Sorry! Better luck next time.</h1>
                    <h3>Time Take :{this.state.time}</h3>
                </div> : 
                <div>
                    <h1>Success! Congratulations on Finding Falcone. King Shan is mighty pleased </h1>
                    <h3>Time Take :{this.state.time}</h3>
                    <h3>Planet found:{this.state.result.planet_name}</h3>
                 </div>
            }
                   <Link to="/"><button onClick={this.findFalcone}>Start Again</button></Link> 
            </div>
        )
    
        
    }
}
export default Result;