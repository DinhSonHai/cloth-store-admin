import React from 'react';
// import PropTypes from 'prop-types';

import AddPhotoField from '../../components/CustomFields/AddPhotoField';
import './styles.scss';

AddProductPage.propTypes = {

};

function AddProductPage(props) {
  return (
    <div className="add-product">
      <AddPhotoField />
    </div>
  );
}

export default AddProductPage;