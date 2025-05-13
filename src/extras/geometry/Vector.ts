export interface Vector<V = any> {
  set(...values: number[]): this;
  setScalar(scalar: number): this;
  setValue(index: string | number, value: number): this;
  getValue(index: string | number): number;

  add(vector: V): this;
  addScalar(scalar: number): this;
  sub(vector: V): this;
  subScalar(scalar: number): this;
  multiply(vector: V): this;
  multiplyScalar(scalar: number): this;
  divide(vector: V): this;
  divideScalar(scalar: number): this;
  min(vector: V): this;
  max(vector: V): this;
  clamp(min: V, max: V): this;
  clampScalar(min: number, max: number): this;
  floor(): this;
  ceil(): this;
  round(): this;
  trunc(): this;
  negate(): this;
  lerp(t: number, vector: V): this;
  normalize(): this;
  setLength(length: number): this;

  length(): number;
  squaredLength(): number;
  manhattanLength(): number;
  equals(vector: V): boolean;
  collinear(vector1: V, vector2: V): boolean;
  dot(vector: V): number;
  cross(vector: V): number | number[];
  angleTo(vector: V): number;
  distanceTo(vector: V): number;
  squaredDistanceTo(vector: V): number;
  manhattanDistanceTo(vector: V): number;

  toArray(): number[];
  fromArray(values: number[]): this;
  copy(vector: V): this;
  clone(): V;

  [Symbol.iterator](): Iterator<number>;
}
