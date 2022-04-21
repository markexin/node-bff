import React, { useRef, useEffect } from 'react';
import { Line } from '@antv/g2plot';

const LineChart = () => {
  const ref = useRef(null);
  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json',
    )
      .then((res) => res.json())
      .then((data) => {
        const line = new Line(ref.current!, {
          data,
          padding: 'auto',
          xField: 'Date',
          yField: 'scales',
          xAxis: {
            tickCount: 5,
          },
        });

        line.render();
      });
  }, []);
  return <div ref={ref}></div>;
};

export default LineChart;
