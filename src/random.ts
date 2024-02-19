import { radToSphere } from './geometry';
import { Vector2, Vector3 } from './types';

/**
 * Generate a random boolean (true or false)
 *
 * @param {number} [probability=0.5] Probability to get true
 * @returns {boolean} Either true or false
 */
export function randomBoolean(probability: number = 0.5): boolean {
  return Math.random() < probability;
}

/**
 * Generate a random sign (1 or -1)
 *
 * @param {number} [probability=0.5] Probability to get 1
 * @returns {number} Either 1 or -1
 */
export function randomSign(probability: number = 0.5): number {
  return randomBoolean(probability) ? 1 : -1;
}

/**
 * Generate a random float number
 *
 * @param  {number} [min=0]       Minimum boundary
 * @param  {number} [max=1]       Maximum boundary
 * @param  {number} [precision=2] Number of digits after the decimal point
 * @returns {number} Generated float
 */
export function randomFloat(min: number = 0, max: number = 1, precision: number = 2): number {
  return parseFloat(Math.min(min + Math.random() * (max - min), max).toFixed(precision));
}

/**
 * Generate a random integer number
 *
 * @param {number} min Minimum boundary
 * @param {number} max Maximum boundary
 * @returns {number} Generated integer
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Generate a random hexadecimal color
 *
 * @returns {string} Hexadecimal color
 */
export function randomHexColor(): string {
  return '#' + ('00000' + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6);
}

/**
 * Pick a random item from an array
 *
 * @param {I[]} [array=[]] Array to pick the item from
 * @returns {I|undefined} Random item picked
 */
export function randomItem<I = unknown>(array: I[] = []): I | undefined {
  if (array.length === 0) return undefined;
  return array[randomInt(0, array.length - 1)];
}

/**
 * Pick a random property from an object
 *
 * @param {object} object Object to pick the property from
 * @returns {unknown|undefined} Random item picked
 */
export function randomObjectProperty(object: object): unknown | undefined {
  const keys = Object.keys(object);
  const key = randomItem(keys);
  if (key && object.hasOwnProperty(key)) {
    return object[key as keyof object];
  }
}

/**
 * Return a random index from an array of weights
 *
 * @param {number[]} weights Array of weights
 * @returns {number} Random index based on weights
 */
export function randomIndex(weights: number[] = []): number {
  if (weights.length === 0) return -1;

  let totalWeight = 0;
  for (let weight of weights) {
    totalWeight += weight;
  }

  if (totalWeight <= 0) {
    console.warn('randomIndex()', 'Weights must sum to > 0', totalWeight);
  }

  let random = Math.random() * totalWeight;
  for (let i = 0; i < weights.length; i++) {
    if (random < weights[i]) return i;
    random -= weights[i];
  }

  return 0;
}

// *********************
// Geometry
// *********************
/**
 * Produce a random 2D point around the perimiter of a unit circle
 *
 * @param  {number} [radius=1] Radius of the circle
 * @param  {Vector2} target    Target vector
 * @returns {Vector2} Random 2D point on circle
 */
export function onCircle(radius: number = 1, target: Vector2 = { x: 0, y: 0 }): Vector2 {
  const angle = Math.random() * 2.0 * Math.PI;
  target.x = radius * Math.cos(angle);
  target.y = radius * Math.sin(angle);
  return target;
}

/**
 * Produce a random 2D point inside a unit circle
 *
 * @param  {number} [radius=1] Radius of the circle
 * @param  {Vector2} target    Target vector
 * @returns {Vector2} Random 2D point inside circle
 */
export function insideCircle(radius: number = 1, target: Vector2 = { x: 0, y: 0 }): Vector2 {
  radius *= Math.random();
  return onCircle(radius, target);
}

/**
 * Produce a random 3D point on the surface of a unit sphere
 *
 * @param  {number} [radius=1] Radius of the sphere
 * @param  {Vector3} target    Target vector
 * @returns {Vector3} Random 3D point on sphere
 */
export function onSphere(radius: number = 1, target: Vector3 = { x: 0, y: 0, z: 0 }): Vector3 {
  const u = Math.random() * Math.PI * 2;
  const v = Math.random() * 2 - 1;
  const phi = u;
  const theta = Math.acos(v);
  return radToSphere(radius, phi, theta, target);
}

/**
 * Produce a random 3D point inside a unit sphere
 *
 * @param  {number} [radius=1] Radius of the sphere
 * @param  {Vector3} target    Target vector
 * @returns {Vector3} Random 3D point inside sphere
 */
export function insideSphere(radius: number = 1, target: Vector3 = { x: 0, y: 0, z: 0 }): Vector3 {
  radius *= Math.random();
  return onSphere(radius, target);
}
