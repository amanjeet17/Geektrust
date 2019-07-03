import React, { Component } from 'react';
import Container from './container-component/container'
import axios from 'axios';


class Root extends Component {
    constructor(props) {
        super(props)
        this.state = {
            destinations: [
                {
                    "name": "Destination 1"
                },
                {
                    "name": "Destination 2"
                },
                {
                    "name": "Destination 3"
                },
                {
                    "name": "Destination 4"
                }
            ],
            planets: [],
            vehicles: [],
            answer: {
                token: "",
                planet_names: [],
                vehicle_names: []
            }
        }
    }

    componentDidMount() {
        /*
        ** To fetch Token to submit answer
        */
        var headers = {
            'Accept': 'application/json',
        }
        // Requests will be executed in parallel...
        axios.all([
            axios.post('https://findfalcone.herokuapp.com/token', {}, { headers }),
            axios.get('https://findfalcone.herokuapp.com/planets'),
            axios.get('https://findfalcone.herokuapp.com/vehicles')
        ])
        .then(([firstResponse, secondResponse,thirdResponse])=> {
            var answer = {
                    token:  firstResponse.data.token,
                    planet_names: [],
                    vehicle_names: []
                }
             this.setState({
                answer:answer,
                planets:secondResponse.data,
                vehicles:thirdResponse.data
            });
        })
        .catch((error) => {
            console.log("err",error)
        })
    }

    render() {
        return (
            <div >
                <h3>
                    Select planets you want to search in:
            </h3>
                <Container
                    apiRcvd={this.state}
                />
            </div>
        )
    }
}

export default Root;