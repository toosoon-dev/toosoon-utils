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
 * Check if a value is defined
 *
 * @template {unknown} [T=unknown]
 * @param {T} value Value to check
 * @returns {boolean} `true` if the given value is defined, `false` otherwise
 */
export function isDefined<T = unknown>(value: T): value is Exclude<T, undefined | null> {
  if (typeof value === 'undefined' || value === null) return false;
  return true;
}

/**
 * Create a debounced function that delays the execution of a given callback until a specified delay time has passed since the last call
 *
 * @template {Function} T
 * @param {T} callback Function to debounce
 * @param {number} delay Delay (in milliseconds)
 * @returns {T} Debounced function
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
 * Create a throttled function that limits the execution of a given callback to once every specified limit time
 *
 * @template {Function} T
 * @param {T} callback Function to throttle
 * @param {number} limit Minimum interval between two calls (in milliseconds)
 * @returns {T} Throttled function
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
