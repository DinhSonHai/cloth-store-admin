import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import * as pages from '../pages';

export default function routes() {
  return (
    <div className="container">
      <ToastContainer hideProgressBar={true} />
      <Switch>
        <Route exact path="/admin/login" component={pages.LoginPage} />
        <Route exact path="/admin" component={pages.AdminPage} />
      </Switch>
    </div>
  )
}
