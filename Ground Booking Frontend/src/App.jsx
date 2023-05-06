import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import AboutUs from './pages/about';
import ContactUs from './pages/contact';
import Faqs from './pages/faqs';
import Users from './pages/users';
import User from './pages/user';
import TeamsAdmin from './pages/teamsAdmin';
import Teams from './pages/teams';
import Team from './pages/team';
import Cities from './pages/cities';
import TeamRequests from './pages/teamRequests';
import Grounds from './pages/grounds';

function App() {

  return (
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/teams/admin" element={<TeamsAdmin />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<Team />} />
          <Route path="/teams/:id/requests" element={<TeamRequests />} />
          <Route path="/booking/cities" element={<Cities />} />
          <Route path="/booking/cities/:id/grounds" element={<Grounds />} />
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
