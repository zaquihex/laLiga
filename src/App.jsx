// Basic imports (react , language and routes imports)
import React from 'react';
import { withTranslation } from 'react-i18next';
import { instanceOf, func } from 'prop-types';
import routes from 'helpers/routes';
import { withRouter, Router, Route, Switch } from 'react-router-dom';

const App = ({ t, history }) => (
  <Router history={history}>
    <Switch>
      <Route
        path={routes.root}
        render={() => (
          <div data-testid="App-div-main">{t('home')}</div>
        )}
      />
    </Switch>
  </Router>
);

App.propTypes = {
  t: func.isRequired,
  history: instanceOf(Object),
};

App.defaultProps = {
  history: {},
};

export default withTranslation()(withRouter(App));
