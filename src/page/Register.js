import React from 'react';
import { useState, useEffect, useRef } from 'react';

import Textfield from '../component/Textfield';
import Button from '../component/Button';

import { Link } from 'react-router-dom';

const Register = () => {
  const sectionOne = useRef(null);
  const sectionTwo = useRef(null);

  const [role, setRole] = useState('user');
  const [accountInfo, setAccountInfo] = useState(null);
  const [currentSection, setCurrentSection] = useState('one');

  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [location, setLocation] = useState(null);
  const onChangeMethods = [
    setName, setUsername, setPhoneNumber, setPassword, setLocation
  ]

  const pickRole = (e) => {
    setRole(e.target.value);
  }

  const sectionControl = (e) => {
    e.preventDefault();
    currentSection === 'one' ? setCurrentSection('two'): setCurrentSection('one');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(accountInfo);
  }

  useEffect(() => {
    if (role === 'user') {
      setAccountInfo({
        role: role,
        details: {
          name,
          username,
          password, 
          phoneNumber
        }
      });
    } else {
      setAccountInfo({
        role: role,
        details: {
          name,
          username,
          password, 
          phoneNumber,
          location
        }
      });
    }
  }, [role, name, username, password, phoneNumber, location]);

  return (
    <div className="register-container">
        <div className="form-wrapper">
          <div className="heading-wrapper">
            <h1>Getting started with us</h1>
            <p>Please fill out the form below first, then you're good to go. Already have an account? <Link to="/sign-in">Sign in</Link>.</p>
          </div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div ref={sectionOne} className={currentSection === 'one'? 'section active' : 'section'}>
                  <h3>Pick your role</h3>
                  <div className="selection-container">
                    <div className="selection-item">
                      <input type="radio" name="role" id="user" value="user" onClick={e => pickRole(e)} defaultChecked={role === 'user'} />
                      <label htmlFor="user">User</label>
                    </div>
                    <div className="selection-item">
                      <input type="radio" name="role" id="tourguide" value="tourguide" onClick={e => pickRole(e)} defaultChecked={role === 'tourguide'} />
                      <label htmlFor="tourguide">Tour guide</label>
                    </div>
                  </div>
                </div>
                <div ref={sectionTwo} className={currentSection === 'two'? 'section active' : 'section'}>
                  <h3>Set up your account</h3>
                  <div className="fields-container">
                    <FormByRole role={role} onChangeMethods={onChangeMethods} />
                  </div>
                </div>
              </div>
                <div className="submit-section-wrapper">
                  <div className="buttons-wrapper">
                    <Button
                    label={currentSection === 'one' ? 'Next' : 'Back'} 
                    onClick={e => sectionControl(e)}
                    style={currentSection === 'one' ? 'primary' : 'label-only'} 
                    />
                    {
                      currentSection === 'two' && 
                      (
                          <Button type="submit" label="Register" />
                        )
                    }
                  </div>
                  {currentSection === 'two' && <p>By clicking Register, I have read and understood the <Link to="/privacy-policy">Privacy policy</Link>.</p>}
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register;

const FormByRole = ({ role, onChangeMethods }) => {
  const [
    setName, setUsername, setPhoneNumber, setPassword, setLocation
  ] = onChangeMethods
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (role === 'user') {
      setForm(
        <>
          <Textfield type="text" label="Name" placeholder="Enter your name" required={true} onChange={setName} />
          <Textfield type="text" label="Username" placeholder="Create your username" required={true} onChange={setUsername} />
          <Textfield type="number" label="Phone number" placeholder="Enter your phone" required={true} onChange={setPhoneNumber} />
          <Textfield type="password" label="Password" placeholder="Contain at least 8 characters" required={true} onChange={setPassword} />
        </>
      );
    } else if (role === 'tourguide') {
      setForm(
        <>
          <Textfield type="text" label="Agency name" placeholder="Enter your name" required={true} onChange={setName} />
          <Textfield type="text" label="Username" placeholder="Enter your name" required={true} onChange={setUsername} />
          <Textfield type="number" label="Phone number" placeholder="Enter your phone" required={true} onChange={setPhoneNumber} />
          <Textfield type="password" label="Password" placeholder="Contain at least 8 characters" required={true} onChange={setPassword} />
          <Textfield type="text" label="Location" placeholder="Enter your location" required={true} onChange={setLocation} />
        </>
      );
    }
  }, [role]);

  return (
    <>
      {form}
    </>
  )
}