import React from 'react'
import styled from 'styled-components'

const Button=styled.button`
height: 40px;
width: 200px;
padding: 7px;
color: white;
border-radius: 15px;
border: none;
font-size: 16px;
font-weight: 600;
cursor: pointer;
`;

export default function CustomButton(props) {
  return (
    <Button style={props.style}>{props.text}</Button>
  )
}
