import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import MUIButton from '../components/muiButton';
import { Paper} from '@mui/material';
import userProfile from '../assets/userProfile.png'

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

const ProfileImage=styled.div`
width: 50px;
height: 50px;
border-radius: 50px;
background-size: contain;
background-repeat: no-repeat;
`;

const Name=styled.span`
color: whitesmoke;
font-size: 20px;
font-weight: 600;
`;

const Detail=styled.span`
color: #BBBBBB;
font-size: 16px;
font-weight: 600;
`;

const Request=styled.div`
width: 80%;
display: flex;
align-items: center;
`;

const RequestsHeading=styled.span`
color: whitesmoke;
font-size: 25px;
font-weight: 700;
padding: 20px 0 10px 0;
margin: 0 auto;
`;

const Player=styled.span`
display: flex;
align-items: center;
padding: 10px;
margin-left: 15px;
&:hover{
    background-color: rgba(132, 136, 132, 0.5);
    cursor: pointer;
}
`;

export default function TeamRequests() {

  const [team, setTeam]=useState({})
  const navigate=useNavigate()

  const params=useParams()

  const approveRequest=async (request)=>{
    try {
      const res=await axios.put(`http://localhost:3000/teams/${params.id}/approve/${request.userId}/${sessionStorage.getItem("userId")}`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}});
      setTeam(res.data.updatedTeam)
      console.log(res.data)
      alert(res.data.message);
    } catch (error) {
      console.log(error)
    }
  }

  const declineRequest=async (request)=>{
    try {
      const res=await axios.put(`http://localhost:3000/teams/${params.id}/decline/${request.userId}/${localStorage.getItem("userId")}`, {headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`}});
      setTeam(res.data.updatedTeam)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getTeam=async () =>{
    try {
      const res=await axios.get(`http://localhost:3000/teams/${params.id}`, {headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`}});
      console.log(res.data);
      setTeam(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>getTeam, [])

  return (
    <Page>
        <Cover />
        <Content>
          <Profile />
          <Title>{team.teamName}</Title>
          <SubTitle>{team.slogan}</SubTitle>
          <SubTitle>{"Since "+team.establishedInYear}</SubTitle>
          <Paper elevation={5} style={{backgroundColor: "rgba(132, 136, 132, 0.3)", width: 900, minWidth: 600, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "25px", margin: "70px auto"}}>
            <div style={{borderBottom: "4px solid grey", width: "80%", padding: "8px", display: "flex", alignItems: "center"}}>
                <RequestsHeading>{team.requests && team.requests.length>0 ? "Requests" : "No Requests at the moment"}</RequestsHeading>
            </div>
            {team.requests && team.requests.length>0 && team.requests.map((request)=>{
                return(
                    <Request key={request._id} style={{borderBottom: "1px solid grey"}}>
                        <Player onClick={()=>navigate(`/users/${request.userId}`)}>
                        <ProfileImage style={{backgroundImage: `url(${request && request.profileImage ? request.profileImage : userProfile})`}}/>
                        <div style={{display: "flex", flexDirection: "column", margin: "0 0 0 20px"}}>
                            <Name>{request ? request.firstName + " " + request.lastName : null}</Name>
                            <Detail>{request && request.mostPreferredPosition ? request.mostPreferredPosition : null}{request && request.mostPreferredPosition && request.secondPreferredPosition ? "/"+ request.secondPreferredPosition : request && request.secondPreferredPosition ? request.secondPreferredPosition : null}</Detail>
                            <Detail>
                                {request && request.age ? request.age : null}
                            </Detail>
                        </div>
                        </Player>
                        <div style={{margin: "0 15px 0 auto"}}>
                            <MUIButton onClick={()=>approveRequest(request)} title="Approve" color="success"/>
                            <MUIButton onClick={()=>declineRequest(request)} title="Decline" color="error" style={{marginLeft: "15px"}}/>
                        </div>
                    </Request>
                )
            })}
          </Paper>
        </Content>
    </Page>
  )
}
