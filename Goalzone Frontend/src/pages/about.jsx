import React from 'react';
import Footer from '../components/footer';
import NavBar from '../components/navbar';
import styled from 'styled-components';
import { Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import animation from '../assets/animation.gif';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  margin-bottom: 40px;
`;

const ImageContainer = styled.div`
  width: 90%;
  margin-bottom: 60px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Animation = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 40px;
`;

const ContentContainer = styled(Paper)`
  padding: 20px;
  margin-bottom: 40px;
`;

export default function AboutUs() {
  return (
    <div style={{ backdropFilter: "blur(40px)", backgroundColor: "rgba(0, 0, 0, 0.6)", minHeight: '100vh' }}>
      <NavBar />
      <Main>
        <Title>Welcome to our Football Community</Title>
        <Subtitle>Connect, Play, and Hire Players</Subtitle>
        <ImageContainer>
          <Carousel animation="fade" height='700px' >
            <Image src={image1} alt="Image 1" />
            <Image src={image2} alt="Image 2" />
            <Image src={image3} alt="Image 3" />
          </Carousel>
        </ImageContainer>
        <Animation src={animation} alt="Football Animation" />
        <ContentContainer elevation={3} style={{ backgroundColor: "rgba(51, 51, 51)", color: "whitesmoke" }}>
          <p>
            At our Football Community, we strive to bring football enthusiasts together, providing a platform for players
            to connect, book grounds, and hire talented players for their teams. Whether you're a casual player looking for
            a friendly match or a team manager searching for skilled players, we've got you covered.
          </p>
          <p>
            Our website offers a seamless ground booking system that allows you to browse through various available football
            grounds in your area, check their availability, and make instant bookings. Say goodbye to the hassle of calling
            multiple venues or waiting for replies. With just a few clicks, you can secure a spot for your next match.
          </p>
          <p>
            Additionally, if you're in need of talented players to strengthen your team, our platform provides a player hiring
            system. Browse through the profiles of skilled individuals, filter them based on criteria like position, skill level,
            and availability, and contact them directly to discuss opportunities. Whether you're a professional team or a group
            of friends forming a team, you'll find the perfect additions to your squad.
          </p>
          <p>
            Join our Football Community today and experience the thrill of playing the beautiful game. Connect with like-minded
            individuals, book your favorite grounds hassle-free, and build a winning team with our player hiring system. Let's
            make football more accessible and enjoyable for everyone.
          </p>
        </ContentContainer>
      </Main>
      <Footer />
    </div>
  );
}
