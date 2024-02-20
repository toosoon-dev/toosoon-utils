import { W3CX11 } from './constants';

// *********************
// Colors
// *********************
export type ColorName = keyof typeof W3CX11;

// *********************
// Geometry
// *********************
export interface Vector2 {
  x: number;
  y: number;
}

export interface Vector3 extends Vector2 {
  z: number;
}

export interface Vector4 extends Vector3 {
  w: number;
}

// *********************
// Functions
// *********************
export interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}
