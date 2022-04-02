import React from 'react';
import { Layout, Breadcrumb } from '@douyinfe/semi-ui';
import { useLocation } from 'react-router-dom';
// import { FooterC } from './Footer';
import { NavC, HeaderC } from './Header';
import { router } from '../router';

const { Sider, Content } = Layout;

export const LayoutC = (props: {
  children: React.ReactFragment | undefined;
}) => {
  const location = useLocation();
  const currentMenu = router.find((r) => `/${r.itemKey}` === location.pathname);
  return (
    <Layout
      style={{
        border: '1px solid var(--semi-color-border)',
        height: '100vh',
        overflow: 'hidden',
      }}>
      <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
        <NavC />
      </Sider>
      <Layout>
        <HeaderC />
        <Content
          style={{
            padding: '24px',
            backgroundColor: 'var(--semi-color-bg-0)',
          }}>
          <Breadcrumb
            routes={['首页', currentMenu?.text ?? '']}
            style={{
              marginBottom: '24px',
            }}></Breadcrumb>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
