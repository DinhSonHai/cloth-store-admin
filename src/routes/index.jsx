import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthRoute from './AuthRoute';

import * as pages from '../pages';
import PrivateRoute from './PrivateRoute';

export default function routes() {
  return (
    <div className="container">
      <ToastContainer hideProgressBar={true} />
      <Switch>
        <Route exact path="/" render={() =>
          (<Redirect to="/admin/products" />)}
        />
        <AuthRoute exact path="/admin/login" component={pages.LoginPage} />
        <PrivateRoute exact path="/admin" component={pages.AdminPage} />
        <PrivateRoute exact path="/admin/products" component={pages.ProductsPage} />
        <PrivateRoute exact path="/admin/orders" component={pages.OrdersPage} />
        <PrivateRoute exact path="/admin/products/add" component={pages.AddProductPage} />
        <PrivateRoute exact path="/admin/products/edit/:productId" component={pages.AddProductPage} isEdit={true} />
      </Switch>
    </div>
  )
}
