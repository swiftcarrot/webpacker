import moment from 'moment';
import React from 'react';
import { Link } from 'components';

const HomePage = () => {
  return (
    <div>
      {moment().format()}
      <Link to="/dashboard">dashboard</Link>
    </div>
  );
};

export default HomePage;
