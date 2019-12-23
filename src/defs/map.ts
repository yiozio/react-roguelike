interface Map {
  floor: string[];
  initPosition: { x: number; y: number };
}

const map: Map[] = [
  {
    floor: [
      '#############',
      '#...........#',
      '#...........#',
      '#......#....#',
      '#...........#',
      '#........####',
      '##########'
    ],
    initPosition: { x: 2, y: 2 }
  }
];

export default map;
