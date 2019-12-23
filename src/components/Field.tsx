import * as React from 'react';
import { observer } from 'mobx-react';
import map from '../defs/map';
import * as func from '../defs/func';
import * as display from '../defs/display';
import dungeon from '../stores/dungeon';

interface Props {
  size: { width: number; height: number };
}

export default observer(Field);
function Field({ size }: Props) {
  const position = dungeon.player.position;
  const floorMap = func.deepcopy(map[dungeon.level].floor);
  floorMap[map[dungeon.level].exitPosition.y] =
    floorMap[map[dungeon.level].exitPosition.y].slice(0, map[dungeon.level].exitPosition.x) +
    '%' +
    floorMap[map[dungeon.level].exitPosition.y].slice(map[dungeon.level].exitPosition.x + 1);
  floorMap[position.y] =
    floorMap[position.y].slice(0, position.x) + '@' + floorMap[position.y].slice(position.x + 1);

  return (
    <div className="field" style={size}>
      {floorMap.map((line, y) => (
        <div key={y}>
          {Array.from(line)
            .map(elem => display.objects[elem])
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
