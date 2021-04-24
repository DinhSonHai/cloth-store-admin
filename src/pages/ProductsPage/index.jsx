import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import { getAllProducts } from '../../redux/actions/products';
import Spinner from '../../components/Spinner';
import SortBox from '../../components/CustomFields/SortBox';
import { PlusWhite, SearchIconv2 } from '../../assets/icons';
import './styles.scss';

ProductsPage.propTypes = {

};

function ProductsPage({ products, getAllProducts }) {
  const [loading, setLoading] = useState(false);
  const [sortState, setSortState] = useState('Date Added');

  useEffect(() => {
    async function handleGetData() {
      setLoading(true);
      await getAllProducts();
      setLoading(false);
    }
    handleGetData();
  }, [getAllProducts])

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
      <div className="products__table">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "35%" }}>PRODUCTS</th>
              <th style={{ width: "15%" }}>SOLD</th>
              <th style={{ width: "22%" }}>DATE ADDED</th>
              <th style={{ width: "16%" }}>PROFIT ($)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">
                  <div className="spinner">
                    <Spinner width="50px" />
                  </div>
                </td>
              </tr>
            ) : (
              products && products.map(product => (
                <tr>
                  <td>
                    <div className="product">
                      <img src={product.photos[0]} alt="Product" />
                      <div className="info">
                        <p className="info__name">{product.name}</p>
                        <p className="info__categories">
                          {product.categories.reduce((acc, current) => {
                            acc.push(current.categoryName);
                            return acc;
                          }, []).join(", ")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{product.sold}/{product.quantity}</td>
                  <td>{new Date(product.createdAt).toDateString()}</td>
                  <td>{product.profit}.00</td>
                  <td></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div >
  );
}

const mapStateToProps = (state) => ({
  products: state.products.products
})

export default connect(mapStateToProps, { getAllProducts })(ProductsPage);