import React from 'react'
import Footer from '../components/footer'
import NavBar from '../components/navbar'
import styled from 'styled-components';

const Box=styled.div`
width: 100%;
min-height: 450px;
background-size: contain;
background-color: rgba(132, 136, 132, 0.15);
`;

export default function Faqs() {

  return (
    <div style={{backdropFilter: "blur(40px)", backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
        <NavBar />
        <Box>
            
        </Box>
        <Footer />
    </div>
    
  )
}
