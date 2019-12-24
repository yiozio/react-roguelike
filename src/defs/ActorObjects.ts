interface Actor {
  name: string;
  type: string;
  view: string;
  hpmax: number;
  str: number;
  xp: number;
  speed: number;
}

const actors: Actor[] = [
  {
    name: 'Player',
    type: 'player',
    view: '＠',
    hpmax: 10,
    str: 1,
    xp: 0,
    speed: 1
  }
];

export default actors;
