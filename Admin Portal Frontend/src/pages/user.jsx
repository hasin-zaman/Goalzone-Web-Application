import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import MUIButton from '../components/muiButton';
import { Paper, Tooltip, Zoom} from '@mui/material';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import teamLogo from '../assets/teamLogo.jpg'

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
width: 70%;
min-height: 500px;
margin: auto;
display: flex;
flex-direction: column;
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
height: 65%;
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

const TeamLogo=styled.div`
width: 50px;
height: 50px;
border-radius: 50px;
background-size: contain;
background-repeat: no-repeat;
margin-left: 5px;
`;

const Name=styled.span`
color: whitesmoke;
font-size: 20px;
font-weight: 600;
`;

const Date=styled.span`
color: #BBBBBB;
font-size: 16px;
font-weight: 500;
`;

const Team=styled.div`
width: 90%;
padding: 8px;
display: flex;
align-items: center;
&:hover{
    background-color: rgba(132, 136, 132, 0.5);
    cursor: pointer;
}
`;

const Heading=styled.span`
color: whitesmoke;
font-size: 24px;
font-weight: 700;
padding: 15px 0 5px 0;
margin: 0 auto;
`;

export default function User() {

  const [user, setUser]=useState({})
  const params=useParams()
  const navigate=useNavigate()

  const getUser=async () =>{
    try {
      const res=await axios.get(`http://localhost:3001/users/${params.id}`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}});
      console.log(res);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>getUser, [])
  
  return (
    <Page>
        <Cover />
        <Content>
          <Profile />
          <Title>{user.firstName + " " + user.lastName}</Title>
          <SubTitle>{user.age + " years"}</SubTitle>
          <SubTitle>{user.gender}</SubTitle>
          <Paper elevation={6} style={{backgroundColor: "rgba(132, 136, 132, 0.3)", width: 800, height: 400, margin: "30px auto 0 auto", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <InfoBox>
            <Heading style={{borderBottom: "3px solid whitesmoke"}}>Details</Heading>
              <InfoHeading>Preferred positions</InfoHeading>
              <Info>{user.mostPreferredPosition ? user.mostPreferredPosition : null}{user.mostPreferredPosition && user.secondPreferredPosition ? "/"+ user.secondPreferredPosition : user.secondPreferredPosition ? user.secondPreferredPosition : "No positions added yet."}</Info>
              <InfoHeading>Contact</InfoHeading>
              <Info>{user.phoneStatus=="Public" ? <span><FaPhone style={{position: "relative", top: "3px"}}/> {" "+user.phone}</span> : null}{user.phoneStatus=="Public" && user.emailStatus=="Public" ? <span>{", "}<FaEnvelope style={{position: "relative", top: "3px"}}/> {" "+user.email}</span> : user.emailStatus=="Public" ? <span><FaEnvelope style={{position: "relative", top: "3px"}}/> {" "+user.email}</span> : user.phoneStatus=="Public" && user.emailStatus=="Private" ? null : "Nothing to show."}</Info>
              <InfoHeading>Bio</InfoHeading>
              <Info>{user.bio ? user.bio : "Bio hasn't been added yet."}</Info>
            </InfoBox>
          </Paper>
          <Paper elevation={5} style={{backgroundColor: "rgba(132, 136, 132, 0.3)", width: 600, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "15px", margin: "40px auto 70px auto"}}>
          <div style={{borderBottom: "3px solid grey", width: "90%", padding: "8px", display: "flex", alignItems: "center"}}>
                <Heading>Teams joined</Heading>
            </div>
            {user.teams && user.teams.length>0 && user.teams.map((team)=>{
              return (
                <Team onClick={()=>navigate(`/teams/${team._id.teamId}`)} key={team._id} style={{borderTop: "1px solid grey"}}>
                  <TeamLogo style={{backgroundImage: `url(${team._id && team._id.profileImage ? team._id.profileImage : teamLogo})`}}/>
                  <div style={{display: "flex", flexDirection: "column", margin: "0 0 0 20px"}}>
                  <Name>{team._id ? team._id.teamName : null}</Name>
                  <Date>{team && team.joinDate ? new window.Date(team.joinDate).toLocaleString('default', {month: 'short'}) + ", " + new window.Date(team.joinDate).getFullYear() : null}{team && team.endDate ? " till " + new window.Date(team.endDate).toLocaleString('default', {month: 'short'}) + ", " + new window.Date(team.endDate).getFullYear() : " till present"}</Date>    
                  </div>
                </Team>
              )
            })}
          </Paper>
        </Content>
    </Page>
  )
}
