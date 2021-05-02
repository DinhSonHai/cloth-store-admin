import React from 'react';
// import PropTypes from 'prop-types';

import NavBar from '../../pages/layout/NavBar';
import SideBar from '../SideBar';
import './styles.scss';

Wrapper.propTypes = {

};

function Wrapper({ children }) {
  return (
    <div className="wrapper">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
        <NavBar />
        {children}
      </div>
    </div>
  );
}

export default Wrapper;