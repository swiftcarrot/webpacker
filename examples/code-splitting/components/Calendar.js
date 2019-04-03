import React from 'react';
import moment from 'moment';

const Calendar = () => {
  return <div> {moment().format()}</div>;
};

export default Calendar;
