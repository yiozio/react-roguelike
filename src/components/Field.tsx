import * as React from 'react';
import { observer } from 'mobx-react';
import map from '../defs/map';
import * as func from '../defs/func';
import ActorObjects from '../defs/ActorObjects';
import GroundObjects from '../defs/GroundObjects';
import dungeon from '../stores/dungeon';

export default observer(Field);
function Field() {
  const floorMap = func.deepcopy(map(dungeon.level).floor);

  return (
    <div className="field">
      {floorMap.map((line, y) => (
        <div key={y}>
          {Array.from(line)
            .map((elem, x) =>
              dungeon.diffPosition({ x, y }, dungeon.player.position)
                ? ActorObjects[dungeon.player.id]
                : GroundObjects[Number(elem)]
            )
            .map((obj, x) => (
              <span key={x} className={obj.name}>
                {obj.view}
              </span>
            ))}
        </div>
      ))}
    </div>
  );
}
