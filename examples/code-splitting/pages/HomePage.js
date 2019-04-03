import React from 'react';
import { Link, Calendar } from 'components';

const HomePage = () => {
  return (
    <div>
      <Calendar />
      <Link to="/dashboard">dashboard</Link>
    </div>
  );
};

export default HomePage;
