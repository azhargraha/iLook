import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

import '../style/Button.scss';

const fadeIn = () => {
  return {
    y: -4,
    opacity: 0,
    ease: 'Power3.easeOut',
    delay: .6,
    duration: .4
  };
};

const expand = () => {
  return {
    opacity: 0,
    ease: 'Power3.easeOut',
    delay: .4,
    height: 0,
    duration: .6
  };
};

const Button = ({ type='button', label='', onClick=null, style='primary' }) => {
  const container = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    gsap.from(container.current, expand());
    gsap.from(labelRef.current, fadeIn());
  }, []);
  

  return (
    <button ref={container} type={type} className={`button-container ${style !== 'primary' ? style : 'primary'}`} onClick={onClick}>
        <h4 ref={labelRef}>{label}</h4>
    </button>
  )
};

export default Button;