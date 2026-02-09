/**
 * Check if a number is even
 *
 * @param {number} value Value to check
 * @returns {boolean} `true` if the given number is even, `false` otherwise
 */
export function isEven(value: number): boolean {
  return !(value & 1);
}

/**
 * Check if a number is odd
 *
 * @param {number} value Value to check
 * @returns {boolean} `true` if the given number is odd, `false` otherwise
 */
export function isOdd(value: number): boolean {
  return !!(value & 1);
}

/**
 * Check if a number is a power of 2
 *
 * @param {number} value Value to check
 * @returns {boolean} `true` if the given number is a power of 2, `false` otherwise
 */
export function isPowerOf2(value: number): boolean {
  return (value & (value - 1)) === 0;
}

/**
 * Compute the closest greater power of 2 for a number
 *
 * @param {number} value Value to compute power of 2 for
 * @returns {number} Computed power of 2
 */
export function toPowerOf2(value: number): number {
  return Math.pow(2, Math.ceil(Math.log(value) / Math.log(2)));
}

/**
 * Return the sign (positive or negative) of a number
 *
 * @param {number} value Value to check
 * @returns {number} `1` if the given number is positive, `-1` if it is negative, `0` otherwise
 */
export function sign(value: number): number {
  if (value > 0) return 1;
  else if (value < 0) return -1;
  return 0;
}

/**
 * Constrain a number between two bounds
 *
 * @param {number} value Value to constrain
 * @param {number} [min=0] Minimum boundary
 * @param {number} [max=1] Maximum boundary
 * @returns {number} Clamped value
 */
export function clamp(value: number, min: number = 0, max: number = 1): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Round a number up to a nearest multiple
 *
 * @param {number} value Value to round
 * @param {number} [multiple=1] Multiple to round to
 * @returns {number} Closest multiple
 */
export function snap(value: number, multiple: number = 1): number {
  if (multiple === 0) return value;
  return Math.round(value / multiple) * multiple;
}

/**
 * Interpolate a number between two bounds using Linear interpolation (lerping)
 *
 * @param {number} t Normalized time value to interpolate
 * @param {number} min Minimum boundary
 * @param {number} max Maximum boundary
 * @returns {number} Lerped value
 */
export function lerp(t: number, min: number, max: number): number {
  return min + (max - min) * t;
}

/**
 * Normalize a number between two bounds
 *
 * @param {number} value Value to normalize
 * @param {number} min Minimum boundary
 * @param {number} max Maximum boundary
 * @returns {number} Normalized value
 */
export function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

/**
 * Re-map a number from one range to another
 *
 * @param {number} value Value to re-map
 * @param {number} currentMin Lower bound of the value's current range
 * @param {number} currentMax Upper bound of the value's current range
 * @param {number} targetMin Lower bound of the value's target range
 * @param {number} targetMax Upper bound of the value's target range
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
 * Interpolate a number between two bounds using Triangular interpolation
 *
 * @param {number} t Normalized time value to interpolate
 * @param {number} min Minimum boundary
 * @param {number} max Maximum boundary
 * @param {number} peak Peak value controling the interpolation triangle shape
 *                        - peak <= min : linear (same as lerp)
 *                        - peak >= max : linear (same as lerp)
 *                        - peak > min && peak < max : triangular
 * @returns {number} Interpolated value
 */
export function triLerp(t: number, min: number, max: number, peak: number): number {
  const x = Math.pow(1 + Math.abs(peak - max) / Math.abs(peak - min), -1);
  return t <= x ? min - (min - peak) * (t / x) : peak - (peak - max) * ((t - x) / (1 - x));
}

/**
 * Interpolate a number between two bounds using Exponential interpolation
 *
 * @param {number} t Normalized time value to interpolate
 * @param {number} min Minimum boundary
 * @param {number} max Maximum boundary
 * @param {number} power Exponent controling the interpolation curve shape
 *                         - power > 1 : ease-in
 *                         - power < 1 : ease-out
 *                         - power = 1 : linear (same as lerp)
 * @returns {number} Interpolated value
 */
export function expLerp(t: number, min: number, max: number, power: number): number {
  const factor = Math.pow(t, power);
  return min + (max - min) * factor;
}

/**
 * Interpolate a number using Quadratic Bézier interpolation
 *
 * @param {number} t Normalized time value to interpolate
 * @param {number} p1 Start point
 * @param {number} cp Control point
 * @param {number} p2 End point
 * @returns {number} Interpolated value
 */
export function quadraticBezier(t: number, p1: number, cp: number, p2: number): number {
  const t2 = t * t;
  const k = 1 - t;
  const k2 = k * k;
  return k2 * p1 + 2 * k * t * cp + t2 * p2;
}

/**
 * Interpolate a number using Cubic Bézier interpolation
 *
 * @param {number} t Normalized time value to interpolate
 * @param {number} p1  Start point
 * @param {number} cp1 First control point
 * @param {number} cp2 Second control point
 * @param {number} p2  End point
 * @returns {number} Interpolated value
 */
export function cubicBezier(t: number, p1: number, cp1: number, cp2: number, p2: number): number {
  const t2 = t * t;
  const t3 = t2 * t;
  const k = 1 - t;
  const k2 = k * k;
  const k3 = k2 * k;
  return k3 * p1 + 3 * k2 * t * cp1 + 3 * k * t2 * cp2 + t3 * p2;
}

/**
 * Interpolate a number using Catmull-Rom interpolation
 *
 * @param {number} t Normalized time value to interpolate
 * @param {number} p1  Start point
 * @param {number} cp1 First control point
 * @param {number} cp2 Second control point
 * @param {number} p2  End point
 * @returns {number} Interpolated value
 */
export function catmullRom(t: number, p1: number, cp1: number, cp2: number, p2: number): number {
  const t2 = t * t;
  const t3 = t2 * t;
  const v1 = (cp2 - p1) * 0.5;
  const v2 = (p2 - cp1) * 0.5;
  return (2 * cp1 - 2 * cp2 + v1 + v2) * t3 + (-3 * cp1 + 3 * cp2 - 2 * v1 - v2) * t2 + v1 * t + cp1;
}

/**
 * Re-map the [0, 1] interval into [0, 1] parabola, such that corners are remaped to 0 and the center to 1
 *  - parabola(0) = parabola(1) = 0
 *  - parabola(0.5) = 1
 *
 * @param {number} x Normalized coordinate on X axis
 * @param {number} [power=1] Parabola exponent
 * @returns {number} Normalized re-mapped value
 */
export function parabola(x: number, power: number = 1): number {
  return Math.pow(4 * x * (1 - x), power);
}

/**
 * Compare two numbers
 * 
 * @param {number} value Value to compare to the edge
 * @param {number} edge Value of the edge
 * @returns {number} `0` if value < edge, `1` otherwise
 */
export function step(value: number, edge: number): number {
	return value < edge ? 0 : 1;
}

/**
 * Interpolate a number between two bounds using Hermite interpolation
 *
 * @param {number} value Value to interpolate
 * @param {number} min Minimum boundary
 * @param {number} max Maximum boundary
 * @returns {number} Interpolated value
 */
export function smoothstep(value: number, min: number, max: number): number {
  const t = clamp(normalize(value, min, max), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Compute the fractional part of a number
 * 
 * @param {number} value Value to compute the fractional part of
 * @returns {number} Fractional part of the given number
 */
export function fract(value: number): number {
	return value - Math.floor(value);
}

/**
 * Compute the value of a number modulo another
 * 
 * @param {number} value Value to modulate
 * @param {number} modulo Value to modulate by
 * @returns {number} Computed value
 */
export function mod(value: number, modulo: number): number {
	return value - modulo * Math.floor(value / modulo);
}

/**
 * Move back and forth a number between 0 and a length, so that it is never larger than length and never smaller than 0
 *
 * @param {number} value Value to modulate
 * @param {number} length Total length
 * @returns {number} Computed value
 */
export function pingPong(value: number, length: number): number {
  value = mod(value, length * 2);
  return length - Math.abs(value - length);
}

/**
 * Compute the sum of an array of numbers
 *
 * @param {number[]} numbers Array of numbers to compute the sum from
 * @returns {number} Total sum
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((total, value) => total + value);
}

/**
 * Compute the average of an array of numbers
 *
 * @param {number[]} numbers Array of numbers to compute the average from
 * @returns {number} Total average
 */
export function average(numbers: number[]): number {
  return sum(numbers) / numbers.length;
}

/**
 * Smoothly interpolate a number toward another
 *
 * @param {number} value Value to interpolate
 * @param {number} target Destination of the interpolation
 * @param {number} damping A higher value will make the movement more sudden, and a lower value will make the movement more gradual
 * @param {number} delta Delta time (in seconds)
 * @returns {number} Interpolated number
 */
export function damp(value: number, target: number, damping: number, delta: number): number {
  return lerp(1 - Math.exp(-damping * delta), value, target);
}
