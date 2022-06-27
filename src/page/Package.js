import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PackageCard } from '../component/PackageCard';
import '../style/Package.scss';
import Button from '../component/Button';
import { useNavigate } from 'react-router-dom';
import CookieService from '../CookieService';

const Package = () => {
  const tokenType = CookieService.getRole();
  const [packageData, setPackageData] = useState([]);
  const navigate = useNavigate();

  const addPlace = (e) => {
    e.preventDefault();
    navigate('/package/create');
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    console.log(packageData)
    axios.get('api/paket/', {
      cancelToken: source.token
    })
      .then(res => setPackageData(res.data))
      .catch(err => console.log(err));

    return () => {
      source.cancel();
    }
  }, []);

  return (
    <div className="package-container">
      <div className="button-wrapper">
        {tokenType === 'tourguide' && <Button label='Create new package' onClick={addPlace} />}
      </div>
    
      {packageData.length === 0 && <p>There is no package data yet.</p>}
      <div className="packages-wrapper">
        {packageData.map((data, index) => {
          return <PackageCard key={index} packageProps={data} setPackageData={setPackageData} packageData={packageData} />
        })}
      </div>
    </div>
  )
}

export default Package;