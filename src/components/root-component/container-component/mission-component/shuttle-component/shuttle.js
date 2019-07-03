import React from 'react';

const Shuttle = (props) => {
    /*
    **Triggered when a vehicle is selected
    */
    const vehicleSelection = (e) => {
        var selectedvehicle = {
            "name": e.target.value.split(",")[0],
            "speed": parseInt(e.target.value.split(",")[1])
        }
        props.vehicleSelected(selectedvehicle, props.destination);
    }
    
    return (
        <div id="shuttles" >
            {
                props.vehicles.map((vehicle, index) => {
                    return (
                        <div key={index}>
                            <input
                                onChange={vehicleSelection}
                                type="radio"
                                key={index}
                                disabled={!(vehicle.max_distance >= props.planet.distance && vehicle.total_no > 0) && !(props.selectedVehicle.name === vehicle.name)}
                                value={vehicle.name + "," + vehicle.speed}
                                id={vehicle.name}
                                name={props.destination} />{vehicle.name}({vehicle.total_no})
                </div>
                    )
                })
            }
        </div>
    )
}
export default Shuttle;