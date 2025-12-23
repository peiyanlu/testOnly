import { useCallback, useEffect, useRef, useState } from 'react'


function debounce(fn: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout>
  
  return (...args: any[]) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}


function throttle(fn: Function, delay: number) {
  let lastCall = 0
  
  return (...args: any[]) => {
    let now = Date.now()
    // console.log(now - lastCall, delay)
    if (now - lastCall >= delay) {
      fn.apply(this, args)
      console.log(55)
      lastCall = now
    }
  }
}


function useDebounce<T>(fn: T, delay = 300) {
  const [ debounced, setDebounced ] = useState(fn)
  
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(fn), delay)
    return () => clearTimeout(timer)
  }, [ fn, delay ])
  
  return debounced
}


function useThrottle<T extends (...args: any[]) => any>(fn: T, delay = 300) {
  const lastCall = useRef(0)
  
  return useCallback((...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall.current >= delay) {
      lastCall.current = now
      fn(...args)
    }
  }, [fn, delay])
}

const start = Date.now()

const log = () => {
  console.log(Date.now() - start, 'aa')
}

// const debounced = debounce(log, 100)
// const throttled = throttle(log, 10)
const debounced = useDebounce(log, 100)
const throttled = throttle(log, 10)


const arr = Array.from(new Array(10 * 1000).keys(), i => i + 1)

for (const i of arr) {
  debounced()
}
