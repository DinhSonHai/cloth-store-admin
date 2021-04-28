import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { logout } from '../../../redux/actions/auth';
// import PropTypes from 'prop-types';

import { DropDown } from '../../../assets/icons';
import './styles.scss';

NavBar.propTypes = {

};

function NavBar({ user, title, subTitle, logout }) {
  const history = useHistory();
  const location = useLocation().pathname;

  const matchRoute = (route) => {
    if (location.length === 1) {
      return null;
    }
    return location === route;
  }

  const includeRoute = (route) => {
    if (location.length === 1) {
      return null;
    }
    return location.includes(route);
  }

  return (
    <div className="admin-navbar">

      {
        matchRoute("/admin/products") &&
        <Fragment>
          <p className="title">Products</p>
        </Fragment>
      }

      {
        matchRoute("/admin/orders") &&
        <Fragment>
          <p className="title">Orders</p>
        </Fragment>
      }

      {
        matchRoute("/admin/products/add") &&
        <Fragment>
          <p className="title">Add product</p>
          <p className="sub-title">Products / Add product</p>
        </Fragment>
      }

      {
        includeRoute("/admin/products/edit") &&
        <Fragment>
          <p className="title">Edit product</p>
          <p className="sub-title">Products / Edit product</p>
        </Fragment>
      }

      { user && (
        <div className="account">
          <img src={user.avatar} alt="Admin avatar" className="avatar" />
          <p className="name">{user.name}</p>
          <DropDown />
          <div className="dropdown">
            <div>
              <Link to="/admin?tab=profile" className="dropdown__link">Account Setting</Link>
            </div>
            <section className="dropdown__divider"></section>
            <div onClick={logout} className="dropdown__link">Logout</div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(NavBar);
