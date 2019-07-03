import React, { Component } from 'react';
import Mission from './mission-component/mission'
import Time from './time-component/time'
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            destinations: props.apiRcvd.destinations,
            planets: [],
            vehicles: [],
            answer: props.apiRcvd.answer,
            time: 0,
            navigate: false,
            status: undefined
        }
        console.log("container constructor",props)
    }

    /*
    ** As soon token is fetched it will change state and this component will re-render
    ** When it re-render below code creates Object for each selection of destination and 
    **  only provides planet and vehicles details to first component and rest 3 being empty.
    */
    componentWillReceiveProps(nextProps) {
        var destinations = nextProps.apiRcvd.destinations.map((dest) => {
            return {
                name: dest.name,
                planetAllowedVisit: [],
                selectedPlanet: "",
                vehicleAllowed: [],
                selectedVehicle: ""
            }
        })
        destinations[0].planetAllowedVisit = nextProps.apiRcvd.planets;
        destinations[0].vehicleAllowed = nextProps.apiRcvd.vehicles;
        this.setState({
            destinations: destinations,
            planets: nextProps.apiRcvd.planets,
            vehicles: nextProps.apiRcvd.vehicles,
            answer: nextProps.apiRcvd.answer
        })
    }

    /*
    ** Once the planet and vehicle is selected they are stored in asnwer and new updated info of remaining planet and 
    ** vehicle options is passed to next component and reflected in next consecutive component
    */
    updateForNextComponent = (selectedVehicle, leftoverVehicles, selectedPlanet, leftoverPlanets, destinationNo) => {
        let destinations = JSON.parse(JSON.stringify(this.state.destinations))
        destinations[parseInt(destinationNo)].selectedVehicle = selectedVehicle;
        destinations[parseInt(destinationNo)].selectedPlanet = selectedPlanet;
        // The above code assigns the selected vehicle and planet to the respective destinationNo
        if ((destinationNo + 1) < this.state.destinations.length) {
            destinations[parseInt(destinationNo) + 1].planetAllowedVisit = leftoverPlanets;
            destinations[parseInt(destinationNo) + 1].vehicleAllowed = leftoverVehicles;
        }
        // The above code passes on and assigns the leftOver planets & vehicles info to next consecutive component.
        var answer = JSON.parse(JSON.stringify(this.state.answer));
        answer.planet_names.push(selectedPlanet.name);
        answer.vehicle_names.push(selectedVehicle.name);
        // The above code stores the selected planet and vehicle info for answer
        var time = this.state.time + (parseInt(selectedPlanet.distance) / parseInt(selectedVehicle.speed));
        // The above code calculates time to reach selected planets wrt corresponding selected vehicles
        this.setState({
            destinations,
            time,
            answer
        })
    }

    findFalcone = () => {
        var headers = {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
        axios.post('https://findfalcone.herokuapp.com/find', this.state.answer, { headers })
            .then((res) => {
                console.log("response", res);
                this.setState({
                    navigate: true,
                    status: res.data
                })

            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);

            })
    }

    render() {
        if (this.state.navigate) {
            return <Redirect to={{
                pathname: "/result",
                state: { referrer: this.state.status, time: this.state.time }
            }} />
        }
        const { destinations , answer } = this.state;
        return (
            <div>
                <div className="col-xs-10">
                    {
                        destinations.map((destination, index) => {
                            return (
                                <div key={destination.name} >
                                    <Mission
                                        key={index}
                                        planets={destination.planetAllowedVisit}
                                        vehicles={destination.vehicleAllowed}
                                        componentNum={index}
                                        destination={destination.name}
                                        updateForNextComponent={this.updateForNextComponent}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-xs-2" style={{ textAlign: "left" }}>
                    <Time time={this.state.time} />
                </div>
                <div className="col-xs-12">
                    <button className="btun" disabled={!(answer.planet_names.length === 4)} onClick={this.findFalcone}>Find Falcone</button>
                </div>
            </div>
        )
    }
}

export default Container;