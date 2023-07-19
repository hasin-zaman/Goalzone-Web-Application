import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../main/customButton';
import image from '../../assets/messi.jpg';

const Section=styled.section`
width:100%;
min-height: 600px;
`;

const Info=styled.div`
width: 350px;
height: 300px;
position: absolute;
top: 260px;
right: 350px;
display: flex;
flex-direction: column;
justify-content: center;
place-items: center;
`;

const Image=styled.div`
width: 350px;
height: 350px;
position: relative;
top: 135px;
left: 150px;
background-image: url(${image});
background-size: cover;
background-repeat: no-repeat;
border-radius: 200px;
`;

export default function MainSectionAbout() {
  return (
    <Section>
        <Image />
        <Info>
            <h1 style={{marginBottom: "30px"}}>Are you a football enthusiast too?</h1>
            <h1 style={{marginBottom: "10px"}}>Come join us!</h1>
            <h2>Book Grounds. Find Teams. Hire Players. And much more!</h2>
            <Link to="/signup"><Button text="Sign up!" style={{backgroundColor: "green"}}/></Link>
        </Info>
    </Section>
  )
}
