import React, { useState } from 'react';
import {
  Form,
  Input,
  InputGroup,
  Select,
  Button,
  Tabs,
} from '@douyinfe/semi-ui';
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
    components: <HeaderContainer />,
  },
];

const responseTabList = [
  {
    tab: '实时响应',
    itemKey: '0',
    components: <InputPlus />,
  },
  {
    tab: '请求头',
    itemKey: '1',
    components: <InputPlus />,
  },
  {
    tab: '响应头',
    itemKey: '2',
    components: <InputPlus />,
  },
  {
    tab: 'Cookie',
    itemKey: '3',
    components: <InputPlus />,
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

export const PostTools = () => {
  const { reqStatus, resStatus, reqDisplay, resDisplay, cb } =
    useTabsController();
  return (
    <Form>
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
          tabBarExtraContent={
            <Button onClick={() => cb('reqDisplay')}>收起</Button>
          }
          onChange={(active) => cb('req', active)}>
          {reqDisplay && requestTabList[+reqStatus!].components}
        </Tabs>
        <Tabs
          type='card'
          activeKey={resStatus}
          tabList={responseTabList}
          tabBarExtraContent={
            <Button onClick={() => cb('resDisplay')}>收起</Button>
          }>
          {resDisplay && responseTabList[+resStatus!].components}
        </Tabs>
      </Section>
      <Button theme='light' type='primary' style={{ marginRight: 8 }}>
        保存
      </Button>
      <Button theme='light' type='tertiary' style={{ marginRight: 8 }}>
        取消
      </Button>
    </Form>
  );
};
