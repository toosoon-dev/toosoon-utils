import { Deferred } from './types';

/**
 * No-op function
 */
export const noop: () => void = () => {};

/**
 * Promise wrapped setTimeout
 *
 * @param {number} [timeout=0] Time to wait (in milliseconds)
 * @returns {Promise}
 */
export function wait(timeout: number = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

/**
 * Deferred promise implementation
 *
 * @returns {Deferred}
 */
export function defer<T = void>(): Deferred<T> {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { promise, resolve, reject };
}
