import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import NavBar from '../../pages/layout/NavBar';
import SideBar from '../SideBar';
import './styles.scss';

Wrapper.propTypes = {

};

function Wrapper({ children }) {
  const [title, setTitle] = useState('Products');
  const [subTitle, setSubTitle] = useState('');
  return (
    <div className="wrapper">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">

        <NavBar title={title} subTitle={subTitle} />
        {children}
      </div>
    </div>
  );
}

export default Wrapper;