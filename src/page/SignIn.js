import React from 'react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

import Textfield from '../component/Textfield';
import Button from '../component/Button';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


const fadeIn = ({y = 20, duration = 1, stagger = .2, staggerDirection = 1, delay = .2}) => {
  return {
    opacity: 0,
    ease: 'Power3.easeOut',
    delay: delay,
    duration: duration,
    stagger: {
        y: y,
        each: stagger * staggerDirection
    }
  };
};

const SignIn = () => {
  const { state } = useLocation();

  const heading = useRef(null);
  const footer = useRef(null);

  const navigate = useNavigate();

  const [authInfo, setAuthInfo] = useState(null);
  const [authFail, setAuthFail] = useState(false);

  const [username, setUsername] = useState(state ? state : null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get('sanctum/csrf-cookie').then(response => {
      axios.post('api/login', authInfo)
          .then(res => {
            if (res.data.status === 200) {
              navigate('/');
            } else {
              setAuthFail(true);
            }
          })
          .catch(err => console.log(err));
    });
  }

  useEffect(() => {
    gsap.from(heading.current.childNodes, fadeIn({}));
    gsap.from(footer.current, fadeIn({ y: -15, delay: .6 }));
  }, []);

  useEffect(() => {
    setAuthInfo({
      username,
      password
    });
  }, [username, password]);

  return (
    <div className="sign-in-container">
        <div className="form-wrapper">
          <div ref={heading} className="heading-container">
            <h1>Hey there!</h1>
            <p>Glad to have you back. Thank you for choosing our app.</p>
          </div>

          <form onSubmit={handleSubmit}>
              <div className="section">
                <div className="fields-container">
                  <Textfield type="text" label="Username" placeholder="Enter your username" required={true} getInput={setUsername} valueProp={state} />
                  <Textfield type="password" label="Password" placeholder="Enter password" required={true} getInput={setPassword} />
                  {authFail && <p className="error">Incorrect username or password. Please try again. </p>}
                </div>
              </div>

              <div className="submit-section-wrapper">
                <Button type="submit" label="Sign in" />
                <p ref={footer} >Don't have an account yet? <Link to="/register">Get started</Link>.</p>
              </div>
          </form>
        </div>
    </div>
  )
}

export default SignIn;