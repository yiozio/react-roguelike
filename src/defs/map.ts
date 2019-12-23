interface Map {
  floor: string[];
  initPosition: { x: number; y: number };
  exitPosition: { x: number; y: number };
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
    initPosition: { x: 2, y: 2 },
    exitPosition: { x: 7, y: 5 }
  },
  {
    floor: ['##########', '#........#', '#........#', '##########'],
    initPosition: { x: 1, y: 1 },
    exitPosition: { x: 8, y: 2 }
  }
];

export default map;
