import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MUITooltip from '../components/muiTooltip';
import Drawer from '../components/drawer';
import Header from '../components/Header';
import AlertDialog from '../components/alertDialog';
import { useNavigate } from 'react-router-dom';

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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const navigate=useNavigate();

  const getAllCities = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/countries/${params.countryId}/cities`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
      setCities(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  const addCity = async () => {
    navigate('/cities/add');
  };

  const getCity = async (city) => {
    navigate(`/cities/${city.cityId}`);
  };

  const updateCity = async (city) => {
    navigate(`/cities/update/${city.cityId}`);
  };

  const deleteCity = async (city) => {
    try {
        const res=await axios.delete(`http://localhost:3001/cities/${city.cityId}`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
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
    <div style={{ display: 'flex' }}>
      <Drawer />
      <div style={{ width: '85%' }}>
        <Header title="Cities" />
        <div>
          <Page>
            <StyledTable>
              <tbody>
                <FirstRow>
                  <Heading style={{ borderTopLeftRadius: '20px' }}>City Id</Heading>
                  <Heading>City Name</Heading>
                  <Heading>Display Image</Heading>
                  <Heading>Grounds</Heading>
                  <Heading>Status</Heading>
                  <Heading></Heading>
                  <Heading></Heading>
                  <Heading></Heading>
                </FirstRow>
              </tbody>
              {cities.length > 0 &&
                cities.map((city) => (
                  <tbody key={city.cityId}>
                    <Row>
                      <Data onClick={() => getCity(city)}>{city.cityId}</Data>
                      <Data onClick={() => getCity(city)}>{city.cityName}</Data>
                      <Data onClick={() => getCity(city)}>{city.image}</Data>
                      <Data onClick={() => getCity(city)}>{city.grounds.map((ground) => <div key={ground._id}>{ground.groundName}</div>)}</Data>
                      <Data onClick={() => getCity(city)}>{city.status}</Data>
                      <Data><MUITooltip icon="add" color="success" title="Add user." onClick={() => addCity(city)}/></Data>
                      <Data><MUITooltip icon="edit" color="primary" title="Edit user." onClick={() => updateCity(city)}/></Data>
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
