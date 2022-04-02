import React, { FC } from 'react';
import { Form, Row, Button } from '@douyinfe/semi-ui';
import { useAppDispatch } from '@/store';
import { change, fetchOrigin } from './origin.slice';

export const FormSearch: FC = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = (params: Record<string, any>) => {
    const { originPath } = params;
    dispatch(fetchOrigin(originPath));
  };
  return (
    <Form
      labelPosition='left'
      layout='horizontal'
      onSubmit={handleSubmit}
      style={{ marginBottom: '20px' }}>
      <Row type='flex'>
        <Form.Input
          field='originPath'
          label='域名检索'
          style={{ width: '250px' }}
          trigger='blur'
        />
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button style={{ marginRight: 10 }} htmlType='submit'>
            查询
          </Button>
          <Button onClick={() => dispatch(change(''))}>新建</Button>
        </div>
      </Row>
    </Form>
  );
};
