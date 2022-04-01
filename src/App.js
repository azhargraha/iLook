import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './component/Navbar';

import Explore from './page/Explore';
import Features from './page/Features';
import PrivacyPolicy from './page/PrivacyPolicy';
import About from './page/About';
import Register from './page/Register';
import SignIn from './page/SignIn';
import Dashboard from './page/Dashboard';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* landing page */}
          <Route path='/' element={<Explore />} />
          <Route path='/features' element={<Features />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/about' element={<About />} />
          <Route path='/register' element={<Register />} />
          <Route path='/sign-in' element={<SignIn />} />

          {/* dashboard - user */}
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}