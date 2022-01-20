import { Graph } from '@antv/x6';
import { nanoid } from 'nanoid';

// 流程图节点样式
// 起点 + 结束
Graph.registerNode(
  'event',
  {
    inherit: 'circle',
    attrs: {
      body: {
        strokeWidth: 2,
        stroke: '#5F95FF',
        fill: '#FFF',
      },
    },
  },
  true,
);

// handler
Graph.registerNode(
  'activity',
  {
    inherit: 'rect',
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'image',
        selector: 'img',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        rx: 6,
        ry: 6,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
        strokeWidth: 1,
      },
      img: {
        x: 6,
        y: 6,
        width: 16,
        height: 16,
      },
      label: {
        fontSize: 12,
        fill: '#262626',
      },
    },
  },
  true,
);

// 添加模块
Graph.registerNode(
  'gateway',
  {
    inherit: 'polygon',
    attrs: {
      body: {
        refPoints: '0,10 10,0 20,10 10,20',
        strokeWidth: 2,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
      label: {
        text: '+',
        fontSize: 40,
        fill: '#5F95FF',
      },
    },
  },
  true,
);

// 连接线
Graph.registerEdge(
  'bpmn-edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#A2B1C3',
        strokeWidth: 2,
      },
    },
  },
  true,
);

// 动态连接线
export const portSync = (s: string, t: string) => ({
  id: nanoid(),
  shape: 'bpmn-edge',
  source: s,
  target: t,
});

// 开始 + 结束节点
export const nodeSync = (t: string) => ({
  id: nanoid(),
  shape: 'event',
  width: 50,
  height: 50,
  label: t,
  data: {
    _key: '',
  },
});

// 增加按钮
export const plusSync = () => ({
  id: nanoid(),
  shape: 'gateway',
  width: 50,
  height: 50,
  data: {
    _key: 'plus',
  },
});

// 事件节点
export const eventSync = (type: string, label: string) => ({
  id: nanoid(),
  shape: 'activity',
  width: 100,
  height: 60,
  label,
  data: {
    _key: type,
  },
});

// 流程图基础配置
export const config = {
  // 背景矩阵
  grid: true,
  // 允许圈选
  selecting: {
    enabled: false,
  },
  interacting: {
    nodeMovable: false,
  },
};

export const GraphHoc = Graph;
