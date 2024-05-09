import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import formatDate from '../../../utils/formatDate';
import MUIPagination from '../../../components/global/muiPagination';
import MUITooltip from '../../../components/global/muiTooltip';
import AlertDialog from '../../../components/global/alertDialog';
import Drawer from '../../../components/admin/drawer';
import Header from '../../../components/admin/header';

const Page = styled.div`
  width: 85%;
  padding: 50px 0;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 10px;
`;

const StyledTable = styled.table`
  width: 100%;
  background-color: rgba(132, 136, 132, 0.2);
  border-collapse: collapse;
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

export default function Grounds() {
  const [grounds, setGrounds] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedGround, setSelectedGround] = useState(null);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const params=useParams();

  const getAllGrounds = async () => {
    try {
        const res=await axios.get(`http://localhost:3000/admin/countries/${params.countryId}/cities/${params.cityId}/grounds`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}, params: { page: currentPage, limit: 3 }})
        setGrounds(res.data.grounds);
        setPages(res.data.totalPages);
        console.log(res.data);
    } catch (error) {
        console.log(error.data)
    }
  }

  const getGround = (ground) => {
    navigate(`/admin/countries/${params.countryId}/cities/${params.cityId}/grounds/${ground.groundId}`)
  }

  const addGround = () => {
    navigate(`/admin/countries/${params.countryId}/cities/${params.cityId}/grounds/add`)
  }

  const updateGround = (ground) => {
    navigate(`/admin/countries/${params.countryId}/cities/${params.cityId}/grounds/update/${ground.groundId}`)
  }

  const deleteGround = async (ground) =>{
    try {
        const res=await axios.delete(`http://localhost:3000/admin/countries/${params.countryId}/cities/${params.cityId}/grounds/${ground.groundId}`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}})
        console.log(res)

        setGrounds(grounds.filter(oldGround=>oldGround.groundId!==ground.groundId))
        setDeleteDialogOpen(false);
    } catch (error) {
        console.log(error)
    }
  }

  const handleOpenDeleteDialog = (ground) => {
    setSelectedGround(ground);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const changePage=async (e, page) => {
    if(page!=currentPage){
        setCurrentPage(page);
    }
  }

  useEffect(() => {
    getAllGrounds()
  }, [])

  useEffect(() => {
    getAllGrounds()
  }, [currentPage])

  return (
    <div style={{ display: 'flex', backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <Drawer />
      <div style={{ width: '85%', minHeight: '100vh' }}>
        <Header title="Grounds" toolTip="Add ground." onClick={() => addGround()} />
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Page>
            <StyledTable>
              <tbody>
                <FirstRow>
                <Heading>Id</Heading>
                <Heading>Ground Name</Heading>
                <Heading>Since</Heading>
                <Heading>Type</Heading>
                <Heading>Address</Heading>
                <Heading>Ground in charge</Heading>
                <Heading>Status</Heading>
                <Heading>Created At</Heading>
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
                        <Data onClick={()=>getGround(ground)}>{ground.incharge.firstName + " " + ground.incharge.lastName}</Data>
                        <Data onClick={()=>getGround(ground)}>{ground.status}</Data>
                        <Data onClick={()=>getGround(ground)}>{formatDate(ground.createdAt)}</Data>
                        <Data><MUITooltip icon="edit" color="primary" title="Edit ground." onClick={()=>updateGround(ground)}/></Data>
                        <Data><MUITooltip icon="delete" color="error" title="Delete ground." onClick={() => handleOpenDeleteDialog(ground)}/></Data>
                    </Row>
                  </tbody>
                ))}
            </StyledTable>
            <MUIPagination count={pages} changePage={changePage} />
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
