/**
 * 可视化内存
 */
import React, { useRef, useEffect } from 'react';
import { Area } from '@antv/g2plot';

const AreaChart = () => {
  const ref = useRef(null);
  useEffect(() => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json',
    )
      .then((res) => res.json())
      .then((data) => {
        const area = new Area(ref.current!, {
          data,
          xField: 'timePeriod',
          yField: 'value',
          height: 180,
          xAxis: {
            range: [0, 1],
          },
        });
        area.render();
      });
  }, []);
  return <div ref={ref}></div>;
};

export default AreaChart;
