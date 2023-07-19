import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';
import { Paper } from '@mui/material';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const cover="https://source.unsplash.com/1000x200/?football";
const profile="https://source.unsplash.com/150x150/?logo";

const Page=styled.div`
width: 100%;
min-height: 650px;
background-color: #121212;
`;

const Cover=styled.div`
width: 100%;
height: 220px;
background-image: url(${cover});
background-size: cover;
`;

const Content=styled.div`
width: 80%;
min-height: 500px;
margin: auto;
display: flex;
flex-direction: column;
background-color: #333333;
`;

const Profile=styled.div`
position: absolute;
top: 140px;
left: 569px;
width: 200px;
height: 200px;
border-radius: 150px;
border: 5px solid #121212;
background-image: url(${profile});
background-size: cover;
`;

const Title=styled.span`
margin: 130px auto 0 auto;
color: whitesmoke;
font-size: 27px;
font-weight: 700;
`;

const SubTitle=styled.span`
margin: 0 auto;
color: #8C8C8C;
font-size: 18px;
font-weight: 500;
`;

const InfoBox=styled.div`
width: 85%; 
height: 70%;
display: flex; 
flex-direction: column; 
border-radius: 3px;
border: 3px solid grey;
padding: 30px 20px;
`;

const InfoHeading=styled.span`
color: whitesmoke;
font-size: 15px;
font-weight: 700;
text-decoration: underline;
padding: 0 0 1px 4px;
margin: 5px 0 3px 0;
`;

const Info=styled.span`
color: #BBBBBB;
font-size: 17px;
font-weight: 600;
padding: 2px 0 4px 4px;
`;

const Heading=styled.span`
color: whitesmoke;
font-size: 24px;
font-weight: 700;
padding: 15px 0 5px 0;
margin: 0 auto;
`;

export default function Ground() {

  const [ground, setGround]=useState({})
  const navigate=useNavigate()

  const params=useParams()

  const getGround=async () =>{
    try {
      const res=await axios.get(`http://localhost:3000/countries/${params.countryId}/cities/${params.cityId}/grounds/${params.groundId}`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}});
      console.log(res.data);
      setGround(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>getGround, [])

  return (
    <Page>
        <Cover />
        <Content>
          <Profile />
          <Title>{ground.groundName}</Title>
          <SubTitle>{ground.establishedInYear}</SubTitle>
          <Paper elevation={6} style={{backgroundColor: "rgba(132, 136, 132, 0.3)", width: '80%', height: 400, margin: "30px auto 0 auto", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <InfoBox>
            <Heading style={{borderBottom: "3px solid whitesmoke"}}>Details</Heading>
              <InfoHeading>Ground Type</InfoHeading>
              <Info>{ground.type}</Info>
              <InfoHeading>Address</InfoHeading>
              <Info>{ground.address}</Info>
              <InfoHeading>Contact</InfoHeading>
              <Info>{ground.phoneStatus=="Public" ? <span><FaPhone style={{position: "relative", top: "3px"}}/> {" "+ground.phone}</span> : null}{ground.phoneStatus=="Public" && ground.emailStatus=="Public" ? <span>{", "}<FaEnvelope style={{position: "relative", top: "3px"}}/> {" "+ground.email}</span> : ground.emailStatus=="Public" ? <span><FaEnvelope style={{position: "relative", top: "3px"}}/> {" "+ground.email}</span> : "Nothing to show."}</Info>
              <InfoHeading>Additional Information</InfoHeading>
              <Info>{ground.additionalInfo ? ground.additionalInfo : "No additional information to show."}</Info>
            </InfoBox>
          </Paper>
          <Paper elevation={5} style={{backgroundColor: "rgba(132, 136, 132, 0.3)", width: '70%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "15px", margin: "40px auto 70px auto"}}>
          <div style={{borderBottom: "3px solid grey", width: "90%", padding: "8px", display: "flex", alignItems: "center"}}>
                <Heading>Booking</Heading>
            </div>
          </Paper>
        </Content>
    </Page>
  )
}
