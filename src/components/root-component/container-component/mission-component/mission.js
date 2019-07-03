import React, { Component } from 'react';
import Destination from './destination-component/destination';
import Shuttle from './shuttle-component/shuttle';

class Mission extends Component{
    constructor(props){
        super(props)
        this.state={
            planets:[],
            selectedPlanet :{name:"Select"},
            vehicles:[],
            selectedVehicle:"",
            showVehicle:false
        }
    }
    /*
    ** It sets the available planets and vehicles for the respective destination No 
    */
    componentWillReceiveProps(nextProps){
        this.setState({
            planets : nextProps.planets,
            vehicles:nextProps.vehicles
        })
    }

    /*
    ** Callback to set the selected planet for that particular Destination
    ** and to show the vehicle options available for the selected planet
    */
    planetSelected=(planet)=>{
      this.setState({
        selectedPlanet:planet,
        showVehicle:true
    })
    }

    /*
    ** Callback is trigerred when vehicle is selected
    */
    vehicleSelected=(rxvehicle,rxDestination)=>{
        // newVehicles holds the count of vehicles left for travelling for next planet
        const newVehicles=this.state.vehicles.map((vehicle)=>{
            if(vehicle.name===rxvehicle.name){
                vehicle.total_no--
            }
            return vehicle
        });

        this.setState({
            selectedVehicle:rxvehicle,
            vehicle:newVehicles
        })
        //Fixes the destination and make it no clickable/modifiable as that is not defined in problem statement so making a Assumption once vehicle is selected
        // the the destination planet & vehicle are locked.
        var element = document.getElementById(rxDestination);
        element.classList.add("disable-click");
        var leftOverPlanets=this.state.planets.filter((planet)=>{
            return planet.name!== this.state.selectedPlanet.name
        })
        //This function passes on the selected planet & vehicle to parent so that it can send modified details of avaialable planets and vehicle for travelling
        this.props.updateForNextComponent(rxvehicle,newVehicles,this.state.selectedPlanet,leftOverPlanets,this.props.componentNum)
    }


    render(){
        return(
            <div  className="App">
                <div className="col-xs-3" id={this.props.destination}>
                    <p>{this.props.destination}</p>
                    <Destination 
                        selectedPlanet={this.state.selectedPlanet}
                        planets={this.state.planets}
                        planetSelected={this.planetSelected}
                    />
                    { 
                        this.state.showVehicle &&
                        <Shuttle 
                            planet={this.state.selectedPlanet}
                            vehicles={this.state.vehicles} 
                            destination={this.props.destination} 
                            vehicleSelected={this.vehicleSelected}
                            selectedVehicle={this.state.selectedVehicle}  
                        />
                    }
                </div>
            </div>
        )
    }
}

export default Mission;