import React, { useEffect, useRef } from 'react';
import { Col, Row } from '@douyinfe/semi-ui';
// import { PostTools } from '../PostTools';
import { CodeEditor } from '../CodeEditor';
import initData, { graphConfig, GraphHoc } from './initData';

export const WorkFlow = () => {
  const editRef = useRef<HTMLDivElement>(null);

  // 初始化编辑器注入
  useEffect(() => {
    const graph = new GraphHoc({
      container: editRef.current!,
      width: editRef.current?.clientWidth,
      height: document.body.clientHeight,
      ...graphConfig,
    });
    // 处理事件
    graph?.on('cell:click', () => {
      console.log(1111);
    });
    // 流程图渲染
    graph?.fromJSON(initData);
  }, []);

  return (
    <Row gutter={30}>
      <Col span={12}>
        <div ref={editRef}></div>
      </Col>
      <Col span={12}>
        {/* <PostTools /> */}
        <CodeEditor />
      </Col>
    </Row>
  );
};
