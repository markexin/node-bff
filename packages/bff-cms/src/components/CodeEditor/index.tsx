import React, { FC } from 'react';
import CodeMirror from '@uiw/react-codemirror';
// import { nginx } from '@codemirror/legacy-modes/mode/nginx';

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
  editable?: boolean;
  code?: string;
  className?: string;
}> = ({ code, className, editable }) => {
  return (
    <div className={className}>
      <h3>代码编辑器</h3>
      <CodeMirror
        value={code ?? DEFAULT_CODE}
        height={`${document.body.clientHeight - 480}px`}
        theme={'dark'}
        editable={editable}
        onChange={(value) => {
          console.log('value:', value);
        }}
      />
    </div>
  );
};
