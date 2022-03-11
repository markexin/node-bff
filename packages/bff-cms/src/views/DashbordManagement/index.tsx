import React from 'react';
import MemoryChart from '@/components/MemoryChart';
import DiskChart from '@/components/DiskChart';
import CPUChart from '@/components/CPUChart';
import AreaChart from '@/components/AreaChart';
import LineChart from '@/components/LineChart';

import './index.scss';

// import { FormSearch } from './FormSearch';
// import { SideSheetForm } from './SideSheetForm';
// import { useAppDispatch } from '@/store';
// import { change } from './dashbord.slice';

const StylePrefix = 'dashbord';

const InterfaceManagement = () => {
  return (
    <div className={`${StylePrefix}-wapper`}>
      <div className={`${StylePrefix}-moniter`}>
        <ul>
          <li>
            <MemoryChart />
          </li>
          <li>
            <DiskChart />
          </li>
          <li>
            <CPUChart />
          </li>
        </ul>
        <AreaChart />
      </div>
      <div className={`${StylePrefix}-datasource`}>
        <LineChart />
      </div>
    </div>
  );
};

export default InterfaceManagement;
