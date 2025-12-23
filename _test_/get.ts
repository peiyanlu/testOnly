const set = <S extends Record<any, any>, V>(obj: S, keyStr: string, val: V) => {
  let current = obj
  
  const keys = keyStr.split('.')
  const last = keys.pop() as string
  
  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }
  
  current[last] = val
}


const obj = {
  foo: {
    bar: {
      dd: '55',
    },
  },
  bb: undefined,
  symbol: Symbol('symbol'),
  reg: /\d+/
}
set(obj, 'foo.bar.dd', 'bar')
console.log(obj)


const arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
const copied = structuredClone(arr)
copied[4] = 444
console.log(arr, copied)


const obj123 = {
  a: undefined,
  b: () => {},
  c: Symbol('c'),
  d: new Date(),
  e: /abc/,
  f: new Map(),
  g: new Set(),
  h: NaN,
};
const arr1 = [ new Date(), new Date(), undefined, Symbol('string') ]
const newObj1 = JSON.parse(JSON.stringify([...Object.values(obj123)]));
const newObj2 = JSON.parse(JSON.stringify(obj123));
console.log(newObj1)
console.log(newObj2)
