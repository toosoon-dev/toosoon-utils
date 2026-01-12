/**
 * Produce a 128-bit hash value from a seed
 *
 * @param {string} seed Initial seed state
 * @returns {[number, number, number, number]} Hash numbers
 */
export function cyrb128(seed: string): [number, number, number, number] {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < seed.length; i++) {
    k = seed.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
}

// *********************
// PRNG Algorithms
// *********************

/**
 * Simple Fast Counter, Generator with a 128-bit state
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} d
 * @returns {number} Pseudo-random number
 */
export function sfc32(a: number, b: number, c: number, d: number): number {
  a >>>= 0;
  b >>>= 0;
  c >>>= 0;
  d >>>= 0;
  let t = (a + b) | 0;
  a = b ^ (b >>> 9);
  b = (c + (c << 3)) | 0;
  c = (c << 21) | (c >>> 11);
  d = (d + 1) | 0;
  t = (t + d) | 0;
  c = (c + t) | 0;
  return (t >>> 0) / 4294967296;
}

/**
 * SplitMix32, Generator with a 32-bit state
 *
 * @param {number} a
 * @returns {number} Pseudo-random number
 */
export function splitmix32(a: number): number {
  a |= 0;
  a = (a + 0x9e3779b9) | 0;
  var t = a ^ (a >>> 16);
  t = Math.imul(t, 0x21f0aaad);
  t = t ^ (t >>> 15);
  t = Math.imul(t, 0x735a2d97);
  return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
}

/**
 * Mulberry32, Generator with a 32-bit state
 *
 * @param {number} a
 * @returns {number} Pseudo-random number
 */
export function mulberry32(a: number): number {
  let t = (a += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/**
 * Jenkins' Small Fast, Generator with a 32-bit state
 *
 * @param {number} a
 * @returns {number} Pseudo-random number
 */
export function jsf32(a: number, b: number, c: number, d: number): number {
  a |= 0;
  b |= 0;
  c |= 0;
  d |= 0;
  let t = (a - ((b << 27) | (b >>> 5))) | 0;
  a = b ^ ((c << 17) | (c >>> 15));
  b = (c + d) | 0;
  c = (d + t) | 0;
  d = (a + t) | 0;
  return (d >>> 0) / 4294967296;
}

/**
 * xoshiro128**, Generator with a 128-bit state
 *
 * @param {number} a
 * @returns {number} Pseudo-random number
 */
export function xoshiro128ss(a: number, b: number, c: number, d: number): number {
  let t = b << 9;
  let r = a * 5;
  r = ((r << 7) | (r >>> 25)) * 9;
  c ^= a;
  d ^= b;
  b ^= c;
  a ^= d;
  c ^= t;
  d = (d << 11) | (d >>> 21);
  return (r >>> 0) / 4294967296;
}

// *********************
// PRNG Functions
// *********************
export type PRNGParameters = string | { seed: string; algorithm: (...args: number[]) => number };

/**
 * Generate a pseudo-random number in the interval [0, 1]
 * PRNG equivalent of `Math.random()`
 *
 * @param {PRNGParameters} prng PRNG parameters
 * @returns {number} Pseudo-random number
 */
export function random(prng: PRNGParameters): number {
  const seed = typeof prng === 'string' ? prng : prng.seed;
  const algorithm = typeof prng === 'string' ? splitmix32 : prng.algorithm;

  const hashes = cyrb128(seed);
  return algorithm(...hashes);
}

/**
 * Generate a pseudo-random boolean (true or false)
 *
 * @param {PRNGParameters} prng PRNG parameters
 * @param {number} [probability=0.5] Probability to get true
 * @returns {boolean} Either true or false
 */
export function randomBoolean(prng: PRNGParameters, probability: number = 0.5): boolean {
  return random(prng) < probability;
}

/**
 * Generate a pseudo-random sign (1 or -1)
 *
 * @param {PRNGParameters} prng PRNG parameters
 * @param {number} [probability=0.5] Probability to get 1
 * @returns {number} Either 1 or -1
 */
export function randomSign(prng: PRNGParameters, probability: number = 0.5): number {
  return randomBoolean(prng, probability) ? 1 : -1;
}

/**
 * Generate a pseudo-random floating-point number within a specified range
 *
 * @param {PRNGParameters} prng PRNG parameters
 * @param {number} [min=0] Minimum boundary
 * @param {number} [max=1] Maximum boundary
 * @param {number} [precision=2] Number of digits after the decimal point
 * @returns {number} Generated float
 */
export function randomFloat(prng: PRNGParameters, min: number = 0, max: number = 1, precision: number = 2): number {
  return parseFloat(Math.min(min + random(prng) * (max - min), max).toFixed(precision));
}

/**
 * Generate a pseudo-random integer number within a specified range
 *
 * @param {PRNGParameters} prng PRNG parameters
 * @param {number} min Minimum boundary
 * @param {number} max Maximum boundary
 * @returns {number} Generated integer
 */
export function randomInt(prng: PRNGParameters, min: number, max: number): number {
  return Math.floor(random(prng) * (max - min + 1) + min);
}

/**
 * Generate a pseudo-random hexadecimal color
 *
 * @param {PRNGParameters} prng PRNG parameters
 * @returns {string} Generated hexadecimal color
 */
export function randomHexColor(prng: PRNGParameters): string {
  return '#' + ('00000' + ((random(prng) * (1 << 24)) | 0).toString(16)).slice(-6);
}

/**
 * Pick a pseudo-random item from a given array
 *
 * @param {PRNGParameters} prng PRNG parameters
 * @param {unknown[]} array Array to pick the item from
 * @returns {unknown|undefined} Random item picked
 */
export function randomItem<T = unknown>(prng: PRNGParameters, array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[randomInt(prng, 0, array.length - 1)];
}

/**
 * Pick a pseudo-random property value from a given object
 *
 * @param {PRNGParameters} prng PRNG parameters
 * @param {object} object Object to pick the property from
 * @returns {unknown|undefined} Random item picked
 */
export function randomObjectProperty<T = unknown>(prng: PRNGParameters, object: Record<string, T>): T | undefined {
  const keys = Object.keys(object);
  const key = randomItem(prng, keys);
  if (key && object.hasOwnProperty(key)) {
    return object[key as keyof object];
  }
}

/**
 * Select a pseudo-random index from an array of weighted items
 *
 * @param {PRNGParameters} prng PRNG parameters
 * @param {number[]} weights Array of weights
 * @returns {number} Random index based on weights
 */
export function randomIndex(prng: PRNGParameters, weights: number[]): number {
  if (weights.length === 0) return -1;

  let totalWeight = 0;
  for (let weight of weights) {
    totalWeight += weight;
  }

  if (totalWeight <= 0) {
    console.warn('PRNG randomIndex()', 'Weights must sum to > 0', totalWeight);
    return 0;
  }

  let weight = random(prng) * totalWeight;
  for (let i = 0; i < weights.length; i++) {
    if (weight < weights[i]) return i;
    weight -= weights[i];
  }

  return 0;
}

/**
 * Generate a pseudo-random number fitting a Gaussian (normal) distribution
 *
 * @param {PRNGParameters} prng PRNG parameters
 * @param {number} [mean=0] Central value
 * @param {number} [spread=1] Standard deviation
 * @returns {number} Generated number
 */
export function randomGaussian(prng: PRNGParameters, mean: number = 0, spread: number = 1): number {
  const seed = typeof prng === 'string' ? prng : prng.seed;
  const algorithm = typeof prng === 'string' ? splitmix32 : prng.algorithm;

  const hashes = cyrb128(seed);
  const u = algorithm(...hashes);
  const v = algorithm(...hashes.reverse());
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + z * spread;
}
