import React from 'react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

import '../style/Input.scss';

const fadeIn = () => {
  return {
    y: 10,
    opacity: 0,
    ease: 'Power3.easeOut',
    delay: .2,
    duration: 1.2
  };
};

const expand = () => {
  return {
    opacity: 0,
    ease: 'Power3.easeOut',
    width: 0,
    delay: .4,
    duration: 1.2
  };
};

function Textfield({ label, placeholder='', required=false, type='text', getInput=null, valueProp = '' }) {
  const labelRef = useRef(null);
  const inputRef = useRef(null);
  
  const [valueState, setValueState] = useState(valueProp);
  const [isView, setIsView] = useState(false);
  const [passwordType, setPasswordType] = useState(label.toLowerCase());

  const toggleView = () => {
    setIsView(!isView);
    !isView === true ? setPasswordType('text') : setPasswordType('password');
  }

  const onChangeInput = (e) => {
    setValueState(e.target.value);
    getInput(e.target.value);
  };

  const preventKeydown = (e) => {
    if (e.keyCode === 38 || e.keyCode === 40) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    gsap.from(labelRef.current, fadeIn());
    gsap.from(inputRef.current, expand());
  }, []);
  

  return (
    <div className="textfield-container">
        {label && <label ref={labelRef} htmlFor={label.toLowerCase()}>{label}</label>}
        <div ref={inputRef} className="input-container">
          <input type={type === 'password' ? passwordType : type} 
          placeholder={placeholder} 
          required={required}
          onChange={onChangeInput}
          value={valueState ? valueState : ''}
          onKeyDown={preventKeydown}
          />
          {
            type === 'password' && (
              <div className="icon">
                <ViewIcon isView={isView} onClick={toggleView} />
              </div>
            )
          }
        </div>
    </div>
  )
}

export default Textfield;

function ViewIcon({ isView=false, onClick }) {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (isView) {
      setIcon(
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="4" stroke="#1A2526" strokeWidth="2"/>
          <path d="M23 12.1382C20.8701 15.482 16.2583 17.8618 12 17.8618C7.67339 17.8618 3.1113 15.572 1 12.1382C3.1113 8.70435 7.67339 6.13819 12 6.13819C16.2583 6.13819 20.8701 8.79439 23 12.1382Z" stroke="#1A2526" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>  
      )
    } else {
      setIcon(
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M23.4626 5.88658C23.718 6.37623 23.5282 6.98027 23.0385 7.23574L1.81172 18.3106C1.32207 18.5661 0.718034 18.3762 0.462566 17.8866C0.207098 17.3969 0.396938 16.7929 0.886585 16.5374L22.1134 5.46257C22.6031 5.2071 23.2071 5.39694 23.4626 5.88658Z" fill="#1A2526"/>
          <path d="M17.2638 5.99282C15.572 5.27702 13.7626 4.86181 12 4.86181C7.33609 4.86181 2.44663 7.59976 0.148139 11.338C-0.0493797 11.6593 -0.0493797 12.0643 0.148139 12.3856C0.543736 13.029 1.01471 13.6332 1.54677 14.193L3.40734 13.2223C2.95569 12.7981 2.55012 12.3425 2.20115 11.8604C3.96567 9.39704 7.15152 7.47788 10.3997 6.98521C8.53889 7.61343 7.16863 9.30699 7.01448 11.3403L9.5221 10.0319C10.0624 9.242 10.9707 8.72362 12 8.72362C12.0098 8.72362 12.0197 8.72366 12.0295 8.72376L14.5382 7.41485C14.2564 7.24848 13.9568 7.10897 13.643 6.99984C14.0408 7.06514 14.4386 7.15271 14.8337 7.26066L17.2638 5.99282Z" fill="#1A2526"/>
          <path d="M16.0973 8.85724C16.6662 9.66886 17 10.6573 17 11.7236C17 13.9378 15.5607 15.8159 13.5667 16.4733C16.7949 16.0191 20.0056 14.2271 21.7849 11.8603C20.7069 10.4101 19.1134 9.12461 17.3178 8.22048L19.4356 7.11551C21.2533 8.23836 22.8102 9.70244 23.8434 11.3246C24.0522 11.6523 24.0522 12.0713 23.8434 12.3991C21.5115 16.06 16.5643 18.5854 12 18.5854C8.88829 18.5854 5.6442 17.4845 3.14884 15.613L5.15448 14.5666C6.72789 15.5598 8.58393 16.2403 10.4694 16.485C9.0032 16.014 7.8321 14.8847 7.3042 13.445L9.10314 12.5064C9.44743 13.7836 10.6139 14.7236 12 14.7236C13.6569 14.7236 15 13.3805 15 11.7236C15 10.9896 14.7364 10.3171 14.2986 9.79571L16.0973 8.85724Z" fill="#1A2526"/>
        </svg>  
      )
    }
  }, [isView]);
  

  return (
    <button className="icon-btn" type="button" onClick={(e) => {
      e.preventDefault();
      onClick();
    }}>
      {icon}
    </button>
  )
}