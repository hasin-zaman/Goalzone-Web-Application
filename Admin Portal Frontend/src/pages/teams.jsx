import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MUITooltip from '../components/muiTooltip';
import Drawer from '../components/drawer';
import Header from '../components/Header';
import AlertDialog from '../components/alertDialog';

const Page = styled.div`
  width: 100%;
  height: 100%;
  background-color: #121212;
  padding: 50px 0;
`;

const StyledTable = styled.table`
  width: 80%;
  background-color: rgba(132, 136, 132, 0.1);
  margin: auto;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const FirstRow = styled.tr`
  background-color: rgba(55, 255, 20, 0.4);
`;

const Data = styled.td`
  color: rgba(132, 136, 132);
  padding: 7px;
`;

const Row = styled.tr`
  &:hover {
    background-color: rgba(132, 136, 132, 0.2);
    cursor: pointer;
    ${Data} {
      color: whitesmoke;
    }
  }
`;

const Heading = styled.th`
  color: #121212;
  padding: 8px;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #a52a2a;
  font-size: 15px;
  border-radius: 40px;
  padding: 5px;
  position: relative;
  top: 3px;
  left: 10px;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    transform: scale(1.3);
  }
`;

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const navigate = useNavigate();

  const getAllTeams = async () => {
    try {
        const res=await axios.get("http://localhost:3001/teams", {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}})
        setTeams(res.data);
        console.log(res.data);
    } catch (error) {
        console.log(error.data)
    }
}

const getTeam = (team) => {
    navigate(`/teams/${team.teamId}`)
}

const addTeam = async () => {
  navigate(`/teams/add`);
};

const updateTeam = (team) => {
  navigate(`/teams/update/${team.teamId}`);
}

const deleteTeam = async (team) =>{
    try {
        const res=await axios.delete(`http://localhost:3001/teams/${team.teamId}`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}})
        console.log(res)

        setTeams(teams.filter(oldTeam=>oldTeam.teamId!==team.teamId))
        setDeleteDialogOpen(false);
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    getAllTeams()
  }, [])

  const handleOpenDeleteDialog = (team) => {
    setSelectedTeam(team);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Drawer />
      <div style={{ width: '85%' }}>
        <Header title="Teams" />
        <div>
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
                <Heading></Heading>
                </FirstRow>
              </tbody>
              {teams.length > 0 &&
                teams.map((team) => (
                  <tbody key={team.teamId}>
                    <Row>
                        <Data onClick={()=>getTeam(team)}>{team.teamId}</Data>
                        <Data onClick={()=>getTeam(team)}>{team.teamName}</Data>
                        <Data onClick={()=>getTeam(team)}>{team.establishedInYear}</Data>
                        <Data onClick={()=>getTeam(team)}>{team.phone}</Data>
                        <Data onClick={()=>getTeam(team)}>{team.email}</Data>
                        <Data onClick={()=>getTeam(team)}>{team.captain.firstName + " " + team.captain.lastName}</Data>
                        <Data onClick={()=>getTeam(team)}>{team.status}</Data>
                        <Data><MUITooltip icon="add" color="success" title="Add team." onClick={() => addTeam()}/></Data>
                        <Data><MUITooltip icon="edit" color="primary" title="Edit team." onClick={()=>updateTeam(team)}/></Data>
                        <Data><MUITooltip icon="delete" color="error" title="Delete team." onClick={() => handleOpenDeleteDialog(team)}/></Data>
                    </Row>
                  </tbody>
                ))}
            </StyledTable>
          </Page>
        </div>
      </div>
      <AlertDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onClick={() => deleteTeam(selectedTeam)}
        color="error"
        title="Delete Team"
        text="Are you sure you want to delete this team?"
        button1="Cancel"
        button2="Delete"
      />
    </div>
  );
}
