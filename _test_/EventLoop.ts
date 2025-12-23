import { readFile } from 'node:fs'


console.log('version:', process.version);

// 同步
console.log('🟢 [sync] start')

// ✅ process.nextTick 微任务
process.nextTick(() => {
  console.log('🔁 [nextTick]')
})

// ✅ Promise 微任务
Promise.resolve().then(() => {
  console.log('🧩 [Promise.then]')
})

// ✅ setTimeout (timers)
setTimeout(() => {
  console.log('⏰ [setTimeout]')

  // 👀 setImmediate inside setTimeout
  setImmediate(() => {
    console.log('⚡ [setImmediate in setTimeout]')
  })

  process.nextTick(() => {
    console.log('🔁 [nextTick in setTimeout]')
  })

  Promise.resolve().then(() => {
    console.log('🧩 [Promise in setTimeout]')
  })
}, 1000)

// ✅ setImmediate (check)
setImmediate(() => {
  console.log('⚡ [setImmediate]')
})

// ✅ fs.readFile (poll)
readFile('.', () => {
  console.log('📄 [fs.readFile callback]')

  setImmediate(() => {
    console.log('⚡ [setImmediate in fs.readFile]')
  })

  setTimeout(() => {
    console.log('⏰ [setTimeout in fs.readFile]')

    // 👀 setImmediate inside setTimeout
    setImmediate(() => {
      console.log('⚡ [setImmediate in fs.readFile - setTimeout]')
    })

    process.nextTick(() => {
      console.log('🔁 [nextTick in fs.readFile - setTimeout]')
    })

    Promise.resolve().then(() => {
      console.log('🧩 [Promise in fs.readFile - setTimeout]')
    })
  }, 0)

  process.nextTick(() => {
    console.log('🔁 [nextTick in fs.readFile]')
  })

  Promise.resolve().then(() => {
    console.log('🧩 [Promise in fs.readFile]')
  })
})

// 同步
console.log('🟢 [sync] end')


setTimeout(() => console.log('timer')) // timers 阶段宏任务
setImmediate(() => console.log('immediate')) // check 阶段宏任务
readFile('.', () => console.log('readFile')) // poll 阶段宏任务
process.nextTick(() => console.log('nextTick')) // 微任务
Promise.resolve().then(() => console.log('promise')) // 微任务

