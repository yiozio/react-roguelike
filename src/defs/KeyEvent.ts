import stores from '../stores/dungeon';

export default (e: KeyboardEvent) => {
  switch (e.keyCode) {
    case 72:
      stores.move({ x: -1, y: 0 });
      break;
    case 74:
      stores.move({ x: 0, y: +1 });
      break;
    case 75:
      stores.move({ x: 0, y: -1 });
      break;
    case 76:
      stores.move({ x: +1, y: 0 });
      break;
    case 32:
      stores.action();
      break;
  }
};
