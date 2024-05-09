import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Paper, Typography, Button } from '@mui/material';
import Footer from '../../components/main/footer';
import NavBar from '../../components/main/navbar';
import contact from '../../assets/contact.jpg';
import axios from 'axios';
import MUITextField from '../../components/global/muiTextField';
import MUIButton from '../../components/global/muiButton';

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px;
  margin: 30px 0 170px 0;
`;

const ContactForm = styled(Paper)`
  width: 95%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  height: 520px;
`;

const LeftHalf = styled.div`
  flex: 1;
  background: url(${contact}) center/cover;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightHalf = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 20px;
  background-color: eef2e6;
`;

export default function ContactUs() {

  const [isLoading, setIsLoading]=useState(false);
  const [message, setMessage]=useState('');
  const [color, setColor]=useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const getUser=async () =>{
    try {
      const res=await axios.get(`http://localhost:3000/users/${sessionStorage.getItem('userId')}`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}});
      
      const user = res.data;

      setFormData({
        name: user.firstName + " " + user.lastName,
        email: user.email,
        message: ''
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    if (sessionStorage.getItem('userId')) {
      getUser();
    }
  }, []);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response=await axios.post("http://localhost:3000/contact", formData);

      setMessage(response.data.message);
      setColor('green');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setMessage(error.response.data.message);
      setColor('red');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backdropFilter: 'blur(40px)', backgroundColor: 'rgba(0, 0, 0, 0.6)', minHeight: '100vh' }}>
      <NavBar />
      <Main>
        <ContactForm elevation={3}>
          <LeftHalf>
            <div>
              <Typography style={{fontSize: '50px', fontWeight: '700', color: 'whitesmoke', marginTop: '100px'}}>Contact Us</Typography>
              <Typography style={{fontSize: '25px', fontWeight: '700', color: 'whitesmoke', marginBottom: '20px'}}>Get in touch with our team!</Typography>
              <Typography style={{fontSize: '18px', fontWeight: '500', color: 'whitesmoke'}}>We'd love to hear from you. Fill out the form below and we'll get back to you shortly.</Typography>
            </div>
          </LeftHalf>
          <RightHalf onSubmit={handleSubmit}>
            <MUITextField label="Name" variant="outlined" disabled={sessionStorage.getItem('userId') ? true : false} name='name' value={formData.name} onChange={handleChange} />
            <MUITextField label="Email" variant="outlined" disabled={sessionStorage.getItem('userId') ? true : false} name='email'value={formData.email} onChange={handleChange} />
            <MUITextField label="Message" multiline rows={8} variant="outlined" name='message' value={formData.message} onChange={handleChange} />
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <MUIButton icon='send' type='submit' disabled={isLoading} title={isLoading ? "Sending..." : "Send"} />
            </div>
            <Typography color={color} style={{fontSize: '17px', fontWeight: '500', position: 'relative', bottom: '20px'}}>{message}</Typography>
          </RightHalf>
        </ContactForm>
      </Main>
      <Footer />
    </div>
  );
}