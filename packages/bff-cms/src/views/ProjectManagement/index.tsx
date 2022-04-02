import React, { FC, useEffect } from 'react';
import {
  Button,
  Table,
  Popconfirm,
  Toast,
  Notification,
} from '@douyinfe/semi-ui';
import moment from 'moment';
import { FormSearch } from './FormSearch';
import { DialogForm } from './DialogForm';
import { useAppDispatch, useAppSelector } from '@/store';
import request from 'utils/request';
import { change, fetchProject } from './project.slice';

function getColumns(func: Function, reset: Function) {
  // 项目删除
  async function handleDelete(_id: string) {
    const { code } = await request.delete(`/api/project/delete/${_id}`);
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
      title: '项目名称',
      dataIndex: 'projectName',
    },
    {
      title: '项目描述',
      dataIndex: 'projectDesc',
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
            title='确定是否要删除此项目？'
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
  const tableData = useAppSelector((state) => state.projectSlice.list);
  const getTableList = () => dispatch(fetchProject());
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
