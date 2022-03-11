import React from 'react';
import { Button, Table } from '@douyinfe/semi-ui';
import { FormSearch } from './FormSearch';
import { DialogForm } from './DialogForm';
import { useAppDispatch } from '@/store';
import { change } from './origin.slice';

function getColumns(func: Function) {
  return [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '域名地址',
      dataIndex: 'domainUrl',
    },
    {
      title: '域名描述',
      dataIndex: 'domainDesc',
    },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
    },
    {
      title: '操作人',
      dataIndex: 'creater',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: () => (
        <>
          <Button onClick={() => func()}>规则</Button>
          <Button style={{ marginLeft: '20px' }} onClick={() => func()}>
            上线
          </Button>
          <Button style={{ marginLeft: '20px' }} onClick={() => func()}>
            回滚
          </Button>
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
    id: '1',
    domainUrl: 'xxx.abc.com',
    domainDesc: '测试地址',
    updateTime: '2022-01-01',
    creater: '某某某',
  },
];

const ProjectManagement = () => {
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
      <DialogForm />
    </>
  );
};

export default ProjectManagement;
