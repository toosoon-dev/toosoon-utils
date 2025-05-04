import { cubicBezier } from '../../maths';
import type { Point3 } from '../../types';
import { Vector3 } from '../geometry';
import Curve from './Curve';

/**
 * Utility class for manipulating Cubic Bézier 3D curves
 *
 * @exports
 * @class CubicBezierCurve3
 * @extends Curve
 */
export default class CubicBezierCurve3 extends Curve<Vector3> {
  readonly type: string = 'CubicBezierCurve3';

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
   * X-axis coordinate of the first control point
   */
  public cp1x: number;
  /**
   * Y-axis coordinate of the first control point
   */
  public cp1y: number;
  /**
   * Z-axis coordinate of the first control point
   */
  public cp1z: number;
  /**
   * X-axis coordinate of the second control point
   */
  public cp2x: number;
  /**
   * Y-axis coordinate of the second control point
   */
  public cp2y: number;
  /**
   * Z-axis coordinate of the second control point
   */
  public cp2z: number;
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
   * @param {number} x1   X-axis coordinate of the start point
   * @param {number} y1   Y-axis coordinate of the start point
   * @param {number} z1   Z-axis coordinate of the start point
   * @param {number} cp1x X-axis coordinate of the first control point
   * @param {number} cp1y Y-axis coordinate of the first control point
   * @param {number} cp1z Z-axis coordinate of the first control point
   * @param {number} cp2x X-axis coordinate of the second control point
   * @param {number} cp2y Y-axis coordinate of the second control point
   * @param {number} cp2z Z-axis coordinate of the second control point
   * @param {number} x2   X-axis coordinate of the end point
   * @param {number} y2   Y-axis coordinate of the end point
   * @param {number} z2   Z-axis coordinate of the end point
   */
  constructor(
    x1: number,
    y1: number,
    z1: number,
    cp1x: number,
    cp1y: number,
    cp1z: number,
    cp2x: number,
    cp2y: number,
    cp2z: number,
    x2: number,
    y2: number,
    z2: number
  ) {
    super();

    this.x1 = x1;
    this.y1 = y1;
    this.z1 = z1;
    this.cp1x = cp1x;
    this.cp1y = cp1y;
    this.cp1z = cp1z;
    this.cp2x = cp2x;
    this.cp2y = cp2y;
    this.cp2z = cp2z;
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
    return new Vector3(
      ...CubicBezierCurve3.interpolate(
        t,
        this.x1,
        this.y1,
        this.z1,
        this.cp1x,
        this.cp1y,
        this.cp1z,
        this.cp2x,
        this.cp2y,
        this.cp2z,
        this.x2,
        this.y2,
        this.z2
      )
    );
  }

  /**
   * Interpolate a point on a 3D Cubic Bézier curve
   *
   * @param {number} x1   X-axis coordinate of the start point
   * @param {number} y1   Y-axis coordinate of the start point
   * @param {number} z1   Z-axis coordinate of the start point
   * @param {number} cp1x X-axis coordinate of the first control point
   * @param {number} cp1y Y-axis coordinate of the first control point
   * @param {number} cp1z Z-axis coordinate of the first control point
   * @param {number} cp2x X-axis coordinate of the second control point
   * @param {number} cp2y Y-axis coordinate of the second control point
   * @param {number} cp2z Z-axis coordinate of the second control point
   * @param {number} x2   X-axis coordinate of the end point
   * @param {number} y2   Y-axis coordinate of the end point
   * @param {number} z2   Z-axis coordinate of the end point
   * @returns {Point2} Interpolated coordinates on the curve
   */
  static interpolate(
    t: number,
    x1: number,
    y1: number,
    z1: number,
    cp1x: number,
    cp1y: number,
    cp1z: number,
    cp2x: number,
    cp2y: number,
    cp2z: number,
    x2: number,
    y2: number,
    z2: number
  ): Point3 {
    const x = cubicBezier(t, x1, cp1x, cp2x, x2);
    const y = cubicBezier(t, y1, cp1y, cp2y, y2);
    const z = cubicBezier(t, z1, cp1z, cp2z, z2);
    return [x, y, z];
  }
}
