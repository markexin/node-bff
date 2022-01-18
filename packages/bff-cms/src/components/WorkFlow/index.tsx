import React, { useEffect, useRef, useState, FC } from 'react';
import { Col, Row, Modal, Card } from '@douyinfe/semi-ui';
import { Graph } from '@antv/x6';
import { IconWifi, IconCode } from '@douyinfe/semi-icons';
import useStateCallback from '@/hooks/useStateCallback';
import { PostTools } from '../PostTools';
import { CodeEditor } from '../CodeEditor';
import { config, GraphHoc, portSync, nodeSync, plusSync } from './chartTools';

// 选择类型弹窗
const ModelContent: FC<{
  visible: boolean;
  onChange?: Function;
  onCancel?: Function;
}> = ({ onChange, onCancel, visible }) => {
  const [nodeType, setNodeType] = useState('');

  const { Meta } = Card;
  const template = [
    {
      _key: 'fetch',
      style: {
        background: nodeType === 'fetch' ? 'var(--semi-color-primary)' : '#fff',
        color: nodeType === 'fetch' ? '#fff' : '#000',
      },
      cover: <IconWifi size='large' style={{ marginTop: '20px' }} />,
      meta: {
        title: (
          <span style={{ color: nodeType === 'fetch' ? '#fff' : '#000' }}>
            API接口
          </span>
        ),
      },
    },
    {
      _key: 'handler',
      style: {
        background:
          nodeType === 'handler' ? 'var(--semi-color-primary)' : '#fff',
        color: nodeType === 'handler' ? '#fff' : '#000',
      },
      cover: <IconCode size='large' style={{ marginTop: '20px' }} />,
      meta: {
        title: (
          <span style={{ color: nodeType === 'handler' ? '#fff' : '#000' }}>
            函数处理
          </span>
        ),
      },
    },
  ];

  return (
    <Modal
      title='请选择模块类型'
      visible={visible}
      onOk={() => {
        onChange && onChange(nodeType);
        setNodeType('');
      }}
      onCancel={() => onCancel && onCancel()}>
      <Row type='flex' justify='space-around' align='middle'>
        {template.map((node, index) => (
          <Col span={12} key={index}>
            <Card
              style={node.style}
              cover={node.cover}
              // @ts-ignore
              onClick={() => {
                setNodeType(template[index]._key);
              }}>
              <Meta
                style={{ textAlign: 'center', display: 'block' }}
                title={node.meta.title}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Modal>
  );
};

export const WorkFlow = () => {
  const editRef = useRef<HTMLDivElement>(null);
  const [nodes, setNode] = useStateCallback([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [viewControl, setViewControl] = useState<'handler' | 'fetch' | ''>('');
  const graph = useRef();

  // 增加节点
  function handleNodePlus(nodeType: string) {
    console.log(nodeType, graph.current, '============');
  }

  // 初始化编辑器注入
  useEffect(() => {
    const width = editRef.current?.clientWidth!;
    const height = document.body.clientHeight - 90;

    (graph.current as unknown as Graph) = new GraphHoc({
      container: editRef.current!,
      width,
      height,
      ...config,
    });

    // 处理事件
    (graph.current as unknown as Graph).on('cell:click', ({ cell }) => {
      const { _key } = cell.data;
      if (_key === 'handler' || _key === 'fetch') {
        setViewControl(_key);
      } else {
        //
        setVisible(!visible);
      }
    });

    // 初始化节点
    setNode(
      () => [
        nodeSync('1', '开始', width / 2, 10),
        plusSync('2', width / 2, 110),
        portSync('3', '1', '2'),
        nodeSync('4', '结束', width / 2, 210),
        portSync('5', '2', '4'),
      ],
      (n: any) => (graph.current as unknown as Graph).fromJSON(n),
    );
  }, []);

  return (
    <>
      <Row gutter={30}>
        <Col span={12}>
          <div ref={editRef}></div>
        </Col>
        <Col span={12}>
          {viewControl === 'handler' ?? <CodeEditor />}
          {viewControl === 'fetch' ?? <PostTools />}
          <div>welcome</div>
        </Col>
      </Row>
      <ModelContent
        visible={visible}
        onChange={(t: string) => {
          handleNodePlus(t);
          setVisible(!visible);
        }}
        onCancel={() => setVisible(!visible)}
      />
    </>
  );
};
