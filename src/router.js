import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import LoginPage from './routes/login';
import LayoutPage from './routes/layout/index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={LayoutPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
