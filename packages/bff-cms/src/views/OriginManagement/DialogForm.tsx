import React from 'react';
import { Form, Row, Button, Modal } from '@douyinfe/semi-ui';
import { useAppSelector, useAppDispatch } from '@/store';
import { change } from './origin.slice';

export const DialogForm = () => {
  const visible = useAppSelector((state) => state.projectSlice.visible);
  const dispatch = useAppDispatch();

  // 取消弹窗
  function onCancelHandler() {
    dispatch(change());
  }

  return (
    <Modal
      header={null}
      visible={visible}
      onCancel={() => onCancelHandler()}
      footer={
        <div style={{ float: 'right' }}>
          <Button style={{ marginRight: 10 }}>确定</Button>
          <Button onClick={() => onCancelHandler()} type='tertiary'>
            取消
          </Button>
        </div>
      }>
      <Form
        style={{ marginTop: '30px' }}
        labelPosition='left'
        labelAlign='right'>
        <Row type='flex'>
          <Form.Input
            field='nickName1'
            label='项目名称'
            style={{ width: '250px' }}
            trigger='blur'
          />
          <Form.TextArea
            field='nickName2'
            label='项目描述'
            style={{ width: '250px' }}
            trigger='blur'
          />
        </Row>
      </Form>
    </Modal>
  );
};
