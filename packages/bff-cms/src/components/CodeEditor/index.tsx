import React, { FC } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const DEFAULT_CODE = `/*
  © Microsoft. All rights reserved.

  This library is supported for use in Windows Tailored Apps only.

  Build: 6.2.8100.0 
  Version: 0.5 
*/
module.exports = function (context, next) {
    next();
}
`;

export const CodeEditor: FC<{
  code?: string;
}> = ({ code }) => {
  return (
    <>
      <h3>代码编辑器</h3>
      <CodeMirror
        value={code ?? DEFAULT_CODE}
        height={`${document.body.clientHeight - 140}px`}
        theme={'dark'}
        extensions={[javascript({ jsx: true })]}
        onChange={(value) => {
          console.log('value:', value);
        }}
      />
    </>
  );
};
