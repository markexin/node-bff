/**
 * 可视化内存
 */
import React, { useRef, useEffect } from 'react';
import { Liquid } from '@antv/g2plot';

const DiskChart = () => {
  const ref = useRef(null);
  useEffect(() => {
    const liquidPlot = new Liquid(ref.current!, {
      percent: 0.55,
      width: 180,
      height: 180,
      statistic: {
        title: {
          formatter: () => 'Memory Usage',
          style: ({ percent }) => ({
            fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
          }),
        },
      },
      outline: {
        border: 4,
        distance: 8,
      },
      wave: {
        length: 128,
      },
      liquidStyle: ({ percent }) => {
        return {
          fill: 'rgb(252, 232, 101)',
          stroke: 'rgb(252, 232, 101)',
        };
      },
    });
    liquidPlot.render();
  }, []);
  return <div ref={ref}></div>;
};

export default DiskChart;
