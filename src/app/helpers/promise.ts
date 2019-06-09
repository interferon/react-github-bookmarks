export const promise = <T>(fn: (res: (a: T) => void, rej: () => void) => void): Promise<T> => new Promise(fn);
