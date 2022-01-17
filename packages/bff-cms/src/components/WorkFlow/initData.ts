import { Graph } from '@antv/x6';

// 流程图节点样式
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

export default {
  // 节点
  nodes: [
    {
      id: '1',
      shape: 'event',
      width: 50,
      height: 50,
      label: '开始',
      position: {
        x: 50,
        y: 180,
      },
    },
    {
      id: '2',
      shape: 'activity',
      width: 100,
      height: 60,
      position: {
        x: 25,
        y: 280,
      },
      label: '参数校验',
      data: {
        _key: 'validate',
      },
    },
    {
      id: '3',
      shape: 'bpmn-edge',
      source: '1',
      target: '2',
    },
    {
      id: '4',
      shape: 'gateway',
      width: 55,
      height: 55,
      position: {
        x: 170,
        y: 282.5,
      },
      data: {
        _key: 'plus',
      },
    },
    {
      id: '5',
      shape: 'bpmn-edge',
      source: '2',
      target: '4',
    },
    {
      id: '6',
      shape: 'activity',
      width: 100,
      height: 60,
      position: {
        x: 300,
        y: 240,
      },
      label: '接口一',
      data: {
        _key: 'api',
      },
    },
    {
      id: '7',
      shape: 'activity',
      width: 100,
      height: 60,
      position: {
        x: 300,
        y: 320,
      },
      label: '接口二',
      data: {
        _key: 'api',
      },
    },
    {
      id: '8',
      shape: 'bpmn-edge',
      source: '4',
      target: '6',
    },
    {
      id: '9',
      shape: 'bpmn-edge',
      source: '4',
      target: '7',
    },
    {
      id: '10',
      shape: 'gateway',
      width: 55,
      height: 55,
      position: {
        x: 460,
        y: 282.5,
      },
    },
    {
      id: '11',
      shape: 'bpmn-edge',
      source: '6',
      target: '10',
    },
    {
      id: '12',
      shape: 'bpmn-edge',
      source: '7',
      target: '10',
    },
    {
      id: '13',
      shape: 'activity',
      width: 100,
      height: 60,
      position: {
        x: 560,
        y: 280,
      },
      label: '数据聚合',
      data: {
        _key: 'format',
      },
    },
    {
      id: '14',
      shape: 'bpmn-edge',
      source: '10',
      target: '13',
    },
    {
      id: '15',
      shape: 'event',
      width: 50,
      height: 50,
      label: '结束',
      position: {
        x: 710,
        y: 285,
      },
      attrs: {
        body: {
          strokeWidth: 4,
        },
      },
    },
    {
      id: '16',
      shape: 'bpmn-edge',
      source: '13',
      target: '15',
    },
  ],
};

// 流程图基础配置
export const graphConfig = {
  // 背景矩阵
  grid: true,
  // 允许圈选
  selecting: {
    enabled: false,
  },
  connecting: {
    router: 'orth',
  },
};

export const GraphHoc = Graph;
