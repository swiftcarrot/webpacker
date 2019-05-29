import './global.scss';
import React from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import Loadable from 'react-loadable';
import { Loading } from 'components';

const HomePage = Loadable({
  loader: () => import('pages/HomePage'),
  loading: Loading
});

const DashboardPage = Loadable({
  loader: () => import('pages/DashboardPage'),
  loading: Loading
});

const Root = () => {
  return (
    <Router>
      <HomePage path="/" />
      <DashboardPage path="/dashboard" />
    </Router>
  );
};

render(<Root />, document.getElementById('root'));
