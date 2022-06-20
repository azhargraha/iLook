import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/PackageDetails.scss';

const PackageDetails = () => {
    const { id } = useParams();

    const [packageData, setPackageData] = useState({
        nama: '',
        deskripsi: '',
        paketID: '',
        thumbnailUrl: '',
    });

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios.get(`api/paket/${id}`, {
            cancelToken: source.token
        })
            .then(res => {
                let data = res.data.paket;
                setPackageData({
                    nama: data.nama,
                    deskripsi: data.deskripsi,
                    paketID: data.paketID,
                    thumbnailUrl: data.thumbnailUrl,
                });
            })
    }, []);

  return (
    <div className="package-details-container">
        <section id="left">
            <img src={packageData.thumbnailUrl} alt={packageData.nama} />
        </section>

        <section id="right">
            <div className="headings">
            <h1>{packageData.nama}</h1>
            {/* <div className="subheader">
                <h4>{packageData.location}</h4>
                <h4>{packageData.category}</h4>
                <h4>Rp. {packageData.price}</h4>
            </div> */}
            </div>
            <div className="details-wrapper">
            <h2>Package Details</h2>
            <div className="desc-wrapper">
                <p>{packageData.deskripsi}</p>
            </div>
            </div>
        </section>
    </div>
  )
}

export default PackageDetails;