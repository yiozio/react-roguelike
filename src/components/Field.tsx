import * as React from 'react';
import map from '../defs/map';
import * as func from '../defs/func';
import * as display from '../defs/display';

interface Props {
  size: { width: number; height: number };
}
export default function Field({ size }: Props) {
  const position = { x: 2, y: 2 };
  const mapIns = func.deepcopy(map);
  mapIns[position.y] =
    mapIns[position.y].slice(0, position.x) + '2' + mapIns[position.y].slice(position.x + 1);

  return (
    <div className="field" style={size}>
      {mapIns.map(line => (
        <div>
          {Array.from(line)
            .map(elem => display.objects[elem])
            .map(obj => (
              <span className={obj.name}>{obj.view}</span>
            ))}
        </div>
      ))}
    </div>
  );
}
