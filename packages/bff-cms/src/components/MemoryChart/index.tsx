/**
 * 可视化内存
 */
import React, { useRef, useEffect } from 'react';
import { Liquid } from '@antv/g2plot';

const MemoryChart = () => {
  const ref = useRef(null);
  useEffect(() => {
    const liquidPlot = new Liquid(ref.current!, {
      percent: 0.25,
      width: 180,
      height: 180,
      outline: {
        border: 4,
        distance: 8,
      },
      wave: {
        length: 128,
      },
    });
    liquidPlot.render();
  }, []);
  return <div ref={ref}></div>;
};

export default MemoryChart;
