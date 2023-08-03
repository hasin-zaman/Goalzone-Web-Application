import React from 'react';
import styled from 'styled-components';
import errorImage from '../../assets/500-internal-server-error.png';

const Box = styled.div`
width: 900px;
height: 450px;

@media (max-width: 900px) {
    width: 100%;
    height: 100%;
}
`;

export default function InternalServerError() {
  return (
    <div style={{ backdropFilter: "blur(40px)", minHeight: '100vh', display: 'flex', justifyContent: 'center', placeItems: 'center' }}>
        <Box>
            <img src={errorImage} alt='500 Internal Server Error' width='100%' height='100%' />
        </Box>
    </div>
  );
}