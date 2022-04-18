import React, { useReducer, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';
import CookieService from './CookieService';

import Navbar from './component/Navbar';

import Explore from './page/Explore';
import Features from './page/Features';
import PrivacyPolicy from './page/PrivacyPolicy';
import About from './page/About';
import Register from './page/Register';
import SignIn from './page/SignIn';
import Plan from './page/Plan';
import Discover from './page/Discover';
import Place from './page/Place';
import MyPackage from './page/MyPackage';
import Package from './page/Package';
import CreatePlace from './page/CreatePlace';
import EditPlace from './page/EditPlace';
import PlaceDetails from './page/PlaceDetails';
import CreatePackage from './page/CreatePackage';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.interceptors.request.use(function (config) {
  const token = CookieService.get('access_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});


gsap.config({
  force3D: false,
  nullTargetWarn: false,
  trialWarn: false,
});

export const TokenContext = React.createContext();

const authReducer = (state, action) => {
  switch(action.type) {
      case 'signIn':
          CookieService.set('access_token', action.token, { path: '/' });
          return action.token;
      case 'signOut':
          axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/logout')
                .then(res => {
                  console.log(res)
                  if (res.data.status === 200) {
                    CookieService.remove('access_token');
                  }
                })
                .catch(err => console.log(err));
          });

          return null;
      case 'get':
          return CookieService.get('access_token');
      default:
          return state;
  }
};

export default function App() {
  const [token, tokenDispatch] = useReducer(authReducer, null);

  useEffect(() => {
    tokenDispatch({ type: 'get' });
  }, []);

  return (
    <Router>
      <div className="App">
        <TokenContext.Provider
          value={{
            reducer: [token, tokenDispatch]
          }}
        >
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
            <Route path='/plan' element={<Plan />} />
            <Route path='/package' element={<Package />} />

            {/* tourguide */}
            <Route path='/my-package' element={<MyPackage />} />
            <Route path='/package/create' element={<CreatePackage />} />

            {/* admin */}
            <Route path='/place' element={<Place />} />
            <Route path='/place/:id' element={<PlaceDetails />} />
            <Route path='/place/create' element={<CreatePlace />} />
            <Route path='/place/edit/:id' element={<EditPlace />} />

            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </TokenContext.Provider>
      </div>
    </Router>
  )
}