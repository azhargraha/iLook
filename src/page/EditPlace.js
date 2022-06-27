import React, { useState, useEffect, useRef } from 'react';
import Textfield from '../component/Textfield';
import Button from '../component/Button';

import '../style/CreatePlace.scss';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { storageUri } from '../App';

const EditPlace = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const labelRef = useRef(null);
    const selectRef = useRef(null);

    const [isDragOver, setIsDragOver] = useState(false);
    const [categories, setCategories] = useState(null);

    const [imgData, setImgData] = useState(null);
    const [imgSrc, setImgSrc] = useState(state ? state.urlGambar : null);
    const [placeName, setPlaceName] = useState(state ? state.nama : null);
    const [categoryName, setCategoryName] = useState(state ? state.kategori.nama : null);
    const [category, setCategory] = useState(state ? state.kategoriID : null);
    const [price, setPrice] = useState(state ? state.harga : null);
    const [description, setDescription] = useState(state ? state.deskripsi : null);
    const [location, setLocation] = useState(state ? state.lokasi : null);
    const [placeData, setPlaceData] = useState(null);
    const validFileType = ['image/jpeg', 'image/jpg', 'image/png'];

    const selectCategory = (e) => {
      e.preventDefault();
      setCategory(e.target.selectedIndex + 1);
      setCategoryName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('nama', placeName);
        fd.append('kategoriID', category);
        fd.append('harga', price);
        fd.append('deskripsi', description);
        fd.append('lokasi', location);
        if (imgData) fd.append('urlGambar', imgData);

        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post(`api/pariwisata/update/${state.wisataID}`, fd, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
                .then(res => {
                  console.log(res.data)
                  if (res.data.status === 200) {
                      navigate('/place');
                  } else {
                      console.log('false validation');
                  }
                })
                .catch(err => console.log(err));
        });
    }

    const dragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    }
    
    const dragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    }
    
    const dropFile = (e) => {
      e.preventDefault();
      let file = e.dataTransfer.files[0];
      
      if (validFileType.includes(file.type)) {
        let fileReader = new FileReader();
        setImgData(file);
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            setImgSrc(fileURL);
            setIsDragOver(false);
        }
        fileReader.readAsDataURL(file);
      } else {
        console.log('false');
      }
    }

    const computerFileSelect = (e) => {
      e.preventDefault();
      let file = e.target.files[0];
      if (validFileType.includes(file.type)) {
        let fileReader = new FileReader();
        setImgData(file);
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            setImgSrc(fileURL);
        }
        fileReader.readAsDataURL(file);
      } else {
        console.log('false')
      }
    }

    const clearFile = () => {
        setImgSrc(null);
        setImgData(null);
    }

    useEffect(() => {
      const source = axios.CancelToken.source();
  
      axios.get(`api/kategori/`, {
        cancelToken: source.token
      })
        .then(res => {
          if (res.data.status === 200) {
            setCategories(res.data.kategori);
          }
        })
        .catch(err => console.log(err));
  
      return () => {
        source.cancel();
      }
    }, []);

  return (
    <div className="create-place-container">
        <div className="form-wrapper">
          <div className="heading-container">
            <h1>Edit place</h1>
          </div>

          <form onSubmit={handleSubmit}>
              <div className="section">
                <div className="fields-container">
                  <div id="drop-area-wrapper">
                    <label>Thumbnail image</label>
                    <div id="drop-area"
                      className={isDragOver ? 'dragover' : ''}
                      onDragOver={dragOver}
                      onDragLeave={dragLeave}
                      onDrop={dropFile}
                    >
                      {
                        imgSrc ? 
                        (<>
                          <img src={storageUri + imgSrc} className="image-preview" />
                          <div id="button-wrapper">
                            <button type="button" id="delete-btn" onClick={clearFile}>
                                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 19L5 5" strokeWidth="5" strokeLinecap="round"/>
                                <path d="M5 19L19 5" strokeWidth="5" strokeLinecap="round"/>
                                </svg>
                            </button>
                          </div>
                        </>)
                        : 
                        (<>
                          <p>Drop your image file here</p>
                          <p>or</p>
                          <label htmlFor="image">Browse from your computer</label>
                          <input type="file" name="image" id="image" accept=".jpeg, .jpg, .png" onChange={computerFileSelect} required />
                        </>)
                      }

                    </div>
                  </div>
                  <Textfield type='text' label="Place name" placeholder='Enter place name' getInput={setPlaceName} valueProp={placeName} />
                  <div className="category-container">
                    <label ref={labelRef} htmlFor="categories">Category</label>
                    <div className="drop-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 10L12.5333 14L4 10" stroke="#1A2526" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <select ref={selectRef} name="categories" id="categories" onChange={selectCategory} value={categoryName} >
                      {
                        categories && categories.map((item) => {
                          return (
                            <option key={item.kategoriID} value={item.nama} >{item.nama}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <Textfield type='number' label="Price" placeholder='Enter ticket price' getInput={setPrice} valueProp={price} />
                  <Textfield type='text' label="Description" placeholder='Enter place description' getInput={setDescription} valueProp={description} />
                  <Textfield type='text' label="Location" placeholder='Enter place location' getInput={setLocation} valueProp={location} />
                </div>
              </div>

              <div className="submit-section-wrapper">
                <Button type="submit" label="Edit place" />
              </div>
          </form>
        </div>
    </div>
  )
}

export default EditPlace;