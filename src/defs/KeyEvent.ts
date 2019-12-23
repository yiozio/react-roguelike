import stores from '../stores';

export default (e: KeyboardEvent) => {
  const move = { x: 0, y: 0 };
  switch (e.keyCode) {
    case 72:
      move.x = -1;
      break;
    case 74:
      move.y = +1;
      break;
    case 75:
      move.y = -1;
      break;
    case 76:
      move.x = +1;
      break;
  }
  stores.move(move);
};
