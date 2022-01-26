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

interface NodeP {
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

  constructor() {
    this.nodes = nodeSync('开始', 'start');
    // @ts-ignore TODO: ts类型优化
    this.format = {};
    this.init();
  }

  dfs(searchId: string, nodes: NodeP): NodeP {
    if (nodes.id === searchId) {
      return nodes;
    }
    if (nodes.next[searchId]) {
      return nodes.next[searchId];
    }
    Object.values(nodes?.next).forEach((n) => this.dfs(searchId, n));
    console.warn('==============> Node Search Error <==============');
    return {
      id: 'error',
      shape: '',
      width: 0,
      height: 0,
      data: { _key: 'error' },
      next: {},
    };
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
          this.format.edges.push(portSync(n.id, node.id));
          dfs(n);
        });
      }
    };
    dfs(this.nodes);
    return this.format;
  }

  /**
   *
   * @param parentId 父级ID
   * @param node 当前节点NODE
   * @returns 当前节点NODE
   */
  add(parentId: string, node: NodeP): NodeP {
    const currentNode = this.dfs(parentId, this.nodes);
    currentNode.next[node.id] = node;
    return currentNode.next[node.id];
  }

  // 数据初始化
  init() {
    const plus = plusSync();
    const next = this.add(this.nodes.id, plus);
    const end = nodeSync('结束', 'end');
    this.add(next.id, end);
    this.normalize();
  }
}
