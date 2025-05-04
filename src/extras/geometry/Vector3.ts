import { EPSILON, PI } from '../../constants';
import { clamp, lerp } from '../../maths';
import type { Point3 } from '../../types';
import type { Vector } from './Vector';

type Vec3 = Vector3 | Point3;

/**
 * Utility class for manipulating a 3D vectors
 *
 * @exports
 * @class Vector3
 * @implements Vector
 */
export default class Vector3 implements Vector<Vec3> {
  readonly isVector3 = true;
  readonly type: string = 'Vector3';

  /**
   * X-axis value of this vector
   */
  public x: number;
  /**
   * Y-axis value of this vector
   */
  public y: number;
  /**
   * Z-axis value of this vector
   */
  public z: number;

  /**
   * @param {number} [x=0] X-axis value
   * @param {number} [y=0] Y-axis value
   * @param {number} [z=0] Z-axis value
   */
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Set this vector values
   *
   * @param {number} x X-axis value
   * @param {number} y Y-axis value
   * @param {number} z Z-axis value
   * @returns {this}
   */
  public set(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * Set a given scalar value to all values of this vector
   *
   * @param {number} scalar Value to set for all vector values
   * @returns {this}
   */
  public setScalar(scalar: number): this {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
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
   * Set this vector Z-axis value
   *
   * @param {number} z Z-axis value to set
   * @returns {this}
   */
  public setZ(z: number): this {
    this.z = z;
    return this;
  }

  /**
   * Set a given value of this vector
   *
   * @param {string|number} index `0` equals to `x`, `1` equals to `y`, `2` equals to `z`
   * @param {number} value Value to set
   * @returns {this}
   */
  public setValue(index: 'x' | 'y' | 'z' | number, value: number): this {
    switch (index) {
      case 'x':
      case 0:
        this.x = value;
        break;
      case 'y':
      case 1:
        this.y = value;
        break;
      case 'z':
      case 2:
        this.z = value;
        break;
    }
    return this;
  }

  /**
   * Return a value from the vector
   *
   * @param {string|number} index `0` equals to `x`, `1` equals to `y`, `2` equals to `z`
   * @returns {number}
   */
  public getValue(index: 'x' | 'y' | 'z' | number): number {
    switch (index) {
      case 'x':
      case 0:
        return this.x;
      case 'y':
      case 1:
        return this.y;
      case 'z':
      case 2:
        return this.z;
      default:
        return NaN;
    }
  }

  /**
   * Add a given vector to this vector
   *
   * @param {Vector3|Point3} vector Vector to add
   * @returns {this}
   */
  public add([x, y, z]: Vec3): this {
    this.x += x;
    this.y += y;
    this.z += z;
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
    this.z += scalar;
    return this;
  }

  /**
   * Subtract a given vector to this vector
   *
   * @param {Vector3|Point3} vector Vector to subtract
   * @returns {this}
   */
  public sub([x, y, z]: Vec3): this {
    this.x -= x;
    this.y -= y;
    this.z -= z;
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
    this.z -= scalar;
    return this;
  }

  /**
   * Multiply a given vector to this vector
   *
   * @param {Vector3|Point3} vector Vector to multiply
   * @returns {this}
   */
  public multiply([x, y, z]: Vec3): this {
    this.x *= x;
    this.y *= y;
    this.z *= z;
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
    this.z *= scalar;
    return this;
  }

  /**
   * Divide a given vector to this vector
   *
   * @param {Vector3|Point3} vector Vector to divide
   * @returns {this}
   */
  public divide([x, y, z]: Vec3): this {
    this.x /= x;
    this.y /= y;
    this.z /= z;
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
    this.z /= scalar;
    return this;
  }

  /**
   * Set this vector values to the min values compared to a given vector
   *
   * @param {Vector3|Point3} vector Vector to compare values with
   * @returns {this}
   */
  public min([x, y, z]: Vec3): this {
    this.x = Math.min(this.x, x);
    this.y = Math.min(this.y, y);
    this.z = Math.min(this.z, z);
    return this;
  }

  /**
   * Set this vector values to the max values compared to a given vector
   *
   * @param {Vector3|Point3} vector Vector to compare values with
   * @returns {this}
   */
  public max([x, y, z]: Vec3): this {
    this.x = Math.max(this.x, x);
    this.y = Math.max(this.y, y);
    this.z = Math.max(this.z, z);
    return this;
  }

  /**
   * Clamp this vector values to given boundaries
   *
   * @param {Vector3|Point3} min Minimum boundaries
   * @param {Vector3|Point3} max Maximum boundaries
   * @returns {this}
   */
  public clamp([minX, minY, minZ]: Vec3, [maxX, maxY, maxZ]: Vec3): this {
    this.x = clamp(this.x, minX, maxX);
    this.y = clamp(this.y, minY, maxY);
    this.z = clamp(this.z, minZ, maxZ);
    return this;
  }

  /**
   * Clamp this vector values to given scalar values
   *
   * @param {Vector3|Point3} min Minimum scalar boundary
   * @param {Vector3|Point3} max Maximum scalar boundary
   * @returns {this}
   */
  public clampScalar(min: number, max: number): this {
    this.x = clamp(this.x, min, max);
    this.y = clamp(this.y, min, max);
    this.z = clamp(this.z, min, max);
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
    this.z = Math.floor(this.z);
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
    this.z = Math.ceil(this.z);
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
    this.z = Math.round(this.z);
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
    this.z = Math.trunc(this.z);
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
    this.z = -this.z;
    return this;
  }

  /**
   * Interpolate this vector values between a given vector and this vector
   *
   * @param {Vector3|Point3} vector Vector to interpolate values towards
   * @param {number} t Normalized time value to interpolate
   * @returns {this}
   */
  public lerp([x, y, z]: Vec3, t: number): this {
    this.x += (x - this.x) * t;
    this.y += (y - this.y) * t;
    this.z += (z - this.z) * t;
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
   * Set this vector values to the same direction but with a given length
   *
   * @param {number} length Length value
   * @returns {this}
   */
  public setLength(length: number): this {
    return this.normalize().multiplyScalar(length);
  }

  /**
   * Project this vector onto a given vector
   *
   * @param {Vector3|Point3} vector Vector to project to
   * @returns {this}
   */
  public projectOnVector(vector: Vec3): this {
    const denominator = Vector3.squaredLength(vector);
    if (denominator === 0) return this.set(0, 0, 0);
    const scalar = Vector3.dot(vector, this) / denominator;
    return this.copy(vector).multiplyScalar(scalar);
  }

  /**
   * Calculate the Euclidean length of this vector
   *
   * @returns {number} Computed Euclidean length
   */
  public length(): number {
    return Vector3.length(this);
  }

  /**
   * Calculate the squared length of this vector
   *
   * @return {number} Computed squared length
   */
  public squaredLength(): number {
    return Vector3.squaredLength(this);
  }

  /**
   * Calculate the Manhattan length of this vector
   *
   * @return {number} Computed Manhattan length
   */
  public manhattanLength(): number {
    return Vector3.manhattanLength(this);
  }

  /**
   * Check if this vector is equal with a given vector
   *
   * @param {Vector3|Point3} vector Vector to check
   * @returns {boolean} True if this vector is equal with the given vector, false otherwise
   */
  public equals(vector: Vec3): boolean {
    return Vector3.equals(this, vector);
  }

  /**
   * Check if this vector is collinear with a given vectors
   *
   * @param {Vector3|Point3} vector1 First vector to check
   * @param {Vector3|Point3} vector2 Second vector to check
   * @returns {boolean} True if this vector is collinear with the given vectors, false otherwise
   */
  public collinear(vector1: Vec3, vector2: Vec3): boolean {
    return Vector3.collinear(this, vector1, vector2);
  }

  /**
   * Calculate the dot product of a given vector with this vector
   *
   * @param {Vector3|Point3} vector Vector to compute the dot product with
   * @returns {number} Computed dot product
   */
  public dot(vector: Vec3): number {
    return Vector3.dot(this, vector);
  }

  /**
   * Calculate the cross product of a given vector with this vector
   *
   * @param {Vector3|Point3} vector Vector to compute the cross product with
   * @returns {Point3} Computed cross product
   */
  public cross(vector: Vec3): Point3 {
    return Vector3.cross(this, vector);
  }

  /**
   * Calculate the angle between a given vector and this vector
   *
   * @param {Vector3|Point3} vector Vector to compute the angle with
   * @returns {number} Computed angle (in radians)
   */
  public angleTo(vector: Vec3): number {
    const denominator = Math.sqrt(this.squaredLength() * Vector3.squaredLength(vector));
    if (denominator === 0) return PI / 2;
    const theta = this.dot(vector) / denominator;
    return Math.acos(clamp(theta, -1, 1));
  }

  /**
   * Calculate the Euclidean distance from a given vector to this vector
   *
   * @param {Vector3|Point3} vector Vector to compute the distance to
   * @returns {number} Computed Euclidean distance
   */
  public distanceTo(vector: Vec3): number {
    return Vector3.distance(this, vector);
  }

  /**
   * Calculate the squared distance from a given vector to this vector
   *
   * @param {Vector3|Point3} vector Vector to compute the squared distance to
   * @returns {number} Computed squared distance
   */
  public squaredDistanceTo(vector: Vec3): number {
    return Vector3.squaredDistance(this, vector);
  }

  /**
   * Calculate the Manhattan distance from a given vector to this vector
   *
   * @param {Vector3|Point3} vector Vector to compute the Manhattan distance to
   * @returns {number} Computed Manhattan distance
   */
  public manhattanDistanceTo(vector: Vec3): number {
    return Vector3.manhattanDistance(this, vector);
  }

  /**
   * Return this vector values into an array
   *
   * @returns {Point3}
   */
  public toArray(): Point3 {
    return [this.x, this.y, this.z];
  }

  /**
   * Set this vector values from a given array
   *
   * @param {number[]} values Values to set
   * @returns
   */
  public fromArray([x, y, z]: number[]): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * Set this vector values from given spherical coordinates
   *
   * @param  {number} radius Radius of the sphere
   * @param  {number} phi    Polar angle from the y (up) axis     : [0, PI]
   * @param  {number} theta  Equator angle around the y (up) axis : [0, 2*PI]
   * @returns {this}
   */
  public fromSphericalCoords(radius: number, phi: number, theta: number): this {
    const [x, y, z] = Vector3.fromSphericalCoords(radius, phi, theta);
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * Set this vector values from given cylindrical coordinates
   *
   * @param  {number} radius Radius of the cylinder
   * @param  {number} theta  Equator angle around the y (up) axis : [0, 2*PI]
   * @param  {number} y      Y-axis value
   * @returns {this}
   */
  public fromCylindricalCoords(radius: number, theta: number, y: number): this {
    const [x, _, z] = Vector3.fromCylindricalCoords(radius, theta, y);
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * Copy the values of a given vector to this vector
   *
   * @param {Vector3|Point3} vector Vector to copy values from
   * @returns {this}
   */
  public copy([x, y, z]: Vec3): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * Create a new 3D vector with copied values from this vector
   *
   * @returns {Vector3}
   */
  public clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * Add two vectors
   *
   * @param {Vector3|Point3} vector1 First vector
   * @param {Vector3|Point3} vector2 Second vector
   * @returns {Point3}
   */
  static add([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): Point3 {
    const x = x1 + x2;
    const y = y1 + y2;
    const z = z1 + z2;
    return [x, y, z];
  }

  /**
   * Subtract two vectors
   *
   * @param {Vector3|Point3} vector1 First vector
   * @param {Vector3|Point3} vector2 Second vector
   * @returns {Point3}
   */
  static sub([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): Point3 {
    const x = x1 - x2;
    const y = y1 - y2;
    const z = z1 - z2;
    return [x, y, z];
  }

  /**
   * Multiply two vectors
   *
   * @param {Vector3|Point3} vector1 First vector
   * @param {Vector3|Point3} vector2 Second vector
   * @returns {Point3}
   */
  static multiply([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): Point3 {
    const x = x1 * x2;
    const y = y1 * y2;
    const z = z1 * z2;
    return [x, y, z];
  }

  /**
   * Divide two vectors
   *
   * @param {Vector3|Point3} vector1 First vector
   * @param {Vector3|Point3} vector2 Second vector
   * @returns {Point3}
   */
  static divide([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): Point3 {
    const x = x1 / x2;
    const y = y1 / y2;
    const z = z1 / z2;
    return [x, y, z];
  }

  /**
   * Interpolate a point between two vectors
   *
   * @param {number} t Normalized time value to interpolate
   * @param {Vector3|Point3} min Minimum boundaries
   * @param {Vector3|Point3} max Maximum boundaries
   * @returns {Point3}
   */
  static lerp(t: number, [x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): Point3 {
    const x = lerp(t, x1, x2);
    const y = lerp(t, y1, y2);
    const z = lerp(t, z1, z2);
    return [x, y, z];
  }

  /**
   * Check if two vectors are equal to each other
   *
   * @param {Vector3|Point3} vector1 First vector
   * @param {Vector3|Point3} vector2 Second vector
   * @returns {boolean} True if the given vectors are equal, false otherwise
   */
  static equals([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): boolean {
    return x1 === x2 && y1 === y2 && z1 === z2;
  }

  /**
   *  Check if three vectors are collinear (aligned on the same line)
   *
   * @param {Vector3|Point3} vector1 First vector
   * @param {Vector3|Point3} vector2 Second vector
   * @param {Vector3|Point3} vector3 Third vector
   * @returns {boolean} True if the given vectors are collinear, false otherwise
   */
  static collinear([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3, [x3, y3, z3]: Vec3): boolean {
    const v1: Point3 = [x2 - x1, y2 - y1, z2 - z1];
    const v2: Point3 = [x3 - x1, y3 - y1, z3 - z1];
    // prettier-ignore
    const cross = [
      v1[1] * v2[2] - v1[2] * v2[1],
      v1[2] * v2[0] - v1[0] * v2[2],
      v1[0] * v2[1] - v1[1] * v2[0]
    ]
    return Math.hypot(...cross) <= EPSILON;
  }

  /**
   * Calculate the dot product of two vectors
   *
   * @param {Vector3|Point3} vector1 First vector
   * @param {Vector3|Point3} vector2 Second vector
   * @returns {number} Computed dot product
   */
  static dot([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): number {
    return x1 * x2 + y1 * y2 + z1 * z2;
  }

  /**
   * Calculate the cross product of two vectors
   *
   * @param {Vector3|Point3} vector1 First vector
   * @param {Vector3|Point3} vector2 Second vector
   * @returns {Point3} Computed cross product
   */
  static cross([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): Point3 {
    const x = y1 * z2 - z1 * y2;
    const y = z1 * x2 - x1 * z2;
    const z = x1 * y2 - y1 * x2;
    return [x, y, z];
  }

  /**
   * Calculate the Euclidean distance between two vectors
   *
   * @param {Vector3|Point3} vector1 First vector
   * @param {Vector3|Point3} vector2 Second vector
   * @returns {number} Computed Euclidean distance
   */
  static distance(vector1: Vec3, vector2: Vec3): number {
    return Math.sqrt(Vector3.squaredDistance(vector1, vector2));
  }

  /**
   * Calculate the squared distance between two vectors
   *
   * @param {Vector3|Point3} vector1 First vector
   * @param {Vector3|Point3} vector2 Second vector
   * @returns {number} Computed squared distance
   */
  static squaredDistance([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): number {
    const dx = x1 - x2;
    const dy = y1 - y2;
    const dz = z1 - z2;
    return dx * dx + dy * dy + dz * dz;
  }

  /**
   * Calculate the Manhattan distance between two vectors
   *
   * @param {Vector3|Point3} vector1 First vector
   * @param {Vector3|Point3} vector2 Second vector
   * @return {number} Computed Manhattan distance
   */
  static manhattanDistance([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2) + Math.abs(z1 - z2);
  }

  /**
   * Calculate the Euclidean length of a vector
   *
   * @param {Vector3|Point3} vector Vector to compute Euclidean length from
   * @returns {number} Computed Euclidean length
   */
  static length(vector: Vec3): number {
    return Math.sqrt(Vector3.squaredLength(vector));
  }

  /**
   * Calculate the squared length of a vector
   *
   * @param {Vector3|Point3} vector Vector to compute squared length from
   * @returns {number} Computed squared length
   */
  static squaredLength([x, y, z]: Vec3): number {
    return x * x + y * y + z * z;
  }

  /**
   * Calculate the Manhattan length of a vector
   *
   * @param {Vector3|Point3} vector Vector to compute Manhattan length from
   * @return {number} Computed Manhattan length
   */
  static manhattanLength([x, y, z]: Vec3): number {
    return Math.abs(x) + Math.abs(y) + Math.abs(z);
  }

  /**
   * Convert spherical coordinates to a 3D point on the surface of a sphere
   *
   * @param  {number} phi   Polar angle from the y (up) axis     : [0, PI]
   * @param  {number} theta Equator angle around the y (up) axis : [0, 2*PI]
   * @param  {number} [radius=1] Radius of the sphere
   * @returns {Point3}
   */
  static fromSphericalCoords(phi: number, theta: number, radius: number = 1): Point3 {
    const x = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.cos(theta);
    return [x, y, z];
  }

  /**
   * Convert cylindrical coordinates to a 3D point on the surface of a cylinder
   *
   * @param  {number} theta Equator angle around the y (up) axis : [0, 2*PI]
   * @param  {number} y     Y-axis value
   * @param  {number} [radius=1] Radius of the cylinder
   * @returns {Point3}
   */
  static fromCylindricalCoords(theta: number, y: number, radius: number = 1): Point3 {
    const x = radius * Math.sin(theta);
    const z = radius * Math.cos(theta);
    return [x, y, z];
  }

  *[Symbol.iterator](): Iterator<number> {
    yield this.x;
    yield this.y;
    yield this.z;
  }
}
