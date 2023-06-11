import React from 'react';
import styled from 'styled-components';
import Button from './customButton';
import { Link } from 'react-router-dom';

const image="https://source.unsplash.com/1000x600/?grounds";

const Section=styled.section`
width:100%;
min-height: 500px;
background-size: cover;
background-repeat: no-repeat;
box-shadow: inset 0 0 0 1000px rgba(0,0,0,0.8);
`;

export default function MainSectionGrounds() {

  return (
    <Section style={{backgroundImage: `url(${image})`}}>
        <div style={{height: "200px", width: "400px", position: 'relative', top: "100px", left: "700px", display: 'flex', justifyContent: "center", placeItems: "center", flexDirection: "column"}}>
            <h1 style={{marginBottom: "30px"}}>Do you own a football ground or court?</h1>
            <h3 style={{marginBottom: "50px"}}>Let us handle your bookings from now on!</h3>
            <Link to="register/cities"><Button text="Get Started!" style={{backgroundColor: "green"}}/></Link>
        </div>
    </Section>
  )
}
