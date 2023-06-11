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

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const navigate=useNavigate();

  const getAllCountries = async () => {
    try {
      const res = await axios.get('http://localhost:3001/countries', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
      setCountries(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  const addCountry = async () => {
    navigate('/countries/add');
  };

  const getCountry = async (country) => {
    navigate(`/countries/${country.countryId}`);
  };

  const updateCountry = async (country) => {
    navigate(`/countries/update/${country.countryId}`);
  };

  const deleteCountry = async (country) => {
    try {
        const res=await axios.delete(`http://localhost:3001/countries/${country.countryId}`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
        console.log(res)
        
        setCountries(countries.filter((oldCountry) => oldCountry.countryId !== country.countryId));
        setDeleteDialogOpen(false);
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  const handleOpenDeleteDialog = (country) => {
    setSelectedCountry(country);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Drawer />
      <div style={{ width: '85%' }}>
        <Header title="Countries" />
        <div>
          <Page>
            <StyledTable>
              <tbody>
                <FirstRow>
                  <Heading style={{ borderTopLeftRadius: '20px' }}>Country Id</Heading>
                  <Heading>Country Name</Heading>
                  <Heading>Display Image</Heading>
                  <Heading>Cities</Heading>
                  <Heading>Status</Heading>
                  <Heading></Heading>
                  <Heading></Heading>
                  <Heading></Heading>
                </FirstRow>
              </tbody>
              {countries.length > 0 &&
                countries.map((country) => (
                  <tbody key={country.countryId}>
                    <Row>
                      <Data onClick={() => getCountry(country)}>{country.countryId}</Data>
                      <Data onClick={() => getCountry(country)}>{country.countryName}</Data>
                      <Data onClick={() => getCountry(country)}>{country.image}</Data>
                      <Data onClick={() => getCountry(country)}></Data>
                      {/* <Data onClick={() => getCountry(country)}>{country.cities.map((city) => <div key={city._id}>{city.cityName}</div>)}</Data> */}
                      <Data onClick={() => getCountry(country)}>{country.status}</Data>
                      <Data><MUITooltip icon="add" color="success" title="Add country." onClick={() => addCountry(country)}/></Data>
                      <Data><MUITooltip icon="edit" color="primary" title="Edit country." onClick={() => updateCountry(country)}/></Data>
                      <Data><MUITooltip icon="delete" color="error" title="Delete country." onClick={() => handleOpenDeleteDialog(country)}/></Data>
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
        onClick={() => deleteCountry(selectedCountry)}
        color="error"
        title="Delete Country"
        text="Are you sure you want to delete this country?"
        button1="Cancel"
        button2="Delete"
      />
    </div>
  );
}
