import React, { FC, useEffect } from 'react';
import {
  Button,
  Table,
  Popconfirm,
  Toast,
  Notification,
  SideSheet,
} from '@douyinfe/semi-ui';
import moment from 'moment';
import { FormSearch } from './FormSearch';
import { WorkFlow } from '@/components/WorkFlow';
import NginxAuto from '@/components/NginxAuto';
import InterfaceForm from '@/components/InterfaceForm';
import { useAppDispatch, useAppSelector } from '@/store';
import request from 'utils/request';
import {
  change,
  fetchInterface,
  typeEnum,
  statusEnum,
} from './interface.slice';

import './index.scss';

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
      title: '规则地址',
      dataIndex: 'apiPath',
    },
    {
      title: '归属',
      dataIndex: 'originName',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (item: keyof typeof typeEnum) => <span>{typeEnum[item]}</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (item: keyof typeof statusEnum) => {
        for (const key in statusEnum) {
          if (statusEnum[key] === item) {
            return <span>{key}</span>;
          }
        }
      },
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
  const tableData = useAppSelector((state) => state.interfaceSlice.list);
  const visible = useAppSelector((state) => state.interfaceSlice.visible);
  const currentOpType = useAppSelector((state) => state.interfaceSlice.type);
  const getTableList = () => dispatch(fetchInterface());
  // const [originList, setOriginList] = useState<OriginGetListSync[]>([]);

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
      <SideSheet
        title='新增规则配置'
        width={'100%'}
        visible={visible}
        onCancel={() => dispatch(change(''))}>
        <WorkFlow>
          <InterfaceForm />
          {currentOpType === 0 ? (
            <NginxAuto className='interface-border' />
          ) : null}
        </WorkFlow>
      </SideSheet>
    </>
  );
};

export default ProjectManagement;
