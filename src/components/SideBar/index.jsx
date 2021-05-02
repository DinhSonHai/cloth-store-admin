import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './styles.scss';
import { AdminHomePageLogo, ProductLogo, ProductLogoActive, OrderLogo, OrderLogoActive } from '../../assets/icons';

SideBar.propTypes = {

};

function SideBar(props) {
  const location = useLocation().pathname;

  const checkRoute = (route) => {
    if (location.length === 1) {
      return null;
    }
    return location.includes(route);
  }

  return (
    <Fragment>
      <Link to="/" className="logo">
        <AdminHomePageLogo />
      </Link>
      <div className="tab">
        <div className="tab__content">
          {/* {tab === 0 ? (
            <Fragment>
              <div className="active"></div>
              <OrderLogoActive />
              <Link className="link link--active" to="/admin/orders">Orders</Link>
            </Fragment>
          ) : (
            <Fragment>
              <OrderLogo />
              <Link className="link" to="/admin/orders">Orders</Link>
            </Fragment>
          )} */}
          {checkRoute('/orders') ? (
            <Fragment>
              <div className="active"></div>
              <OrderLogoActive />
              <Link className="link link--active" to="/admin/orders">Orders</Link>
            </Fragment>
          ) : (
            <Fragment>
              <OrderLogo />
              <Link className="link" to="/admin/orders">Orders</Link>
            </Fragment>
          )}
        </div>
        <div className="tab__content">
          {checkRoute('/products') ? (
            <Fragment>
              <div className="active"></div>
              <ProductLogoActive />
              <Link className="link link--active" to="/admin/products">Products</Link>
            </Fragment>
          ) : (
            <Fragment>
              <ProductLogo />
              <Link className="link" to="/admin/products">Products</Link>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default SideBar;
