import { observable, action } from 'mobx';
import map from '../defs/map';

interface Object {
  position: { x: number; y: number };
  speed: number;
}

class Dungeon {
  @observable player: Object = { position: { x: 0, y: 0 }, speed: 1 };
  @observable floor = 0;
  @observable time = 0;

  constructor() {
    this.player.position = map[this.floor].initPosition;
  }

  @action
  move(move: { x: number; y: number }) {
    const position = this.player.position;
    const x = position.x + move.x;
    const y = position.y + move.y;
    if (map[this.floor].floor[y][x] !== '.') return;
    this.player.position = { x, y };
    this.time += this.player.speed;
  }
}

export default new Dungeon();
