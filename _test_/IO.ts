// console.log('start');
//
// setImmediate(() => {
//   console.log('setImmediate');
// });
//
// process.nextTick(() => {
//   console.log('nextTick');
// });
//
// Promise.resolve().then(() => {
//   console.log('promise');
// });
//
// console.log('end');
//
// setTimeout(()=> {
//   console.log('setTimeout');
//
//   setImmediate(() => {
//     console.log('setImmediate1');
//   });
//
//   process.nextTick(() => {
//     console.log('nextTick1');
//   });
//
//   Promise.resolve().then(() => {
//     console.log('promise1');
//   });
// })



// import * as fs from 'node:fs'
//
//
// fs.readFile('.', () => {
//   setTimeout(() => {
//     console.log('setTimeout');
//   }, 0);
//
//   setImmediate(() => {
//     console.log('setImmediate');
//   });
// });


// console.log('sync');
//
// process.nextTick(() => console.log('nextTick'));
//
// Promise.resolve().then(() => console.log('promise'));
//
// setTimeout(() => console.log('setTimeout'), 0);
//
// queueMicrotask(()=> {
//   console.log('queueMicrotask');
// })
//
// setImmediate(() => console.log('setImmediate'));

