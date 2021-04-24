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
          (<Redirect to="/admin" />)}
        />
        <AuthRoute exact path="/admin/login" component={pages.LoginPage} />
        <PrivateRoute exact path="/admin" component={pages.AdminPage} />
      </Switch>
    </div>
  )
}
