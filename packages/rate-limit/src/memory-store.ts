export interface Store {
  incr: (key: string, callback: (error: Error | null, hits: number, resetTime: Date) => void) => void
  decrement: (key: string) => void
  resetAll: () => void
  resetKey: (key: string) => void
}

export class MemoryStore implements Store {
  hits = {}
  resetTime: Date

  constructor(private windowMs: number) {
    this.resetTime = this.calculateNextResetTime(windowMs)

    const interval = setInterval(this.resetAll, windowMs)
    if (interval.unref) interval.unref()
  }

  calculateNextResetTime(windowMs: number): Date {
    const nextResetDate = new Date()
    nextResetDate.setMilliseconds(nextResetDate.getMilliseconds() + windowMs)
    return nextResetDate
  }
}
