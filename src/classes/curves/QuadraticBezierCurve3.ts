import { quadraticBezier } from '../../math';
import type { Point3 } from '../../types';

import { Vector3 } from '../geometry';

import Curve from './Curve';

/**
 * Utility class for manipulating Quadratic Bézier 3D curves
 *
 * @exports
 * @class QuadraticBezierCurve3
 * @extends Curve<Vector3>
 */
export default class QuadraticBezierCurve3 extends Curve<Vector3> {
  readonly type: string = 'QuadraticBezierCurve3';

  /**
   *  X-axis coordinate of the start point
   */
  public x1: number;
  /**
   *  Y-axis coordinate of the start point
   */
  public y1: number;
  /**
   *  Z-axis coordinate of the start point
   */
  public z1: number;
  /**
   * X-axis coordinate of the control point
   */
  public cpx: number;
  /**
   * Y-axis coordinate of the control point
   */
  public cpy: number;
  /**
   * Z-axis coordinate of the control point
   */
  public cpz: number;
  /**
   *  X-axis coordinate of the end point
   */
  public x2: number;
  /**
   *  Y-axis coordinate of the end point
   */
  public y2: number;
  /**
   *  Z-axis coordinate of the end point
   */
  public z2: number;

  /**
   * @param {number} x1  X-axis coordinate of the start point
   * @param {number} y1  Y-axis coordinate of the start point
   * @param {number} z1  Z-axis coordinate of the start point
   * @param {number} cpx X-axis coordinate of the control point
   * @param {number} cpy Y-axis coordinate of the control point
   * @param {number} cpz Z-axis coordinate of the control point
   * @param {number} x2  X-axis coordinate of the end point
   * @param {number} y2  Y-axis coordinate of the end point
   * @param {number} z2  Z-axis coordinate of the end point
   */
  constructor(
    x1: number,
    y1: number,
    z1: number,
    cpx: number,
    cpy: number,
    cpz: number,
    x2: number,
    y2: number,
    z2: number
  ) {
    super();

    this.x1 = x1;
    this.y1 = y1;
    this.z1 = z1;
    this.cpx = cpx;
    this.cpy = cpy;
    this.cpz = cpz;
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
      ...QuadraticBezierCurve3.interpolate(
        t,
        this.x1,
        this.y1,
        this.z1,
        this.cpx,
        this.cpy,
        this.cpz,
        this.x2,
        this.y2,
        this.z2
      )
    );
  }

  /**
   * Interpolate a point on a Quadratic Bézier 3D curve
   *
   * @param {number} t   Normalized time value to interpolate
   * @param {number} x1  X-axis coordinate of the start point
   * @param {number} y1  Y-axis coordinate of the start point
   * @param {number} z1  Z-axis coordinate of the start point
   * @param {number} cpx X-axis coordinate of the control point
   * @param {number} cpy Y-axis coordinate of the control point
   * @param {number} cpz Z-axis coordinate of the control point
   * @param {number} x2  X-axis coordinate of the end point
   * @param {number} y2  Y-axis coordinate of the end point
   * @param {number} z2  Z-axis coordinate of the end point
   * @returns {Point3} Interpolated coordinates on the curve
   */
  static interpolate(
    t: number,
    x1: number,
    y1: number,
    z1: number,
    cpx: number,
    cpy: number,
    cpz: number,
    x2: number,
    y2: number,
    z2: number
  ): Point3 {
    const x = quadraticBezier(t, x1, cpx, x2);
    const y = quadraticBezier(t, y1, cpy, y2);
    const z = quadraticBezier(t, z1, cpz, z2);
    return [x, y, z];
  }
}
