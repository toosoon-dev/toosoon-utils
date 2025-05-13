import { type W3CX11 } from './constants';

// *********************
// Maths
// *********************
export type Range = [number, number];

// *********************
// Geometry
// *********************
export type Point2 = [number, number];
export type Point3 = [number, number, number];

// prettier-ignore
export type Matrix2x2 = [ 
  number, number,
  number, number,
];
// prettier-ignore
export type Matrix2x3 = [
  number, number, 
  number, number, 
  number, number, 
];
// prettier-ignore
export type Matrix3x3 = [
  number, number, number,
  number, number, number,
  number, number, number,
];
// prettier-ignore
export type Matrix4x4 = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
];

// *********************
// Colors
// *********************
export type ColorName = keyof typeof W3CX11;
export type ColorHex = number;
export type ColorRgb = [number, number, number];
export type ColorHsl = [number, number, number];
export type ColorHsb = [number, number, number];
export type ColorHcl = [number, number, number];
export type ColorLab = [number, number, number];

export type ColorRepresentation = ColorName | ColorRgb | ColorHex | string;

// *********************
// Functions
// *********************
export interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}
