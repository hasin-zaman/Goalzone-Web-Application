import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import MUITooltip from '../../../components/global/muiTooltip';
import AlertDialog from '../../../components/global/alertDialog';
import Drawer from '../../../components/admin/drawer';
import Header from '../../../components/admin/Header';

const Page = styled.div`
  width: 100%;
  padding: 50px 0;
  display: flex;
  justify-content: center;
`;

const StyledTable = styled.table`
  width: 85%;
  background-color: rgba(132, 136, 132, 0.2);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-collapse: collapse;
  position: relative;
  bottom: 70px;
`;

const FirstRow = styled.tr`
  background-color: rgba(11, 171, 181);
`;

const Data = styled.td`
  color: rgba(194, 185, 189, 0.7);
  padding: 7px;
`;

const Row = styled.tr`
  &:hover {
    background-color: rgba(132, 136, 132, 0.5);
    cursor: pointer;
    ${Data} {
      color: whitesmoke;
    }
  }
`;

const Heading = styled.th`
  color: #121212;
  padding: 8px;
  border-right: 2px solid rgba(0,0,0,0.5);
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
    navigate(`/admin/teams/${team.teamId}`)
}

const addTeam = async () => {
  navigate(`/admin/teams/add`);
};

const updateTeam = (team) => {
  navigate(`/admin/teams/update/${team.teamId}`);
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
    <div style={{ display: 'flex', backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <Drawer />
      <div style={{ width: '85%', minHeight: '100vh' }}>
        <Header title="Teams" toolTip="Add team." onClick={() => addTeam()} />
        <div>
          <Page>
            <StyledTable>
              <tbody>
                <FirstRow>
                <Heading style={{borderTopLeftRadius: "20px"}}>Id</Heading>
                <Heading>Team Name</Heading>
                <Heading>Since</Heading>
                <Heading>Phone</Heading>
                <Heading>Email</Heading>
                <Heading>Captain</Heading>
                <Heading>Status</Heading>
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
