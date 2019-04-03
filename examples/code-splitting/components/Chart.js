import React from 'react';
import {
  XYPlot,
  HorizontalGridLines,
  LineSeries,
  XAxis,
  YAxis
} from 'react-vis';
import RVStyles from 'react-vis-styles';

const Chart = () => {
  return (
    <div>
      <RVStyles />
      <XYPlot width={300} height={300}>
        <HorizontalGridLines />
        <LineSeries data={[{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }]} />
        <XAxis />
        <YAxis />
      </XYPlot>
    </div>
  );
};

export default Chart;
