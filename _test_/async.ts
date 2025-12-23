export async function asyncPool<T>(
  limit: number,
  tasks: (() => Promise<T>)[]
): Promise<T[]> {
  const results: T[] = []
  const executing: Promise<void>[] = []
  let index = 0
  
  const runNext = async () => {
    if (index >= tasks.length) {
      return
    }
    
    const i = index++
    const task = tasks[i]
    try {
      results[i] = await task()
    } catch (e) {
      results[i] = await Promise.reject(e)
    }
    
    await runNext()
  }
  
  for (let i = 0; i < Math.min(limit, tasks.length); i++) {
    const p = runNext()
    executing.push(p)
  }
  
  await Promise.all(executing)
  return results
}


const sleep = (ms: number, label: string) => () =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      console.log(`✅ 完成: ${ label }`)
      resolve(label)
    }, ms)
  })

const tasks = [
  sleep(1000, '任务1'),
  sleep(500, '任务2'),
  sleep(2000, '任务3'),
  sleep(800, '任务4'),
  sleep(100, '任务5'),
]

const start = Date.now()
asyncPool(2, tasks).then((res) => {
  console.log('全部完成:', res, (Date.now() - start) / 1000)
})

// Promise.all(tasks.map(f=>f())).then(async () => {
//   console.log((Date.now() - start) / 1000)
// })
