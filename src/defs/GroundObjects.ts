interface Ground {
  name: string;
  type: string;
  view: string;
  through: boolean;
}
const grounds: Ground[] = [
  {
    name: '地',
    type: 'floor',
    view: '．',
    through: true
  },
  {
    name: '壁',
    type: 'wall',
    view: '＃',
    through: false
  },
  {
    name: '階段',
    type: 'stair',
    view: '↓',
    through: true
  }
];

export default grounds;
