import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo2.png'
import title from '../assets/title1.png'

const LogoBox=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-items: center;
`;

const LogoImage=styled.div`
    width: 100%;
    height: 70%;
    border-radius: 50%;
    background-image: url(${logo});
    background-size: 100% 100%;
    background-repeat: no-repeat;
`;

const LogoTitle=styled.div`
    width: 80%;
    height: 30%;
    background-image: url(${title});
    background-size: contain;
    background-repeat: no-repeat;
`;

export default function Logo({ style }) {
  return (
    <LogoBox style={style}>
        <LogoImage />
        <LogoTitle />
    </LogoBox>
  )
}
