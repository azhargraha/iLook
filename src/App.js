import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';

import Navbar from './component/Navbar';

import Explore from './page/Explore';
import Features from './page/Features';
import PrivacyPolicy from './page/PrivacyPolicy';
import About from './page/About';
import Register from './page/Register';
import SignIn from './page/SignIn';
import Plan from './page/Plan';
import Package from './page/Package';
import Discover from './page/Discover';
import Place from './page/Place';
import MyPackage from './page/MyPackage';
import CreatePlace from './page/CreatePlace';
import EditPlace from './page/EditPlace';
import PlaceDetails from './page/PlaceDetails';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

gsap.config({
  force3D: false,
  nullTargetWarn: false,
  trialWarn: false,
});

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/features' element={<Features />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/about' element={<About />} />
          <Route path='/register' element={<Register />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/discover' element={<Discover />} />

          {/* user */}
          <Route path='/plans' element={<Plan />} />
          <Route path='/packages' element={<Package />} />

          {/* tourguide */}
          <Route path='/my-packages' element={<MyPackage />} />

          {/* admin */}
          <Route path='/place' element={<Place />} />
          <Route path='/place/:id' element={<PlaceDetails />} />
          <Route path='/place/create' element={<CreatePlace />} />
          <Route path='/place/edit/:id' element={<EditPlace />} />

          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </Router>
  )
}