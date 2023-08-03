import React from 'react';
import styled from 'styled-components';
import errorImage from '../../assets/404-not-found.png';

const Box = styled.div`
width: 900px;
height: 450px;

@media (max-width: 900px) {
    width: 100%;
    height: 100%;
}
`;

export default function NotFound() {
  return (
    <div style={{ backdropFilter: "blur(40px)", minHeight: '100vh', display: 'flex', justifyContent: 'center', placeItems: 'center' }}>
      <Box>
        <img src={errorImage} alt='404 Not Found' width='100%' height='100%' />
      </Box>
    </div>
  );
}
