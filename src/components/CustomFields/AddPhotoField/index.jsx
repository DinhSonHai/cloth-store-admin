import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import { CloseIcon, AddIcon } from '../../../assets/icons';
import './styles.scss';

AddPhotoField.propTypes = {

};

function AddPhotoField(props) {
  const [photoList, setPhotoList] = useState([]);

  const handleAddPhoto = () => {

  }

  return (
    <div className="add-photo-field">
      <div className="add-photos">
        <p className="label">PHOTOS</p>
        {[...Array(4)].map((item, index) => (
          <div className="photos__item" onClick={handleAddPhoto}>
            <div className="close-icon">
              <CloseIcon />
            </div>
            <div className="add-item">
              <AddIcon />
              <p>Add photo</p>
            </div>
          </div>
        ))}
      </div>
      <p className="note">You can add up to 8 photos. The 1st photo will be set as cover (main photo).</p>
    </div>
  );
}

export default AddPhotoField;