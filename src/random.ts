import { Vector2, Vector3 } from './classes/geometry';
import type { Point2, Point3 } from './types';

/**
 * Generate a random boolean (true or false)
 *
 * @param {number} [probability=0.5] Probability to get `true`
 * @returns {boolean} Either `true` or `false`
 */
export function randomBoolean(probability: number = 0.5): boolean {
  return Math.random() < probability;
}

/**
 * Generate a random sign (1 or -1)
 *
 * @param {number} [probability=0.5] Probability to get `1`
 * @returns {number} Either `1` or `-1`
 */
export function randomSign(probability: number = 0.5): number {
  return randomBoolean(probability) ? 1 : -1;
}

/**
 * Generate a random floating-point number within a specified range
 *
 * @param {number} [min=0] Minimum boundary
 * @param {number} [max=1] Maximum boundary
 * @param {number} [precision=2] Number of digits after the decimal point
 * @returns {number} Generated floating-point number
 */
export function randomFloat(min: number = 0, max: number = 1, precision: number = 2): number {
  return parseFloat(Math.min(min + Math.random() * (max - min), max).toFixed(precision));
}

/**
 * Generate a random integer number within a specified range
 *
 * @param {number} min Minimum boundary
 * @param {number} max Maximum boundary
 * @returns {number} Generated integer number
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Generate a random hexadecimal color
 *
 * @returns {string} Generated hexadecimal color
 */
export function randomHexColor(): string {
  return '#' + ('00000' + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6);
}

/**
 * Pick a random item from an array
 *
 * @template {unknown} [T=unknown]
 * @param {T[]} array Array to pick the item from
 * @returns {T|undefined} Random item picked
 */
export function randomItem<T = unknown>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[randomInt(0, array.length - 1)];
}

/**
 * Pick a random property value from an object
 *
 * @template {unknown} [T=unknown]
 * @param {object} object Object to pick the property from
 * @returns {T|undefined} Random property value picked
 */
export function randomObjectProperty<T = unknown>(object: Record<string, T>): T | undefined {
  const keys = Object.keys(object);
  const key = randomItem(keys);
  if (key && object.hasOwnProperty(key)) {
    return object[key as keyof object];
  }
}

/**
 * Select a random index from an array of weighted items
 *
 * @param {number[]} weights Array of weights
 * @returns {number} Random index based on weights
 */
export function randomIndex(weights: number[]): number {
  if (weights.length === 0) return -1;

  let totalWeight = 0;
  for (let weight of weights) {
    totalWeight += weight;
  }

  if (totalWeight <= 0) {
    console.warn('randomIndex()', 'Weights must sum to > 0', totalWeight);
    return 0;
  }

  let weight = Math.random() * totalWeight;
  for (let i = 0; i < weights.length; i++) {
    if (weight < weights[i]) return i;
    weight -= weights[i];
  }

  return 0;
}

/**
 * Generate a random number fitting a Gaussian (normal) distribution
 *
 * @param {number} [mean=0] Mean (central) value of the distribution
 * @param {number} [spread=1] Spread (standard deviation) of the distribution
 * @returns {number} Generated number
 */
export function randomGaussian(mean: number = 0, spread: number = 1): number {
  const u = Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + z * spread;
}

// *********************
// Geometry
// *********************

/**
 * Produce a random 2D point around the perimiter of a circle
 *
 * @param  {number} [radius=1] Radius of the circle
 * @returns {Point} Random 2D point on the circle
 */
export function onCircle(radius: number = 1): Point2 {
  const angle = randomFloat(0, Math.PI * 2);
  return Vector2.fromCircularCoords(angle, radius);
}

/**
 * Produce a random 2D point inside a circle
 *
 * @param  {number} [radius=1] Radius of the circle
 * @returns {Point} Random 2D point inside the circle
 */
export function insideCircle(radius: number = 1): Point2 {
  radius *= Math.random();
  return onCircle(radius);
}

/**
 * Produce a random 3D point on the surface of a sphere
 *
 * @param  {number} [radius=1] Radius of the sphere
 * @returns {Point3} Random 3D point on the sphere
 */
export function onSphere(radius: number = 1): Point3 {
  const phi = randomFloat(0, Math.PI);
  const theta = randomFloat(0, 2 * Math.PI);
  return Vector3.fromSphericalCoords(phi, theta, radius);
}

/**
 * Produce a random 3D point inside a unit sphere
 *
 * @param  {number} [radius=1] Radius of the sphere
 * @returns {Point3} Random 3D point inside the sphere
 */
export function insideSphere(radius: number = 1): Point3 {
  radius *= Math.random();
  return onSphere(radius);
}
