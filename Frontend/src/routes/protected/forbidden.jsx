import React from 'react';
import styled from 'styled-components';
import errorImage from '../../assets/403-forbidden.png';

const Box = styled.div`
width: 900px;
height: 450px;

@media (max-width: 900px) {
    width: 100%;
    height: 100%;
}
`;

export default function Forbidden() {
  return (
    <div style={{ backdropFilter: "blur(40px)", minHeight: '100vh', display: 'flex', justifyContent: 'center', placeItems: 'center' }}>
      <Box>
        <img src={errorImage} alt='403 Forbidden' width='100%' height='100%' />
      </Box>
    </div>
  );
}