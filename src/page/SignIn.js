import React from 'react';
import { useState, useEffect } from 'react';

import Textfield from '../component/Textfield';
import Button from '../component/Button';

import { Link } from 'react-router-dom';

const SignIn = () => {
  const [authInfo, setAuthInfo] = useState(null);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(authInfo);
  }

  useEffect(() => {
    setAuthInfo({
      username,
      password
    });
  }, [username, password]);

  return (
    <div className="sign-in-container">
        <div className="form-wrapper">
          <div className="heading-container">
            <h1>Hey there!</h1>
            <p>Glad to have you back. Thank you for choosing our app.</p>
          </div>

          <form onSubmit={handleSubmit}>
              <div className="section">
                <div className="fields-container">
                  <Textfield type="text" label="Username" placeholder="Enter your username" required={true} onChange={setUsername} />
                  <Textfield type="password" label="Password" placeholder="Enter password" required={true} onChange={setPassword} />
                </div>
              </div>

              <div className="submit-section-wrapper">
                <Button type="submit" label="Sign in" />
                <p>Don't have an account yet? <Link to="/register">Get started</Link>.</p>
              </div>
          </form>
        </div>
    </div>
  )
}

export default SignIn;