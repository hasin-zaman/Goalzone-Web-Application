import React from 'react'
import styled from 'styled-components'
import userProfile from '../../assets/userProfile.png'

const Image=styled.div`
width: 50px;
height: 50px;
border-radius: 50px;
background-size: contain;
background-repeat: no-repeat;
margin-left: 5px;
`;

export default function ProfileImage({width, height, url}) {
  return (
    <>
        <Image style={{width: width, height: height, backgroundImage: `url(${url && url!='' ? url : userProfile})`}}/>
    </>
  )
}
