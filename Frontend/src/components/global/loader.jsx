import React from 'react';
import styled, { keyframes } from 'styled-components';
import Logo from './logo';

export default function Loader() {
    const pulseAnimation = keyframes`
    100% {
      border: 50px solid rgba(169, 169, 169, 0);
    }
  `;

  const Page = styled.div`
    height: 100vh;
    background-color: #121212;
    display: flex;
    justify-content: center;
    place-items: center;
  `; 

  const Ripple = styled.div`
    height: 120px;
    width: 120px;
    border-radius: 50%;
    border: 8px solid rgba(169, 169, 169);
    animation: ${pulseAnimation} 2s ease-out infinite;
    animation-delay: calc(0.5s * var(--i));
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    `;

  
  const Circle = styled.div`
    position: absolte;
    top: 50%;
    left: 50%;
  `;

  return (
    <>
    <Page>
        <Circle>
            <Logo style={{width: "80px", height: "120px", position: 'relative', top: '5px'}} />
        </Circle>
    </Page>
    <Ripple style={{ '--i': 0 }} />
    <Ripple style={{ '--i': 1 }} />
    <Ripple style={{ '--i': 2 }} />
    <Ripple style={{ '--i': 3 }} />
    </>
  );
}
