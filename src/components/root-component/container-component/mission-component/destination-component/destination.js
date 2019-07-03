import React from 'react';

const Destination=(props)=> {
     /*
    **Triggered when a planet is selected
    */
    const planetSelection=(e)=>{
        var selectedplanet = { 
            "name":e.target.value.split(",")[0],
            "distance":parseInt(e.target.value.split(",")[1])
        }
        props.planetSelected(selectedplanet)
    }

    return(
        <div >
            <select  onChange={planetSelection} value={props.selectedPlanet.name} >
            {
                <option value={props.selectedPlanet.name}
                   hidden>{props.selectedPlanet.name}</option> 
            }
            {
                props.planets.map((planet)=>{
                    return(
                        <option 
                            key={planet.name} 
                            value={planet.name+","+planet.distance} 
                        >{planet.name}</option>
                    )
                })
            }
            </select>
        </div>
        )
}

export default Destination;