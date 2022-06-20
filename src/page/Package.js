import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PackageCard } from '../component/PackageCard';
import '../style/Package.scss';

const Package = () => {
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

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
      <div className="packages-wrapper">
        {packageData.map((data, index) => {
          return <PackageCard key={index} packageProps={data}/>
        })}
      </div>
    </div>
  )
}

export default Package;