import React from 'react'
import '../style/navbar.css';
import Logo from './logo';
import { Link, useNavigate, NavLink } from "react-router-dom";
import { IoMdArrowDropdown } from 'react-icons/io'
import { AiFillHome } from 'react-icons/ai'
import { FaQuestionCircle, FaInfoCircle, FaCalendarCheck, FaSignInAlt, FaAddressCard, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheckDollar, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import NavAccount from './navAccount';

export default function NavBar() {

  const url=`url("${localStorage.getItem("profileImage")}")`;

  const navigate=useNavigate();

  const logout=async ()=>{
        localStorage.clear();
        navigate('/');
    }
    
  return (
    <nav className='navBar'>
        <div className='test' style={{backgroundImage: url}}></div>
        <Logo style={{width: "70px", height: "100px", margin: "15px 0 0 20px"}}/>
        <ul className='list first'>
            <NavLink to="/" className='navLink'><li className='navBox activeBox'><AiFillHome className='icon' /> Home</li></NavLink>
            <NavLink to="/booking" className='navLink'><li className='navBox'><FaCalendarCheck className='icon'/> Booking</li></NavLink>
            <NavLink to="/about" className='navLink navDropdown' tabIndex="1"><li className='navBox'><FaInfoCircle className='icon' /> About us
            <IoMdArrowDropdown className='icon' id='dropdown' /></li></NavLink>
            <ul className='dropdownMenu'>
                <Link to="/contact" className='dropdownLink'><li className='dropdownBox' style={{borderBottom:"1px solid grey", borderTop:"1px solid grey"}}><FontAwesomeIcon icon={faAddressCard} /> Contact us</li></Link>
                <Link to="/faqs" className='dropdownLink'><li className='dropdownBox' style={{paddingBottom:"15px", borderBottomLeftRadius:"7px", borderBottomRightRadius:"7px"}}><FaQuestionCircle className='icon'/> FAQs</li></Link>
            </ul>
        </ul>
        <ul className='list second'>
            <li className='searchBox'>
                <input type="text" id='search' placeholder='🔍︎ Search...' />
            </li>
            <li className='navBox'><Link to="/payment" id='payment'><FontAwesomeIcon icon={faMoneyCheckDollar} /></Link></li>
            <li className='navBox navAccount' tabIndex="1">
                <NavAccount />
            </li>
            <ul className='dropdownMenu2'>
                {localStorage.getItem("userId") ? <Link to="/users:id" className='dropdownLink2'><li className='dropdownBox2' style={{borderBottom:"1px solid grey", borderTop:"1px solid grey"}}><FaUserCircle className='icon'/> Profile</li></Link> : <Link to="/login" className='dropdownLink2'><li className='dropdownBox2' style={{borderBottom:"1px solid grey", borderTop:"1px solid grey"}}><FaSignInAlt className='icon'/> Login</li></Link>}

                {localStorage.getItem("userId") ? <li className='dropdownBox2' style={{paddingBottom:"15px", borderBottomLeftRadius:"7px", borderBottomRightRadius:"7px"}}><div onClick={logout} className='dropdownLink2'><FaSignOutAlt className='icon'/> Logout</div></li> : 
                    <Link onClick={logout} to="/signup" className='dropdownLink2'><li className='dropdownBox2' style={{paddingBottom:"15px", borderBottomLeftRadius:"7px", borderBottomRightRadius:"7px"}}><FaAddressCard className='icon' /> Sign up</li></Link>}   
            </ul>
        </ul>
    </nav>
  )
}
