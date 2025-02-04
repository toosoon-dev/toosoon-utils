import { Deferred } from './types';

/**
 * No-op function
 */
export const noop: () => void = () => {};

/**
 * Promise wrapped setTimeout
 *
 * @param {number} [delay=0] Time to wait (in milliseconds)
 * @returns {Promise}
 */
export function wait(delay: number = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Create a debounced function that delays the execution of `callback` until a specified `delay` time has passed since the last call
 *
 * @param {Function} callback Function to debounce
 * @param {number} delay      Delay (in milliseconds)
 * @returns {Function} Debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };
}

/**
 * Create a throttled function that limits the execution of `callback` to once every `limit` time
 *
 * @param {Function} callback Function to throttle
 * @param {number} limit      Minimum interval between two calls (in milliseconds)
 * @returns {Function} Throttled function
 */
export function throttle<T extends (...args: any[]) => void>(
  callback: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastTime = 0;
  return (...args: Parameters<T>) => {
    const time = now();
    if (time - lastTime >= limit) {
      lastTime = time;
      callback(...args);
    }
  };
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
