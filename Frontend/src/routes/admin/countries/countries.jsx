import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import formatDate from '../../../utils/formatDate'
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
    navigate('/admin/countries/add');
  };

  const getCountry = async (country) => {
    navigate(`/admin/countries/${country.countryId}`);
  };

  const updateCountry = async (country) => {
    navigate(`/admin/countries/update/${country.countryId}`);
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
    <div style={{ display: 'flex', backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <Drawer />
      <div style={{ width: '85%', minHeight: '100vh' }}>
        <Header title="Countries" toolTip="Add country." onClick={() => addCountry()} />
        <div>
          <Page>
            <StyledTable>
              <tbody>
                <FirstRow>
                  <Heading style={{ borderTopLeftRadius: '20px' }}>Id</Heading>
                  <Heading>Country Name</Heading>
                  <Heading>Cities</Heading>
                  <Heading>Status</Heading>
                  <Heading>Created At</Heading>
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
                      <Data onClick={() => getCountry(country)}>{country.cities.length > 0 && country.cities.map((city) => <div key={city._id}>{city.cityName}</div>)}</Data>
                      <Data onClick={() => getCountry(country)}>{country.status}</Data>
                      <Data onClick={() => getCountry(country)}>{formatDate(country.createdAt)}</Data>
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
