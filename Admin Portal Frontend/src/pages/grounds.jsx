import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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

export default function Grounds() {
  const [grounds, setGrounds] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedGround, setSelectedGround] = useState(null);

  const navigate = useNavigate();
  const params=useParams();

  const getAllGrounds = async () => {
    try {
        const res=await axios.get(`http://localhost:3001/cities/${params.cityId}/grounds`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}})
        setGrounds(res.data);
        console.log(res.data);
    } catch (error) {
        console.log(error.data)
    }
}

const getGround = (ground) => {
    navigate(`/cities/${params.cityId}/grounds/${ground.groundId}`)
}

const addGround = () => {
  navigate(`/cities/${params.cityId}/grounds/add`)
}

const updateGround = (ground) => {
  navigate(`/cities/${params.cityId}/grounds/update/${ground.groundId}`)
}

const deleteGround = async (ground) =>{
    try {
        const res=await axios.delete(`http://localhost:3001/cities/${params.cityId}/grounds/${ground.groundId}`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}})
        console.log(res)

        setGrounds(grounds.filter(oldGround=>oldGround.groundId!==ground.groundId))
        setDeleteDialogOpen(false);
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    getAllGrounds()
  }, [])

  const handleOpenDeleteDialog = (ground) => {
    setSelectedGround(ground);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Drawer />
      <div style={{ width: '85%' }}>
        <Header title="Grounds" />
        <div>
          <Page>
            <StyledTable>
              <tbody>
                <FirstRow>
                <Heading style={{borderTopLeftRadius: "20px"}}>Ground Id</Heading>
                <Heading>Ground Name</Heading>
                <Heading>Established In</Heading>
                <Heading>Type</Heading>
                <Heading>Address</Heading>
                <Heading>Ground in charge</Heading>
                <Heading>Status</Heading>
                <Heading></Heading>
                <Heading></Heading>
                <Heading></Heading>
                </FirstRow>
              </tbody>
              {grounds.length > 0 &&
                grounds.map((ground) => (
                  <tbody key={ground.groundId}>
                    <Row>
                        <Data onClick={()=>getGround(ground)}>{ground.groundId}</Data>
                        <Data onClick={()=>getGround(ground)}>{ground.groundName}</Data>
                        <Data onClick={()=>getGround(ground)}>{ground.establishedInYear}</Data>
                        <Data onClick={()=>getGround(ground)}>{ground.type}</Data>
                        <Data onClick={()=>getGround(ground)}>{ground.address}</Data>
                        <Data onClick={()=>getGround(ground)}></Data>
                        <Data onClick={()=>getGround(ground)}>{ground.status}</Data>
                        <Data><MUITooltip icon="add" color="success" title="Add ground." onClick={() => addGround()}/></Data>
                        <Data><MUITooltip icon="edit" color="primary" title="Edit ground." onClick={()=>updateGround(ground)}/></Data>
                        <Data><MUITooltip icon="delete" color="error" title="Delete ground." onClick={() => handleOpenDeleteDialog(ground)}/></Data>
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
        onClick={() => deleteGround(selectedGround)}
        color="error"
        title="Delete Ground"
        text="Are you sure you want to delete this ground?"
        button1="Cancel"
        button2="Delete"
      />
    </div>
  );
}
