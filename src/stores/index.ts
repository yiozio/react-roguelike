import { observable, action } from 'mobx';
import map from '../defs/map';

interface Position {
  x: number;
  y: number;
}
interface Object {
  position: Position;
  speed: number;
}

class Dungeon {
  @observable player: Object = { position: { x: 0, y: 0 }, speed: 1 };
  @observable level = 0;
  @observable time = 0;

  constructor() {
    this.player.position = { ...map[this.level].initPosition };
  }

  @action
  move(move: Position) {
    const position = this.player.position;
    const x = position.x + move.x;
    const y = position.y + move.y;
    if (map[this.level].floor[y][x] !== '.') return;
    this.player.position = { x, y };
    this.time += this.player.speed;
  }
  @action
  action() {
    if (this.diffPosition(this.player.position, map[this.level].exitPosition)) {
      this.level += 1;
      this.player.position = { ...map[this.level].initPosition };
    } else {
      this.time += this.player.speed;
    }
  }

  diffPosition(position1: Position, position2: Position) {
    return position1.x === position2.x && position1.y === position2.y;
  }
}

export default new Dungeon();
