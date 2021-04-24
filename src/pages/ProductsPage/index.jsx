import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import SortBox from '../../components/CustomFields/SortBox';
import { PlusWhite, SearchIconv2 } from '../../assets/icons';
import './styles.scss';

ProductsPage.propTypes = {

};

function ProductsPage(props) {
  const [sortState, setSortState] = useState('Date Added');

  return (
    <div className="products">
      <div className="products__option">
        <div className="sort">

          <p className="sort__label">SORT BY</p>
          <SortBox sortState={sortState} setSortState={setSortState} />
        </div>
        <div className="action">
          <div className="search-box">
            <SearchIconv2 />
            <input className="search__input" type="text" placeholder="Search product" />
          </div>
          <div className="add">
            <span className="add__icon"><PlusWhite /></span>
            <p className="add__name">Add product</p>
          </div>
        </div>
      </div>
      <div className="products__table"></div>
    </div>
  );
}

export default ProductsPage;