import React from 'react';
import { Link } from 'react-router-dom';

import '../style/PlaceCard.scss';

const PlaceCard = ({ src, name = '', location = '' }) => {
  return (
    <div className="place-card-container">
        <Link to="#" id="img-wrapper">
            <img src={src} alt="" />
        </Link>
        <div to="#" id="caption-wrapper">
            <Link to="#"><h3>{name}</h3></Link>
            <p>{location}</p>
        </div>
    </div>
  )
}

export default PlaceCard;