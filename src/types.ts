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
export type Vector2 = {
  x: number;
  y: number;
};

export type Vector3 = Vector2 & {
  z: number;
};

export type Vector4 = Vector3 & {
  w: number;
};
