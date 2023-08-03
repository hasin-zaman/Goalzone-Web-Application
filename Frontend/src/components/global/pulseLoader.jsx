import React from 'react';
import styled, { keyframes } from 'styled-components';

export default function PulseLoader() {
  const pulseAnimation = keyframes`
    100% {
      opacity: 0;
      transform: scale(2);
    }
  `;

  const colorAnimation = keyframes`
    100% {
      filter: hue-rotate(360deg);
    }
  `;

  const Page = styled.div`
    height: 100vh;
    background-color: #121212;
    display: flex;
    justify-content: center;
    place-items: center;
    animation: ${colorAnimation} 8s linear infinite;
  `;

  const Circle = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    background: #02ef;
    border-radius: 50%;
  `;

  const Ripple = styled.span`
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    opacity: 0.8;
    animation: ${pulseAnimation} 4s ease-out infinite;
    animation-delay: calc(1s * var(--i));
  `;

  return (
    <Page>
      <Circle>
        <Ripple style={{ '--i': 0 }} />
        <Ripple style={{ '--i': 1 }} />
        <Ripple style={{ '--i': 2 }} />
        <Ripple style={{ '--i': 3 }} />
      </Circle>
    </Page>
  );
}
