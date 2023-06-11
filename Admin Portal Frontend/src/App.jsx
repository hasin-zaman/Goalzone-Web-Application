import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Users from './pages/users';
import User from './pages/user';
import UserAdd from './pages/userAdd';
import UserUpdate from './pages/userUpdate';
import Teams from './pages/teams';
import Team from './pages/team';
import TeamAdd from './pages/teamAdd';
import TeamUpdate from './pages/teamUpdate';
import Countries from './pages/countries';
import Cities from './pages/cities';
import City from './pages/city';
import CityAdd from './pages/cityAdd';
import CityUpdate from './pages/cityUpdate';
// import TeamRequests from './pages/teamRequests';
import Grounds from './pages/grounds';
import Ground from './pages/ground';
import GroundAdd from './pages/groundAdd';
import GroundUpdate from './pages/groundUpdate';

function App() {

  return (
      <BrowserRouter>
      <Routes>
          <Route path="/" element={sessionStorage.getItem('userId') ? <Home /> : <Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users/add" element={<UserAdd />} />
          <Route path="/users/update/:id" element={<UserUpdate />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<Team />} />
          <Route path="/teams/add" element={<TeamAdd />} />
          <Route path="/teams/update/:id" element={<TeamUpdate />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:countryId/cities" element={<Cities />} />
          <Route path="/cities/:id" element={<City />} />
          <Route path="/cities/add" element={<CityAdd />} />
          <Route path="/cities/update/:id" element={<CityUpdate />} />
          <Route path="/cities/:cityId/grounds" element={<Grounds />} />
          <Route path="/cities/:cityId/grounds/:id" element={<Ground />} />
          <Route path="/cities/:cityId/grounds/add" element={<GroundAdd />} />
          <Route path="/cities/:cityId/grounds/update/:id" element={<GroundUpdate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App