import React from 'react';
import { Form, Row, Button } from '@douyinfe/semi-ui';
import { useAppDispatch } from '@/store';
import { change, fetchProject } from './project.slice';

export const FormSearch = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = (params: Record<string, any>) => {
    const { projectName } = params;
    dispatch(fetchProject(projectName));
  };
  return (
    <Form
      labelPosition='left'
      layout='horizontal'
      onSubmit={handleSubmit}
      style={{ marginBottom: '20px' }}>
      <Row type='flex'>
        <Form.Input
          field='projectName'
          label='项目检索'
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
