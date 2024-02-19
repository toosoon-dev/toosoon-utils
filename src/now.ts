/**
 * Polyfill for "now()" functions
 */
let now: () => number;

// In node.js, use process.hrtime
if (typeof process !== 'undefined' && process.hrtime) {
  now = function () {
    // Convert [seconds, nanoseconds] to milliseconds
    const time = process.hrtime();
    return time[0] * 1000 + time[1] / 1000000;
  };
}
// In a browser use performance or Date
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

export default now;
