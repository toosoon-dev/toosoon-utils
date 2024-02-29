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
