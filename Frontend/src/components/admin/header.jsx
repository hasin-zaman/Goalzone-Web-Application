import React from 'react'
import styled from 'styled-components'
import MUIFloatingButton from './muiFloatingButton';

const CustomHeader=styled.header`
height: 60px;
`;

export default function Header({ title, toolTip, onClick }) {
  return (
    <CustomHeader>
        <h1 style={{textAlign: "center", color: 'white', margin: '30px 0'}}>{title}</h1>
        <MUIFloatingButton toolTip={toolTip} onClick={onClick}/>
    </CustomHeader>
  )
}
