// ✅ 高级任务池 TaskPool，支持：
// - 并发控制
// - 优先级调度
// - 任务取消（AbortController）
// - DAG（依赖图）调度
// - UMD 支持（适配浏览器和 Node）

// ------- 类型定义 --------
type TaskFn<T> = (signal?: AbortSignal) => Promise<T>

type TaskState = 'pending' | 'running' | 'completed' | 'failed' | 'canceled'

interface TaskNode<T> {
  id: string
  run: TaskFn<T>
  priority: number
  dependencies: string[]
  controller: AbortController
  state: TaskState
  retries: number
}

interface TaskPoolOptions {
  concurrency?: number
  maxRetries?: number
  onProgress?: (done: number, total: number) => void
  onError?: (id: string, error: any) => void
  onComplete?: () => void
  onStart?: (id: string) => void
  onSuccess?: (id: string) => void
}

// ------- TaskPool 实现 --------
export class TaskPool<T = any> {
  private tasks: Map<string, TaskNode<T>> = new Map()
  private running = 0
  private done = 0
  private readonly concurrency: number
  private readonly maxRetries: number
  private options: TaskPoolOptions
  
  constructor(options: TaskPoolOptions = {}) {
    this.concurrency = options.concurrency ?? 2
    this.maxRetries = options.maxRetries ?? 0
    this.options = options
  }
  
  addTask(
    id: string,
    taskFn: TaskFn<T>,
    priority = 0,
    dependencies: string[] = [],
  ) {
    const controller = new AbortController()
    const task: TaskNode<T> = {
      id,
      run: taskFn,
      priority,
      dependencies,
      controller,
      state: 'pending',
      retries: 0,
    }
    this.tasks.set(id, task)
    this.schedule()
  }
  
  cancelTask(id: string) {
    const task = this.tasks.get(id)
    if (task && task.state === 'pending') {
      task.controller.abort()
      task.state = 'canceled'
    }
  }
  
  cancelAll() {
    for (const task of this.tasks.values()) {
      if (task.state === 'pending') {
        task.controller.abort()
        task.state = 'canceled'
      }
    }
  }
  
  private getRunnableTasks(): TaskNode<T>[] {
    return [ ...this.tasks.values() ]
      .filter(t =>
        t.state === 'pending' &&
        t.dependencies.every(dep => this.tasks.get(dep)?.state === 'completed'),
      )
      .sort((a, b) => b.priority - a.priority)
  }
  
  private schedule() {
    while (this.running < this.concurrency) {
      const task = this.getRunnableTasks()[0]
      if (!task) break
      this.runTask(task).finally()
    }
  }
  
  private async runTask(task: TaskNode<T>) {
    task.state = 'running'
    this.running++
    this.options.onStart?.(task.id)
    try {
      await task.run(task.controller.signal)
      task.state = 'completed'
      this.options.onSuccess?.(task.id)
    } catch (e) {
      if (task.controller.signal.aborted) {
        task.state = 'canceled'
      } else if (task.retries < this.maxRetries) {
        task.retries++
        task.state = 'pending'
        this.running--
        return this.schedule()
      } else {
        task.state = 'failed'
        this.options.onError?.(task.id, e)
      }
    } finally {
      this.running--
      
      if ([ 'completed', 'failed', 'canceled' ].includes(task.state)) {
        this.done++
        this.options.onProgress?.(this.done, this.tasks.size)
        if (this.done === this.tasks.size) {
          this.options.onComplete?.()
        }
      }
      this.schedule()
    }
  }
}

// ------- 浏览器/Node 兼容（UMD 支持） --------
// 可用 Rollup/Webpack 打包为 UMD 模块，或如下方式直接挂载：

// @ts-ignore
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.TaskPool = TaskPool
}
// @ts-ignore
if (typeof global !== 'undefined') {
  // @ts-ignore
  global.TaskPool = TaskPool
}


const sleep = (ms: number, label: string, fail = false) => () =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (fail && Math.random() < 0.5) return reject(new Error(label + ' fail'))
      resolve(label)
    }, ms)
  })

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const pool = new TaskPool({
  concurrency: 2,
  maxRetries: 1,
  onStart: id => console.log(`[START] ${ id }`),
  onSuccess: id => console.log(`[SUCCESS] ${ id }`),
  onError: (id, err) => console.warn(`[ERROR] ${ id }:`, err),
  onProgress: (done, total) => console.log(`[PROGRESS] ${ done }/${ total }`),
  onComplete: () => console.log(`[COMPLETE] all tasks finished`),
})

pool.addTask('A', async () => {
  await delay(1000)
  console.log('Task A finished')
}, 1)

pool.addTask('B', async () => {
  await delay(500)
  console.log('Task B finished')
}, 2)

pool.addTask('C', async () => {
  await delay(300)
  console.log('Task C finished')
}, 1, [ 'A', 'B' ])

pool.addTask('D', async signal => {
  await delay(400)
  if (signal?.aborted) throw new Error('Task D was aborted')
  console.log('Task D finished')
}, 3)

// 模拟取消 D
setTimeout(() => {
  // pool.cancelTask('D')
}, 100)
