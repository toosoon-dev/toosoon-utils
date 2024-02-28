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

/**
 * Polyfill for `now()` functions
 */
export let now: () => number;

// In node.js, use `process.hrtime`
if (typeof process !== 'undefined' && process.hrtime) {
  now = function () {
    // Convert [seconds, nanoseconds] to milliseconds
    const time = process.hrtime();
    return time[0] * 1000 + time[1] / 1000000;
  };
}
// In a browser use `performance` or `Date`
else if (typeof performance !== 'undefined') {
  // This must be bound, because directly assigning this function leads to an invocation exception in Chrome
  now = performance.now.bind(performance);
} else if (typeof Date.now !== 'undefined') {
  now = Date.now;
} else {
  now = function () {
    return new Date().getTime();
  };
}
