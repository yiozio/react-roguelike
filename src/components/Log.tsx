import * as React from 'react';
import { observer } from 'mobx-react';
import system from '../stores/system';

interface Props {
  size: { width: number; height: number };
}

export default observer(Logs);
function Logs({ size }: Props) {
  return (
    <div
      className="logs"
      style={size}
      ref={dom => {
        if (dom) dom.scrollTop = dom.scrollHeight;
      }}
    >
      {system.logs.map((log, i) => (
        <div key={i}>{log}</div>
      ))}
    </div>
  );
}
