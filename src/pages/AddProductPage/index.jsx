import React, { Fragment, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

import Wrapper from '../../components/Wrapper';
import AddPhotoField from '../../components/CustomFields/AddPhotoField';
import './styles.scss';

AddProductPage.propTypes = {

};

function AddProductPage({ }) {
  const [photoList, setPhotoList] = useState([]);

  return (
    <Wrapper>
      <Fragment>
        <AddPhotoField photoList={photoList} setPhotoList={setPhotoList} />
      </Fragment>
    </Wrapper>
  );
}

export default AddProductPage;