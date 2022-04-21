/**
 * 可视化CPU使用率
 */
import React, { useRef, useEffect, FC } from 'react';
import { Area } from '@antv/g2plot';
import moment from 'moment';

const AreaChart: FC<{
  title: string;
  yField: string;
  data: any;
}> = (props) => {
  const ref = useRef(null);
  const plotRef = useRef<Area>();
  const source = useRef<
    {
      time: number;
      [props: string]: number;
    }[]
  >([]);
  // 初始化
  useEffect(() => {
    plotRef.current = new Area(ref.current!, {
      data: source.current,
      xField: 'time',
      yField: props.yField,
      height: 180,
      supportCSSTransform: true,
      smooth: true,
      yAxis: {
        title: {
          text: props.title,
        },
      },
      xAxis: {
        range: [0, 1],
        title: {
          text: '时间',
        },
        label: {
          formatter: (value) => {
            return moment(+value).format('hh:mm:ss');
          },
        },
      },
      areaStyle: () => {
        return {
          fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
        };
      },
    });
    plotRef.current.render();
  }, []);
  // 数据更新
  useEffect(() => {
    if (source.current.length > 19) {
      source.current.shift();
    }
    source.current.push({
      time: Date.now(),
      [props.yField]: props.data,
    });
    plotRef.current?.changeData(source.current);
  }, [props.data]);
  return <div ref={ref}></div>;
};

export default AreaChart;
