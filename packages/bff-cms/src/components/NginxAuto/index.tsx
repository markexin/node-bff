import React, { FC } from 'react';
import { Tabs, TabPane, Form, Row, Col } from '@douyinfe/semi-ui';
import { IconFile } from '@douyinfe/semi-icons';

const NginxAuto: FC<{
  className: string;
}> = (props) => {
  const handleSubmit = () => {};
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
                field='apiPath'
                label='域名'
                placeholder={'example.com'}
                labelWidth={'58px'}
                style={{ width: '250px' }}
                trigger='blur'
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Form.Input
                field='apiPath'
                label='路径'
                placeholder={'/var/www/example.com'}
                labelWidth={'58px'}
                style={{ width: '250px' }}
                trigger='blur'
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Form.Input
                field='apiPath'
                label='文档根'
                placeholder={'/public'}
                labelWidth={'58px'}
                style={{ width: '250px' }}
                trigger='blur'
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Form.Checkbox
                field='apiPath'
                label='www子域'
                style={{ width: '250px', marginTop: '6px' }}
                trigger='blur'>
                启用（example.com）
              </Form.Checkbox>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Form.Checkbox
                field='apiPath'
                label='Redirect subdomains'
                style={{ width: '350px', marginTop: '6px' }}
                trigger='blur'>
                启用（*.example.com → example.com）
              </Form.Checkbox>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Form.Input
                field='apiPath'
                label='IPV4'
                placeholder={'0.0.0.0'}
                labelWidth={'58px'}
                style={{ width: '250px' }}
                trigger='blur'
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Form.Input
                field='apiPath'
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
                HTTPS
              </span>
            }
            itemKey='2'>
            <div>
              <Form.Checkbox
                field='apiPath'
                label='HTTPS'
                style={{ width: '250px', marginTop: '6px' }}
                trigger='blur'>
                启用
              </Form.Checkbox>
            </div>
            <div>
              <Form.Checkbox
                field='apiPath'
                label='HTTP/2'
                style={{ width: '250px', marginTop: '6px' }}
                trigger='blur'>
                启用
              </Form.Checkbox>
            </div>
            <div>
              <Form.Checkbox
                field='apiPath'
                label='定向 HTTPS'
                style={{ width: '450px', marginTop: '6px' }}
                trigger='blur'>
                启用（http://example.com → https://example.com）
              </Form.Checkbox>
            </div>
            <div>
              <Form.Input
                field='apiPath'
                label='ssl_certificate'
                placeholder={'/etc/nginx/ssl/example.com.crt'}
                labelWidth={'106px'}
                style={{ width: '250px', marginBottom: '10px' }}
                trigger='blur'
              />
            </div>
            <div>
              <Form.Input
                field='apiPath'
                label='ssl_certificate_key'
                placeholder={'/etc/nginx/ssl/example.com.key'}
                labelWidth={'140px'}
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
                Reverse proxy
              </span>
            }
            itemKey='3'>
            <div>
              <Form.Input
                field='apiPath'
                label='Path'
                placeholder={'/'}
                labelWidth={'140px'}
                style={{ width: '250px', marginBottom: '10px' }}
                trigger='blur'
              />
            </div>
            <div>
              <Form.Input
                field='apiPath'
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
