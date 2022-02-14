import {
  //   GraphHoc,
  portSync,
  nodeSync,
  plusSync,
  //   eventSync,
} from '../components/WorkFlow/chartTools';

interface NodesR<T> {
  nodes: T[];
  edges: [];
}

export interface NodeP {
  id: string;
  shape: string;
  width: number;
  height: number;
  data: { _key: string };
  next: {
    [props: string]: NodeP;
  };
  label?: string;
}

export class vNode {
  nodes: NodeP;
  format: NodesR<NodeP>;
  start: NodeP;
  end: NodeP;

  constructor() {
    this.nodes = nodeSync('开始', 'start');
    // @ts-ignore TODO: ts类型优化
    this.format = {};
    this.start = plusSync();
    this.end = nodeSync('结束', 'end');
    this.init();
  }

  dfs(searchId: string, nodes: NodeP) {
    if (nodes.id === searchId) {
      return nodes;
    }
    if (nodes.next[searchId]) {
      return nodes.next[searchId];
    }
    const nexts = Object.values(nodes?.next);
    for (let index = 0; index < nexts.length; index++) {
      this.dfs(searchId, nexts[index]);
    }
  }

  /**
   * 序列化node节点符合ant/x6数据结构
   * @returns
   */
  normalize(): NodesR<NodeP> {
    this.format.nodes = [];
    this.format.edges = [];
    const dfs = (node: NodeP) => {
      this.format.nodes.push(node);
      if (JSON.stringify(node) !== '{}') {
        Object.values(node.next).forEach((n) => {
          // @ts-ignore TODO: 类型优化
          this.format.edges.push(portSync(node.id, n.id));
          dfs(n);
        });
      }
    };
    dfs(this.nodes);
    return JSON.parse(JSON.stringify(this.format));
  }

  /**
   * 重新定义end节点位置
   */
  fillEnd() {
    const dfs = (node: NodeP) => {
      if (node.next['end'] && Object.values(node.next).length > 1) {
        delete node.next['end'];
        Object.values(node.next).forEach((n) => {
          dfs(n);
        });
      }
      if (!node.next['end'] && Object.values(node.next).length === 0) {
        node.next['end'] = this.end;
      }
      if (!node.next['end'] && Object.values(node.next).length >= 1) {
        Object.values(node.next).forEach((n) => {
          dfs(n);
        });
      }
    };
    dfs(this.nodes);
  }

  /**
   *
   * @param parentId 父级ID
   * @param node 当前节点NODE
   * @returns 当前节点NODE
   */
  add(parentId: string, node: NodeP): NodesR<NodeP> {
    // @ts-ignore
    const currentNode = this.dfs(parentId, this.nodes);
    // 初始化
    const plus = plusSync();
    node.next[plus.id] = plus;
    currentNode!.next[node.id] = node;
    this.fillEnd();
    console.log(this.nodes, '=======================================');
    return this.normalize();
  }

  // 数据初始化
  init() {
    this.nodes.next[this.start.id] = this.start;
    this.start.next[this.end.id] = this.end;
    this.normalize();
  }
}
