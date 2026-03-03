const adjust = (index, fn, collection) => {
  if (Math.abs(index) > collection.length)
    return collection;
  const i = collection.length + index;
  return Object.assign([], collection, { [i]: fn(collection[i]) });
};
const asyncCompose = (...fns) => async (value, ...args) => {
  let result = value;
  const reversedFns = fns.slice().reverse();
  for (let i = 0; i < reversedFns.length; i += 1) {
    const fn = reversedFns[i];
    result = await fn(result, ...args);
  }
  return result;
};
const capitalize = (value) => {
  if (!value)
    return value;
  return value.replace(/(^|\s)\S/g, (l) => l.toUpperCase());
};
const castArray = (value) => {
  return Array.isArray(value) ? value : [value];
};
const compose = (...fns) => (value, ...args) => {
  let result = value;
  const reversedFns = fns.slice().reverse();
  for (let i = 0; i < reversedFns.length; i += 1) {
    const fn = reversedFns[i];
    result = fn(result, ...args);
  }
  return result;
};
const dropLast = (array) => array.slice(0, array.length - 1);
function evolve(transformations, object) {
  const result = {};
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const transformation = transformations[key];
    if (typeof transformation === "function") {
      result[key] = transformation(object[key]);
    } else {
      result[key] = object[key];
    }
  }
  return result;
}
const isNil = (value) => value === null || value === void 0;
function last(value) {
  return value === "" ? "" : value[value.length - 1];
}
const mapValues = (object, fn) => {
  const entries = Object.entries(object);
  const acc = {};
  return entries.reduce((acc2, [key, value], index) => {
    acc2[key] = fn(value, key, index);
    return acc2;
  }, acc);
};
const isPercent = (value) => /((-)?\d+\.?\d*)%/g.exec(`${value}`);
const matchPercent = (value) => {
  const match = isPercent(value);
  if (match) {
    const f = parseFloat(match[1]);
    const percent = f / 100;
    return { percent, value: f };
  }
  return null;
};
const omit = (keys, object) => {
  const _keys = castArray(keys);
  const copy = Object.assign({}, object);
  _keys.forEach((key) => {
    delete copy[key];
  });
  return copy;
};
const pick = (keys, obj) => {
  const result = {};
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (key in obj)
      result[key] = obj[key];
  }
  return result;
};
const repeat = (element, length = 0) => {
  const result = new Array(length);
  for (let i = 0; i < length; i += 1) {
    result[i] = element;
  }
  return result;
};
const reverse = (list) => Array.prototype.slice.call(list, 0).reverse();
const upperFirst = (value) => {
  if (!value)
    return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};
const without = (keys, array) => {
  const result = [];
  for (let i = 0; i < array.length; i += 1) {
    const value = array[i];
    if (!keys.includes(value))
      result.push(value);
  }
  return result;
};
const parseFloat$1 = (value) => {
  return typeof value === "string" ? Number.parseFloat(value) : value;
};
export {
  castArray as a,
  adjust as b,
  compose as c,
  dropLast as d,
  reverse as e,
  asyncCompose as f,
  pick as g,
  evolve as h,
  isNil as i,
  mapValues as j,
  capitalize as k,
  last as l,
  matchPercent as m,
  omit as o,
  parseFloat$1 as p,
  repeat as r,
  upperFirst as u,
  without as w
};
