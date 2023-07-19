import '../../style/footer.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'
import Logo from '../global/logo'

export default function Footer() {
  return (
    <footer>
        <div className='footerLogoContent'>
            <Logo style={{width: "100px", height: "140px"}} />
            <div className='socialMediaLinks'>
                <Link to="/facebook"><FaFacebook className='socialMediaIcon'/></Link>
                <Link to="/instagram"><FaInstagram className='socialMediaIcon'/></Link>
                <Link to="/twitter"><FaTwitter className='socialMediaIcon' /></Link>
                <Link to="/linkedin"><FaLinkedin className='socialMediaIcon'/></Link>
            </div>
        </div>
        <div className='footerContent'>
            <ul className='footerList firstList'>
              <li className="footerTitle">MY ACCOUNT</li>
              <li className='footerBox'><Link to="/users/:id" className='footerLink'>Profile</Link></li>
              <li className='footerBox'><Link to="/login" className='footerLink'>Login</Link></li>
              <li className='footerBox'><Link to="/payment" className='footerLink'>Checkout</Link></li>
              <li className='footerBox'><Link to="/teams" className='footerLink'>Register Team</Link></li>
              <li className='footerBox'><Link to="/grounds" className='footerLink'>Register Ground</Link></li>
            </ul>
            <ul className='footerList secondList'>
              <li className="footerTitle">SERVICE</li>
              <li className='footerBox'><Link to="/about" className='footerLink'>About us</Link></li>
              <li className='footerBox'><Link to="/contact" className='footerLink'>Contact us</Link></li>
              <li className='footerBox'><Link to="/faqs" className='footerLink'>FAQs</Link></li>
              <li className='footerBox'><Link to="/privacy" className='footerLink'>Privacy Policy</Link></li>
              <li className='footerBox'><Link to="/refund" className='footerLink'>Refund Policy</Link></li>
            </ul>
        </div>
    </footer>
  )
}
