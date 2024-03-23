export type Actions<T> = Record<string, (...args: any[]) => (state: T) => T | Promise<T>>;
