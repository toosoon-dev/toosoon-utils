import { W3CX11 } from './constants';
import { toDegrees, toRadians } from './geometry';
import { clamp } from './maths';
import { ColorName, ColorRepresentation } from './types';

/**
 * Normalize a color representation into RGB
 *
 * @param {ColorRepresentation} color Color representation
 * @returns {[number,number,number]} Normalized RGB color
 */
export function normalizeColor(color: ColorRepresentation): [number, number, number] {
  if (typeof color === 'string') {
    return hexToRgb(W3CX11[color as ColorName] ?? color);
  } else if (typeof color === 'number') {
    return hexToRgb(color);
  } else {
    return color;
  }
}

// ******************************************
// RGB & Hexadecimal color spaces
// ******************************************

/**
 * Normalize an hexadecimal string
 *
 * @param {string} hex Hexadecimal string
 * @returns {string} Normalized hexadecimal string
 */
export function normalizeHexString(hex: string): string {
  let match: RegExpMatchArray | null;
  let result: string = '000000';
  hex = hex.toLocaleLowerCase();

  if ((match = hex.match(/(#|0x)?([a-f0-9]{6})/i))) {
    result = match[2];
  } else if ((match = hex.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))) {
    result = match[1] + match[1] + match[2] + match[2] + match[3] + match[3];
  } else if ((match = hex.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))) {
    result =
      parseInt(match[1]).toString(16).padStart(2, '0') +
      parseInt(match[2]).toString(16).padStart(2, '0') +
      parseInt(match[3]).toString(16).padStart(2, '0');
  }

  return `#${result}`;
}

/**
 * Convert RGB to hexadecimal
 * Note: rgb values are contained in the interval [0, 1]
 *
 * @param  {[number, number, number]} rgb RGB color
 * @returns {number} Hexadecimal color
 */
export function rgbToHex([r, g, b]: [number, number, number]): number {
  return ((r * 255) << 16) ^ ((g * 255) << 8) ^ ((b * 255) << 0);
}

/**
 * Convert RGB to hexadecimal string
 * Note: rgb values are contained in the interval [0, 1]
 *
 * @param  {[number, number, number]} rgb RGB color
 * @returns {string} Hexadecimal string
 */
export function rgbToHexString([r, g, b]: [number, number, number]): string {
  r = clamp(Math.round(r * 255), 0, 255);
  g = clamp(Math.round(g * 255), 0, 255);
  b = clamp(Math.round(b * 255), 0, 255);

  const result = (b | (g << 8) | (r << 16) | (1 << 24)).toString(16).slice(1);
  return `#${result}`;
}

/**
 * Convert hexadecimal to RGB
 * Note: rgb values are contained in the interval [0, 1]
 *
 * @param  {(number|string)} hex Hexadecimal color
 * @returns {[number, number, number]} RGB color
 */
export function hexToRgb(hex: number | string): [number, number, number] {
  if (typeof hex === 'number') {
    hex = Math.floor(hex);
  } else if (typeof hex === 'string') {
    hex = normalizeHexString(hex).replace(/^#/, '');
    hex = parseInt(hex, 16);
  }

  const r = ((hex >> 16) & 255) / 255;
  const g = ((hex >> 8) & 255) / 255;
  const b = (hex & 255) / 255;

  return [r, g, b];
}

/**
 * Lighten a color
 *
 * @param {string} hex        Hexadecimal string
 * @param {number} [amount=0] Amount of the color offset
 * @returns {string} Computed hexadecimal
 */
export function lighten(hex: string, amount: number = 0): string {
  let prefix = '';

  if (hex[0] === '#') {
    hex = hex.slice(1);
    prefix = '#';
  }

  const value = parseInt(hex, 16);

  const r = clamp((value >> 16) + amount, 0, 255);
  const b = clamp(((value >> 8) & 0x00ff) + amount, 0, 255);
  const g = clamp((value & 0x0000ff) + amount, 0, 255);

  let result: number | string = g | (b << 8) | (r << 16);
  if (r === 0 && g === 0 && b === 0 && amount !== 0) {
    result = '000000';
  }

  return prefix + result.toString(16);
}

/**
 * Darken a color
 *
 * @param {string} hex        Hexadecimal string
 * @param {number} [amount=0] Amount of the color offset
 * @returns {string} Computed hexadecimal
 */
export function darken(hex: string, amount: number = 0): string {
  return lighten(hex, -amount);
}

// ***************************************************
// RGB & Hue-Saturation-Lightness (HSL) color spaces
// ***************************************************

/**
 * Normalize an HSL string
 * Note: hsl values are contained in the intervals H: [0, 360], S: [0, 1], L: [0, 1]
 *
 * @param  {string} hsl HSL string (format: 'hsl(360, 100%, 100%)')
 * @returns {[number, number, number]} Normalized HSL color
 */
export function normalizeHslString(hsl: string): [number, number, number] {
  const [h, s, l] = hsl.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
  return [h, s / 100, l / 100];
}

/**
 * Convert RGB to HSL
 * Notes:
 *  - rgb values are contained in the interval [0, 1]
 *  - hsl values are contained in the intervals H: [0, 360], S: [0, 1], L: [0, 1]
 *
 * @param  {[number, number, number]} rgb RGB color
 * @returns {[number, number, number]} HSL color
 */
export function rgbToHsl([r, g, b]: [number, number, number]): [number, number, number] {
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0;

  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0,
    (2 * l - s) / 2
  ];
}

/**
 * Convert HSL to RGB
 * Notes:
 *  - rgb values are contained in the interval [0, 1]
 *  - hsl values are contained in the intervals H: [0, 360], S: [0, 1], L: [0, 1]
 *
 * @param  {[number, number, number]} hsl HSL color
 * @returns {[number, number, number]} RGB color
 */
export function hslToRgb([h, s, l]: [number, number, number]): [number, number, number] {
  const a = s * Math.min(l, 1 - l);
  const k = (v: number) => (v + h / 30) % 12;
  const f = (v: number) => l - a * Math.max(-1, Math.min(k(v) - 3, Math.min(9 - k(v), 1)));
  return [f(0), f(8), f(4)];
}

// ***************************************************
// RGB & Hue-Saturation-Brightness (HSB) color spaces
// ***************************************************

/**
 * Convert RGB to HSB
 * Notes:
 *  - rgb values are contained in the interval [0, 1]
 *  - hsb values are contained in the intervals H: [0, 360], S: [0, 1], B: [0, 1]
 *
 * @param  {[number, number, number]} rgb RGB color
 * @returns {[number, number, number]} HSB color
 */
export function rgbToHsb([r, g, b]: [number, number, number]): [number, number, number] {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const h =
    delta === 0 ? 0 : delta && max === r ? (g - b) / delta : max === g ? 2 + (b - r) / delta : 4 + (r - g) / delta;
  return [60 * (h < 0 ? h + 6 : h), max && delta / max, max];
}

/**
 * Convert HSB to RGB
 * Notes:
 *  - rgb values are contained in the interval [0, 1]
 *  - hsb values are contained in the intervals H: [0, 360], S: [0, 1], B: [0, 1]
 *
 * @param  {[number, number, number]} hsb HSB color
 * @returns {[number, number, number]} RGB color
 */
export function hsbToRgb([h, s, b]: [number, number, number]): [number, number, number] {
  const k = (v: number) => (v + h / 60) % 6;
  const f = (v: number) => b * (1 - s * Math.max(0, Math.min(k(v), 4 - k(v), 1)));
  return [f(5), f(3), f(1)];
}

// *********************************************
// LAB & Hue-Chroma-Luminance (HCL) color spaces
// *********************************************

/**
 * Convert LAB to HCL
 * -> http://www.brucelindbloom.com/index.html?Eqn_Lab_to_LCH.html
 *
 * @param {[number, number, number]} lab LAB color
 * @returns {[number, number, number]} HCL color
 */
export function labToHcl([l, a, b]: [number, number, number]): [number, number, number] {
  const c = Math.sqrt(a * a + b * b);
  const h = abToHue(a, b);
  return [h, c, l];
}

/**
 * Convert HCL to LAB
 * -> http://www.brucelindbloom.com/index.html?Eqn_LCH_to_Lab.html
 *
 * @param {[number, number, number]} hcl HCL color
 * @returns {[number, number, number]} LAB color space
 */
export function hclToLab([h, c, l]: [number, number, number]): [number, number, number] {
  const a = c * Math.cos(toRadians(h));
  const b = c * Math.sin(toRadians(h));
  return [l, a, b];
}

/**
 * Convert A and B of LAB to Hue of LCH
 * -> https://stackoverflow.com/questions/53733379/conversion-of-cielab-to-cielchab-not-yielding-correct-result
 *
 * @param {number} a A value of LAB color
 * @param {number} b B value of LAB color
 * @returns {number} Hue value
 */
function abToHue(a: number, b: number): number {
  if (a >= 0 && b === 0) {
    return 0;
  }
  if (a < 0 && b === 0) {
    return 180;
  }
  if (a === 0 && b > 0) {
    return 90;
  }
  if (a === 0 && b < 0) {
    return 270;
  }

  let xBias = 0;
  if (a > 0 && b > 0) {
    xBias = 0;
  } else if (a < 0) {
    xBias = 180;
  } else if (a > 0 && b < 0) {
    xBias = 360;
  }

  return toDegrees(Math.atan(b / a)) + xBias;
}

// ******************************************
// LAB & RGB color spaces
// ******************************************
const f1 = (v: number) => (v * v * v > 0.008856 ? v * v * v : (v - 16 / 116) / 7.787);
const f2 = (v: number) => (v > 0.0031308 ? 1.055 * Math.pow(v, 1 / 2.4) - 0.055 : 12.92 * v);
const f3 = (v: number) => (v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92);
const f4 = (v: number) => (v > 0.008856 ? Math.pow(v, 1 / 3) : 7.787 * v + 16 / 116);

/**
 * Converts LAB to RGB
 *
 * @param {[number, number, number]} lab LAB color
 * @returns {[number, number, number]} RGB color
 */
export function labToRgb([l, a, b]: [number, number, number]): [number, number, number] {
  let y = (l + 16) / 116;
  let x = a / 500 + y;
  let z = y - b / 200;

  x = 0.95047 * f1(x);
  y = 1.0 * f1(y);
  z = 1.08883 * f1(z);

  return [
    clamp(f2(x * 3.2406 + y * -1.5372 + z * -0.4986)),
    clamp(f2(x * -0.9689 + y * 1.8758 + z * 0.0415)),
    clamp(f2(x * 0.0557 + y * -0.204 + z * 1.057))
  ];
}

/**
 * Converts RGB to LAB
 *
 * @param {[number, number, number]} rgb RGB color
 * @returns {[number, number, number]} LAB color
 */
export function rgbToLab([r, g, b]: [number, number, number]): [number, number, number] {
  r = f3(r);
  g = f3(g);
  b = f3(b);

  let x = f4((r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047);
  let y = f4((r * 0.2126 + g * 0.7152 + b * 0.0722) / 1);
  let z = f4((r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883);

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

/**
 * Get the delta from two LAB colors
 *
 * @param {[number, number, number]} labA First LAB color
 * @param {[number, number, number]} labB Second LAB color
 * @returns {number} Delta
 */
export function deltaE(labA: [number, number, number], labB: [number, number, number]): number {
  const deltaL = labA[0] - labB[0];
  const deltaA = labA[1] - labB[1];
  const deltaB = labA[2] - labB[2];
  const c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  const c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  const deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  const sc = 1.0 + 0.045 * c1;
  const sh = 1.0 + 0.015 * c1;
  const deltaLKlsl = deltaL / 1;
  const deltaCkcsc = deltaC / sc;
  const deltaHkhsh = deltaH / sh;
  const i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}

// *********************************************
// RGB & Hue-Chroma-Luminance (HCL) color spaces
// *********************************************

/**
 * Convert RGB to HCL
 *
 * @param {[number, number, number]} rgb RGB color
 * @returns {[number, number, number]} HCL color
 */
export function rgbToHcl([r, g, b]: [number, number, number]): [number, number, number] {
  return labToHcl(rgbToLab([r, g, b]));
}

/**
 * Converts HCL to RGB
 *
 * @param {[number, number, number]} hcl RGB color
 * @returns {[number, number, number]} RGB color
 */
export function hclToRgb([h, c, l]: [number, number, number]): [number, number, number] {
  return labToRgb(hclToLab([h, c, l]));
}
