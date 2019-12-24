import { observable, action, computed } from 'mobx';
import map from '../defs/map';
import system from './system';
import ActorObjects from '../defs/ActorObjects';
import GroundObjects from '../defs/GroundObjects';

interface Position {
  x: number;
  y: number;
}
interface Object {
  id: number;
  exp: number;
  hp: number;
  position: Position;
  speed: number;
}

class Dungeon {
  @observable player: Object = {
    id: 0,
    exp: 0,
    hp: ActorObjects[0].hpmax,
    position: { x: 0, y: 0 },
    speed: 1
  };
  @observable level = 0;
  @observable time = 0;

  constructor() {
    this.player.position = { ...map[this.level].initPosition };
    system.log('スタート');
  }

  @action
  move(move: Position) {
    const x = this.player.position.x + move.x;
    const y = this.player.position.y + move.y;
    const g = GroundObjects[Number(map[this.level].floor[y][x])];
    if (!g.through) {
      system.log(`${g.name}にぶつかりました。`);
      return;
    }
    if (g.type !== 'floor') {
      system.log(`${g.name}の上にいます`);
    }
    this.player.position = { x, y };
    this.time += this.player.speed;
  }
  @action
  action() {
    const x = this.player.position.x;
    const y = this.player.position.y;
    const g = GroundObjects[Number(map[this.level].floor[y][x])];

    if (g.type === 'stair') {
      this.level += 1;
      this.player.position = { ...map[this.level].initPosition };
      system.log(`地下${this.level + 1}階に下りました。`);
    } else {
      this.time += this.player.speed;
    }
  }

  @computed get status() {
    return {
      name: ActorObjects[this.player.id].name,
      lvl: 1,
      next: [0, this.player.exp],
      hp: this.player.hp,
      hpmax: ActorObjects[this.player.id].hpmax,
      str: ActorObjects[this.player.id].str,
      speed: ActorObjects[this.player.id].speed
    };
  }

  diffPosition(position1: Position, position2: Position) {
    return position1.x === position2.x && position1.y === position2.y;
  }
}

export default new Dungeon();
