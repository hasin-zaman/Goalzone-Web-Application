import React from 'react';
import styled from 'styled-components';
import Button from '../main/customButton';

const image="https://source.unsplash.com/1000x500/?team";

const Section=styled.section`
width:100%;
min-height: 500px;
background-size: cover;
background-repeat: no-repeat;
box-shadow: inset 0 0 0 1000px rgba(0,0,0,0.6);
`;

export default function MainSectionTeams() {
  return (
    <Section style={{backgroundImage: `url(${image})`}}>
        <div style={{height: "200px", width: "350px", position: 'relative', top: "100px", left: "700px", display: 'flex', justifyContent: "center", placeItems: "center", flexDirection: "column"}}>
            <h1 style={{marginBottom: "50px"}}>Haven't registered your team yet?</h1>
            <Button text="Register Now!" style={{backgroundColor: "green"}}/>
        </div>
    </Section>
  )
}
