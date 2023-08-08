import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { HashLoader } from 'react-spinners';
import MUIPagination from '../../../components/global/muiPagination';
import NavBar from '../../../components/main/navbar';
import Footer from '../../../components/main/footer';
import ActionAreaCard from '../../../components/main/actionCard';
import teamLogo from '../../../assets/teamLogo.jpg'

const Main=styled.div`
display: flex;
margin: 150px auto 60px auto;
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

export default function Teams(){
    
    const [teams, setTeams] = useState([]);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const override={
        display: "block",
        margin: "0 auto",
        borderColor: "#49b8ff",
    };

    const getTeams = async () => {
        try {
            await Promise.all([
                axios.get("http://localhost:3000/teams", {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}, params: { page: currentPage, limit: 1 }}).then((res) => {setTeams(res.data.teams); setPages(res.data.totalPages); console.log(res)}),
                new Promise(resolve => setTimeout(resolve, 1000))
            ]);  

            setLoading(false);
        } catch (error) {
            console.log(error.data);
            setErrorMessage(error);
            setLoading(false);
        }
    }

    const changePage=async (e, page) => {
        if(page!=currentPage){
            setLoading(true);
            setCurrentPage(page);
        }
    }

    useEffect(() => {
        getTeams()
    }, [])

    useEffect(() => {
        getTeams()
    }, [currentPage])

    return(
        <div style={{backdropFilter: "blur(40px)", backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
            <div style={{minHeight: '100vh'}}>
            <NavBar />
            {loading ? <div style={{height: "74.6vh", display: "flex", alignItems: "center"}}><HashLoader color="#04e6e6" loading={loading} cssOverride={override} size={120} aria-label="Loading Spinner" data-testid="loader"/></div> : 
            <>
            <Main>
            {teams.length > 0 ? (
                    teams.map(team => (
                    <Link key={team.teamId} to={`/teams/${team.teamId}`} style={{textDecoration: 'none'}}>
                        <ActionAreaCard title={team.teamName} image={team.profileImage ? team.profileImage : teamLogo} />
                    </Link>
                    ))) 
                    :
                    <Message>{errorMessage.message}</Message>
            }
            </Main>
            </>
            }
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <MUIPagination count={pages} changePage={changePage} />
            </div>
            </div>
            <Footer />
        </div>
    )
}