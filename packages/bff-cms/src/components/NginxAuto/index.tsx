import React, { FC } from 'react';
import { Tabs, TabPane, Form } from '@douyinfe/semi-ui';
import { IconFile } from '@douyinfe/semi-icons';
import { useAppDispatch } from '@/store';
import { updateFormData } from './nginx.slice';

const NginxAuto: FC<{
  className: string;
}> = (props) => {
  const dispatch = useAppDispatch();
  // 生成nginx配置
  const handleSubmit = ({ values }: any) => {
    dispatch(updateFormData(values));
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
      <Form labelPosition='left' layout='horizontal' onChange={handleSubmit}>
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
                field='rootPath'
                label='根路径'
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
                label='IPV6'
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
                Proxy
              </span>
            }
            itemKey='2'>
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
      </Form>
    </div>
  );
};

export default NginxAuto;
