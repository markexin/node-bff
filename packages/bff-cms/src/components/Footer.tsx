import React from 'react';
import { Layout } from '@douyinfe/semi-ui';
import { IconBytedanceLogo } from '@douyinfe/semi-icons';
const { Footer } = Layout;

export const FooterC = () => (
  <Footer
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
      color: 'var(--semi-color-text-2)',
      backgroundColor: 'rgba(var(--semi-grey-0), 1)',
    }}>
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <IconBytedanceLogo size='large' style={{ marginRight: '8px' }} />
      <span>Copyright © 2021 Maqun. All Rights Reserved. </span>
    </span>
  </Footer>
);
