import React from 'react';
import Textfield from '../component/Textfield';
import Button from '../component/Button';

import '../style/CreatePlace.scss';

const CreatePlace = () => {
  const handleSubmit = (e) => {
    return;
  }

  return (
    <div className="create-place-container">
        <div className="form-wrapper">
          <div className="heading-container">
            <h1>Create place</h1>
          </div>

          <form onSubmit={handleSubmit}>
              <div className="section">
                <div className="fields-container">
                  <Textfield type='text' label="Place name" placeholder='Enter place name' />
                  <Textfield type='text' label="Category" placeholder='Enter place category' />
                  <Textfield type='number' label="Price" placeholder='Enter ticket price' />
                  <Textfield type='text' label="Place name" placeholder='Enter place name' />
                  <Textfield type='text' label="Description" placeholder='Enter place description' />
                  <Textfield type='text' label="Location" placeholder='Enter place location' />
                </div>
              </div>

              <div className="submit-section-wrapper">
                <Button type="submit" label="Create place" />
              </div>
          </form>
        </div>
    </div>
  )
}

export default CreatePlace;