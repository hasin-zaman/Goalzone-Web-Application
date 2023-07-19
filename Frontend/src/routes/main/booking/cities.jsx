import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { HashLoader } from 'react-spinners';
import NavBar from '../../../components/main/navbar';
import Footer from '../../../components/main/footer';
import ActionAreaCard from '../../../components/main/actionCard';

const Main=styled.div`
display: flex;
margin: 150px auto;
width: 90%;
flex-wrap: wrap;
justify-content: center;
align-items: center;
gap: 60px;
`;

export default function Cities(){

    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);

    const params=useParams();

    const override={
        display: "block",
        margin: "0 auto",
        borderColor: "#49b8ff",
      };

      const getCities = async () => {
          try{
              const res = await fetch(`http://localhost:3000/countries/${params.countryId}/cities`, {credentials: 'include'}, {method: 'GET'});
              const resJson = await res.json();
              setCities(resJson);
              console.log(resJson[0])
          } 
          catch(error){
              console.log(error);
          }
        }

    const loader=()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        },800)
    }
    useEffect(() => {
        getCities(),
        loader()
      }, [])

    return(
        <div style={{backdropFilter: "blur(40px)", backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
            <NavBar />
            {loading ? <div style={{height: "600px", display: "flex", alignItems: "center"}}><HashLoader color="#04e6e6" loading={loading} cssOverride={override} size={120} aria-label="Loading Spinner" data-testid="loader"/></div> : 
            <Main>
            {cities.length > 0 && (
                    cities.map(city => (
                    <ActionAreaCard key={city.cityId} link={`cities/${city.cityId}/grounds`} title={city.cityName} image={city.image} />
                    ))
            )}
            </Main>
            }
            <Footer />
        </div>
    )
}