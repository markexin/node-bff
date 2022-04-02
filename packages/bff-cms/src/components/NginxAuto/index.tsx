import React, { FC } from 'react';
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import { IconFile, IconGlobe } from '@douyinfe/semi-icons';

const NginxAuto: FC<{
  className: string;
}> = (props) => {
  return (
    <div
      className={props.className}
      style={{
        marginBottom: '20px',
        border: '1px solid #efefef',
        padding: '20px',
      }}>
      <Tabs tabPosition='left' type={'line'}>
        <TabPane
          tab={
            <span>
              <IconFile />
              文档
            </span>
          }
          itemKey='1'>
          <div style={{ padding: '0 24px' }}>
            <h3>文档</h3>
            <p style={{ lineHeight: 1.8 }}>
              Semi Design 是由互娱社区前端团队与 UED
              团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
              Web 应用。
            </p>
            <p style={{ lineHeight: 1.8 }}>
              区别于其他的设计系统而言，Semi Design
              以用户中心、内容优先、设计人性化为设计理念，具有以下优势：
            </p>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <IconGlobe />
              快速起步
            </span>
          }
          itemKey='2'>
          <div style={{ padding: '0 24px' }}>
            <h3>快速起步</h3>
            <pre
              style={{
                margin: '24px 0',
                padding: '20px',
                border: 'none',
                whiteSpace: 'normal',
                borderRadius: '6px',
                color: 'var(--semi-color-text-1)',
                backgroundColor: 'var(--semi-color-fill-0)',
              }}>
              <code>yarn add @douyinfe/semi-ui</code>
            </pre>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default NginxAuto;
