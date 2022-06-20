import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import '../style/PackageCard.scss';

export const PackageCard = ({ packageProps }) => {
    const {
        nama, deskripsi, thumbnailUrl, paketID
      } = packageProps;

  return (
    <div className="package-card-container" id={paketID} >
        <Link to={`/package/${paketID}`} id="img-wrapper" >
            <div id="buttons-wrapper">
              <button type="button" id="edit-btn" onClick={null}><h4>Edit</h4></button>
              <button type="button" id="delete-btn" onClick={null}>
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 19L5 5" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M5 19L19 5" strokeWidth="5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <img src={thumbnailUrl} alt="" />
        </Link>
        <div id="caption-wrapper">
            <Link to={`/package/${paketID}`}><h3>{nama}</h3></Link>
            <p>{deskripsi}</p>
        </div>
    </div>
  )
}