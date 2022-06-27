import React from 'react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import axios from 'axios';

import Textfield from '../component/Textfield';
import Button from '../component/Button';

import { Link, useNavigate } from 'react-router-dom';

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

const expand = ({ delay = 0 }) => {
  return {
    opacity: 0,
    ease: 'Power3.easeOut',
    scaleY: 0,
    duration: .6,
    delay: delay,
    stagger: {
      each: .2
    }
  };
};

const Register = () => {
  const navigate = useNavigate();

  const sectionOne = useRef(null);
  const sectionTwo = useRef(null);
  const heading = useRef(null);
  const buttons = useRef(null);
  const footer = useRef(null);

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
  ];

  const pickRole = (e) => {
    setRole(e.target.value);
  }

  const sectionControl = (e) => {
    e.preventDefault();
    currentSection === 'one' ? setCurrentSection('two'): setCurrentSection('one');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get('sanctum/csrf-cookie').then(response => {
      console.log(accountInfo)
      axios.post('api/register', accountInfo)
          .then(res => {
            console.log(res)
            if (res.data.status === 200) {
              navigate('/sign-in', { state: username });
            } else {
              
            }
          })
          .catch(err => console.log(err));
    });
  }

  useEffect(() => {
    gsap.from(heading.current.childNodes, fadeIn({}));
  }, []);

  useEffect(() => {
    if (currentSection === 'one') {
      gsap.from(sectionOne.current.childNodes[0], fadeIn({ delay: .2 }));
      gsap.from(sectionOne.current.childNodes[1].children, expand({ delay: .4 }));      
    } else if (currentSection === 'two') {
      gsap.from(sectionTwo.current.childNodes[0], fadeIn({ delay: .6 }));
      gsap.from(footer.current, fadeIn({ y: -15, delay: .3 }));
    }
  }, [currentSection]);

  useEffect(() => {
    if (role === 'user') {
      setAccountInfo({
        role: role,
        // details: {
          name,
          username,
          password, 
          phoneNumber
        // }
      });
    } else {
      setAccountInfo({
        role: role,
        // details: {
          name,
          username,
          password, 
          phoneNumber,
          location
        // }
      });
    }
  }, [role, name, username, password, phoneNumber, location]);

  return (
    <div className="register-container">
        <div className="form-wrapper">
          <div ref={heading} className="heading-wrapper">
            <h1>Getting started with us</h1>
            <p>Please fill out the form below first, then you're good to go. Already have an account? <Link to="/sign-in">Sign in</Link>.</p>
          </div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                {
                  currentSection === 'one' && (
                    <div ref={sectionOne} className="section active">
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
                  )
                }
                {
                  currentSection === 'two' && (
                    <div ref={sectionTwo} className="section active">
                      <h3>Set up your account</h3>
                      <div className="fields-container">
                        <FormByRole role={role} onChangeMethods={onChangeMethods} />
                      </div>
                    </div>
                  )
                }
              </div>
                <div className="submit-section-wrapper">
                  <div ref={buttons} className="buttons-wrapper">
                    {
                      currentSection === 'one' && (
                        <Button
                        label="Next"
                        onClick={e => sectionControl(e)}
                        style="primary"
                        />
                      )
                    }
                    {
                      currentSection === 'two' && (
                        <>
                          <Button
                          label="Back" 
                          onClick={e => sectionControl(e)}
                          style="label-only"
                          />
                          <Button type="submit" label="Register" />
                        </>
                      )
                    }
                  </div>
                  {currentSection === 'two' && <p ref={footer}>By clicking Register, I have read and understood the <Link to="/privacy-policy" target="_blank">Privacy policy</Link>.</p>}
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
          <Textfield type="text" label="Name" placeholder="Enter your name" required={true} getInput={setName} />
          <Textfield type="text" label="Username" placeholder="Create your username" required={true} getInput={setUsername} />
          <Textfield type="number" label="Phone number" placeholder="Enter your phone" required={true} getInput={setPhoneNumber} />
          <Textfield type="password" label="Password" placeholder="Contain at least 8 characters" required={true} getInput={setPassword} />
        </>
      );
    } else if (role === 'tourguide') {
      setForm(
        <>
          <Textfield type="text" label="Agency name" placeholder="Enter your name" required={true} getInput={setName} />
          <Textfield type="text" label="Username" placeholder="Enter your name" required={true} getInput={setUsername} />
          <Textfield type="number" label="Phone number" placeholder="Enter your phone" required={true} getInput={setPhoneNumber} />
          <Textfield type="password" label="Password" placeholder="Contain at least 8 characters" required={true} getInput={setPassword} />
          <Textfield type="text" label="Location" placeholder="Enter your location" required={true} getInput={setLocation} />
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