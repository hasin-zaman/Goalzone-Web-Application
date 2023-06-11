import React from 'react';
import Footer from '../components/footer';
import NavBar from '../components/navbar';
import styled from 'styled-components';
import { Paper, Typography, TextField, Button } from '@mui/material';
import contact from '../assets/contact.jpg';

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px;
`;

const ContactForm = styled(Paper)`
  width: 90%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  height: 500px;
`;

const LeftHalf = styled.div`
  flex: 1;
  background: url(${contact}) center/cover;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightHalf = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 20px;
`;

const FormField = styled(TextField)`
  width: 100%;

  & .MuiInputLabel-root {
    color: black;
  }

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: black;
    }

    &:hover fieldset {
      border-color: black;
    }

    &.Mui-focused fieldset {
      border-color: green;
    }
  }

  & .MuiInputLabel-root.Mui-focused {
    color: green;
  }
`;



const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function ContactUs() {
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
            <div></div>
          </LeftHalf>
          <RightHalf>
            <FormField label="Name" variant="outlined" />
            <FormField label="Email" variant="outlined" />
            <FormField label="Message" multiline rows={8} variant="outlined" />
            <ButtonContainer>
              <Button variant="contained" color="success">Send</Button>
            </ButtonContainer>
          </RightHalf>
        </ContactForm>
      </Main>
      <Footer />
    </div>
  );
}
