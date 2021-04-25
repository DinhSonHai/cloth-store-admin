import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';

import { getAllProducts } from '../../redux/actions/products';
import Spinner from '../../components/Spinner';
import PaginationComponent from '../../components/PaginationComponent';
import SortBox from '../../components/CustomFields/SortBox';
import { DropDown, PlusWhite, SearchIconv2, EditIcon, RemoveIcon } from '../../assets/icons';
import './styles.scss';
import Wrapper from '../../components/Wrapper';

ProductsPage.propTypes = {

};

function ProductsPage({ products, setSubTitle, getAllProducts }) {
  const history = useHistory();
  const wrapperRef = useRef();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortState, setSortState] = useState('Date Added');
  const [isOpenLimit, setOpenLimit] = useState(false);
  const [limit, setLimit] = useState('6');

  useEffect(() => {
    async function handleGetData() {
      setLoading(true);
      await getAllProducts();
      setLoading(false);
    }
    handleGetData();
    document.addEventListener('click', closeLimit);
    return () => {
      document.removeEventListener('click', closeLimit)
    }
  }, [getAllProducts]);

  const handleOpenLimit = () => {
    setOpenLimit(!isOpenLimit);
  }

  const handleSelectLimit = (type) => {
    if (type === '6') {
      setLimit('6');
    }
    else if (type === '12') {
      setLimit('12');
    }
    setOpenLimit(false);
    // handleSort(type);
  }

  const closeLimit = (e) => {
    const { target } = e;
    if (!wrapperRef?.current?.contains(target)) {
      setOpenLimit(false);
    }
  }

  const handleAddProduct = () => {
    return history.push("/admin/products/add");
  }

  return (
    <Wrapper>
      <div className="products">
        <Fragment>
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
              <div className="add" onClick={handleAddProduct}>
                <span className="add__icon"><PlusWhite /></span>
                <p className="add__name">Add product</p>
              </div>
            </div>
          </div>
          <div className="products__table">
            <table cellSpacing="0">
              <thead>
                <tr>
                  <th style={{ width: "35%" }}>PRODUCTS</th>
                  <th style={{ width: "15%" }}>SOLD</th>
                  <th style={{ width: "22%" }}>DATE ADDED</th>
                  <th style={{ width: "18%" }}>PROFIT ($)</th>
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
                    <tr key={product._id}>
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
                      <td>
                        <div className="action">
                          <p>Actions</p>
                          <DropDown />
                          <div className="dropdown">
                            <div>
                              <EditIcon />
                              <p>Edit</p>
                            </div>
                            <div>
                              <RemoveIcon />
                              <p>Remove</p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="table__option">
              <p>Show 1 to 10 of 123 entries</p>
              <div className="pagination">
                <div className="limit" ref={wrapperRef}>
                  <div className="select-box" onClick={handleOpenLimit}>
                    <p className="type">{limit}</p>
                    <span className={isOpenLimit ? "rotate" : ""}>
                      <DropDown />
                    </span>
                  </div>
                  {isOpenLimit && (
                    <div className="select__option">
                      <p onClick={() => handleSelectLimit('6')}>6</p>
                      <p onClick={() => handleSelectLimit('12')}>12</p>
                    </div>
                  )}
                </div>
                <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} total={products.length || 0} />
              </div>
            </div>
          </div>
        </Fragment>
      </div >
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  products: state.products.products
})

export default connect(mapStateToProps, { getAllProducts })(ProductsPage);