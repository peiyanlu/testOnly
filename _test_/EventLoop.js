import * as fs from 'node:fs'


console.log('🟢 [sync] start');

// ✅ process.nextTick
process.nextTick(() => {
  console.log('🔁 [nextTick]');
});

// ✅ Promise 微任务
Promise.resolve().then(() => {
  console.log('🧩 [Promise.then]');
});

// ✅ setTimeout (timers)
setTimeout(() => {
  console.log('⏰ [setTimeout]');
  
  // 👀 setImmediate inside setTimeout
  setImmediate(() => {
    console.log('⚡ [setImmediate in setTimeout]');
  });
  
  process.nextTick(() => {
    console.log('🔁 [nextTick in setTimeout]');
  });
  
  Promise.resolve().then(() => {
    console.log('🧩 [Promise in setTimeout]');
  });
}, 0);

// ✅ setImmediate (check)
setImmediate(() => {
  console.log('⚡ [setImmediate]');
});

// ✅ fs.readFile (poll)
fs.readFile('.', () => {
  console.log('📄 [fs.readFile callback]');
  
  setImmediate(() => {
    console.log('⚡ [setImmediate in fs.readFile]');
  });
  
  setTimeout(() => {
    console.log('⏰ [setTimeout in fs.readFile]');
  }, 0);
  
  process.nextTick(() => {
    console.log('🔁 [nextTick in fs.readFile]');
  });
  
  Promise.resolve().then(() => {
    console.log('🧩 [Promise in fs.readFile]');
  });
});

console.log('🟢 [sync] end');
