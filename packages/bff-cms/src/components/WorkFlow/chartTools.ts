import { Graph } from '@antv/x6';

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
export const portSync = (id: string, s: string, t: string) => ({
  id,
  shape: 'bpmn-edge',
  source: s,
  target: t,
});

// 开始 + 结束节点
export const nodeSync = (id: string, t: string, x: number, y: number) => ({
  id,
  shape: 'event',
  width: 50,
  height: 50,
  label: t,
  data: {
    _key: '',
  },
  position: {
    x,
    y,
  },
});

// 增加按钮
export const plusSync = (id: string, x: number, y: number) => ({
  id,
  shape: 'gateway',
  width: 50,
  height: 50,
  position: {
    x,
    y,
  },
  data: {
    _key: 'plus',
  },
});

export const eventSync = (id: string, type: string, x: number, y: number) => ({
  id,
  shape: 'activity',
  width: 50,
  height: 50,
  position: {
    x,
    y,
  },
  data: {
    _key: type,
  },
});

// 初始化节点位置
export const nodes = (cw: number) => [
  nodeSync('1', '开始', cw / 2, 10),
  plusSync('2', cw / 2, 110),
  portSync('3', '1', '2'),
  nodeSync('4', '结束', cw / 2, 210),
  portSync('5', '2', '4'),
];

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
