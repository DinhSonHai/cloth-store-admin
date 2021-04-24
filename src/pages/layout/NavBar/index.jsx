import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../../redux/actions/auth';
// import PropTypes from 'prop-types';

import { DropDown } from '../../../assets/icons';
import './styles.scss';

NavBar.propTypes = {

};

function NavBar({ user, title, subTitle, logout }) {
  const history = useHistory();

  return (
    <div className="admin-navbar">
      <h1 className="title">{title}</h1>
      { subTitle && <p className="sub-title">{subTitle}</p>}
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
