import React, { useState } from 'react';
import Textfield from '../component/Textfield';
import Button from '../component/Button';
import '../style/CreatePackage.scss';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { storageUri } from '../App';

const EditPackage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [imgData, setImgData] = useState(null);
    const [imgSrc, setImgSrc] = useState(state ? state.thumbnailUrl : null);
    const [isDragOver, setIsDragOver] = useState(false);
    const validFileType = ['image/jpeg', 'image/jpg', 'image/png'];

    const [packageName, setPackageName] = useState(state ? state.nama : null);
    const [description, setDescription] = useState(state ? state.deskripsi : null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('nama', packageName);
        fd.append('deskripsi', description);
        if (imgData) fd.append('thumbnailUrl', imgData);

        axios.get('sanctum/csrf-cookie').then(response => {
          axios.post(`api/paket/update/${state.paketID}`, fd, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
              .then(res => {
                console.log(res)
                if (res.data.status === 200) {
                    navigate('/package');
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

      const clearFile = () => {
        setImgSrc(null);
        setImgData(null);
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

  return (
    <div className="create-package-container">
        <div className="form-wrapper">
        <div className="heading-container">
            <h1>Create Package</h1>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="section">
                <div className="fields-container">
                <div id="drop-area-wrapper">
                    <label>Thumbnail image</label>
                    <div id="drop-area"
                      className={isDragOver ? 'dragover' : ''}
                      onDragLeave={dragLeave}
                      onDragOver={dragOver}
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
                    <Textfield type='text' label="Package title" placeholder='Enter package title' getInput={setPackageName} valueProp={packageName} required />
                    <Textfield type='text' label="Description" placeholder='Enter description' getInput={setDescription} valueProp={description} required />
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

export default EditPackage;