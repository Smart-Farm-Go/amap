export class Listener<T extends string> {
  private target: { [type in T]: Array<Function> } = Object.create(null);

  on(type: T, func: (...args: any[]) => void, once = false) {
    if (!this.target[type]) this.target[type] = [];
    if (once) {
      const onceFunc = (...args: any[]) => {
        func(...args);
        this.off(type, onceFunc);
      };
      this.target[type].push(onceFunc);
    } else {
      this.target[type].push(func);
    }
  }

  off(type: T, func: (...args: any[]) => void) {
    if (this.target[type]) {
      const index = this.target[type].indexOf(func);
      if (index > -1) {
        this.target[type].splice(index, 1);
      }
    }
  }

  emit(type: T, ...args: any[]) {
    if (this.target[type]) {
      this.target[type].forEach(fn => fn(...args));
    }
  }
}


export type AMapEvent = 'load' | 'init' | 'complete' | 'error' | 'destroy'

export const AMapListener = new Listener<AMapEvent>();
