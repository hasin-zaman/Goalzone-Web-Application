import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import MUIButton from '../components/muiButton';
import { Paper, Tooltip, Zoom} from '@mui/material';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import fbLogo from '../assets/facebookLogo.png'
import instaLogo from '../assets/instagramLogo.png'
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

const ContactBox=styled.div`
width: 80%; 
height: 80%;
display: flex; 
flex-direction: column; 
justify-content: center;
place-items: center;
border-radius: 3px;
border: 3px solid grey;
`;

const Contact=styled.span`
color: whitesmoke;
font-size: 18px;
font-weight: 600;
`;

const SocialIcon=styled.div`
width: 33px;
height: 33px;
background-size: contain;
background-repeat: no-repeat;
border-radius: 7px;
margin-right: 10px;
`;

const ProfileImage=styled.div`
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
margin-left: 15px;
`;

const Position=styled.span`
color: #BBBBBB;
font-size: 18px;
font-weight: 600;
margin: 0 10px 0 auto;
`;

const Player=styled.div`
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

export default function Team() {

  const [team, setTeam]=useState({})
  const [request, setRequest]=useState(false)
  const [button, setButton]=useState("Join Team")
  const navigate=useNavigate()

  const params=useParams()

  const sendRequest=async ()=>{
    try {
      const res=await axios.put(`http://localhost:3000/teams/${params.id}/send/${localStorage.getItem("userId")}`, {headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`}});
      console.log("Send: ", res.data)
      setButton("Request Sent")
    } catch (error) {
      console.log(error)
    }
  }

  const unsendRequest=async ()=>{
    try {
      const res=await axios.put(`http://localhost:3000/teams/${params.id}/unsend/${localStorage.getItem("userId")}`, {headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`}});
      console.log("Unsend: ", res.data)
      setButton("Join Team")
    } catch (error) {
      console.log(error)
    }
  }

  const getTeam=async () =>{
    try {
      const res=await axios.get(`http://localhost:3000/teams/${params.id}`, {headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`}});
      console.log(res.data);
      setTeam(res.data);

      // check if logged in user is part of players
      if(res.data.players && res.data.players.some((player)=>player._id===localStorage.getItem("_id"))){
        setButton("Leave Team")
      }

      // check if logged in user has already sent request
      if(res.data.requests && res.data.requests.some((request)=>request._id===localStorage.getItem("_id"))){
        setButton("Request Sent")
      }
  
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>getTeam, [])

  console.log(request)
  return (
    <Page>
        <Cover />
        <Content>
          <Profile />
          <Title>{team.teamName}</Title>
          <SubTitle>{team.slogan}</SubTitle>
          <SubTitle>{"Since "+team.establishedInYear}</SubTitle>
          {localStorage.getItem("userId") && request==false ? 

          (team.captain && localStorage.getItem("userId")==team.captain.userId ? 

          <MUIButton onClick={()=>window.location=`/teams/${params.id}/requests`} disabled={false} title="Requests" color="success" style={{width: "170px", margin: "0 0 0 auto", position: "relative", bottom: "52px"}}/> :

          (team.players && team.players.some((player)=>player._id===localStorage.getItem("_id")) ? 

          <MUIButton onClick={()=>window.location=`/teams/${params.id}/requests`} disabled={false} title="Leave Team" color="success" style={{width: "170px", margin: "0 0 0 auto", position: "relative", bottom: "52px"}}/> :

          <MUIButton onClick={button=="Join Team" ? ()=>sendRequest() : ()=>unsendRequest()} disabled={false} title={button} color="success" style={{width: "170px", margin: "0 0 0 auto", position: "relative", bottom: "52px"}}/>)) : 

          <Tooltip title="You would need to log in first." placement='top-start' arrow enterDelay={200} leaveDelay={200} TransitionComponent={Zoom} followCursor>

            <span style={{margin: "0 0 0 auto", position: "relative", bottom: "52px", backgroundColor: "rgba(0, 100, 0, 0.3)", borderRadius: "3px"}}>

              <MUIButton disabled={true} title="Join Team" style={{width: "140px", color: "#8C8C8C"}}/>

            </span>

          </Tooltip>
          }
          <Paper elevation={5} style={{backgroundColor: "rgba(132, 136, 132, 0.3)", width: 320, height: 300, margin: "30px 0 0 auto", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <ContactBox>
                <Heading style={{borderBottom: "2px solid whitesmoke", marginBottom: "15px"}}>Contact</Heading>
                <div style={{width: "70%"}}>
                <Contact><FaEnvelope style={{position: "relative", top: "3px"}}/>{" "+team.email}</Contact>
                <Contact><FaPhone style={{position: "relative", top: "3px"}}/>{" "+team.phone}</Contact>
                </div>
                <span style={{display: "flex", marginTop:"15px"}}>
                    {team.facebookHandle ? <Link to={team.facebookHandle}><SocialIcon style={{backgroundImage: `url(${fbLogo})`}}/></Link> : null}
                    {team.instaHandle ? <Link to={team.instaHandle}><SocialIcon style={{backgroundImage: `url(${instaLogo})`}}/></Link> : null}
                </span>
            </ContactBox>
          </Paper>
          <Paper elevation={5} style={{backgroundColor: "rgba(132, 136, 132, 0.3)", width: 400, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", bottom:"300px", paddingBottom: "15px"}}>
            <div style={{borderBottom: "3px solid grey", width: "90%", padding: "8px", display: "flex", alignItems: "center"}}>
                <Heading>Players</Heading>
            </div>
            <Player onClick={()=>navigate(`/users/${team.captain.userId}`)}>
                <ProfileImage style={{backgroundImage: `url(${team.captain && team.captain.profileImage ? team.captain.profileImage : userProfile})`}}/>
                <Name>{team.captain ? team.captain.firstName + " " + team.captain.lastName + " (C)" : null}</Name>
                <Position>{team.captain && team.captain.mostPreferredPosition ? team.captain.mostPreferredPosition : null}{team.captain && team.captain.secondPreferredPosition ? "/"+team.captain.secondPreferredPosition : null}</Position>
            </Player>
            {team.players && team.players.length>0 && team.players.map((player)=>{
                return(
                    <Player onClick={()=>navigate(`/users/${player.userId}`)} key={player._id} style={{borderTop: "1px solid grey"}}>
                        <ProfileImage style={{backgroundImage: `url(${player && player.profileImage ? player.profileImage : userProfile})`}}/>
                        <Name>{player ? player.firstName + " " + player.lastName : null}</Name>
                        <Position>{player && player.mostPreferredPosition ? player.mostPreferredPosition : null}{player && player.secondPreferredPosition ? "/"+ player.secondPreferredPosition : null}</Position>
                    </Player>
                )
            })}
          </Paper>
        </Content>
    </Page>
  )
}
