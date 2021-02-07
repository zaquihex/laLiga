// Basic imports (react , language and routes imports)
import React from 'react';
import { useSelector } from 'react-redux';
import routes from 'helpers/routes';
import { withRouter, Router, Route, Switch } from 'react-router-dom';
import UsersList from './containers/UsersList';

import history from './history';
import Header from './components/common/Header';
import Login from './containers/Login';
import Authorizated from './components/Authorizated';
import UserDetail from './containers/UserDetail';

const App = () => {
  const { data } = useSelector((state) => state.userDetail);
  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path={routes.detailUser}
          render={(props) => (
            <Authorizated>
              <Header title="title-detailUser" postTitle={data.first_name} history={history} goBack />
              <UserDetail {...props} history={history} />
            </Authorizated>
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
};

export default withRouter(App);
