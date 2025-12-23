const deepCopy = (source: any, map: WeakMap<any, any>) => {
  if (source !== null && typeof source !== 'object') {
    return source
  }
  
  if (map.has(source)) {
    return map.get(source)
  }
  
  const clone = Array.isArray(source) ? [] : {}
  
  map.set(source, clone)
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      clone[key] = deepCopy(source[key], map)
    }
  }
  
  return clone
}


const obj = {
  a: 1,
  b: 2,
  date: new Date(),
  map: new Map()
};
obj.self = obj;


const symble = Symbol('symbol');
console.log(structuredClone(obj))
console.log(JSON.parse(JSON.stringify(obj)));
