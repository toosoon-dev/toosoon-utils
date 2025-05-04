import { lerp } from '../../maths';
import type { Point3 } from '../../types';
import { Vector3 } from '../geometry';
import Curve from './Curve';

/**
 * Utility class for manipulating 3D lines
 *
 * @exports
 * @class LineCurve3
 * @extends Curve
 */
export default class LineCurve3 extends Curve<Vector3> {
  readonly type: string = 'LineCurve3';

  /**
   * X-axis coordinate of the start point
   */
  public x1: number;
  /**
   * Y-axis coordinate of the start point
   */
  public y1: number;
  /**
   * Z-axis coordinate of the start point
   */
  public z1: number;
  /**
   * X-axis coordinate of the end point
   */
  public x2: number;
  /**
   * Y-axis coordinate of the end point
   */
  public y2: number;
  /**
   * Z-axis coordinate of the end point
   */
  public z2: number;

  /**
   * @param {number} x1 X-axis coordinate of the start point
   * @param {number} y1 Y-axis coordinate of the start point
   * @param {number} z1 Z-axis coordinate of the start point
   * @param {number} x2 X-axis coordinate of the end point
   * @param {number} y2 Y-axis coordinate of the end point
   * @param {number} z2 Z-axis coordinate of the end point
   */
  constructor(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
    super();

    this.x1 = x1;
    this.y1 = y1;
    this.z1 = z1;
    this.x2 = x2;
    this.y2 = y2;
    this.z2 = z2;
  }

  /**
   * Interpolate a point on this curve
   *
   * @param {number} t Normalized time value to interpolate
   * @returns {Vector3} Interpolated coordinates on this curve
   */
  public getPoint(t: number): Vector3 {
    return new Vector3(...LineCurve3.interpolate(t, this.x1, this.y1, this.z1, this.x2, this.y2, this.z2));
  }

  /**
   * Interpolate a point on this curve
   *
   * @param {number} u Normalized position value to interpolate
   * @returns {Vector3} Interpolated coordinates on this curve
   */
  public getPointAt(u: number): Vector3 {
    return this.getPoint(u);
  }

  /**
   * Compute an unit vector tangent for a given normalized time value
   *
   * @param {number} t Normalized time value
   * @returns {Vector3} Tangent vector
   */
  public getTangent(t?: number): Vector3 {
    return new Vector3(...Vector3.sub([this.x1, this.y1, this.z1], [this.x2, this.y2, this.z2])).normalize();
  }

  /**
   * Compute an unit vector tangent for a given normalized position value
   *
   * @param {number} u Normalized position value
   * @returns {Vector3} Tangent vector
   */
  public getTangentAt(u?: number): Vector3 {
    return this.getTangent(u);
  }

  /**
   * Interpolate a point on a 3D line
   *
   * @param {number} t  Normalized time value to interpolate
   * @param {number} x1 X-axis coordinate of the start point
   * @param {number} y1 Y-axis coordinate of the start point
   * @param {number} z1 Z-axis coordinate of the start point
   * @param {number} x2 X-axis coordinate of the end point
   * @param {number} y2 Y-axis coordinate of the end point
   * @param {number} z2 Z-axis coordinate of the end point
   * @returns {Point3} Interpolated coordinates on the line
   */
  static interpolate(t: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): Point3 {
    const x = lerp(t, x1, x2);
    const y = lerp(t, y1, y2);
    const z = lerp(t, z1, z2);
    return [x, y, z];
  }
}
