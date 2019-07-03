import React ,{ Component }from 'react';

class Time extends Component{


    render(){
        return(
        <h3>Time Taken:{this.props.time}</h3>
        )
    }
}
export default Time;