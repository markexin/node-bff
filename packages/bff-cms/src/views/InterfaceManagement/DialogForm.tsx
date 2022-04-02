import React, { FC, useEffect, useRef } from 'react';
import { Form, Row, Button, Modal, Notification } from '@douyinfe/semi-ui';
import { useAppSelector, useAppDispatch } from '@/store';
import request from 'utils/request';
import { change, fetchInterface } from './interface.slice';

export const DialogForm: FC = () => {
  const visible = useAppSelector((state) => state.interfaceSlice.visible);
  const id = useAppSelector((state) => state.interfaceSlice.id);
  const dispatch = useAppDispatch();
  const formBRef = useRef(null);

  // 取消弹窗
  function onCancelHandler() {
    dispatch(change(''));
  }

  // 表单提交
  async function handleSubmit(params: Record<string, any>) {
    const { code } = await request.post('/api/project/create', params);
    if (code === 0) {
      Notification.success({
        title: '添加成功!',
        position: 'top',
        duration: 2,
      });
      onCancelHandler();
      dispatch(fetchInterface());
    }
  }

  useEffect(() => {
    if (id) {
      request.get('/api/project/detail', { id }).then((res) => {
        (formBRef.current as any).formApi.setValues(res.data);
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
            field='projectName'
            label='项目名称'
            style={{ width: '250px' }}
            trigger='blur'
          />
          <Form.TextArea
            field='projectDesc'
            label='项目描述'
            style={{ width: '250px' }}
            trigger='blur'
          />
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
