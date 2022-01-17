import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, Button, Avatar, Layout } from '@douyinfe/semi-ui';
import { IconBell, IconHelpCircle } from '@douyinfe/semi-icons';
import { routerFormat } from '../router';

const { Header } = Layout;

export const NavC = () => {
  const navigate = useNavigate();

  return (
    <Nav
      defaultSelectedKeys={['Home']}
      style={{ maxWidth: 220, height: '100vh' }}
      items={routerFormat()}
      onClick={({ itemKey }: { itemKey: React.ReactText }) =>
        navigate(`/${itemKey}`)
      }
      header={{
        logo: <img src='../../assests/mirror.png' alt='' />,
        text: '反光镜',
      }}
      footer={{
        collapseButton: true,
      }}
    />
  );
};

export const HeaderC = () => (
  <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
    <Nav
      mode='horizontal'
      footer={
        <>
          <Button
            theme='borderless'
            icon={<IconBell size='large' />}
            style={{
              color: 'var(--semi-color-text-2)',
              marginRight: '12px',
            }}
          />
          <Button
            theme='borderless'
            icon={<IconHelpCircle size='large' />}
            style={{
              color: 'var(--semi-color-text-2)',
              marginRight: '12px',
            }}
          />
          <Avatar color='orange' size='small'>
            YJ
          </Avatar>
        </>
      }></Nav>
  </Header>
);
