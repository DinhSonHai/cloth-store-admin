import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
// import PropTypes from 'prop-types';

import { getAllProductsForAdmin, getSearchAllProductsForAdmin, removeProduct } from '../../redux/actions/products';
import Spinner from '../../components/Spinner';
import PaginationComponent from '../../components/PaginationComponent';
import SortBox from '../../components/CustomFields/SortBox';
import { DropDown, PlusWhite, SearchIconv2, EditIcon, RemoveIcon } from '../../assets/icons';
import './styles.scss';
import Wrapper from '../../components/Wrapper';

ProductsPage.propTypes = {

};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductsPage({ products: { products, total }, getAllProductsForAdmin, getSearchAllProductsForAdmin, removeProduct }) {
  const query = useQuery();
  const history = useHistory();
  const wrapperRef = useRef();

  const q = query.get("q");
  const sort = query.get("sort");
  const page = parseInt(query.get("page"));
  const limit = parseInt(query.get("limit"));

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [sortState, setSortState] = useState(sort || 'date');
  const [isOpenLimit, setOpenLimit] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(limit || 6);
  const [keyWord, setKeyWord] = useState(q || '');

  const handleSearchInputChange = (e) => {
    setKeyWord(e.target.value);
    if (!e.target.value) {
      setSortState('date');
      setCurrentPage(1);
      history.push(`/admin/products?sort=${'date'}&page=${1}&limit=${currentLimit}`);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (keyWord) {
        setSortState('date');
        setCurrentPage(1);
        history.push(`/admin/products?q=${keyWord}&sort=${'date'}&page=${1}&limit=${currentLimit}`);
      }
    }
  }

  const handleSearchClick = (e) => {
    if (keyWord) {
      setSortState('date');
      setCurrentPage(1);
      history.push(`/admin/products?q=${keyWord}&sort=${'date'}&page=${1}&limit=${currentLimit}`);
    }
  }

  const handleOpenLimit = () => {
    setOpenLimit(!isOpenLimit);
  }

  const handleSelectLimit = (type) => {
    let defaultLimit = 6;
    if (type === 6) {
      setCurrentLimit(6);
      defaultLimit = 6;
    }
    else if (type === 12) {
      setCurrentLimit(12);
      defaultLimit = 12;
    }

    setOpenLimit(false);
    setCurrentPage(1);

    if (keyWord) {
      return history.push(`/admin/products?q=${keyWord}&sort=${sortState}&page=${1}&limit=${defaultLimit}`);
    }
    else {
      return history.push(`/admin/products?sort=${sortState}&page=${1}&limit=${defaultLimit}`);
    }
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

  const handleEditProduct = (productId) => {
    return history.push(`/admin/products/edit/${productId}`);
  }

  const handleRemoveProduct = (productId) => {
    confirmAlert({
      title: 'Confirm to remove product',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => removeProduct(productId)
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (keyWord) {
      return history.push(`/admin/products?q=${keyWord}&sort=${sortState}&page=${pageNumber}&limit=${currentLimit}`);
    }
    else {
      return history.push(`/admin/products?sort=${sortState}&page=${pageNumber}&limit=${currentLimit}`);
    }
  }

  const handleSort = (type) => {
    let defaultSort = 'date';
    if (type === 'date') {
      setSortState(type);
      defaultSort = type;
    }
    else if (type === 'profit') {
      setSortState(type);
      defaultSort = type;
    }

    setCurrentPage(1);

    if (keyWord) {
      return history.push(`/admin/products?q=${keyWord}&sort=${defaultSort}&page=${1}&limit=${currentLimit}`);
    }
    else {
      return history.push(`/admin/products?sort=${defaultSort}&page=${1}&limit=${currentLimit}`);
    }
  }

  useEffect(() => {
    async function handleGetData() {
      setLoading(true);
      if (q) {
        await getSearchAllProductsForAdmin(keyWord, sortState, currentPage, currentLimit);
      }
      else {
        await getAllProductsForAdmin(sortState, currentPage, currentLimit);
      }
      setLoading(false);
    }
    handleGetData();
    document.addEventListener('click', closeLimit);
    return () => {
      document.removeEventListener('click', closeLimit)
    }
  }, [getAllProductsForAdmin, getSearchAllProductsForAdmin, q, sort, page, limit, sortState, currentPage, currentLimit]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <div className="products">
        <Fragment>
          <div className="products__option">
            <div className="sort">

              <p className="sort__label">SORT BY</p>
              <SortBox handleSort={handleSort} sortState={sortState} setSortState={setSortState} />
            </div>
            <div className="action">
              <div className="search-box">
                <div className="search-box__icon" onClick={handleSearchClick}>
                  <SearchIconv2 />
                </div>
                <input className="search__input" type="text" placeholder="Search product" value={keyWord} onChange={handleSearchInputChange} onKeyPress={handleKeyPress} />
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
                            <div onClick={() => handleEditProduct(product._id)}>
                              <EditIcon />
                              <p>Edit</p>
                            </div>
                            <div onClick={() => handleRemoveProduct(product._id)}>
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
              {total === 0 ? (
                <p>{`No product found`}</p>
              ) : (
                currentPage * currentLimit > total ? (
                  <p>{`Show ${(currentPage - 1) * currentLimit + 1} to ${total} of ${total} entries`}</p>
                ) : (
                  <p>{`Show ${(currentPage - 1) * currentLimit + 1} to ${currentPage * currentLimit} of ${total} entries`}</p>
                )
              )}
              <div className="pagination">
                <div className="limit" ref={wrapperRef}>
                  <div className="select-box" onClick={handleOpenLimit}>
                    <p className="type">{currentLimit}</p>
                    <span className={isOpenLimit ? "rotate" : ""}>
                      <DropDown />
                    </span>
                  </div>
                  {isOpenLimit && (
                    <div className="select__option">
                      <p onClick={() => handleSelectLimit(6)}>6</p>
                      <p onClick={() => handleSelectLimit(12)}>12</p>
                    </div>
                  )}
                </div>
                <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} handlePagination={handlePagination} total={total} limit={currentLimit} />
              </div>
            </div>
          </div>
        </Fragment>
      </div >
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  products: state.products
})

export default connect(mapStateToProps, { getAllProductsForAdmin, getSearchAllProductsForAdmin, removeProduct })(ProductsPage);