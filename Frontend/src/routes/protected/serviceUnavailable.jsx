import React from 'react';
import styled from 'styled-components';
import errorImage from '../../assets/503-service-unavailable.png';

const Box = styled.div`
width: 900px;
height: 450px;

@media (max-width: 900px) {
    width: 100%;
    height: 100%;
}
`;

export default function ServiceUnavailable() {
  return (
    <div style={{ backdropFilter: "blur(40px)", minHeight: '100vh', display: 'flex', justifyContent: 'center', placeItems: 'center' }}>
      <Box>
        <img src={errorImage} width='100%' height='100%' />
      </Box>
    </div>
  );
}