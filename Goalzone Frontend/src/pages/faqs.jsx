import React, { useState } from 'react';
import Footer from '../components/footer';
import NavBar from '../components/navbar';
import styled from 'styled-components';
import { Paper, Typography, IconButton, Collapse } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;
  color: white;
  text-align: center;
  background-color: #333333;
  margin: 100px;
  border-radius: 15px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

const FaqContainer = styled(Paper)`
  width: 90%;
  margin-bottom: 20px;
  padding: 20px;
  transition: height 0.5s ease-in-out;
  overflow: hidden;
`;

const QuestionContainer = styled(Paper)`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
`;

const QuestionText = styled(Typography)`
  flex-grow: 1;
`;

const Answer = styled(Typography)`
  margin-top: 10px;
  color: whitesmoke;
`;

export default function Faqs() {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const faqs = [
    {
      question: 'How do I book a football ground?',
      answer: 'To book a football ground, navigate to the "Ground Booking" section of our website. Browse through the available grounds, select the one you prefer, and choose your desired date and time. Follow the instructions to complete the booking process.',
    },
    {
      question: 'Can I hire players for my team?',
      answer: 'Yes, you can hire players for your team. Our platform provides a player hiring system that allows you to browse through the profiles of talented players, filter them based on your requirements, and contact them directly to discuss opportunities.',
    },
    {
      question: 'How can I join a football match?',
      answer: 'To join a football match, you can either create your own team and invite players to join, or you can search for existing teams that are looking for additional players. Our platform facilitates the connection between players and teams to make it easier for everyone to find suitable matches.',
    },
    {
      question: 'Is there a membership fee?',
      answer: 'Yes, we have a membership fee for premium features and exclusive benefits. You can choose a membership plan that suits your needs and enjoy additional perks such as priority ground booking, access to advanced player search filters, and discounted rates.',
    },
    {
      question: 'What happens if it rains on the booked date?',
      answer: 'In case of rain or inclement weather on the booked date, the ground booking may be rescheduled based on availability. Our support team will assist you in coordinating an alternative date and time that works for both you and the ground management.',
    },
    {
      question: 'How do I create a team?',
      answer: 'To create a team, navigate to the "Teams" section of our website. Click on the "Create Team" button and fill in the required details such as team name, description, and preferred playing style. You can then invite players to join your team and start participating in matches.',
    },
    {
      question: 'Are there any age restrictions for joining a team?',
      answer: "The age restrictions for joining a team may vary depending on the league or competition rules. Some leagues have specific age categories, while others may have open age groups. It's recommended to check the league guidelines or contact the team manager for more information.",
    },
    {
      question: 'How can I contact customer support?',
      answer: 'If you need assistance or have any questions, you can contact our customer support team through the "Contact Us" page on our website. Fill in the contact form with your details and message, and our team will get back to you as soon as possible.',
    },
    {
      question: 'Can I change the date or time of a booked match?',
      answer: "Yes, it's possible to change the date or time of a booked match. However, this is subject to availability and the policies of the ground or facility. Contact the ground management or our support team to request a change, and we will do our best to accommodate your needs.",
    },
  ];

  return (
    <div style={{ backdropFilter: 'blur(40px)', backgroundColor: 'rgba(0, 0, 0, 0.6)', minHeight: '100vh' }}>
      <NavBar />
      <Main>
        <Title>Frequently Asked Questions</Title>
        {faqs.map((faq, index) => (
          <FaqContainer key={index} elevation={5} style={{ height: expandedIndex === index ? 'auto' : '80px', background: 'linear-gradient(to right, #006868, #007474, #008080, #008c8c)' }}>
            <QuestionContainer
              elevation={3}
              onClick={() => handleExpand(index)}
              style={{ cursor: 'pointer', backgroundColor: 'linear-gradient(to right, #f7f7f7, #f5f5f5, #f2f2f2, #efefef)'}}
            >
              <QuestionText variant="h5">{faq.question}</QuestionText>
              <IconButton
                style={{ transform: expandedIndex === index ? 'rotate(180deg)' : 'rotate(0)' }}
                aria-expanded={expandedIndex === index}
                aria-label="expand"
              >
                <ExpandMore />
              </IconButton>
            </QuestionContainer>
            <Collapse in={expandedIndex === index}>
              <Answer>{faq.answer}</Answer>
            </Collapse>
          </FaqContainer>
        ))}
      </Main>
      <Footer />
    </div>
  );
}
