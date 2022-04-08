import React, { FC } from 'react';
import { Tabs, TabPane, Form, Button } from '@douyinfe/semi-ui';
import { IconFile } from '@douyinfe/semi-icons';
import { useAppDispatch } from '@/store';
import { update } from './nginx.slice';

const NginxAuto: FC<{
  className: string;
}> = (props) => {
  const dispatch = useAppDispatch();
  // 生成nginx配置
  const handleSubmit = (params) => {
    dispatch(update(params));
  };
  return (
    <div
      className={props.className}
      style={{
        marginBottom: '20px',
        border: '1px solid #efefef',
        paddingTop: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}>
      <Form
        labelPosition='left'
        layout='horizontal'
        onSubmit={handleSubmit}
        style={{ marginBottom: '20px' }}>
        <Tabs tabPosition='left' type={'line'}>
          <TabPane
            style={{ marginLeft: '20px' }}
            tab={
              <span>
                <IconFile />
                Server
              </span>
            }
            itemKey='1'>
            <div style={{ marginBottom: '10px' }}>
              <Form.Input
                field='origin'
                label='域名'
                placeholder={'example.com'}
                labelWidth={'58px'}
                style={{ width: '250px' }}
                trigger='blur'
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Form.Input
                field='path'
                label='路径'
                placeholder={'/var/www/example.com'}
                labelWidth={'58px'}
                style={{ width: '250px' }}
                trigger='blur'
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Form.Input
                field='port'
                label='端口'
                placeholder={'80'}
                labelWidth={'58px'}
                style={{ width: '250px' }}
                trigger='blur'
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Form.Input
                field='ipv4'
                label='IPV4'
                placeholder={'0.0.0.0'}
                labelWidth={'58px'}
                style={{ width: '250px' }}
                trigger='blur'
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Form.Input
                field='ipv6'
                label='ipv6'
                placeholder={'::'}
                labelWidth={'58px'}
                style={{ width: '250px' }}
                trigger='blur'
              />
            </div>
          </TabPane>
          <TabPane
            style={{ marginLeft: '20px' }}
            tab={
              <span>
                <IconFile />
                Reverse Proxy
              </span>
            }
            itemKey='2'>
            <div>
              <Form.Input
                field='proxyPassPath'
                label='Path'
                placeholder={'/'}
                labelWidth={'140px'}
                style={{ width: '250px', marginBottom: '10px' }}
                trigger='blur'
              />
            </div>
            <div>
              <Form.Input
                field='proxySetHeader'
                label='proxy_set_header'
                placeholder={'localhost'}
                labelWidth={'140px'}
                style={{ width: '250px', marginBottom: '10px' }}
                trigger='blur'
              />
            </div>
            <div>
              <Form.Input
                field='proxyPass'
                label='proxy_pass'
                placeholder={'http://127.0.0.1:3000'}
                labelWidth={'140px'}
                style={{ width: '250px' }}
                trigger='blur'
              />
            </div>
          </TabPane>
        </Tabs>
        <div style={{ textAlign: 'right', width: '100%' }}>
          <Button style={{ marginRight: 10 }} htmlType='submit'>
            生成
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NginxAuto;
