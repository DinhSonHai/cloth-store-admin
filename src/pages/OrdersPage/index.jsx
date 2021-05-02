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
import { DropDown, SearchIconv2 } from '../../assets/icons';
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
  const limit = parseInt(query.get("limit"));
  const from = parseInt(query.get("from"));
  const to = parseInt(query.get("to"));

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [sortState, setSortState] = useState(sort || 'date');
  const [isOpenLimit, setOpenLimit] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(limit || 10);
  const [keyWord, setKeyWord] = useState(q || '');

  const [value, onChange] = useState(from && to ? [new Date(from), new Date(to)] : null);

  const handleSearchInputChange = (e) => {
    setKeyWord(e.target.value);
    if (!e.target.value) {
      setSortState('date');
      setCurrentPage(1);
      history.push(`/admin/orders?sort=${'date'}&page=${1}&limit=${currentLimit}`);
    }
  }


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (keyWord) {
        setSortState('date');
        setCurrentPage(1);
        history.push(`/admin/orders?q=${keyWord}&sort=${'date'}&page=${1}&limit=${currentLimit}`);
      }
    }
  }

  const handleSearchClick = (e) => {
    if (keyWord) {
      setSortState('date');
      setCurrentPage(1);
      history.push(`/admin/orders?q=${keyWord}&sort=${'date'}&page=${1}&limit=${currentLimit}`);
    }
  }

  const handleOpenLimit = () => {
    setOpenLimit(!isOpenLimit);
  }

  const handleSelectLimit = (type) => {
    let defaultLimit = 10;
    if (type === 10) {
      setCurrentLimit(10);
      defaultLimit = 10;
    }
    else if (type === 20) {
      setCurrentLimit(20);
      defaultLimit = 20;
    }

    setOpenLimit(false);
    setCurrentPage(1);

    if (keyWord) {
      return history.push(`/admin/orders?q=${keyWord}&sort=${sortState}&page=${1}&limit=${defaultLimit}`);
    }
    else {
      return history.push(`/admin/orders?sort=${sortState}&page=${1}&limit=${defaultLimit}`);
    }
  }

  const closeLimit = (e) => {
    const { target } = e;
    if (!wrapperRef?.current?.contains(target)) {
      setOpenLimit(false);
    }
  }

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (keyWord) {
      return history.push(`/admin/orders?q=${keyWord}&sort=${sortState}&page=${pageNumber}&limit=${currentLimit}`);
    }
    else {
      return history.push(`/admin/orders?sort=${sortState}&page=${pageNumber}&limit=${currentLimit}`);
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
              // setLoading(true);
              completeOrder(orderId, keyWord, sortState, currentPage, currentLimit, value);
              // setLoading(false);
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
              // setLoading(true);
              cancelOrder(orderId, keyWord, sortState, currentPage, currentLimit, value);
              // setLoading(false);
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

  const handleSort = (type) => {
    let defaultSort = 'date';
    if (type === 'today') {
      setSortState(type);
      defaultSort = type;
    }
    else if (type === 'yesterday') {
      setSortState(type);
      defaultSort = type;
    }
    else if (type === 'date') {
      setSortState(type);
      defaultSort = 'date';
    }

    onChange(null);

    setCurrentPage(1);

    if (keyWord) {
      return history.push(`/admin/orders?q=${keyWord}&sort=${defaultSort}&page=${1}&limit=${currentLimit}`);
    }
    else {
      return history.push(`/admin/orders?sort=${defaultSort}&page=${1}&limit=${currentLimit}`);
    }
  }

  const handleDateRangeChange = (value) => {
    onChange(value);
    let start = Date.parse(value[0]);
    let end = Date.parse(value[1]);

    setCurrentPage(1);

    if (keyWord) {
      return history.push(`/admin/orders?q=${keyWord}&from=${start}&to=${end}&page=${1}&limit=${currentLimit}`);
    }
    else {
      return history.push(`/admin/orders?from=${start}&to=${end}&page=${1}&limit=${currentLimit}`);
    }
  }

  useEffect(() => {
    async function handleGetData() {
      setLoading(true);
      if (q) {
        await getSearchAllOrdersForAdmin(keyWord, sortState, currentPage, currentLimit, value);
      }
      else {
        await getAllOrdersForAdmin(sortState, currentPage, currentLimit, value);
      }
      setLoading(false);
    }
    handleGetData();
    document.addEventListener('click', closeLimit);
    return () => {
      document.removeEventListener('click', closeLimit)
    }
  }, [getAllOrdersForAdmin, getSearchAllOrdersForAdmin, q, sort, page, limit, from, to, sortState, currentPage, currentLimit, value, keyWord]);

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
                onChange={value => handleDateRangeChange(value)}
                value={value}
                clearIcon={null}
                yearAriaLabel="Year"
              />
              <button className="today" onClick={() => handleSort('today')}>Today</button>
              <button className="yesterday" onClick={() => handleSort('yesterday')}>Yesterday</button>
              <button className="all-orders" onClick={() => handleSort('date')}>Reset</button>
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
              {total === 0 ? (
                <p>{`No order found`}</p>
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
                      <p onClick={() => handleSelectLimit(10)}>10</p>
                      <p onClick={() => handleSelectLimit(20)}>20</p>
                    </div>
                  )}
                </div>
                <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} handlePagination={handlePagination} total={total} limit={currentLimit} />
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