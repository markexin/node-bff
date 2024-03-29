import React, { FC, useEffect } from 'react';
import moment from 'moment';
import {
  Button,
  Table,
  Notification,
  Toast,
  Popconfirm,
} from '@douyinfe/semi-ui';
import { FormSearch } from './FormSearch';
import { DialogForm, Environment } from './DialogForm';
import { useAppDispatch, useAppSelector } from '@/store';
import request from 'utils/request';
import { change, fetchOrigin } from './origin.slice';

function getColumns(func: Function, reset: Function) {
  // 项目删除
  async function handleDelete(_id: string) {
    const { code } = await request.delete(`/api/origin/delete/${_id}`);
    if (code === 0) {
      Notification.success({
        duration: 2,
        position: 'top',
        title: '删除成功！',
      });
      reset();
    }
  }

  // 删除取消
  function onCancel() {
    Toast.warning('取消删除！');
  }
  return [
    {
      title: '环境',
      dataIndex: 'environment',
      render: (item: keyof typeof Environment) => (
        <span>{Environment[item]}</span>
      ),
    },
    {
      title: '域名地址',
      dataIndex: 'originPath',
    },
    {
      title: '所属项目',
      dataIndex: 'projectName',
    },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
      render: (item: string) => (
        <span>{moment(item).format('YYYY-MM-DD  hh:mm:ss')}</span>
      ),
    },
    {
      title: '操作人',
      dataIndex: 'updater',
    },
    {
      title: '操作',
      dataIndex: '_id',
      render: (_id: string) => (
        <>
          <Button onClick={() => func(_id)}>编辑</Button>
          <Popconfirm
            title='确定是否要删除此域名？'
            content='此删除将不可逆'
            onConfirm={handleDelete.bind(null, _id)}
            onCancel={onCancel}>
            {/* https://github.com/DouyinFE/semi-design/issues/201 */}
            <Button type='danger' style={{ marginLeft: '20px' }}>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
}

const ProjectManagement: FC = () => {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector((state) => state.originSlice.list);
  const getTableList = () => dispatch(fetchOrigin());
  // 弹窗唤起
  function onOpenHandler(id: string) {
    dispatch(change(id));
  }

  useEffect(() => {
    getTableList();
  }, []);

  return (
    <>
      <FormSearch />
      <Table
        bordered
        columns={getColumns(onOpenHandler, getTableList)}
        dataSource={tableData}
        pagination={true}
      />
      <DialogForm />
    </>
  );
};

export default ProjectManagement;
