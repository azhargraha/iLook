import React from 'react';
import '../style/LandingPage.scss';

import Searchbar from '../component/Searchbar';

import { Link } from 'react-router-dom';

const Explore = () => {
  return (
    <div className='explore-container'>
        <div className="explore-form">
          <div className="headings">
            <h1>What are you looking up-to?</h1>
            <p>Explore cool places for your next trip</p>
          </div>
          <form onSubmit={(e) => {e.preventDefault()}}>
            <Searchbar placeholder="Discover here" />
          </form>
        </div>
        <div className="grid-menus-container">
          <div className="left wrapper">
            <div className="top-left">
              <Link to="/about" className="grid-menu" id="left-item">
                <h4>About us</h4>
              </Link>
              <Link to="/features" className="grid-menu" id="right-item">
                <h4>Our features</h4>
              </Link>
            </div>
            <Link to="/sign-in" className="grid-menu" id="bottom-item">
              <h4>Sign in</h4>
            </Link>
          </div>
          <div className="center wrapper">
            <Link to="/register" className="grid-menu" id="center-item">
              <h4>Get started</h4>
            </Link>
          </div>
          <div className="right wrapper">
            <Link to="/privacy-policy" className="grid-menu" id="top-item">
              <h4>Privacy policy</h4>
            </Link>
            <Link to="/contact" className="grid-menu" id="bottom-item">
              <h4>Contact us</h4>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Explore;