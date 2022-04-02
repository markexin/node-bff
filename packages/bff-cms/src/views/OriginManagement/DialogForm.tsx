import React, { useEffect, useState, useRef } from 'react';
import { Form, Row, Modal, Notification, Button } from '@douyinfe/semi-ui';
import { useAppSelector, useAppDispatch } from '@/store';
import { change, fetchOrigin } from './origin.slice';
import { ProjectGetListSync } from '../ProjectManagement/project.slice';
import request from 'utils/request';

export enum Environment {
  'staging' = '测试环境',
  'preview' = '预发环境',
  'product' = '生产环境',
}

export const DialogForm = () => {
  const visible = useAppSelector((state) => state.originSlice.visible);
  const id = useAppSelector((state) => state.originSlice.id);
  const [projectList, setProjectList] = useState<ProjectGetListSync[]>([]);
  const dispatch = useAppDispatch();
  const formBRef = useRef(null);

  // 取消弹窗
  function onCancelHandler() {
    dispatch(change(''));
  }

  // 表单提交
  async function handleSubmit(params: Record<string, any>) {
    params.protocol = params.protocol.join();
    const { code } = await request.post('/api/origin/create', params);
    if (code === 0) {
      Notification.success({
        title: '添加成功!',
        position: 'top',
        duration: 2,
      });
      onCancelHandler();
      dispatch(fetchOrigin());
    }
  }

  useEffect(() => {
    if (visible) {
      request.get('/api/project/list').then((res) => {
        setProjectList(res.data);
      });
    }
  }, [visible]);

  useEffect(() => {
    if (id) {
      request.get('/api/origin/detail', { id }).then((res) => {
        const {protocol, ...args} = res.data;
        (formBRef.current as any).formApi.setValues(
          {
            protocol: protocol.split(','),
            ...args
          }
        );
      });
    }
  }, [id]);

  return (
    <Modal
      footer={null}
      header={null}
      visible={visible}
      onCancel={() => onCancelHandler()}>
      <Form
        style={{ marginTop: '30px' }}
        labelPosition='left'
        ref={formBRef}
        onSubmit={handleSubmit}
        labelAlign='right'>
        <Row type='flex'>
          <Form.Input
            field='originPath'
            label='域名地址'
            rules={[{ required: true, message: '域名地址为必填项' }]}
            style={{ width: '250px' }}
            trigger='blur'
          />
          <Form.Select
            label='所属项目'
            field='projectId'
            rules={[{ required: true, message: '所属项目为必填项' }]}
            style={{ width: '250px' }}>
            {projectList.map((item) => (
              <Form.Select.Option key={item._id} value={item._id}>
                {item.projectName}
              </Form.Select.Option>
            ))}
          </Form.Select>
          <Form.CheckboxGroup
            field='protocol'
            direction='horizontal'
            label='协议'
            rules={[{ required: true, message: '协议为必填项' }]}>
            <Form.Checkbox value='http'>http</Form.Checkbox>
            <Form.Checkbox value='https'>https</Form.Checkbox>
          </Form.CheckboxGroup>
          <Form.RadioGroup
            field='environment'
            direction='horizontal'
            label='环境'
            rules={[{ required: true, message: '环境为必填项' }]}>
              {
                (Object.keys(Environment) as Array<keyof typeof Environment>).map((key) => <Form.Radio key={key} value={key}>{Environment[key]}</Form.Radio>)
              }
          </Form.RadioGroup>
        </Row>
        <div style={{ float: 'right', margin: '20px' }}>
          <Button style={{ marginRight: 10 }} htmlType='submit'>
            确定
          </Button>
          <Button
            htmlType='reset'
            onClick={() => onCancelHandler()}
            type='tertiary'>
            取消
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
