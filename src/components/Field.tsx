import * as React from 'react';
import { observer } from 'mobx-react';
import map from '../defs/map';
import * as func from '../defs/func';
import * as display from '../defs/display';
import world from '../stores';

interface Props {
  size: { width: number; height: number };
}

export default observer(Field);
function Field({ size }: Props) {
  const position = world.player.position;
  const floorMap = func.deepcopy(map[world.floor].floor);
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
