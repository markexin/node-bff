import React, { FC } from 'react';
import CodeMirror from '@uiw/react-codemirror';
// import { nginx } from '@codemirror/legacy-modes/mode/nginx';

const DEFAULT_CODE = `server {
    listen 80;
    server_name example.com;
    root /var/www/example.com;
    location / {
        index index.php index.html index.htm;
        autoindex on;
    }
}
`;

export const CodeEditor: FC<{
  title?: string;
  editable?: boolean;
  code?: string;
  className?: string;
}> = ({ code, className, editable, title }) => {
  return (
    <div className={className}>
      <h3>{title || '代码编辑器'}</h3>
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
