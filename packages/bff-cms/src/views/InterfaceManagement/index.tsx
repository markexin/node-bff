import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Table,
  Popconfirm,
  Toast,
  Notification,
  SideSheet,
  Col,
  Row,
} from '@douyinfe/semi-ui';
import moment from 'moment';
import { FormSearch } from './FormSearch';
import { WorkFlow } from '@/components/WorkFlow';
// import NginxAuto from '@/components/NginxAuto';
import InterfaceForm from '@/components/InterfaceForm';
import { useAppDispatch, useAppSelector } from '@/store';
import { PostTools } from '@/components/PostTools';
import { Editor } from '@/components/CodeEditor';
import request from 'utils/request';
// import nginxDicMap from '@/components/NginxAuto/dicMap';
import '../../hooks/userWorker';
// import {
//   NginxState,
//   interfaceFormState,
// } from '@/components/NginxAuto/nginx.slice';
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
    const { code } = await request.delete(`/api/interface/delete/${_id}`);
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
      dataIndex: 'path',
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
      render: (item: keyof typeof statusEnum) => (
        <span>{statusEnum[item]}</span>
      ),
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
          <Button style={{ marginLeft: '20px' }}>上线</Button>
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

// const parse = (params: NginxState & interfaceFormState) => {
//   let serverNameStr = '';
//   if (params.ipv4) {
//     serverNameStr = `${nginxDicMap.ipv4(params.port, params.ipv4)}`;
//   } else {
//     serverNameStr = `${nginxDicMap.port(params.port)}`;
//   }
//   return `
// server {
//   ${serverNameStr}
//   ${params.ipv6 ? `${nginxDicMap.ipv6(params.port, params.ipv6)}` : ''}
//   ${nginxDicMap.origin(params.origin)}
//   ${nginxDicMap.path(params.rootPath)}

//   # index.html fallback
//   location / {
//     try_files $uri $uri/ /index.html;
//   }

//   # reverse proxy
//   ${nginxDicMap.proxyPassPath(params.path)} {
//     ${nginxDicMap.proxySetHeader(params.proxySetHeader)}
//     ${nginxDicMap.proxyPass(params.proxyPass)}
//   }
// }`;
// };

type ViewControlType = 'handler' | 'fetch';

const proxyOtherConfig = [
  {
    type: 'INPUT',
    field: 'proxyPath',
    label: '代理地址',
    rules: [{ required: true, message: '代理地址为必填项' }],
    style: { width: '250px' },
  },
  {
    type: 'SWITCH',
    field: 'proxyHeader',
    label: 'Proxy Header',
  },
];

const InterfaceManagement: FC = () => {
  const [viewControl, setViewControl] = useState<ViewControlType>('fetch');
  const dispatch = useAppDispatch();
  const tableData = useAppSelector((state) => state.interfaceSlice.list);
  const visible = useAppSelector((state) => state.interfaceSlice.visible);
  const currentOpType = useAppSelector((state) => state.interfaceSlice.type);
  const getTableList = () => dispatch(fetchInterface());

  // const { interfaceFormState, nginxState } = useAppSelector(
  //   (state) => state.nginxSlice,
  // );

  // 弹窗唤起
  function onOpenHandler(id: string) {
    dispatch(change(id));
  }

  function handleTypeChange(type: ViewControlType) {
    setViewControl(type);
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
        <Row gutter={16}>
          <Col span={12}>
            <div className='col-content'>
              <InterfaceForm keyPrefix={'top'} showFooter={true} />
              {viewControl === 'handler' && currentOpType === 1 ? (
                <Editor
                  height={'52vh'}
                  className='interface-border'
                  code={'module.export = function (context, next) {\n\n}'}
                  language={'javascript'}
                />
              ) : null}
              {currentOpType !== 1 ? (
                <InterfaceForm
                  keyPrefix={'bottom'}
                  showFooter={false}
                  config={proxyOtherConfig}
                />
              ) : viewControl !== 'handler' ? (
                <PostTools height='59vh' className='interface-border' />
              ) : null}
            </div>
          </Col>
          <Col span={12}>
            {currentOpType === 0 ? (
              <PostTools className='interface-border' />
            ) : (
              <WorkFlow
                onChange={handleTypeChange}
                className='interface-border'
              />
            )}
          </Col>
        </Row>
      </SideSheet>
    </>
  );
};

export default InterfaceManagement;
