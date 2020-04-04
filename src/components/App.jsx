import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Home from './Home/Home';
import NotFoundApp from './NotFoundApp';

export default () => (
  <HashRouter>
    <Switch>
      <Route path="/home" component={Home} />
      <Route component={NotFoundApp} />
    </Switch>
  </HashRouter>
);
