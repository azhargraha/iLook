import React from 'react';
import { useState, useRef } from 'react';

import '../style/Input.scss';

const Searchbar = ({ placeholder }) => {
  const [isType, setIsType] = useState(false);
  const input = useRef(null);

  const onChangeInput = (e) => {
    if (e.target.value !== '') {
      setIsType(true);
    } else {
      setIsType(false);
    }
  };

  const clearInput = () => {
    input.current.value = '';
    setIsType(false);
  };

  return (
    <div className="searchbar-container">
        <div className="icon">
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18Z" strokeWidth="2" strokeLinecap="round"/>
            <path d="M21 21L16 16" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <input ref={input} type="text" placeholder={placeholder} onChange={onChangeInput}/>
        <div className="buttons-container">
          {isType && <button className="clear-btn" onClick={clearInput}>clear</button>}
          <button type="submit" className="submit-btn">Search</button>
        </div>
    </div>
  )
}

export default Searchbar;
