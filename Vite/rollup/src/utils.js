function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  let result;
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
