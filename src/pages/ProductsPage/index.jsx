import React from 'react';
// import PropTypes from 'prop-types';

import './styles.scss';

ProductsPage.propTypes = {

};

function ProductsPage(props) {
  return (
    <div className="products">
      <div className="products__option">
        <div className="sort">
          <p className="sort__label">SORT BY</p>
        </div>
        <div className="search">
          <input type="text" placeholder="Search product" />
        </div>
        <div className="add">
          <button>Add product</button>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;