import React from 'react';
import { Form, Row, Button } from '@douyinfe/semi-ui';
import { useAppDispatch } from '@/store';
import { change } from './origin.slice';

export const FormSearch = () => {
  const dispatch = useAppDispatch();
  return (
    <Form
      labelPosition='left'
      layout='horizontal'
      style={{ marginBottom: '20px' }}>
      <Row type='flex'>
        <Form.Input
          field='nickName1'
          label='域名检索'
          style={{ width: '250px' }}
          trigger='blur'
        />
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button style={{ marginRight: 10 }}>查询</Button>
          <Button onClick={() => dispatch(change())}>新建</Button>
        </div>
      </Row>
    </Form>
  );
};
