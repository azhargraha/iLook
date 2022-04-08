import React, { useRef, useEffect, useState } from 'react';
import '../style/LandingPage.scss';

import Searchbar from '../component/Searchbar';

import { Link, useNavigate } from 'react-router-dom';

import gsap from 'gsap';

const fadeIn = ({ y = -10, duration = .5, stagger = .2, staggerDirection = 1, delay = .2 }) => {
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

const expand = (delay = 0) => {
  return {
    opacity: 0,
    scale: 0,
    delay: delay,
    ease: 'Power3.easeOut',
    duration: 1
  };
};

const Explore = () => {
  const heading = useRef(null);
  const about = useRef(null);
  const features = useRef(null);
  const signIn = useRef(null);
  const register = useRef(null);
  const privacyPolicy = useRef(null);
  const contact = useRef(null);

  const [inputValue, setInputValue] = useState(null);

  const navigate = useNavigate();

  const searchSubmit = (e) => {
    e.preventDefault();

    if (inputValue) {
      navigate('/place', { replace: true, state: inputValue });
    }
  }

  useEffect(() => {
    gsap.from(heading.current.childNodes, fadeIn({ y: 40, duration: 1}));
    gsap.from(about.current, expand());
    gsap.from(features.current, expand(.2));
    gsap.from(signIn.current, expand(.4));
    gsap.from(register.current, expand(.5));
    gsap.from(privacyPolicy.current, expand());
    gsap.from(contact.current, expand(.2));
    gsap.from(about.current.childNodes, fadeIn({ y: 10, delay: .5, duration: .6 }));
    gsap.from(features.current.childNodes, fadeIn({ y: 10, delay: .7, duration: .6 }));
    gsap.from(signIn.current.childNodes, fadeIn({ y: 10, delay: .9, duration: .6 }));
    gsap.from(register.current.childNodes, fadeIn({ y: 10, delay: 1, duration: .6 }));
    gsap.from(privacyPolicy.current.childNodes, fadeIn({ y: 10, delay: .5, duration: .6 }));
    gsap.from(contact.current.childNodes, fadeIn({ y: 10, delay: .7, duration: .6 }));
  }, []);

  return (
    <div className='explore-container'>
        <div className="explore-form">
          <div ref={heading} className="headings">
            <h1>What are you looking up-to?</h1>
            <p>Explore cool places for your next trip</p>
          </div>
          <Searchbar placeholder="Discover here" getInput={setInputValue} onSubmit={searchSubmit}  withAnimation />
        </div>
        <div className="grid-menus-container">
          <div className="left wrapper">
            <div className="top-left">
              <Link ref={about} to="/about" className="grid-menu" id="left-item">
                <h4>About us</h4>
              </Link>
              <Link ref={features} to="/features" className="grid-menu" id="right-item">
                <h4>Our features</h4>
              </Link>
            </div>
            <Link ref={signIn} to="/sign-in" className="grid-menu" id="bottom-item">
              <h4>Sign in</h4>
            </Link>
          </div>
          <div className="center wrapper">
            <Link ref={register} to="/register" className="grid-menu" id="center-item">
              <h4>Let's plan a new trip with us</h4>
            </Link>
          </div>
          <div className="right wrapper">
            <Link ref={privacyPolicy} to="/privacy-policy" className="grid-menu" id="top-item">
              <h4>Privacy policy</h4>
            </Link>
            <Link ref={contact} to="/contact" className="grid-menu" id="bottom-item">
              <h4>Contact us</h4>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Explore;