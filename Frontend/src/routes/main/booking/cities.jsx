import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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

const Message = styled.div `
  font-size: 50px;
  font-wight: 700;
  color: whitesmoke;
  margin: 60px;
`;

export default function Cities(){

    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const params=useParams();

    const override={
        display: "block",
        margin: "0 auto",
        borderColor: "#49b8ff",
      };

      const getCities = async () => {
          try{
            await Promise.all([
                fetch(`http://localhost:3000/countries/${params.countryId}/cities`, {credentials: 'include'}, {method: 'GET'}).then(async (res) => {const resJson = await res.json(); setCities(resJson.cities)}),
                new Promise(resolve => setTimeout(resolve, 1000))
            ]);  

            setLoading(false);
          } 
          catch(error){
            console.log(error);
            setErrorMessage(error);
            setLoading(false);
          }
        }

    useEffect(() => {
        getCities()
      }, [])

    return(
        <div style={{backdropFilter: "blur(40px)", backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
            <div style={{minHeight: '100vh'}}>
            <NavBar />
            {loading ? 
            <div style={{height: '80vh', display: "flex", alignItems: "center"}}>
                <HashLoader color="#04e6e6" loading={loading} cssOverride={override} size={120} aria-label="Loading Spinner" data-testid="loader"/>
            </div> : 
            <Main>
            {cities.length > 0 ? (
                    cities.map(city => (
                    <Link key={city.cityId} to={`/countries/${params.countryId}/cities/${city.cityId}/grounds`} style={{textDecoration: 'none'}}>
                        <ActionAreaCard title={city.cityName} image={city.image} />
                    </Link>
                    ))) : 
                    <Message>{errorMessage.message}</Message>
            }
            </Main>
            }
            </div>
            <Footer />
        </div>
    )
}