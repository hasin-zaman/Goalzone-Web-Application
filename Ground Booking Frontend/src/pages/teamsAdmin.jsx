import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MUITooltip from '../components/muiTooltip';

const Page=styled.div`
width: 100%;
min-height: 650px;
background-color: #121212;
padding: 100px 0;
`;

const StyledTable=styled.table`
width: 80%;
background-color: rgba(132, 136, 132, 0.1);
margin: auto;
border-bottom-left-radius: 15px;
border-bottom-right-radius: 15px;
`;

const FirstRow=styled.tr`
background-color: rgba(55, 255, 20, 0.5);
`;

const Data=styled.td`
color: rgba(132, 136, 132);
padding: 7px
`;

const Row=styled.tr`
&:hover{
    background-color: rgba(132, 136, 132, 0.2);
    cursor: pointer;
    ${Data}{
        color: whitesmoke;
    }
}
`;

const Heading=styled.th`
color: #121212;
padding: 8px;
`;

const Button=styled.button`
background: none;
border: none;
color: #A52A2A;
font-size: 15px;
border-radius: 40px;
padding: 5px;
position: relative;
top: 3px;
left: 10px;
cursor: pointer;
transition: 0.5s;
&:hover{
    transform: scale(1.3);
}
`;


export default function TeamsAdmin() {

    const [teams, setTeams] = useState([]);

    const navigate=useNavigate();

    const getTeamsAdmin = async () => {
        try {
            const res=await axios.get("http://localhost:3000/teams/admin", {headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`}})
            setTeams(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error.data)
        }
    }

    const getTeamAdmin = (team) => {
        navigate(`/teams/${team.teamId}/admin`)
    }

    const updateTeam = (team) => {
        navigate(`/teams/${team.teamId}/${localStorage.getItem("userId")}`)
    }

    const deleteTeam = async (team) =>{
        try {
            const res=await axios.delete(`http://localhost:3000/teams/${team.teamId}`)
            console.log(res)
            setTeams(
                teams.filter(oldTeam=>oldTeam.teamId!=team.teamId)
            )
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTeamsAdmin()
      }, [])

  return (
    <Page>
        <StyledTable>
        <tbody>
        <FirstRow>
            <Heading style={{borderTopLeftRadius: "20px"}}>Team Id</Heading>
            <Heading>Team Name</Heading>
            <Heading>Established In</Heading>
            <Heading>Phone</Heading>
            <Heading>Email</Heading>
            <Heading>Captain</Heading>
            <Heading>Status</Heading>
            <Heading></Heading>
            <Heading></Heading>
        </FirstRow>
        </tbody>
        {
            teams.length > 0 && 
            teams.map((team) => {
                return(
                    <tbody key={team.teamId}>
                    <Row>
                        <Data onClick={()=>getTeamAdmin(team)}>{team.teamId}</Data>
                        <Data onClick={()=>getTeamAdmin(team)}>{team.teamName}</Data>
                        <Data onClick={()=>getTeamAdmin(team)}>{team.establishedInYear}</Data>
                        <Data onClick={()=>getTeamAdmin(team)}>{team.phone}</Data>
                        <Data onClick={()=>getTeamAdmin(team)}>{team.email}</Data>
                        <Data onClick={()=>getTeamAdmin(team)}>{team.captain.firstName + " " + team.captain.lastName}</Data>
                        <Data onClick={()=>getTeamAdmin(team)}>{team.status}</Data>
                        <Data><MUITooltip icon="edit" color="primary" title="Edit team." onClick={()=>updateTeam(team)}/></Data>
                        <Data><MUITooltip icon="delete" color="error" title="Delete team." onClick={()=>deleteTeam(team)}/></Data>
                    </Row>
                    </tbody>
                );
            })
        }
        </StyledTable>
    </Page>
  )
}
