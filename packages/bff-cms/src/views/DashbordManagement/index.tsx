import React, { useEffect, useState } from 'react';
import MemoryChart from '@/components/MemoryChart';
// import DiskChart from '@/components/DiskChart';
import CPUChart from '@/components/CPUChart';
import AreaChart from '@/components/AreaChart';
import LineChart from '@/components/LineChart';
import socket from 'utils/socket';

import './index.scss';

// import { FormSearch } from './FormSearch';
// import { SideSheetForm } from './SideSheetForm';
// import { useAppDispatch } from '@/store';
// import { change } from './dashbord.slice';

const StylePrefix = 'dashbord';

const InterfaceManagement = () => {
  const [cpu, setCpu] = useState<number>(0);
  const [memory, setMemory] = useState<number>(0);
  const [loop, setLoop] = useState<number>(0);
  const [load, setLoad] = useState<number>(0);
  const [heap, setHeap] = useState<number>(0);
  useEffect(() => {
    socket.addEventListener('message', (messageEvent) => {
      const { data } = messageEvent;
      try {
        const { cpu, memory, loop, load, heap } = JSON.parse(data);
        setCpu(cpu);
        setMemory(memory);
        setLoop(+loop.sum.toFixed(2));
        setLoad(+load[0].toFixed(2));
        setHeap(+(heap.used_heap_size / 1024 / 1024).toFixed(1));
      } catch (error) {
        console.log('--socket data error--', error);
      }
    });
  }, []);
  return (
    <div className={`${StylePrefix}-wapper`}>
      <div className={`${StylePrefix}-moniter`}>
        {/* <ul>
          <li>
            <MemoryChart data={cpu} title={'CPU 使用率'} />
          </li>
          <li>
            <MemoryChart
              style={{
                fill: 'rgb(252, 232, 101)',
                stroke: 'rgb(252, 232, 101)',
              }}
              data={memory}
              title={'Memory 使用率'}
            />
          </li>
          <li>
            <MemoryChart
              style={{
                fill: 'rgb(90, 194, 98)',
                stroke: 'rgb(90, 194, 98)',
              }}
              data={heap}
              title={'Heap Usage'}
            />
          </li>
        </ul> */}
        {/* <LineChart /> */}
        <AreaChart yField={'cpu'} data={cpu} title={'CPU 使用率'} />
        <AreaChart
          yField={'memory'}
          data={memory}
          title={'内存占用量（单位: MB）'}
        />
      </div>
      <div className={`${StylePrefix}-moniter`}>
        <AreaChart
          yField={'loop'}
          data={loop}
          title={'事件循环指标（单位: MS）'}
        />
        <AreaChart yField={'load'} data={load} title={'平均负载'} />
      </div>
      <div className={`${StylePrefix}-datasource`}>
        <AreaChart
          yField={'heap'}
          data={heap}
          title={'堆内存占用量（单位: MB）'}
        />
      </div>
    </div>
  );
};

export default InterfaceManagement;
