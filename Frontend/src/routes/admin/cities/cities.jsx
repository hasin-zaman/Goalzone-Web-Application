import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import formatDate from '../../../utils/formatDate';
import Drawer from '../../../components/admin/drawer';
import Header from '../../../components/admin/Header';
import MUITooltip from '../../../components/global/muiTooltip';
import AlertDialog from '../../../components/global/alertDialog';

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

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const navigate=useNavigate();
  const params=useParams();

  const getAllCities = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/admin/countries/${params.countryId}/cities`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
      setCities(res.data.cities);
      console.log(res.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  const addCity = async () => {
    navigate(`/admin/countries/${params.countryId}/cities/add`);
  };

  const getCity = async (city) => {
    navigate(`/admin/countries/${params.countryId}/cities/${city.cityId}`);
  };

  const updateCity = async (city) => {
    navigate(`/admin/countries/${params.countryId}/cities/update/${city.cityId}`);
  };

  const deleteCity = async (city) => {
    try {
        const res=await axios.delete(`http://localhost:3000/admin/countries/${params.countryId}/cities/${city.cityId}`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
        console.log(res)
        
        setCities(cities.filter((oldCity) => oldCity.cityId !== city.cityId));
        setDeleteDialogOpen(false);
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {
    getAllCities();
  }, []);

  const handleOpenDeleteDialog = (city) => {
    setSelectedCity(city);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <div style={{ display: 'flex', backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <Drawer />
      <div style={{ width: '85%', minHeight: '100vh' }}>
        <Header title="Cities" toolTip="Add city." onClick={() => addCity()}/>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Page>
            <StyledTable>
              <tbody>
                <FirstRow>
                  <Heading style={{ borderTopLeftRadius: '20px' }}>Id</Heading>
                  <Heading>City Name</Heading>
                  <Heading>Grounds</Heading>
                  <Heading>Status</Heading>
                  <Heading>Created At</Heading>
                  <Heading></Heading>
                  <Heading></Heading>
                </FirstRow>
              </tbody>
              {cities.length > 0 &&
                cities.map((city) => (
                  <tbody key={city._id}>
                    <Row>
                      <Data onClick={() => getCity(city)}>{city.cityId}</Data>
                      <Data onClick={() => getCity(city)}>{city.cityName}</Data>
                      <Data onClick={() => getCity(city)}>{city.grounds.length > 0 && city.grounds.map((ground) => <div key={ground._id}>{ground.groundName}</div>)}</Data>
                      <Data onClick={() => getCity(city)}>{city.status}</Data>
                      <Data onClick={() => getCity(city)}>{formatDate(city.createdAt)}</Data>
                      <Data><MUITooltip icon="edit" color="primary" title="Edit city." onClick={() => updateCity(city)}/></Data>
                      <Data><MUITooltip icon="delete" color="error" title="Delete city." onClick={() => handleOpenDeleteDialog(city)}/></Data>
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
        onClick={() => deleteCity(selectedCity)}
        color="error"
        title="Delete City"
        text="Are you sure you want to delete this city?"
        button1="Cancel"
        button2="Delete"
      />
    </div>
  );
}
