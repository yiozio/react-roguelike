/** 配列とオブジェクトを再帰的にコピーする。
 * @param origin コピー元
 * @return コピー結果
 */
export function deepcopy<T>(origin: T): T {
  if (origin instanceof Array) {
    const copy = [];
    for (const key in origin) {
      if (origin.hasOwnProperty(key)) {
        copy.push(deepcopy(origin[key]));
      }
    }
    return copy as any;
  }
  if (origin instanceof Object) {
    const copy = { ...(origin as any) };
    for (const key in origin) {
      if ((origin as Object).hasOwnProperty(key)) {
        copy[key] = deepcopy(origin[key]);
      }
    }
    return copy;
  }
  return origin;
}
