import React from 'react';

import '../style/Button.scss';

const Button = ({ type='button', label='', onClick=null, style='primary' }) => {
  return (
    <button type={type} className={`button-container ${style !== 'primary' ? style : 'primary'}`} onClick={onClick}>
        <h4>{label}</h4>
    </button>
  )
};

export default Button;