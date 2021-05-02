import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';

import Wrapper from '../../components/Wrapper';
import './styles.scss';
import ProductForm from '../../components/ProductForm';

AddProductPage.propTypes = {

};

function AddProductPage({ match }) {
  const productId = match.params.productId;

  return (
    <Wrapper>
      {productId ? (
        <Fragment>
          <ProductForm productId={productId} />
        </Fragment>
      ) : (
        <Fragment>
          <ProductForm />
        </Fragment>
      )}
    </Wrapper>
  );
}

export default AddProductPage;