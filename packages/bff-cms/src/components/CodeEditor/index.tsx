// import React, { FC } from 'react';
// import CodeMirror from '@uiw/react-codemirror';
// // import { nginx } from '@codemirror/legacy-modes/mode/nginx';

// const DEFAULT_CODE = `server {
//     listen 80;
//     server_name example.com;
//     root /var/www/example.com;
//     location / {
//         index index.php index.html index.htm;
//         autoindex on;
//     }
// }
// `;

// export const CodeEditor: FC<{
//   title?: string;
//   editable?: boolean;
//   code?: string;
//   className?: string;
// }> = ({ code, className, editable, title }) => {
//   return (
//     <div className={className}>
//       <h3>{title || '代码编辑器'}</h3>
//       <CodeMirror
//         value={code ?? DEFAULT_CODE}
//         height={`${document.body.clientHeight - 480}px`}
//         theme={'dark'}
//         editable={editable}
//       />
//     </div>
//   );
// };

import React, { FC, useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import styles from './Editor.module.css';

export const Editor: FC<{
  language: string;
  title?: string;
  height?: string;
  className?: string;
  code?: string;
}> = ({ className, title, code, language, height }) => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl && !editor) {
      setEditor(
        monaco.editor.create(monacoEl.current!, {
          value: code,
          language: language,
        }),
      );
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  return (
    <div className={className}>
      <h3 style={{ marginLeft: '30px' }}>{title || '代码编辑器'}</h3>
      <div style={{ height }} className={styles.Editor} ref={monacoEl}></div>
    </div>
  );
};
