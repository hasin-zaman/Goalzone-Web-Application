import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HashLoader } from 'react-spinners';
import NavBar from '../../../components/main/navbar';
import Footer from '../../../components/main/footer';
import ActionAreaCard from '../../../components/main/actionCard';
import { Link } from 'react-router-dom';

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

export default function Countries(){

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const override={
        display: "block",
        margin: "0 auto",
        borderColor: "#49b8ff",
      };

      const getCountries = async () => {
          try{
            await Promise.all([
                fetch("http://localhost:3000/countries", {credentials: 'include'}, {method: 'GET'}).then(async (res) => {const resJson = await res.json(); setCountries(resJson.countries)}),
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
        getCountries()
      }, [])

    return(
        <div style={{backdropFilter: "blur(40px)", backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
            <div style={{minHeight: '100vh'}}>
            <NavBar />
            {loading ? 
            <div style={{height: "80vh", display: "flex", alignItems: "center"}}>
                <HashLoader color="#04e6e6" loading={loading} cssOverride={override} size={120} aria-label="Loading Spinner" data-testid="loader"/>
            </div> : 
            <Main>
            {countries.length > 0 ? (
                    countries.map(country => (
                    <Link key={country.countryId} to={`/countries/${country.countryId}/cities`} style={{textDecoration: 'none'}}>
                        <ActionAreaCard title={country.countryName} image={country.image} />
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