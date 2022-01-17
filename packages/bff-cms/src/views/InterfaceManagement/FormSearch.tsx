import React from 'react';
import { Form, Row, Button } from '@douyinfe/semi-ui';

export const FormSearch = () => {
  return (
    <Form
      labelPosition='left'
      layout='horizontal'
      style={{ marginBottom: '20px' }}>
      <Row type='flex'>
        <Form.Input
          field='nickName1'
          label='编号检索'
          style={{ width: '250px' }}
          trigger='blur'
        />
        <Form.Input
          field='nickName2'
          label='接口检索'
          style={{ width: '250px' }}
          trigger='blur'
        />
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button style={{ marginRight: 10 }}>查询</Button>
        </div>
      </Row>
    </Form>
  );
};
