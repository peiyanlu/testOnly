const obj = {
  a: undefined,
  // b: () => {},
  // c: Symbol('sym'),
  d: new Date(),
  e: /abc/,
  f: new Map(),
  g: new Set(),
  h: Infinity,
  i: null,
}

console.log(JSON.stringify(obj))
// {"d":"2025-06-11T14:03:26.781Z","e":{},"f":{},"g":{},"h":null,"i":null}

console.log(JSON.stringify([ ...Object.values(obj) ]))
// [ null, null, null, '2025-06-11T14:03:26.781Z', {}, {}, {}, null, null ]

const arr = [ { a: 1, b: { c: 2 } } ];
const deep = structuredClone(arr);

deep[0].a = 100;
console.log(arr[0].a);

console.log(structuredClone(obj))
