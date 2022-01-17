import React from 'react';
import { Button, Table } from '@douyinfe/semi-ui';
import { FormSearch } from './FormSearch';
import { SideSheetForm } from './SideSheetForm';
import { useAppDispatch } from '@/store';
import { change } from './interface.slice';

function getColumns(func: Function) {
  return [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '所属项目',
      dataIndex: 'group',
    },
    {
      title: '接口地址',
      dataIndex: 'desc',
    },
    {
      title: '操作人',
      dataIndex: 'creater',
    },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: () => (
        <>
          <Button onClick={() => func()}>编辑</Button>
          <Button type='danger' style={{ marginLeft: '20px' }}>
            删除
          </Button>
        </>
      ),
    },
  ];
}

const data = [
  {
    id: 'xxxxx',
    group: 'xx项目',
    desc: '国服XXXX项目',
    updateTime: '2022-01-01',
    creater: '某某某',
  },
];

const InterfaceManagement = () => {
  const dispatch = useAppDispatch();

  // 弹窗唤起
  function onOpenHandler() {
    dispatch(change());
  }

  return (
    <>
      <FormSearch />
      <Table
        bordered
        columns={getColumns(onOpenHandler)}
        dataSource={data}
        pagination={true}
      />
      <SideSheetForm />
    </>
  );
};

export default InterfaceManagement;
