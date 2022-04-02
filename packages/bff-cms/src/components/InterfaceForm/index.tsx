import React, { useState, useEffect } from 'react';
import { Button, Form } from '@douyinfe/semi-ui';
import { useAppDispatch, useAppSelector } from '@/store';
import { OriginGetListSync } from '../../views/OriginManagement/origin.slice';
import request from 'utils/request';
import {
  change,
  typeEnum,
  changeType,
} from '../../views/InterfaceManagement/interface.slice';

export default function InterfaceForm() {
  const dispatch = useAppDispatch();
  const visible = useAppSelector((state) => state.interfaceSlice.visible);
  const [originList, setOriginList] = useState<OriginGetListSync[]>([]);

  useEffect(() => {
    if (visible) {
      request.get('/api/origin/list').then((res) => {
        setOriginList(res.data);
      });
    }
  }, [visible]);

  return (
    <Form
      labelPosition='left'
      // onSubmit={handleSubmit}
      initValues={{
        type: 0,
      }}
      className='interface-border'
      style={{
        marginBottom: '20px',
        padding: '20px',
      }}>
      <Form.Input
        field='apiPath'
        label='规则地址'
        rules={[{ required: true, message: '规则地址为必填项' }]}
        style={{ width: '250px' }}
        trigger='blur'
      />
      <Form.Select
        label='所属域名'
        field='originId'
        rules={[{ required: true, message: '所属项目为必填项' }]}
        style={{ width: '250px' }}>
        {originList.map((item) => (
          <Form.Select.Option key={item._id} value={item._id}>
            {item.projectName}
          </Form.Select.Option>
        ))}
      </Form.Select>
      <Form.Select
        label='转发类型'
        field='type'
        onChange={(value) => {
          dispatch(changeType(+value));
        }}
        rules={[{ required: true, message: '转发类型为必填项' }]}
        style={{ width: '250px' }}>
        {Object.keys(typeEnum).map((key: string) => (
          <Form.Select.Option key={key} value={+key}>
            {(typeEnum as { [props: string]: string })[key]}
          </Form.Select.Option>
        ))}
      </Form.Select>
      <div style={{ marginTop: '20px' }}>
        <Button style={{ marginRight: 10 }} htmlType='submit'>
          保存
        </Button>
        <Button type='tertiary' onClick={() => dispatch(change(''))}>
          取消
        </Button>
      </div>
    </Form>
  );
}
