import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  FC,
  ReactNode,
} from 'react';
import { Graph } from '@antv/x6';
import { Col, Row, Modal, Card } from '@douyinfe/semi-ui';
import { IconWifi, IconCode } from '@douyinfe/semi-icons';
import useStateCallback from '@/hooks/useStateCallback';
import { PostTools } from '../PostTools';
import { CodeEditor } from '../CodeEditor';
import { config, GraphHoc, portSync, nodeSync, plusSync } from './chartTools';
import { useCallback } from 'react';

// TODO: 此处处理的不好
// eslint-disable-next-line no-unused-vars
const TypeCard: FC<{
  onChange: Function;
}> = (props) => {
  const { Meta } = Card;
  const [nodeType, setNodeType] = useState<string>('');
  const template = useMemo(
    () => [
      {
        _key: 'fetch',
        style: {
          background:
            nodeType === 'fetch' ? 'var(--semi-color-primary)' : '#fff',
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
    ],
    [nodeType],
  );

  useEffect(() => {
    return () => {
      // setNodeType('');
    };
  }, []);

  return (
    // @ts-ignore
    <Row type='flex' justify='space-around' align='middle'>
      {template.map((node, index) => (
        <Col span={12} key={index}>
          <Card
            style={node.style}
            cover={node.cover}
            // @ts-ignore
            onClick={() => {
              props.onChange(template[index]._key);
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
  );
};

export const WorkFlow = () => {
  const editRef = useRef<HTMLDivElement>(null);
  const [nodes, setNode] = useStateCallback([]);
  const [currentType, setCurrentType] = useState<'handler' | 'fetch' | ''>('');
  const [viewControl, setViewControl] = useState<'handler' | 'fetch' | ''>('');

  // 增加节点
  const handleNodePlus = (_context: Graph, _id: string) => {
    console.log(currentType);
  };

  console.log(currentType, '======');

  // 初始化编辑器注入
  useEffect(() => {
    const width = editRef.current?.clientWidth!;
    const height = document.body.clientHeight - 90;

    const graph = new GraphHoc({
      container: editRef.current!,
      width,
      height,
      ...config,
    });

    // 处理事件
    graph?.on('cell:click', ({ cell }) => {
      const { _key } = cell.data;
      if (_key === 'handler' || _key === 'fetch') {
        setViewControl(_key);
      } else {
        Modal.info({
          title: '请选择模块类型',
          // @ts-ignore
          content: (
            <TypeCard
              onChange={(v) => {
                console.log(v, '------');
                setCurrentType(v);
              }}
            />
          ),
          onOk: () => handleNodePlus(graph, cell.id),
        });
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
      (n: any) => graph?.fromJSON(n),
    );
  }, []);

  return (
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
  );
};
