import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import City from './pages/city';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import AboutUs from './pages/about';
import ContactUs from './pages/contact';
import Faqs from './pages/faqs';
import Users from './pages/users';

function App() {

  return (
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/cities" element={<City />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
