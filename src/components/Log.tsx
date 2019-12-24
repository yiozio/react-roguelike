import * as React from 'react';
import { observer } from 'mobx-react';
import system from '../stores/system';

export default observer(Logs);
function Logs() {
  return (
    <div
      className="logs"
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
