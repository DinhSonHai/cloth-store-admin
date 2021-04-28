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

function ProductsPage({ products: { products, total }, setSubTitle, getAllProductsForAdmin, getSearchAllProductsForAdmin, removeProduct }) {
  const query = useQuery();
  const history = useHistory();
  const wrapperRef = useRef();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortState, setSortState] = useState('Date Added');
  const [isOpenLimit, setOpenLimit] = useState(false);
  const [limit, setLimit] = useState('6');

  const q = query.get("q");
  const sort = query.get("sort");
  const page = parseInt(query.get("page"));

  useEffect(() => {
    async function handleGetData() {
      setLoading(true);
      if (q) {
        if (sort) {
          await getSearchAllProductsForAdmin(q, sort, page);
        }
        else {
          await getSearchAllProductsForAdmin(q, null, page);
        }
      }
      else {
        if (sort) {
          await getAllProductsForAdmin(sort, page, limit);
        }
        else {
          await getAllProductsForAdmin(null, page, limit);
        }
      }
      setLoading(false);
    }
    handleGetData();
    document.addEventListener('click', closeLimit);
    return () => {
      document.removeEventListener('click', closeLimit)
    }
  }, [getAllProductsForAdmin, q, sort, page, limit]);

  const handleOpenLimit = () => {
    setOpenLimit(!isOpenLimit);
  }

  const handleSelectLimit = (type) => {
    let limitNumber = 6;
    if (type === '6') {
      setLimit('6');
      limitNumber = parseInt(type);
    }
    else if (type === '12') {
      setLimit('12');
      limitNumber = parseInt(type);
    }
    setCurrentPage(1);
    setOpenLimit(false);
    if (q) {
      if (sort) {
        return history.push(`/admin/products?q=${q}&sort=${sort}&page=${1}&limit=${limitNumber}`);
      }
      return history.push(`/admin/products?q=${q}&page=${1}&limit=${limitNumber}`);
    }
    else {
      if (sort) {
        return history.push(`/admin/products?sort=${sort}&page=${1}&limit=${limitNumber}`);
      }
      return history.push(`/admin/products?page=${1}&limit=${limitNumber}`);
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
    let limitNumber = 6;
    if (limit) {
      limitNumber = parseInt(limit);
    }
    if (q) {
      if (sort) {
        return history.push(`/admin/products?q=${q}&sort=${sort}&page=${pageNumber}&limit=${limitNumber}`);
      }
      return history.push(`/admin/products?q=${q}&page=${pageNumber}&limit=${limitNumber}`);
    }
    else {
      if (sort) {
        return history.push(`/admin/products?sort=${sort}&page=${pageNumber}&limit=${limitNumber}`);
      }
      return history.push(`/admin/products?page=${pageNumber}&limit=${limitNumber}`);
    }
  }

  const handleSort = (type) => {
    let limitNumber = 6;
    if (limit) {
      limitNumber = parseInt(limit);
    }

    setCurrentPage(1);

    if (q) {
      return history.push(`/admin/products?q=${q}&sort=${type}&page=${1}&limit=${limitNumber}`);
    }
    else {
      return history.push(`/admin/products?sort=${type}&page=${1}&limit=${limitNumber}`);
    }
  }

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
              {page ? (
                page * limit > total ? (
                  <p>{`Show ${(page - 1) * limit + 1} to ${total} of ${total} entries`}</p>
                ) : (
                  <p>{`Show ${(page - 1) * limit + 1} to ${page * limit} of ${total} entries`}</p>
                )
              ) : (
                <p>{`Show 1 to 6 of ${total} entries`}</p>
              )}
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
                <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} handlePagination={handlePagination} total={total} limit={parseInt(limit)} />
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