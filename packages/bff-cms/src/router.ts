import { IconHistogram, IconSetting, IconCode } from '@douyinfe/semi-icons';
import React from 'react';

export const router = [
  // TODO: 暂时没有想好首页放什么
  // {
  //   itemKey: '/',
  //   text: '首页',
  //   icon: {
  //     components: IconSetting,
  //     attribute: {
  //       size: 'large',
  //     },
  //   },
  // },
  {
    itemKey: 'datasource',
    text: '仪表盘',
    icon: {
      components: IconHistogram,
      attribute: {
        size: 'large',
      },
    },
    components: React.lazy(() => import('./views/DashbordManagement')),
  },
  {
    itemKey: 'origin',
    text: '域名管理',
    icon: {
      components: IconSetting,
      attribute: {
        size: 'large',
      },
    },
    components: React.lazy(() => import('./views/OriginManagement')),
  },
  {
    itemKey: 'project',
    text: '项目管理',
    icon: {
      components: IconSetting,
      attribute: {
        size: 'large',
      },
    },
    components: React.lazy(() => import('./views/ProjectManagement')),
  },
  {
    itemKey: 'interface',
    text: '接口管理',
    icon: {
      components: IconCode,
      attribute: {
        size: 'large',
      },
    },
    components: React.lazy(() => import('./views/DashbordManagement')),
  },
];

export function routerFormat() {
  const res = router.map((r) => {
    const { components, attribute } = r.icon;
    return {
      ...r,
      ...{
        icon: React.createElement(components, attribute as { size: 'large' }),
      },
    };
  });
  return res;
}
