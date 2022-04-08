import React, { useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

import '../style/Discover.scss';

import Map from '../component/Map';

const Discover = () => {
    const [ libraries ] = useState(['places']);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
        libraries: libraries,
    })

  return (
    <div>{!isLoaded ? 'Loading...' : 
        <GoogleMap zoom={10} center={{ lat: 43, lng: -80 }} mapContainerClassName='map-container'></GoogleMap>
    }</div>
  )
}

export default Discover;