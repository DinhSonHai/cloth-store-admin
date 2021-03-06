
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './app/store.js';
import { LOG_OUT } from './redux/types';
import Routes from './routes';
import setAuthToken from './utils/setAuthToken.js';
import { loadUser } from './redux/actions/auth.js';

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    window.addEventListener('storage', () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
        store.dispatch(loadUser());
      }
      else {
        store.dispatch({ type: LOG_OUT });
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Routes />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
