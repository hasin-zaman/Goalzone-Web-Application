import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
//main routes
import Login from './routes/main/login';
import Signup from './routes/main/signup';
import Home from './routes/main/home';
import AboutUs from './routes/main/about';
import ContactUs from './routes/main/contact';
import Faqs from './routes/main/faqs';
import User from './routes/main/user';
import Teams from './routes/main/teams/teams';
import Team from './routes/main/teams/team';
import TeamRequests from './routes/main/teams/teamRequests';
import Countries from './routes/main/booking/countries';
import Cities from './routes/main/booking/cities';
import RegisterGroundCities from './routes/main/booking/registerGroundCities';
import Grounds from './routes/main/booking/grounds';
import Ground from './routes/main/booking/ground';
import RegisterGround from './routes/main/booking/registerGround';
//admin routes
import AdminHome from './routes/admin/home';
import AdminUsers from './routes/admin/users/users';
import AdminUser from './routes/admin/users/user';
import AdminUserAdd from './routes/admin/users/userAdd';
import AdminUserUpdate from './routes/admin/users/userUpdate';
import AdminTeams from './routes/admin/teams/teams';
import AdminTeam from './routes/admin/teams/team';
import AdminTeamAdd from './routes/admin/teams/teamAdd';
import AdminTeamUpdate from './routes/admin/teams/teamUpdate';
import AdminTeamRequests from './routes/admin/teams/teamRequests';
import AdminCountries from './routes/admin/countries/countries';
import AdminCountry from './routes/admin/countries/country';
import AdminCountryAdd from './routes/admin/countries/countryAdd';
import AdminCountryUpdate from './routes/admin/countries/countryUpdate';
import AdminCities from './routes/admin/cities/cities';
import AdminCity from './routes/admin/cities/city';
import AdminCityAdd from './routes/admin/cities/cityAdd';
import AdminCityUpdate from './routes/admin/cities/cityUpdate';
import AdminGrounds from './routes/admin/grounds/grounds';
import AdminGround from './routes/admin/grounds/ground';
import AdminGroundAdd from './routes/admin/grounds/groundAdd';
import AdminGroundUpdate from './routes/admin/grounds/groundUpdate';
import AdminMessages from './routes/admin/contact/messages';
import AdminMessage from './routes/admin/contact/message';
import AdminReviews from './routes/admin/reviews/reviews';
import AdminReview from './routes/admin/reviews/review';

function App() {

  return (
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamId" element={<Team />} />
          <Route path="/teams/:teamId/requests" element={<TeamRequests />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:countryId/cities" element={<Cities />} />
          <Route path="/register/countries/:countryId/cities" element={<RegisterGroundCities />} />
          <Route path="/countries/:countryId/cities/:cityId/grounds" element={<Grounds />} />
          <Route path="/countries/:countryId/cities/:cityId/grounds/:groundId" element={<Ground />} />
          <Route path="/register/countries/:countryId/cities/:cityId/grounds" element={<RegisterGround />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>  
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/messages/:messageId" element={<AdminMessage />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/users/:userId" element={<AdminUser />} />
            <Route path="/admin/users/add" element={<AdminUserAdd />} />
            <Route path="/admin/users/update/:userId" element={<AdminUserUpdate />} />
            <Route path="/admin/teams" element={<AdminTeams />} />
            <Route path="/admin/teams/:teamId" element={<AdminTeam />} />
            <Route path="/admin/teams/:teamId/requests" element={<AdminTeamRequests />} />
            <Route path="/admin/teams/add" element={<AdminTeamAdd />} />
            <Route path="/admin/teams/update/:teamId" element={<AdminTeamUpdate />} />
            <Route path="/admin/countries" element={<AdminCountries />} />
            <Route path="/admin/countries/:countryId" element={<AdminCountry />} />
            <Route path="/admin/countries/add" element={<AdminCountryAdd />} />
            <Route path="/admin/countries/update/:countryId" element={<AdminCountryUpdate />} />
            <Route path="/admin/countries/:countryId/cities" element={<AdminCities />} />
            <Route path="/admin/countries/:countryId/cities/:cityId" element={<AdminCity />} />
            <Route path="/admin/countries/:countryId/cities/add" element={<AdminCityAdd />} />
            <Route path="/admin/countries/:countryId/cities/update/:cityId" element={<AdminCityUpdate />} />
            <Route path="/admin/countries/:countryId/cities/:cityId/grounds" element={<AdminGrounds />} />
            <Route path="/admin/countries/:countryId/cities/:cityId/grounds/:groundId" element={<AdminGround />} />
            <Route path="/admin/countries/:countryId/cities/:cityId/grounds/add" element={<AdminGroundAdd />} />
            <Route path="/admin/countries/:countryId/cities/:cityId/grounds/update/:groundId" element={<AdminGroundUpdate />} />
            <Route path="/admin/countries/:countryId/cities/:cityId/grounds/:groundId/reviews" element={<AdminReviews />} />
            <Route path="/admin/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId" element={<AdminReview />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
