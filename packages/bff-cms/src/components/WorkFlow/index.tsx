import React, { useEffect, useRef, useState, FC } from 'react';
import { Col, Row, Modal, Card } from '@douyinfe/semi-ui';
import { Graph, Cell, EdgeView, Vector } from '@antv/x6';
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
  const pointsRef = useRef();
  const [points, setNode] = useStateCallback({});
  const [visible, setVisible] = useState<boolean>(false);
  const [viewControl, setViewControl] = useState<'handler' | 'fetch' | ''>('');
  // 缓存全局视图实例
  const graph = useRef<Graph>();
  // 缓存当前选择节点
  const selectNode = useRef<Cell | undefined>();
  // 缓存布局指针 TODO: ts优化
  const dagreLayout = useRef<any>();
  // 缓存当期那nodes节点指针
  pointsRef.current = points;

  // 增加节点
  function handleNodePlus(nodeType: 'handler' | 'fetch' | '') {
    function addNode(type: string) {
      const { data: current } = (selectNode.current as any).store;
      const plus = plusSync();
      const next = eventSync(type, type);
      const nodes = [...points.nodes, ...[next, plus]];
      // ---------------------------TODO: 后续进行优化--------------------------------------
      // 1. 清除所有倒数第一节点与尾节点的关联关系
      const residueEdges = points.edges.filter(
        (n: { target: string }) => n.target !== 'end',
      );
      // 2. 找出所有的plus节点
      const plusNode = nodes.filter(
        (n: { data: { _key: string } }) => n.data._key === 'plus',
      );
      // 3. 筛选出已建立子节点连接plus节点
      const cacheEdges = [
        ...residueEdges,
        ...[portSync(current.id, next.id), portSync(next.id, plus.id)],
      ];
      const residueNodes = plusNode.filter(
        (n: { id: string }) =>
          !cacheEdges.map((s: any) => s.source).includes(n.id),
      );
      // 4. 建立与结束节点的连线
      const othersEdges = residueNodes.map((n: { id: string }) =>
        portSync(n.id, 'end'),
      );
      // ---------------------------TODO: 后续进行优化--------------------------------------
      setNode(
        {
          nodes,
          edges: [...cacheEdges, ...othersEdges],
        },
        (n: any) => {
          const model = dagreLayout.current.layout(n);
          (graph.current as unknown as Graph).fromJSON(model);
        },
      );
    }
    if (nodeType) addNode(nodeType);
  }

  // 初始化编辑器注入
  useEffect(() => {
    const width = editRef.current?.clientWidth!;
    const height = document.body.clientHeight - 90;

    graph.current = new GraphHoc({
      container: editRef.current!,
      width,
      height,
      ...config,
    });

    dagreLayout.current = new DagreLayout({
      type: 'dagre',
      rankdir: 'TB',
      begin: [width / 2, 10],
      align: 'DL',
      ranksep: 25,
      nodesep: 25,
      controlPoints: true,
    });

    // 定义事件方法  ---- 节点添加
    graph.current.on('cell:click', ({ cell }: { cell: Cell }) => {
      const { _key } = cell.data;
      if (_key === 'handler' || _key === 'fetch') {
        return setViewControl(_key);
      }
      if (_key === 'plus') {
        setVisible(!visible);
        return ((selectNode.current as unknown as Cell) = cell);
      }
      graph.current?.trigger('signal', cell);
    });

    // 自定义事件方法  ---- 节点删除
    graph.current.on('cell:removed', ({ cell }: { cell: Cell }) => {
      //
      console.log(pointsRef.current, cell, '================');
    });

    // -----------------------------节点动画------------------------------------
    function flash(cell: Cell) {
      const cellView = graph.current?.findViewByCell(cell);
      if (cellView) {
        cellView.highlight();
        setTimeout(() => cellView.unhighlight(), 300);
      }
    }

    graph.current.on('signal', (cell: Cell) => {
      if (cell.isEdge()) {
        const view = (graph.current as unknown as Graph).findViewByCell(
          cell,
        ) as EdgeView;
        if (view) {
          const token = Vector.create('circle', { r: 6, fill: '#feb662' });
          const target = cell.getTargetCell();
          setTimeout(() => {
            view.sendToken(token.node, 1000, () => {
              if (target) {
                (graph.current as unknown as Graph).trigger('signal', target);
              }
            });
          }, 300);
        }
      } else {
        flash(cell);
        const edges = (
          graph.current as unknown as Graph
        ).model.getConnectedEdges(cell, {
          outgoing: true,
        });
        edges.forEach((edge) =>
          (graph.current as unknown as Graph).trigger('signal', edge),
        );
      }
    });
    // -----------------------------节点动画------------------------------------

    // 初始化节点
    const start = nodeSync('开始', 'start');
    const end = nodeSync('结束', 'end');
    const plus = plusSync();

    setNode(
      {
        nodes: [start, plus, end],
        edges: [portSync(start.id, plus.id), portSync(plus.id, end.id)],
      },
      (n: any) => {
        const model = dagreLayout.current.layout(n);
        graph.current?.fromJSON(model);
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
          {(() => {
            if (viewControl === 'handler') return <CodeEditor />;
            else if (viewControl === 'fetch') return <PostTools />;
            else return <>Welcome</>;
          })()}
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
