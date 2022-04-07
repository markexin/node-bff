import React, { useState, FC } from 'react';
import {
  Form,
  Input,
  InputGroup,
  Select,
  Button,
  Tabs,
} from '@douyinfe/semi-ui';
import { IconBackTop } from '@douyinfe/semi-icons';
import HeaderContainer from './HeaderContainer';
import InputPlus from './InputPlus';

const { Section } = Form;

const requestTabList = [
  {
    tab: 'Header',
    itemKey: '0',
    components: (
      <HeaderContainer
        initValue={{
          'x-postsuper-id': 'super',
        }}
      />
    ),
  },
  {
    tab: 'Query',
    itemKey: '1',
    components: <InputPlus />,
  },
  {
    tab: 'Body',
    itemKey: '2',
    components: (
      <HeaderContainer
        initValue={{
          test: 'welcome to PostSuperMan !',
        }}
      />
    ),
  },
];

const responseTabList = [
  {
    tab: '实时响应',
    itemKey: '0',
    components: (
      <HeaderContainer
        initValue={{
          code: 0,
          msg: 'success',
          data: {},
        }}
      />
    ),
  },
  {
    tab: '请求头',
    itemKey: '1',
    components: <div>请求头</div>,
  },
  {
    tab: '响应头',
    itemKey: '2',
    components: <div>响应头</div>,
  },
  {
    tab: 'Cookie',
    itemKey: '3',
    components: <div>Cookie</div>,
  },
];

const methods = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

function useTabsController() {
  const [reqTab, setReqTab] = useState<string | undefined>('0');
  const [resTab, setResTab] = useState<string | undefined>('0');
  const [reqDisplay, setReqDisplay] = useState<boolean>(true);
  return {
    cb: function (
      type: 'req' | 'res' | 'reqDisplay' | 'resDisplay',
      value?: string,
    ) {
      // TODO: 此处需要优化
      /* eslint-disable indent */
      switch (type) {
        case 'req':
          // eslint-disable-next-line prettier/prettier
        setReqTab(value);
          break;
        case 'res':
          setResTab(value);
          break;
        case 'reqDisplay':
          setReqDisplay(!reqDisplay);
          break;
        case 'resDisplay':
          setReqDisplay(!reqDisplay);
          break;
      }
      /* eslint-enable indent */
    },
    reqStatus: reqTab,
    resStatus: resTab,
    reqDisplay,
    resDisplay: !reqDisplay,
  };
}

export const PostTools: FC<{
  className?: string;
}> = ({ className }) => {
  const { reqStatus, resStatus, reqDisplay, resDisplay, cb } =
    useTabsController();
  return (
    <Form className={className} style={{ maxHeight: '50%' }}>
      <Section text={'PostSuperMan'}>
        <Input style={{ margin: '10px 0' }} placeholder={'请输入接口名称'} />
        <InputGroup
          style={{ display: 'flex', alignItems: 'end', margin: '0 0 10px 0' }}>
          <Select style={{ flex: 1 }} defaultValue='GET'>
            {methods.map((m) => (
              <Select.Option value={m} key={m}>
                {m}
              </Select.Option>
            ))}
          </Select>
          <Input style={{ flex: 5 }} placeholder={'请输入接口地址'} />
          <Button style={{ flex: 1 }} theme='solid' type='primary'>
            测试发送
          </Button>
        </InputGroup>
        <Tabs
          type='card'
          activeKey={reqStatus}
          // TODO: 类型约束优化
          tabList={requestTabList as any}
          tabBarExtraContent={<IconBackTop onClick={() => cb('reqDisplay')} />}
          onChange={(active) => cb('req', active)}>
          {reqDisplay && requestTabList[+reqStatus!].components}
        </Tabs>
        <Tabs
          type='card'
          activeKey={resStatus}
          tabList={responseTabList}
          onChange={(active) => cb('res', active)}>
          {resDisplay && responseTabList[+resStatus!].components}
        </Tabs>
      </Section>
    </Form>
  );
};
