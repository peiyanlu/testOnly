type Listener = (...args: any[]) => void

class EventBus {
  events: Record<string, Function[]>
  
  constructor() {
    this.events = {}
  }
  
  $on(eventName: string, listener: Listener): void {
    (this.events[eventName] ||= []).push(listener)
  }
  
  $emit(eventName: string, ...args: any[]): void {
    this.events[eventName]?.forEach((listener) => listener(...args))
  }
  
  $off(eventName: string, listener?: Listener): void {
    if (!listener) {
      this.events[eventName] = []
      return
    }
    this.events[eventName] = (this.events[eventName] || []).filter(fn => fn !== listener)
  }
  
  $once(eventName: string, listener: Listener): void {
    const event = (...args: any[]) => {
      listener(...args)
      this.$off(eventName, event)
    }
    this.$on(eventName, event)
  }
}
