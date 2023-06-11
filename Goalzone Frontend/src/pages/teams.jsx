import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import ActionAreaCard from '../components/actionCard';
import styled from 'styled-components';
import teamLogo from '../assets/teamLogo.jpg'
import { HashLoader } from 'react-spinners';

const Main=styled.div`
display: flex;
margin: 150px auto;
width: 90%;
flex-wrap: wrap;
justify-content: center;
align-items: center;
gap: 60px;
`;

export default function Teams(){

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);

    const override={
        display: "block",
        margin: "0 auto",
        borderColor: "#49b8ff",
      };

    const getTeams = async () => {
        try {
            const res=await axios.get("http://localhost:3000/teams", {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}})
            setTeams(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error.data)
        }
    }

    const loader=()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        },800)
    }
    useEffect(() => {
        getTeams(),
        loader()
      }, [])

    return(
        <div style={{backdropFilter: "blur(40px)", backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
            <NavBar />
            {loading ? <div style={{height: "600px", display: "flex", alignItems: "center"}}><HashLoader color="#04e6e6" loading={loading} cssOverride={override} size={120} aria-label="Loading Spinner" data-testid="loader"/></div> : 
            <Main>
            {teams.length > 0 && (
                    teams.map(team => (
                    <ActionAreaCard key={team.teamId} link={`/teams/${team.teamId}`} title={team.teamName} image={team.profileImage ? team.profileImage : teamLogo} />
                    ))
            )}
            </Main>
            }
            <Footer />
        </div>
    )
}