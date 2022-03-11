import React from 'react';
import { SideSheet } from '@douyinfe/semi-ui';
import { WorkFlow } from '@/components/WorkFlow';
import { useAppSelector, useAppDispatch } from '@/store';
import { change } from './dashbord.slice';

export const SideSheetForm = () => {
  const visible = useAppSelector((state) => state.dashbordSlice.visible);
  const dispatch = useAppDispatch();

  // 取消弹窗
  function onCancelHandler() {
    dispatch(change());
  }

  return (
    <SideSheet
      title='接口可视化编辑器'
      size='large'
      width={'100%'}
      visible={visible}
      onCancel={() => onCancelHandler()}>
      <WorkFlow />
    </SideSheet>
  );
};
