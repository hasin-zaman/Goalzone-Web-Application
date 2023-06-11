import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import AboutUs from './pages/about';
import ContactUs from './pages/contact';
import Faqs from './pages/faqs';
import User from './pages/user';
import Teams from './pages/teams';
import Team from './pages/team';
import Countries from './pages/countries';
import Cities from './pages/cities';
import RegisterGroundCities from './pages/registerGroundCities';
import TeamRequests from './pages/teamRequests';
import Grounds from './pages/grounds';
import Ground from './pages/ground';
import RegisterGround from './pages/registerGround';

function App() {

  return (
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<Team />} />
          <Route path="/teams/:id/requests" element={<TeamRequests />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="register/cities" element={<RegisterGroundCities />} />
          <Route path="/cities/:cityId/grounds" element={<Grounds />} />
          <Route path="/cities/:cityId/grounds/:id" element={<Ground />} />
          <Route path="register/cities/:cityId/grounds" element={<RegisterGround />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
