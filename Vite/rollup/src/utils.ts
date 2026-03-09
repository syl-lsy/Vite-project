function getRandomNumber(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
type Obj = {
  [key: string]: any;
};
function deepClone(obj: Obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  let result: Obj;
  if (Array.isArray(obj)) {
    result = [];
  } else {
    result = {};
  }
  for (const key in obj) {
    result[key] = deepClone(obj[key]);
  }
}

export { getRandomNumber, deepClone };
