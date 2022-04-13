import React, { useState } from 'react';
import Textfield from '../component/Textfield';
import Button from '../component/Button';
import '../style/CreatePackage.scss';
import axios from 'axios';

const CreatePackage = () => {
    const [packageData, setPackageData] = useState({
        nama: '',
        deskripsi: ''
    });

    const setTitle = (e) => {
        setPackageData({
            ...packageData,
            nama: e
        })
    }

    const setDescription = (e) => {
        setPackageData({
            ...packageData,
            deskripsi: e
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post(`api/paket/create`, packageData)
                .then(res => {
                    console.log(res);
                //   if (res.data.status === 200) {
                //       navigate('/place');
                //   } else {
                //       console.log('false validation');
                //   }
                })
                .catch(err => console.log(err));
        });
    }

  return (
    <div className="create-package-container">
        <div className="form-wrapper">
        <div className="heading-container">
            <h1>Create Package</h1>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="section">
                <div className="fields-container">
                    <Textfield type='text' label="Package title" placeholder='Enter package title' getInput={setTitle} required />
                    <Textfield type='text' label="Description" placeholder='Enter description' getInput={setDescription} required />
                </div>
            </div>

            <div className="submit-section-wrapper">
                <Button type="submit" label="Create package" />
            </div>
        </form>
        </div>
    </div>
  )
}

export default CreatePackage;