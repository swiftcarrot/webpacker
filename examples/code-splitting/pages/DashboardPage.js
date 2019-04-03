import React from 'react';
import { Link, Chart } from 'components';

const DashboardPage = () => {
  return (
    <div>
      <Chart />
      DashboardPage
      <Link to="/">Back home</Link>
    </div>
  );
};

export default DashboardPage;
