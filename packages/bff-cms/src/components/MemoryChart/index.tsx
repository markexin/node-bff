/**
 * 可视化内存
 */
import React, { useRef, useEffect, FC, memo } from 'react';
import { Liquid } from '@antv/g2plot';

const MemoryChart: FC<{
  data: any;
  title: string;
  style?: any;
}> = (props) => {
  const ref = useRef(null);
  const plotRef = useRef<Liquid>();
  // 初始化
  useEffect(() => {
    plotRef.current = new Liquid(ref.current!, {
      percent: props.data,
      width: 180,
      height: 180,
      statistic: {
        title: {
          formatter: () => props.title,
          style: ({ percent }) => ({
            fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
          }),
        },
      },
      outline: {
        border: 4,
        distance: 8,
      },
      liquidStyle: () => {
        return props.style;
      },
      wave: {
        length: 128,
      },
    });
    plotRef.current.render();
  }, []);
  // 数据更新
  useEffect(() => {
    plotRef.current?.changeData(props.data);
  }, [props.data]);
  return <div ref={ref}></div>;
};

MemoryChart.displayName = 'Dashbord-Chart';

export default memo(MemoryChart);
