import React, { Fragment, useState } from 'react';
// import PropTypes from 'prop-types';

import Spinner from '../../Spinner';
import { CloseIcon, AddIcon } from '../../../assets/icons';
import './styles.scss';

AddPhotoField.propTypes = {

};

function AddPhotoField({ photoList, setPhotoList }) {
  const [loading, setLoading] = useState(null);

  const handleChange = async (e, index) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'productphotos');
    setLoading(index);
    const res = await fetch("https://api.cloudinary.com/v1_1/sonhai/image/upload",
      {
        method: 'POST',
        body: data
      });
    const file = await res.json();
    const list = [...photoList];
    list[index] = file.secure_url;
    setPhotoList(list);
    setLoading(null);
  }

  const handleRemovePhoto = (e, index) => {
    const list = [...photoList];
    list[index] = "";
    setPhotoList(list);
  }

  return (
    <div className="add-photo-field">
      <div className="add-photos">
        <p className="label">PHOTOS</p>
        <div className="photos">
          {[...Array(4)].map((item, index) => (
            <div key={index} className="photos__item">
              {loading === index ? (
                <div className="photos_item">
                  <Spinner width="50px" />
                </div>) : (
                photoList[index] ? (
                  <Fragment>
                    <img src={photoList[index]} alt="Product" />
                    <div className="close-icon" onClick={(e) => handleRemovePhoto(e, index)}>
                      <CloseIcon />
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <label htmlFor={`input${index}`}>
                      <input type="file" id={`input${index}`} name={`input${index}`} onChange={(e) => handleChange(e, index)} />
                    </label>
                    <div className="add-item">
                      <AddIcon />
                      <p>Add photo</p>
                    </div>
                  </Fragment>
                )
              )}
            </div>
          ))}
        </div>
      </div>
      <p className="note">You can add up to 8 photos. The 1st photo will be set as cover (main photo).</p>
    </div>
  );
}

export default AddPhotoField;