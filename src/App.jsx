// Basic imports (react , language and routes imports)
import React from 'react';
import routes from 'helpers/routes';
import { withRouter, Router, Route, Switch } from 'react-router-dom';
import UsersList from './containers/UsersList';

import history from './history';
import Header from './components/common/Header';
import Login from './containers/Login';
import Authorizated from './components/Authorizated';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route
        exact
        path={routes.detailUser}
        render={() => (
          <>
            <Header title="title-detailUser" history={history} goBack />
            <span>Detalle de usaurio</span>
          </>
        )}
      />
      <Route
        exact
        path={routes.login}
        render={() => (
          <div className="fullScreen">
            <Header title="title-login" history={history} />
            <Login />
          </div>
        )}
      />
      <Route
        path={routes.root}
        render={() => (
          <Authorizated>
            <Header title="title-listUsers" />
            <UsersList history={history} />
          </Authorizated>
        )}
      />
    </Switch>
  </Router>
);

export default withRouter(App);
