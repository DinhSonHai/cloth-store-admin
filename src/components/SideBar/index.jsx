import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './styles.scss';
import { AdminHomePageLogo, ProductLogo, ProductLogoActive, OrderLogo, OrderLogoActive } from '../../assets/icons';

SideBar.propTypes = {

};

function SideBar({ tabState, setTabState }) {
  return (
    <div className="side-bar">
      <Link to="/admin" className="logo">
        <AdminHomePageLogo />
      </Link>
      <div className="tab">
        <div className="tab__content">
          {tabState === 'orders' ? (
            <Fragment>
              <div className="active"></div>
              <OrderLogoActive />
              <Link className="link link--active" to="/admin?tab=orders">Orders</Link>
            </Fragment>
          ) : (
            <Fragment>
              <OrderLogo />
              <Link className="link" to="/admin?tab=orders">Orders</Link>
            </Fragment>
          )}
        </div>
        <div className="tab__content">
          {tabState === 'products' ? (
            <Fragment>
              <div className="active"></div>
              <ProductLogoActive />
              <Link className="link link--active" to="/admin?tab=products">Products</Link>
            </Fragment>
          ) : (
            <Fragment>
              <ProductLogo />
              <Link className="link" to="/admin?tab=products">Products</Link>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
