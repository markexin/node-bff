import React, { useEffect, useRef, useState, FC } from 'react';
import { Col, Row, Modal, Card } from '@douyinfe/semi-ui';
import { Graph, Cell } from '@antv/x6';
import { DagreLayout } from '@antv/layout';
import { IconWifi, IconCode } from '@douyinfe/semi-icons';
import useStateCallback from '@/hooks/useStateCallback';
import { PostTools } from '../PostTools';
import { CodeEditor } from '../CodeEditor';
import {
  config,
  GraphHoc,
  portSync,
  nodeSync,
  plusSync,
  eventSync,
} from './chartTools';

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
  const [points, setNode] = useStateCallback({});
  const [visible, setVisible] = useState<boolean>(false);
  const [viewControl, setViewControl] = useState<'handler' | 'fetch' | ''>('');
  // 缓存全局视图实例
  const graph = useRef();
  // 缓存当前选择节点
  const selectNode = useRef<Cell | undefined>();
  // 使用层次布局
  const dagreLayout = new DagreLayout({
    type: 'dagre',
    rankdir: 'LR',
    align: 'UR',
    ranksep: 30,
    nodesep: 15,
    controlPoints: true,
  });

  // 增加节点
  function handleNodePlus(nodeType: 'handler' | 'fetch' | '') {
    if (nodeType === 'fetch') {
      const { data } = (selectNode.current as any).store;
      const { id: preId } = data;
      const next = eventSync('fetch', '待编辑');
      setNode(
        {
          nodes: [...points.nodes, ...[next]],
          edges: [...points.edges, ...[portSync(preId, next.id)]],
        },
        (n: any) => {
          const model = dagreLayout.layout(n);
          (graph.current as unknown as Graph).fromJSON(model);
        },
      );
    }
    if (nodeType === 'handler') {
      console.log(nodeType, graph.current, '======handler======');
    }
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

    // 定义事件方法
    (graph.current as unknown as Graph).on(
      'cell:click',
      ({ cell }: { cell: Cell }) => {
        const { _key } = cell.data;
        if (_key === 'handler' || _key === 'fetch') {
          setViewControl(_key);
        } else {
          setVisible(!visible);
          (selectNode.current as unknown as Cell) = cell;
        }
      },
    );

    const start = nodeSync('开始');
    const end = nodeSync('结束');
    const plus = plusSync();

    // 初始化节点
    setNode(
      {
        nodes: [start, plus, end],
        edges: [portSync(start.id, plus.id), portSync(plus.id, end.id)],
      },
      (n: any) => {
        const model = dagreLayout.layout(n);
        (graph.current as unknown as Graph).fromJSON(model);
      },
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
        onChange={(t: 'handler' | 'fetch' | '') => {
          handleNodePlus(t);
          setVisible(!visible);
        }}
        onCancel={() => setVisible(!visible)}
      />
    </>
  );
};
