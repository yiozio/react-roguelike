interface Point {
  x: number;
  y: number;
}
interface Map {
  floor: string[];
  initPosition: Point;
}

const map: (Map | (() => Map))[] = [
  {
    floor: ['1111111111111', '1000000000021', '1111111111111'],
    initPosition: { x: 1, y: 1 }
  },
  () => generateMap(0.5, 50),
  () => generateMap(0, 50),
  () => generateMap(1, 50),
  () => generateMap(0.5, 50),
  () => generateMap(0.5, 50)
];

export default (mapIndex: number): Map => {
  let m = map[mapIndex];
  if (typeof m === 'function') {
    m = m();
    map[mapIndex] = m;
  }
  return m;
};

function getRandomSize() {
  const ROOM_SIZE = [2, 3, 4, 5];
  return ROOM_SIZE[Math.floor(Math.random() * ROOM_SIZE.length)];
}

function generateMap(rate: number, count: number): Map {
  const data: MapObject[] = [];
  const floorPoints = new Set<string>();
  const doorPoints = new Set<string>();
  const wallPoints = new Set<string>();
  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;
  Array.from(Array(count)).forEach(() => {
    build: while (true) {
      const room = !!Math.floor(Math.random() + rate);
      const newMap = room ? generateRoom() : generatePassage();
      if (data.length === 0) {
        data.push(newMap);
        maxX = newMap.width;
        maxY = newMap.height;
        for (let x of Array.from(Array(newMap.width)).map((_, i) => i)) {
          x += newMap.x;
          for (let y of Array.from(Array(newMap.height)).map((_, i) => i)) {
            y += newMap.y;
            const p = `${x},${y}`;
            floorPoints.add(p);
          }
        }
        newMap.door_points.forEach(points => points.forEach(p => wallPoints.add(`${p.x},${p.y}`)));
        break;
      }
      const targetMap = data[Math.floor(Math.random() * data.length)];
      const targetDoorPointDirection = Math.floor(Math.random() * targetMap.door_points.length);
      const targetDoorPoints = targetMap.door_points[targetDoorPointDirection];
      const targetDoorPoint = targetDoorPoints[Math.floor(Math.random() * targetDoorPoints.length)];
      // 0(北)の場合は2(南),3(西)の場合は1(東)
      const newDoorPointDirection = (targetDoorPointDirection + 2) % 4;
      const newDoorPoints = newMap.door_points[newDoorPointDirection];
      const newDoorPoint = newDoorPoints[Math.floor(Math.random() * newDoorPoints.length)];

      const diffPoint = {
        x: newDoorPoint.x - targetDoorPoint.x,
        y: newDoorPoint.y - targetDoorPoint.y
      };
      newMap.x -= diffPoint.x;
      newMap.y -= diffPoint.y;
      newMap.door_points.forEach(points => {
        points.forEach(p => {
          p.x -= diffPoint.x;
          p.y -= diffPoint.y;
        });
      });

      const newFloorPoints = new Set<string>();
      for (const xCount of Array.from(Array(newMap.width)).map((_, i) => i)) {
        const x = xCount + newMap.x;
        for (const yCount of Array.from(Array(newMap.height)).map((_, i) => i)) {
          const y = yCount + newMap.y;
          const p = `${x},${y}`;
          if (floorPoints.has(p)) {
            let ps = '';
            floorPoints.forEach(fp => (ps += ';' + fp));
            continue build;
          }
          if (wallPoints.has(p)) {
            let ps = '';
            wallPoints.forEach(wp => (ps += ';' + wp));
            continue build;
          }
          newFloorPoints.add(p);
        }
      }
      newMap.door_points.forEach(points => points.forEach(p => wallPoints.add(`${p.x},${p.y}`)));
      newFloorPoints.forEach(p => floorPoints.add(p));
      doorPoints.add(`${targetDoorPoint.x},${targetDoorPoint.y}`);
      data.push(newMap);
      if (minX > newMap.x) minX = newMap.x;
      if (minY > newMap.y) minY = newMap.y;
      const x = newMap.x + newMap.width;
      const y = newMap.y + newMap.height;
      if (maxX < x) maxX = x;
      if (maxY < y) maxY = y;
      break build;
    }
  });
  minX -= 1;
  minY -= 1;
  maxX += 1;
  maxY += 1;
  const initPositionCsv = Array.from(floorPoints.keys())[
    Math.floor(Math.random() * floorPoints.size)
  ];
  const initPosition = initPositionCsv.split(',').map(n => Number(n));
  const map: Map = {
    floor: [],
    initPosition: { x: initPosition[0] - minX, y: initPosition[1] - minY }
  };
  const line = '1'.repeat(maxX - minX);
  Array.from(Array(maxY - minY)).forEach(() => map.floor.push(line));
  floorPoints.forEach(point => {
    const p = point.split(',').map(n => Number(n));
    const x = p[0] - minX;
    const y = p[1] - minY;
    map.floor[y] = map.floor[y].slice(0, x) + '0' + map.floor[y].slice(x + 1);
  });
  doorPoints.forEach(point => {
    const p = point.split(',').map(n => Number(n));
    const x = p[0] - minX;
    const y = p[1] - minY;
    map.floor[y] = map.floor[y].slice(0, x) + '0' + map.floor[y].slice(x + 1);
  });
  while (true) {
    const exitPositionCsv = Array.from(floorPoints.keys())[
      Math.floor(Math.random() * floorPoints.size)
    ];
    if (initPositionCsv === exitPositionCsv) continue;
    const exitPosition = exitPositionCsv.split(',').map(n => Number(n));
    const x = exitPosition[0] - minX;
    const y = exitPosition[1] - minY;
    map.floor[y] = map.floor[y].slice(0, x) + '2' + map.floor[y].slice(x + 1);
    break;
  }
  return map;
}
function generatePassage(): MapObject {
  const d = Math.round(Math.random());
  const size = { w: d ? getRandomSize() : 1, h: d ? 1 : getRandomSize() };
  return {
    x: 0,
    y: 0,
    width: size.w,
    height: size.h,
    door_points: getDoorPoints(0, 0, size.w, size.h)
  };
}
function generateRoom(): MapObject {
  const size = { w: getRandomSize(), h: getRandomSize() };
  return {
    x: 0,
    y: 0,
    width: size.w,
    height: size.h,
    door_points: getDoorPoints(0, 0, size.w, size.h)
  };
}
function getDoorPoints(x: number, y: number, w: number, h: number): MapObject['door_points'] {
  const result: MapObject['door_points'] = [];
  const xs = Array.from(Array(w)).map((_, i) => i + x);
  const ys = Array.from(Array(h)).map((_, i) => i + y);

  result.push([]);
  xs.forEach(x => result[0].push({ x, y: -1 }));
  result.push([]);
  ys.forEach(y => result[1].push({ x: w + x, y }));
  result.push([]);
  xs.reverse().forEach(x => result[2].push({ x, y: h + y }));
  result.push([]);
  ys.reverse().forEach(y => result[3].push({ x: -1, y }));

  return result;
}

interface MapObject {
  x: number;
  y: number;
  width: number;
  height: number;
  door_points: Point[][];
}
