import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/PackageDetails.scss';
import Button from '../component/Button';
import { storageUri } from '../App';

const PackageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [modalActive, setModalActive] = useState(false);
    const [packageData, setPackageData] = useState({
        nama: '',
        deskripsi: '',
        paketID: '',
        thumbnailUrl: '',
    });
    const [placeList, setPlaceList] = useState([]);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios.get(`api/paket/${id}`, {
            cancelToken: source.token
        })
            .then(res => {
                let data = res.data.paket;
                let places = res.data.pariwisataList;
                console.log(places)
                setPackageData({
                    nama: data.nama,
                    deskripsi: data.deskripsi,
                    paketID: data.paketID,
                    thumbnailUrl: data.thumbnailUrl,
                });
                setPlaceList(places);
            })
    }, [modalActive]);

  return (
    <div className="package-details-container">
      {modalActive && <AddModal modalState={setModalActive} />}

        <section id="left">
            <img src={storageUri + packageData.thumbnailUrl} alt={packageData.nama} />
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
                <div className="places-wrapper">
                    <h3>Place list</h3>
                    <div className="places-container">
                        {placeList.map((item, idx) => {
                            return (
                                <div key={idx} className="place-wrapper" onClick={() => navigate(`/place/${item.wisataID}`)}>
                                    <div className="img" style={{ backgroundImage: `url(${storageUri + item.urlGambar})` }}></div>
                                    <div className="place-label">
                                        <h4>
                                            {item.nama}
                                        </h4>
                                        <p>{item.lokasi}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="button-wrapper">
                    <Button label="Add place" onClick={() => setModalActive(true)}/>
                </div>
        </section>
    </div>
  )
}

const AddModal = ({ modalState }) => {
    const { id } = useParams();

    const [placeData, setPlaceData] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(0);
  
    const closeModal = (e) => {
      e.preventDefault();
      modalState(false);
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.get('sanctum/csrf-cookie').then(response => {
          axios.post(`api/paket/${id}/add`, {
            wisataID: selectedPlace
          })
              .then(res => {
                  if (res.data.status === 200) {
                    console.log(res.data);
                    modalState(false);
                  }
              })
              .catch(err => console.log(err));
      });
    }

    useEffect(() => {
        axios.get(`api/pariwisata`)
            .then(res => {
                setPlaceData(res.data.pariwisata);
            })
            .catch(err => console.log(err));
    }, []);
  
    return (
      <div className="modal-container" onClick={closeModal} >
        <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="heading-container">
                <h1>Add place</h1>
                <button type="button" onClick={closeModal}>close</button>
            </div>
  
            <form onSubmit={handleSubmit}>
                <div className="section">
                    <div className="place-section-wrapper">
                        <label htmlFor="places">Select place</label>
                        <select name="places" id="places" onChange={e => {setSelectedPlace(e.target.value)}}>
                        {
                            placeData.map((item) => {
                            return (
                                <option key={item.wisataID} value={item.wisataID}>{item.nama}</option>
                            )
                            })
                        }
                        </select>
                    </div>
                </div>
  
                <div className="submit-section-wrapper">
                    <Button type="submit" label="Add place" />
                </div>
            </form>
        </div>
      </div>
    )
  }

export default PackageDetails;