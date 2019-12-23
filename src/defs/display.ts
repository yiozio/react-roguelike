interface DisplayObject {
  name: string;
  view: string;
}
export const objects: { [char: string]: DisplayObject } = {
  '.': {
    name: 'floor',
    view: '．'
  },
  '#': {
    name: 'wall',
    view: '＃'
  },
  '@': {
    name: 'player',
    view: '＠'
  },
  '%': {
    name: 'stair',
    view: '↓'
  }
};
