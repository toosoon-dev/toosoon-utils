import { EPSILON, PI } from '../../constants';
import { clamp, lerp } from '../../math';
import type { Point2 } from '../../types';

import { type Vector } from './Vector';

type Vec2 = Vector2 | Point2;

/**
 * Utility class for manipulating a 2D vectors
 *
 * @exports
 * @class Vector2
 * @implements Vector
 */
export default class Vector2 implements Vector<Vec2> {
  readonly isVector2 = true;
  readonly type: string = 'Vector2';

  /**
   * X-axis value of this vector
   */
  public x: number;
  /**
   * Y-axis value of this vector
   */
  public y: number;

  *[Symbol.iterator](): Iterator<number> {
    yield this.x;
    yield this.y;
  }

  /**
   * @param {number} [x=0] X-axis value
   * @param {number} [y=0] Y-axis value
   */
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Set this vector values
   *
   * @param {number} x X-axis value
   * @param {number} y Y-axis value
   * @returns {this}
   */
  public set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Set a given scalar value to all values of this vector
   *
   * @param {number} scalar Value to set for all values
   * @returns {this}
   */
  public setScalar(scalar: number): this {
    this.x = scalar;
    this.y = scalar;
    return this;
  }

  /**
   * Set this vector X-axis value
   *
   * @param {number} x X-axis value to set
   * @returns {this}
   */
  public setX(x: number): this {
    this.x = x;
    return this;
  }

  /**
   * Set this vector Y-axis value
   *
   * @param {number} y Y-axis value to set
   * @returns {this}
   */
  public setY(y: number): this {
    this.y = y;
    return this;
  }

  /**
   * Set a given value of this vector
   *
   * @param {string|number} index `0` equals to `x`, `1` equals to `y`
   * @param {number} value Value to set
   * @returns {this}
   */
  public setValue(index: 'x' | 'y' | number, value: number): this {
    switch (index) {
      case 'x':
      case 0:
        this.x = value;
        break;
      case 'y':
      case 1:
        this.y = value;
        break;
    }
    return this;
  }

  /**
   * Return a value from this vector
   *
   * @param {string|number} index `0` equals to `x`, `1` equals to `y`
   * @returns {number}
   */
  public getValue(index: 'x' | 'y' | number): number {
    switch (index) {
      case 'x':
      case 0:
        return this.x;
      case 'y':
      case 1:
        return this.y;
      default:
        return NaN;
    }
  }

  /**
   * Add a given vector to this vector
   *
   * @param {Vector2|Point2} vector Vector to add
   * @returns {this}
   */
  public add([x, y]: Vec2): this {
    this.x += x;
    this.y += y;
    return this;
  }

  /**
   * Add a given scalar value to all values of this vector
   *
   * @param {number} scalar Scalar value to add
   * @returns {this}
   */
  public addScalar(scalar: number): this {
    this.x += scalar;
    this.y += scalar;
    return this;
  }

  /**
   * Subtract a given vector to this vector
   *
   * @param {Vector2|Point2} vector Vector to subtract
   * @returns {this}
   */
  public sub([x, y]: Vec2): this {
    this.x -= x;
    this.y -= y;
    return this;
  }

  /**
   * Subtract a given scalar value to all values of this vector
   *
   * @param {number} scalar Scalar value to subtract
   * @returns {this}
   */
  public subScalar(scalar: number): this {
    this.x -= scalar;
    this.y -= scalar;
    return this;
  }

  /**
   * Multiply a given vector to this vector
   *
   * @param {Vector2|Point2} vector Vector to multiply
   * @returns {this}
   */
  public multiply([x, y]: Vec2): this {
    this.x *= x;
    this.y *= y;
    return this;
  }

  /**
   * Multiply a given scalar value to all values of this vector
   *
   * @param {number} scalar Scalar value to multiply
   * @returns {this}
   */
  public multiplyScalar(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  /**
   * Divide a given vector to this vector
   *
   * @param {Vector2|Point2} vector Vector to divide
   * @returns {this}
   */
  public divide([x, y]: Vec2): this {
    this.x /= x;
    this.y /= y;
    return this;
  }

  /**
   * Divide a given scalar value to all values of this vector
   *
   * @param {number} scalar Scalar value to multiply
   * @returns {this}
   */
  public divideScalar(scalar: number): this {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  /**
   * Set this vector values to the min values compared to a given vector
   *
   * @param {Vector2|Point2} vector Vector to compare values with
   * @returns {this}
   */
  public min([x, y]: Vec2): this {
    this.x = Math.min(this.x, x);
    this.y = Math.min(this.y, y);
    return this;
  }

  /**
   * Set this vector values to the max values compared to a given vector
   *
   * @param {Vector2|Point2} vector Vector to compare values with
   * @returns {this}
   */
  public max([x, y]: Vec2): this {
    this.x = Math.max(this.x, x);
    this.y = Math.max(this.y, y);
    return this;
  }

  /**
   * Clamp this vector values to given boundaries
   *
   * @param {Vector2|Point2} min Minimum boundaries
   * @param {Vector2|Point2} max Maximum boundaries
   * @returns {this}
   */
  public clamp([minX, minY]: Vec2, [maxX, maxY]: Vec2): this {
    this.x = clamp(this.x, minX, maxX);
    this.y = clamp(this.y, minY, maxY);
    return this;
  }

  /**
   * Clamp this vector values to given scalar values
   *
   * @param {Vector2|Point2} min Minimum scalar boundary
   * @param {Vector2|Point2} max Maximum scalar boundary
   * @returns {this}
   */
  public clampScalar(min: number, max: number): this {
    this.x = clamp(this.x, min, max);
    this.y = clamp(this.y, min, max);
    return this;
  }

  // public clampLength(min: number, max: number) {
  //   const length = this.length();
  //   return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
  // }

  /**
   * Round down to the nearest integer value this vector values
   *
   * @returns {this}
   */
  public floor(): this {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  /**
   * Round up to the nearest integer value this vector values
   *
   * @returns {this}
   */
  public ceil(): this {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }

  /**
   * Round to the nearest integer value this vector values
   *
   * @returns {this}
   */
  public round(): this {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  /**
   * Remove any fractional digits of this vector values
   *
   * @returns {this}
   */
  public trunc(): this {
    this.x = Math.trunc(this.x);
    this.y = Math.trunc(this.y);
    return this;
  }

  /**
   * Set this vector values to their negative values
   *
   * @returns {this}
   */
  public negate(): this {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  /**
   * Rotate this vector around a given center by a given angle
   *
   * @param {Vector2|Point2} center Vector around which to rotate
   * @param {number} angle Angle to rotate (in radians)
   * @returns {this}
   */
  public rotateAround(center: Vec2, angle: number): this {
    return this.set(...Vector2.rotate(this, center, angle));
  }

  /**
   * Linearly interpolate this vector values towards a given vector values
   *
   * @param {number} t Normalized time value to interpolate
   * @param {Vector2|Point2} vector Vector to interpolate values towards
   * @returns {this}
   */
  public lerp(t: number, [x, y]: Vec2): this {
    this.x += (x - this.x) * t;
    this.y += (y - this.y) * t;
    return this;
  }

  /**
   * Convert this vector to a unit vector
   *
   * @returns {this}
   */
  public normalize(): this {
    return this.divideScalar(this.length() || 1);
  }

  /**
   * Transform this vector by a given matrix
   *
   * @param {DOMMatrix} matrix Matrix to apply
   * @returns {this}
   */
  public applyMatrix(matrix: DOMMatrix): this {
    const { x, y } = matrix.transformPoint({ x: this.x, y: this.y });
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Set this vector values to the same direction but with a given length
   *
   * @param {number} length Length value
   * @returns {this}
   */
  public setLength(length: number): this {
    return this.normalize().multiplyScalar(length);
  }

  /**
   * Compute the Euclidean length of this vector
   *
   * @returns {number} Computed Euclidean length
   */
  public length(): number {
    return Vector2.length(this);
  }

  /**
   * Compute the squared length of this vector
   *
   * @return {number} Computed squared length
   */
  public squaredLength(): number {
    return Vector2.squaredLength(this);
  }

  /**
   * Compute the Manhattan length of this vector
   *
   * @return {number} Computed Manhattan length
   */
  public manhattanLength(): number {
    return Vector2.manhattanLength(this);
  }

  /**
   * Check if this vector is equal with a given vector
   *
   * @param {Vector2|Point2} vector Vector to check
   * @returns {boolean} `true` if this vector is equal with the given vector, `false` otherwise
   */
  public equals(vector: Vec2): boolean {
    return Vector2.equals(this, vector);
  }

  /**
   * Check if this vector is collinear with given vectors
   *
   * @param {Vector2|Point2} vector1 First vector to check
   * @param {Vector2|Point2} vector2 Second vector to check
   * @returns {boolean} `true` if this vector is collinear with the given vectors, `false` otherwise
   */
  public collinear(vector1: Vec2, vector2: Vec2): boolean {
    return Vector2.collinear(this, vector1, vector2);
  }

  /**
   * Compute the dot product of a given vector with this vector
   *
   * @param {Vector2|Point2} vector Vector to compute the dot product with
   * @returns {number} Computed dot product
   */
  public dot(vector: Vec2): number {
    return Vector2.dot(this, vector);
  }

  /**
   * Compute the cross product of a given vector with this vector
   *
   * @param {Vector2|Point2} vector Vector to compute the cross product with
   * @returns {number} Computed cross product
   */
  public cross(vector: Vec2): number {
    return Vector2.cross(this, vector);
  }

  /**
   * Compute the angle of this vector with respect to the positive X-axis
   *
   * @returns {number} Computed angle (in radians)
   */
  public angle(): number {
    return Vector2.angle(this);
  }

  /**
   * Compute the angle between a given vector and this vector
   *
   * @param {Vector2|Point2} vector Vector to compute the angle with
   * @returns {number} Computed angle (in radians)
   */
  public angleTo(vector: Vec2): number {
    const denominator = Math.sqrt(this.squaredLength() * Vector2.squaredLength(vector));
    if (denominator === 0) return PI / 2;
    const theta = this.dot(vector) / denominator;
    return Math.acos(clamp(theta, -1, 1));
  }

  /**
   * Compute the Euclidean distance from a given vector to this vector
   *
   * @param {Vector2|Point2} vector Vector to compute the distance to
   * @returns {number} Computed Euclidean distance
   */
  public distanceTo(vector: Vec2): number {
    return Vector2.distance(this, vector);
  }

  /**
   * Compute the squared distance from a given vector to this vector
   *
   * @param {Vector2|Point2} vector Vector to compute the squared distance to
   * @returns {number} Computed squared distance
   */
  public squaredDistanceTo(vector: Vec2): number {
    return Vector2.squaredDistance(this, vector);
  }

  /**
   * Compute the Manhattan distance from a given vector to this vector
   *
   * @param {Vector2|Point2} vector Vector to compute the Manhattan distance to
   * @returns {number} Computed Manhattan distance
   */
  public manhattanDistanceTo(vector: Vec2): number {
    return Vector2.manhattanDistance(this, vector);
  }

  /**
   * Return this vector values into an array
   *
   * @returns {Point2}
   */
  public toArray(): Point2 {
    return [this.x, this.y];
  }

  /**
   * Set this vector values from a given array
   *
   * @param {number[]} values Values to set
   * @returns {this}
   */
  public fromArray([x, y]: number[]): this {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Set this vector values from given circular coordinates
   *
   * @param {number} angle Angle (in radians)
   * @param {number} [radius] Radius of the circle
   * @returns {this}
   */
  public fromCircularCoords(angle: number, radius?: number): this {
    return this.set(...Vector2.fromCircularCoords(angle, radius));
  }

  /**
   * Copy the values of a given vector to this vector
   *
   * @param {Vector2|Point2} vector Vector to copy values from
   * @returns {this}
   */
  public copy([x, y]: Vec2): this {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Create a new 2D vector with copied values from this vector
   *
   * @returns {Vector2}
   */
  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * X-axis value of this vector
   */
  set width(width: number) {
    this.x = width;
  }

  get width(): number {
    return this.x;
  }

  /**
   * Y-axis value of this vector
   */
  set height(height: number) {
    this.y = height;
  }

  get height(): number {
    return this.y;
  }

  /**
   * Add two vectors
   *
   * @param {Vector2|Point2} vector1 First vector
   * @param {Vector2|Point2} vector2 Second vector
   * @returns {Point2}
   */
  static add([x1, y1]: Vec2, [x2, y2]: Vec2): Point2 {
    const x = x1 + x2;
    const y = y1 + y2;
    return [x, y];
  }

  /**
   * Subtract two vectors
   *
   * @param {Vector2|Point2} vector1 First vector
   * @param {Vector2|Point2} vector2 Second vector
   * @returns {Point2}
   */
  static sub([x1, y1]: Vec2, [x2, y2]: Vec2): Point2 {
    const x = x1 - x2;
    const y = y1 - y2;
    return [x, y];
  }

  /**
   * Multiply two vectors
   *
   * @param {Vector2|Point2} vector1 First vector
   * @param {Vector2|Point2} vector2 Second vector
   * @returns {Point2}
   */
  static multiply([x1, y1]: Vec2, [x2, y2]: Vec2): Point2 {
    const x = x1 * x2;
    const y = y1 * y2;
    return [x, y];
  }

  /**
   * Divide two vectors
   *
   * @param {Vector2|Point2} vector1 First vector
   * @param {Vector2|Point2} vector2 Second vector
   * @returns {Point2}
   */
  static divide([x1, y1]: Vec2, [x2, y2]: Vec2): Point2 {
    const x = x1 / x2;
    const y = y1 / y2;
    return [x, y];
  }

  /**
   * Rotate a vector around a given center by a given angle
   *
   * @param {Vector2|Point2} vector Vector to rotate
   * @param {Vector2|Point2} center Vector around which to rotate
   * @param {number} angle Angle to rotate (in radians)
   * @returns {Point2}
   */
  static rotate([vx, vy]: Vec2, [cx, cy]: Vec2, angle: number): Point2 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const ox = vx - cx;
    const oy = vy - cy;
    const x = cx + ox * cos - oy * sin;
    const y = cy + ox * sin + oy * cos;
    return [x, y];
  }

  /**
   * Linearly interpolate a point between two vectors
   *
   * @param {number} t Normalized time value to interpolate
   * @param {Vector2|Point2} min Minimum boundaries
   * @param {Vector2|Point2} max Maximum boundaries
   * @returns {Point2}
   */
  static lerp(t: number, [x1, y1]: Vec2, [x2, y2]: Vec2): Point2 {
    const x = lerp(t, x1, x2);
    const y = lerp(t, y1, y2);
    return [x, y];
  }

  /**
   * Check if two vectors are equal to each other
   *
   * @param {Vector2|Point2} vector1 First vector
   * @param {Vector2|Point2} vector2 Second vector
   * @returns {boolean} `true` if the given vectors are equal, `false` otherwise
   */
  static equals([x1, y1]: Vec2, [x2, y2]: Vec2): boolean {
    return x1 === x2 && y1 === y2;
  }

  /**
   *  Check if three vectors are collinear (aligned on the same line)
   *
   * @param {Vector2|Point2} vector1 First vector
   * @param {Vector2|Point2} vector2 Second vector
   * @param {Vector2|Point2} vector3 Third vector
   * @returns {boolean} `true` if the given vectors are collinear, `false` otherwise
   */
  static collinear([x1, y1]: Vec2, [x2, y2]: Vec2, [x3, y3]: Vec2): boolean {
    return Math.abs((x2 - x1) * (y3 - y2) - (y2 - y1) * (x3 - x2)) <= EPSILON;
  }

  /**
   * Compute the dot product of two vectors
   *
   * @param {Vector2|Point2} vector1 First vector
   * @param {Vector2|Point2} vector2 Second vector
   * @returns {number} Computed dot product
   */
  static dot([x1, y1]: Vec2, [x2, y2]: Vec2): number {
    return x1 * x2 + y1 * y2;
  }

  /**
   * Compute the cross product of two vectors
   *
   * @param {Vector2|Point2} vector1 First vector
   * @param {Vector2|Point2} vector2 Second vector
   * @returns {number} Computed cross product
   */
  static cross([x1, y1]: Vec2, [x2, y2]: Vec2): number {
    return x1 * x2 - y1 * y2;
  }

  /**
   * Compute the angle of a given vector with respect to the positive X-axis
   *
   * @param {Vector2|Point2} vector Vector to compute angle from
   * @returns {number} Computed angle (in radians)
   */
  static angle([x, y]: Vec2): number {
    return PI + Math.atan2(-y, -x);
  }

  /**
   * Compute the Euclidean distance between two vectors
   *
   * @param {Vector2|Point2} vector1 First vector
   * @param {Vector2|Point2} vector2 Second vector
   * @returns {number} Computed Euclidean distance
   */
  static distance(vector1: Vec2, vector2: Vec2): number {
    return Math.sqrt(this.squaredDistance(vector1, vector2));
  }

  /**
   * Compute the squared distance between two vectors
   *
   * @param {Vector2|Point2} vector1 First vector
   * @param {Vector2|Point2} vector2 Second vector
   * @returns {number} Computed squared distance
   */
  static squaredDistance([x1, y1]: Vec2, [x2, y2]: Vec2): number {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return dx * dx + dy * dy;
  }

  /**
   * Compute the Manhattan distance between two vectors
   *
   * @param {Vector2|Point2} vector1 First vector
   * @param {Vector2|Point2} vector2 Second vector
   * @return {number} Computed Manhattan distance
   */
  static manhattanDistance([x1, y1]: Vec2, [x2, y2]: Vec2): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  /**
   * Compute the Euclidean length of a vector
   *
   * @param {Vector2|Point2} vector Vector to compute Euclidean length from
   * @returns {number} Computed Euclidean length
   */
  static length(vector: Vec2): number {
    return Math.sqrt(Vector2.squaredLength(vector));
  }

  /**
   * Compute the squared length of a vector
   *
   * @param {Vector2|Point2} vector Vector to compute squared length from
   * @returns {number} Computed squared length
   */
  static squaredLength([x, y]: Vec2): number {
    return x * x + y * y;
  }

  /**
   * Compute the Manhattan length of a vector
   *
   * @param {Vector2|Point2} vector Vector to compute Manhattan length from
   * @return {number} Computed Manhattan length
   */
  static manhattanLength([x, y]: Vec2): number {
    return Math.abs(x) + Math.abs(y);
  }

  /**
   * Convert circular coordinates to a 2D point on the surface of a circle
   *
   * @param {number} angle Angle (in radians)
   * @param {number} [radius=1] Radius of the circle
   * @returns {Point2}
   */
  static fromCircularCoords(angle: number, radius: number = 1): Point2 {
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return [x, y];
  }
}
