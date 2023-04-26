import React from 'react'
import styled from 'styled-components'
import { FaUser } from 'react-icons/fa';

const AccountBox=styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: whitesmoke;
    font-size: 22px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    place-items: center;
    cursor: pointer;
`;

export default function NavAccount() {

    const url=`url("${localStorage.getItem("profileImage")}")`;  

    return (
        <div>
            {localStorage.getItem("profileImage") && localStorage.getItem("profileImage")!='undefined' ? <AccountBox style={{backgroundImage: url}}/> : <AccountBox><FaUser /></AccountBox>}
        </div>  
    );
}
