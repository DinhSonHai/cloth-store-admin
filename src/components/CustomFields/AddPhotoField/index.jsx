import React, { Fragment, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

import Spinner from '../../Spinner';
import { CloseIcon, AddIcon } from '../../../assets/icons';
import './styles.scss';

AddPhotoField.propTypes = {

};

function AddPhotoField({ photoList, setPhotoList, photos }) {
  const [loading, setLoading] = useState(null);
  const [isComplete, setComplete] = useState(true);

  const handleChange = async (e, index) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'productphotos');
    setLoading(index);
    setComplete(false);
    const res = await fetch("https://api.cloudinary.com/v1_1/sonhai/image/upload",
      {
        method: 'POST',
        body: data
      });
    const file = await res.json();
    const list = [...photoList];
    list[index] = file.secure_url;
    setPhotoList(list);
    setComplete(true);
    setLoading(null);
  }

  const handleRemovePhoto = (e, index) => {
    const list = [...photoList];
    list[index] = "";
    setPhotoList(list);
  }

  useEffect(() => {
    if (photos) {
      setPhotoList(photos);
    }
  }, [photos, setPhotoList]);

  return (
    <div className="add-photo-field">
      <div className="add-photos">
        <p className="label">PHOTOS</p>
        <div className="photos">
          {[...Array(4)].map((item, index) => (
            <div key={index} className={isComplete ? ("photos__item") : ("photos__item photos__item--disabled")}>
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
                    <label htmlFor={`input${index}`} className={isComplete ? "label-input" : "label-input label-input--disabled"}></label>
                    <input type="file" id={`input${index}`} name={`input${index}`} onChange={(e) => handleChange(e, index)} disabled={!isComplete} />
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
    </div >
  );
}

export default AddPhotoField;