import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
// import PropTypes from 'prop-types';

import { getAllOrdersForAdmin, getSearchAllOrdersForAdmin, completeOrder, cancelOrder } from '../../redux/actions/orders';
import Wrapper from '../../components/Wrapper';
import Spinner from '../../components/Spinner';
import PaginationComponent from '../../components/PaginationComponent';
import { DropDown, PlusWhite, SearchIconv2, EditIcon, RemoveIcon, CalendarIcon } from '../../assets/icons';
import './styles.scss';

OrdersPage.propTypes = {

};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function OrdersPage({ orders: { orders, total }, getAllOrdersForAdmin, getSearchAllOrdersForAdmin, completeOrder, cancelOrder }) {
  const query = useQuery();
  const history = useHistory();
  const wrapperRef = useRef();

  const q = query.get("q");
  const sort = query.get("sort");
  const page = parseInt(query.get("page"));

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [sortState, setSortState] = useState('Date Added');
  const [isOpenLimit, setOpenLimit] = useState(false);
  const [limit, setLimit] = useState('10');
  const [keyWord, setKeyWord] = useState(q || '');

  const handleSearchInputChange = (e) => {
    setKeyWord(e.target.value);
  }


  const handleKeyPress = (e) => {
    let limitNumber = 6;
    if (limit) {
      limitNumber = parseInt(limit);
    }

    let type = 'date';
    if (sort) {
      type = sort;
    }

    setCurrentPage(1);

    if (e.key === 'Enter') {
      history.push(`/admin/orders?q=${keyWord}&sort=${type}&page=${1}&limit=${limitNumber}`);
    }
  }

  const handleSearchClick = (e) => {
    let limitNumber = 6;
    if (limit) {
      limitNumber = parseInt(limit);
    }

    let type = 'date';
    if (sort) {
      type = sort;
    }

    setCurrentPage(1);

    history.push(`/admin/orders?q=${keyWord}&sort=${type}&page=${1}&limit=${limitNumber}`);
  }

  const handleOpenLimit = () => {
    setOpenLimit(!isOpenLimit);
  }

  const handleSelectLimit = (type) => {
    let limitNumber = 10;
    if (type === '10') {
      setLimit('10');
      limitNumber = parseInt(type);
    }
    else if (type === '20') {
      setLimit('20');
      limitNumber = parseInt(type);
    }
    setCurrentPage(1);
    setOpenLimit(false);
    if (q) {
      if (sort) {
        return history.push(`/admin/orders?q=${q}&sort=${sort}&page=${1}&limit=${limitNumber}`);
      }
      return history.push(`/admin/orders?q=${q}&page=${1}&limit=${limitNumber}`);
    }
    else {
      if (sort) {
        return history.push(`/admin/orders?sort=${sort}&page=${1}&limit=${limitNumber}`);
      }
      return history.push(`/admin/orders?page=${1}&limit=${limitNumber}`);
    }
  }

  const closeLimit = (e) => {
    const { target } = e;
    if (!wrapperRef?.current?.contains(target)) {
      setOpenLimit(false);
    }
  }

  const handlePagination = (pageNumber) => {
    let limitNumber = 6;
    if (limit) {
      limitNumber = parseInt(limit);
    }
    if (q) {
      if (sort) {
        return history.push(`/admin/orders?q=${q}&sort=${sort}&page=${pageNumber}&limit=${limitNumber}`);
      }
      return history.push(`/admin/orders?q=${q}&page=${pageNumber}&limit=${limitNumber}`);
    }
    else {
      if (sort) {
        return history.push(`/admin/orders?sort=${sort}&page=${pageNumber}&limit=${limitNumber}`);
      }
      return history.push(`/admin/orders?page=${pageNumber}&limit=${limitNumber}`);
    }
  }

  const handleCompleteOrder = (orderId) => {
    confirmAlert({
      title: 'Confirm to mark order as completed',
      message: '',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            async function cancel() {
              setLoading(true);
              await completeOrder(orderId, sort, page, limit);
              setLoading(false);
            }
            cancel();
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  const handleCancelOrder = (orderId) => {
    confirmAlert({
      title: 'Confirm to mark order as cancelled',
      message: '',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            async function cancel() {
              setLoading(true);
              await cancelOrder(orderId, sort, page, limit);
              setLoading(false);
            }
            cancel();
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  useEffect(() => {
    async function handleGetData() {
      setLoading(true);
      if (q) {
        if (sort) {
          await getSearchAllOrdersForAdmin(q, sort, page, limit);
        }
        else {
          await getSearchAllOrdersForAdmin(q, null, page, limit);
        }
      }
      else {
        if (sort) {
          await getAllOrdersForAdmin(sort, page, limit);
        }
        else {
          await getAllOrdersForAdmin(null, page, limit);
        }
      }
      setLoading(false);
    }
    handleGetData();
    document.addEventListener('click', closeLimit);
    return () => {
      document.removeEventListener('click', closeLimit)
    }
  }, [getAllOrdersForAdmin, q, sort, page, limit]);

  return (
    <Wrapper>
      <div className="orders">
        <Fragment>
          <div className="orders__option">
            <div className="sort">

              <p className="sort__label">ORDERED DATE</p>
              <DateRangePicker
                calendarAriaLabel="Toggle calendar"
                clearAriaLabel="Clear value"
                dayAriaLabel="Day"
                monthAriaLabel="Month"
                nativeInputAriaLabel="Date"
                // onChange={onChange}
                // value={value}
                clearIcon={null}
                yearAriaLabel="Year"
              />
              <button className="today">Today</button>
              <button className="yesterday">Yesterday</button>
            </div>
            <div className="action">
              <div className="search-box">
                <div className="search-box__icon" onClick={handleSearchClick}>
                  <SearchIconv2 />
                </div>
                <input className="search__input" type="text" placeholder="Search order by product name" value={keyWord} onChange={handleSearchInputChange} onKeyPress={handleKeyPress} />
              </div>
            </div>
          </div>
          <div className="orders__table">
            <table cellSpacing="0">
              <thead>
                <tr>
                  <th style={{ width: "12%" }}>ORDER ID</th>
                  <th style={{ width: "15%" }}>ORDERED DATE</th>
                  <th style={{ width: "45%" }}>DETAIL</th>
                  <th style={{ width: "10%" }}>TOTAL ($)</th>
                  <th style={{ width: "10%" }}>STATUS</th>
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
                  orders && orders.map(order => (
                    <tr key={order._id}>
                      <td>
                        {order.orderId}
                      </td>
                      <td>{new Date(order.orderedDate).toDateString()}</td>
                      <td>{order.detail[0].name} ({order.detail[0].sizeId.sizeName}) x {order.detail[0].quantity}</td>
                      <td>{order.total}.00</td>
                      <td>
                        <div className="status">
                          {order.status === 2 && <p className="pending">Pending</p>}
                          {order.status === 1 && <p className="completed">Completed</p>}
                          {order.status === 0 && <p className="cancelled">Cancelled</p>}
                        </div>
                      </td>
                      <td>
                        {order.status === 2 && (
                          <div className="action">
                            <p>Actions</p>
                            <DropDown />
                            <div className="dropdown">
                              <div onClick={() => handleCompleteOrder(order._id)}>
                                <div className="dropdown--completed"></div>
                                <p>Mark as Completed</p>
                              </div>
                              <div onClick={() => handleCancelOrder(order._id)}>
                                <div className="dropdown--cancelled"></div>
                                <p>Mask as Cancelled</p>
                              </div>
                            </div>
                          </div>
                        )}
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
                limit > total ? (
                  <p>{`Show 1 to ${total} of ${total} entries`}</p>
                ) : (
                  <p>{`Show 1 to 6 of ${total} entries`}</p>
                )
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
                      <p onClick={() => handleSelectLimit('10')}>10</p>
                      <p onClick={() => handleSelectLimit('20')}>20</p>
                    </div>
                  )}
                </div>
                <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} handlePagination={handlePagination} total={total} limit={parseInt(limit)} />
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  orders: state.orders
})

export default connect(mapStateToProps, { getAllOrdersForAdmin, getSearchAllOrdersForAdmin, completeOrder, cancelOrder })(OrdersPage);