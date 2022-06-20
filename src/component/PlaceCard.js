import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import '../style/PlaceCard.scss';

import axios from 'axios';
import { storageUri } from '../App';

const PlaceCard = ({ placeProps, setPlaceData, placeData }) => {
  const {
    deskripsi, harga, kategoriID, lokasi, nama, rating, urlGambar, wisataID, kategori
  } = placeProps;
  const navigate = useNavigate();

  const deleteItem = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    axios.delete(`api/pariwisata/${wisataID}`)
      .then(res => setPlaceData(placeData.filter(data => data.wisataID !== wisataID)));
  }

  const editItem = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/place/edit/${wisataID}`, { state: placeProps });
  }

  return (
    <div className="place-card-container" id={wisataID} >
        <Link to={`/place/${wisataID}`} id="img-wrapper" onClick={e => {console.log('parent');}}>
            <div id="buttons-wrapper">
              <button type="button" id="edit-btn" onClick={editItem}><h4>Edit</h4></button>
              <button type="button" id="delete-btn" onClick={deleteItem}>
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 19L5 5" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M5 19L19 5" strokeWidth="5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <img src={storageUri + urlGambar} alt="" />
        </Link>
        <div id="caption-wrapper">
            <Link to={`/place/${wisataID}`}><h3>{nama}</h3></Link>
            <p>{lokasi}</p>
        </div>
    </div>
  )
}

export default PlaceCard;