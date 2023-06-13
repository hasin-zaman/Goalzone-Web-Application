import React from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import Logo from './logo';
import { FaSignOutAlt } from 'react-icons/fa';
import { Button } from '@mui/material';

const Box=styled.div`
width: 15%;
min-height: 100vh;
background-color: black;
align-items center;
`;

const List=styled.ul`
list-style: none;
padding: 0;
margin: 0 0 120px 0;
`;

const Title=styled.li`
text-align: center;
text-decoration: none;
border-bottom: 1px solid gray;
padding: 10px 0 10px 0;

&:hover {
    background-color: #121212;
    color: whitesmoke;
}
`;

export default function Drawer() {


    const logout=async ()=>{
        sessionStorage.clear();
        window.location.href = '/';  
    }

    const linkStyle = {
        fontSize: '18px',
        fontWeight: '600',
        color: 'rgba(132, 136, 132)',
        textDecoration: 'none',
        padding: '10px 0',
    };

    const logoutLinkStyle = {
        fontSize: '16px',
        fontWeight: '600',
        color: 'whitesmoke',
        padding: '10px'
    };

    const params=useParams()

  return (
    <Box>
        <Logo style={{width: "70px", height: "100px", margin: "50px auto 50px auto"}}/>
        <List>
            <NavLink to='/' style={linkStyle}><Title style={{borderTop: '1px solid gray'}}>Home</Title></NavLink>
            <NavLink to='/users' style={linkStyle}><Title>Users</Title></NavLink>
            <NavLink to='/teams' style={linkStyle}><Title>Teams</Title></NavLink>
            <NavLink to='/countries' style={linkStyle}><Title>Countries</Title></NavLink>
            <NavLink to={`/countries/${params.countryId}/cities`} style={linkStyle}><Title>Cities</Title></NavLink>
            <NavLink to={`/countries/${params.countryId}/cities/${params.cityId}/grounds`} style={linkStyle}><Title>Grounds</Title></NavLink>
        </List>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: '570px'}}>
            <Button color='success' onClick={logout} style={logoutLinkStyle}><FaSignOutAlt /> Logout</Button>
        </div>
    </Box>
  )
}