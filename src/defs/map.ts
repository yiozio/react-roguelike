interface Map {
  floor: string[];
  initPosition: { x: number; y: number };
}

const map: Map[] = [
  {
    floor: [
      '1111111111111',
      '1000000000001',
      '1000000000001',
      '1000000100001',
      '1000000020001',
      '1000000001111',
      '1111111111'
    ],
    initPosition: { x: 2, y: 2 }
  },
  {
    floor: ['1111111111', '1000000001', '1000000021', '1111111111'],
    initPosition: { x: 1, y: 1 }
  }
];

export default map;
