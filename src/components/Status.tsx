import * as React from 'react';
import { observer } from 'mobx-react';
import dungeon from '../stores/dungeon';

export default observer(Status);
function Status() {
  const status = dungeon.status;
  return (
    <div className="status">
      <div>{`${status.name}`}</div>
      <div>{`LVL: ${status.lvl} ${status.next[0]}/${status.next[1]}`}</div>
      <div>{`HP:  ${status.hp}/${status.hpmax}`}</div>
      <div>{`STR: ${status.str}`}</div>
      <div>{`SPD: ${status.speed}`}</div>
    </div>
  );
}
