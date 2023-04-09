import '../style/city.css';
import ActionAreaCard from "../components/actionCard";
import React, { useEffect, useState } from "react";

export default function City(){
    const [cities, setCities] = useState([]);

    const fetchCitiesData = async () => {
        try{
            const res = await fetch("http://localhost:3000/cities", {credentials: 'include'}, {method: 'GET'});
            const resJson = await res.json();
            setCities(resJson);
            console.log(resJson[0])
        } 
        catch(error){
            console.log(error);
        }
      }

      useEffect(() => {
        fetchCitiesData()
      }, [])

    return(
        <div className="wrapperCity">
            <h1>Choose Your City!</h1>
            <div className='cities'>
            {cities.length > 0 && (
                    cities.map(city => (
                    <ActionAreaCard className='card' key={city._id} city={city.cityName} image={city.image} />
                    ))
            )}
            </div>
        </div>
    );
}