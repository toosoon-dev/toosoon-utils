/**
 * Check if a number is even
 *
 * @param {number} value Value to check
 * @returns {boolean} True if the given number is even, false otherwise
 */
export function isEven(value: number): boolean {
  return !(value & 1);
}

/**
 * Check if a number is odd
 *
 * @param {number} value Value to check
 * @returns {boolean} True if the given number is odd, false otherwise
 */
export function isOdd(value: number): boolean {
  return !!(value & 1);
}

/**
 * Check if a number is a power of 2
 *
 * @param {number} value Value to check
 * @returns {boolean} True if the given number is a power of 2, false otherwise
 */
export function isPowerOf2(value: number): boolean {
  return (value & (value - 1)) === 0;
}

/**
 * Find smallest/closest power of 2 that fits a number
 *
 * @param {number} value         Incoming value
 * @param {string} [mode='ceil'] Can be 'floor' | 'ceil' | 'round'
 * @returns {number} Power of 2
 */
export function toPowerOf2(value: number, mode: 'floor' | 'ceil' | 'round' = 'ceil'): number {
  return Math.pow(2, Math[mode](Math.log(value) / Math.log(2)));
}

/**
 * Return the sign (positive or negative) of a number
 *
 * @param {number} number Value to check
 * @returns {number} 1 if the given number is positive, -1 if it is negative, otherwise 0
 */
export function sign(number: number): number {
  if (number > 0) return 1;
  else if (number < 0) return -1;
  return 0;
}

/**
 * Clamp a value between two bounds
 *
 * @param {number} value   Value to clamp
 * @param {number} [min=0] Minimum boundary
 * @param {number} [max=1] Maximum boundary
 * @returns {number} Clamped value
 */
export function clamp(value: number, min: number = 0, max: number = 1): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Linear interpolation between two values (lerping)
 *
 * @param {number} value Normalized value to interpolate
 * @param {number} min   Minimum value
 * @param {number} max   Maximum value
 * @returns {number} Lerped value
 */
export function lerp(value: number, min: number, max: number): number {
  return min + (max - min) * value;
}

/**
 * Triangular interpolation between two values
 *
 * @param {number} value  Normalized value to interpolate
 * @param {number} min    Minimum value
 * @param {number} max    Maximum value
 * @param {number} target Triangle target value
 * @returns {number} Interpolated value
 */
export function triLerp(value: number, min: number, max: number, target: number): number {
  const x = Math.pow(1 + Math.abs(target - max) / Math.abs(target - min), -1);
  return value <= x ? min - (min - target) * (value / x) : target - (target - max) * ((value - x) / (1 - x));
}

/**
 * Exponential interpolation between two values
 *
 * @param {number} value Normalized value to interpolate
 * @param {number} min   Minimum value
 * @param {number} max   Maximum value
 * @returns {number} Interpolated value
 */
export function expLerp(value: number, min: number, max: number): number {
  return Math.pow(min, 1 - value) * Math.pow(max, value);
}

/**
 * Normalize a value between two bounds
 *
 * @param {number} value Value to normalize
 * @param {number} min   Minimum boundary
 * @param {number} max   Maximum boundary
 * @returns {number} Normalized value
 */
export function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

/**
 * Re-map a number from one range to another
 *
 * @param {number} value      Value to re-map
 * @param {number} currentMin Lower bound of the value's current range
 * @param {number} currentMax Upper bound of the value's current range
 * @param {number} targetMin  Lower bound of the value's target range
 * @param {number} targetMax  Upper bound of the value's target range
 * @returns {number} Re-mapped value
 */
export function map(
  value: number,
  currentMin: number,
  currentMax: number,
  targetMin: number,
  targetMax: number
): number {
  return ((value - currentMin) / (currentMax - currentMin)) * (targetMax - targetMin) + targetMin;
}

/**
 * Round a number up to a nearest multiple
 *
 * @param {number} value        Value to round
 * @param {number} [multiple=1] Multiple
 * @returns {number} Closest multiple
 */
export function roundTo(value: number, multiple: number = 1): number {
  if (multiple === 0) return value;
  return Math.round(value / multiple) * multiple;
}

/**
 * Modulo absolute a value based on a length
 *
 * @param {number} value  Value to modulate
 * @param {number} length Total length
 * @returns {number} Modulated value
 */
export function modAbs(value: number, length: number): number {
  if (value < 0) {
    return length + (value % length);
  }
  return value % length;
}

/**
 * Move back and forth a value between 0 and length, so that it is never larger than length and never smaller than 0
 *
 * @param {number} value  Value to modulate
 * @param {number} length Total length
 * @returns {number} PingPonged value
 */
export function pingPong(value: number, length: number): number {
  value = modAbs(value, length * 2);
  return length - Math.abs(value - length);
}

/**
 * Smooth a value using cubic Hermite interpolation
 *
 * @param {number} value   Value to smooth
 * @param {number} [min=0] Minimum boundary
 * @param {number} [max=1] Maximum boundary
 * @returns {number} Normalized smoothed value
 */
export function smoothstep(value: number, min: number = 0, max: number = 1): number {
  const x = clamp(normalize(value, min, max));
  return x * x * (3 - 2 * x);
}

/**
 * Re-map the [0, 1] interval into [0, 1] parabola, such that corners are remaped to 0 and the center to 1
 * -> parabola(0) = parabola(1) = 0, and parabola(0.5) = 1
 *
 * @param {number} x         Normalized coordinate on X axis
 * @param {number} [power=1] Parabola power
 * @returns {number} Normalized re-mapped value
 */
export function parabola(x: number, power: number = 1): number {
  return Math.pow(4 * x * (1 - x), power);
}

/**
 * Return the sum of numbers
 *
 * @param {number[]} array Array of number
 * @returns {number} Total sum
 */
export function sum(array: number[]): number {
  return array.reduce((previous, current) => previous + current);
}

/**
 * Return the average of numbers
 *
 * @param {number[]} array Array of number
 * @returns {number} Total average
 */
export function average(array: number[]): number {
  return sum(array) / array.length;
}

/**
 * Smoothly interpolate a number toward another
 *
 * @param {number} value   Value to interpolate
 * @param {number} target  Destination of the interpolation
 * @param {number} damping A higher value will make the movement more sudden, and a lower value will make the movement more gradual
 * @param {number} delta   Delta time (in seconds)
 * @returns {number} Interpolated number
 */
export function damp(value: number, target: number, damping: number, delta: number): number {
  return lerp(1 - Math.exp(-damping * delta), value, target);
}
