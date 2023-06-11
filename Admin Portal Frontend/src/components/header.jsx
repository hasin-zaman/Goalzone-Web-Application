import React from 'react'
import styled from 'styled-components'

const CustomHeader=styled.header`
height: 45px;
background-color: rgba(55, 255, 20, 0.6);
`;

export default function Header({ title }) {
  return (
    <CustomHeader>
        <h2 style={{textAlign: "center", color: '#121212'}}>{title}</h2>
    </CustomHeader>
  )
}
