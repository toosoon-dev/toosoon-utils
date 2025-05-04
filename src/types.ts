import { W3CX11 } from './constants';

// *********************
// Colors
// *********************
export type ColorName = keyof typeof W3CX11;

export type ColorRepresentation = ColorName | string | number | [number, number, number];

// *********************
// Functions
// *********************
export interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

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
