interface DisplayObject {
  name: string;
  view: string;
}
export const objects: { [char: string]: DisplayObject } = {
  '0': {
    name: 'floor',
    view: '．'
  },
  '1': {
    name: 'wall',
    view: '＃'
  },
  '2': {
    name: 'player',
    view: '＠'
  }
};
