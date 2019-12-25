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
  const size = { width: floorMap[0].length * 12, height: floorMap.length * 12 };
  const playerPos = { ...dungeon.player.position };
  playerPos.x = playerPos.x * 12 + 6;
  playerPos.y = playerPos.y * 12 + 6;

  return (
    <div
      className="field"
      style={{ width: size.width, height: size.height }}
      ref={dom => {
        if (!dom) return;
        const parent = dom.parentElement;
        if (!parent) return;
        const sightX = parent.clientWidth / 2;
        const sightY = parent.clientHeight / 2;
        parent.scrollLeft = playerPos.x - sightX;
        parent.scrollTop = playerPos.y - sightY;
      }}
    >
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
