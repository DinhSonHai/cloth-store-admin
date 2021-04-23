import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './styles.scss';
import SideBar from '../../components/SideBar';
import * as pages from '../index';
import NavBar from '../layout/NavBar';

AdminPage.propTypes = {

};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AdminPage(props) {
  const query = useQuery();
  let tab = query.tab || 'products';

  const [tabState, setTabState] = useState(tab);
  const [title, setTitle] = useState('Products')

  useEffect(() => {
    setTabState(tab);
  }, [tab]);

  function renderPage() {
    switch (tabState) {
      case 'products':
        return <pages.ProductsPage />;
      // case 'orders':
      //   return <Type />;
      default:
        return <pages.ProductsPage />;
    }
  }

  return (
    <div className="admin-page">
      <SideBar tabState={tabState} setTabState={setTabState} />
      {/* <Route exact path="/admin/products" component={pages.AdminProductsPage} /> */}
      <div className="content">
        <NavBar title={title} />
        {renderPage()}
      </div>
    </div>
  );
}

export default AdminPage;
