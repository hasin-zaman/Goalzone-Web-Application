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
import Country from './pages/country';
import CountryAdd from './pages/countryAdd';
import CountryUpdate from './pages/countryUpdate';
import Cities from './pages/cities';
import City from './pages/city';
import CityAdd from './pages/cityAdd';
import CityUpdate from './pages/cityUpdate';
import TeamRequests from './pages/teamRequests';
import Grounds from './pages/grounds';
import Ground from './pages/ground';
import GroundAdd from './pages/groundAdd';
import GroundUpdate from './pages/groundUpdate';
import ProtectedRoutes from './ProtectedRoutes';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>  
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/users/add" element={<UserAdd />} />
          <Route path="/users/update/:userId" element={<UserUpdate />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamId" element={<Team />} />
          <Route path="/teams/:teamId/requests" element={<TeamRequests />} />
          <Route path="/teams/add" element={<TeamAdd />} />
          <Route path="/teams/update/:teamId" element={<TeamUpdate />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:countryId" element={<Country />} />
          <Route path="/countries/add" element={<CountryAdd />} />
          <Route path="/countries/update/:countryId" element={<CountryUpdate />} />
          <Route path="/countries/:countryId/cities" element={<Cities />} />
          <Route path="/countries/:countryId/cities/:cityId" element={<City />} />
          <Route path="/countries/:countryId/cities/add" element={<CityAdd />} />
          <Route path="/countries/:countryId/cities/update/:cityId" element={<CityUpdate />} />
          <Route path="/countries/:countryId/cities/:cityId/grounds" element={<Grounds />} />
          <Route path="/countries/:countryId/cities/:cityId/grounds/:groundId" element={<Ground />} />
          <Route path="/countries/:countryId/cities/:cityId/grounds/add" element={<GroundAdd />} />
          <Route path="/countries/:countryId/cities/:cityId/grounds/update/:groundId" element={<GroundUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App