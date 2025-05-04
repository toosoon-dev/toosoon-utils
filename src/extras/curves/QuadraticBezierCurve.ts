import { quadraticBezier } from '../../maths';
import type { Point2 } from '../../types';
import { Vector2 } from '../geometry';
import Curve from './Curve';

/**
 * Utility class for manipulating Quadratic Bézier curves
 *
 * @exports
 * @class QuadraticBezierCurve
 * @extends Curve
 */
export default class QuadraticBezierCurve extends Curve<Vector2> {
  readonly type: string = 'QuadraticBezierCurve';

  /**
   *  X-axis coordinate of the start point
   */
  public x1: number;
  /**
   *  Y-axis coordinate of the start point
   */
  public y1: number;
  /**
   * X-axis coordinate of the control point
   */
  public cpx: number;
  /**
   * Y-axis coordinate of the control point
   */
  public cpy: number;
  /**
   *  X-axis coordinate of the end point
   */
  public x2: number;
  /**
   *  Y-axis coordinate of the end point
   */
  public y2: number;

  /**
   * @param {number} x1  X-axis coordinate of the start point
   * @param {number} y1  Y-axis coordinate of the start point
   * @param {number} cpx X-axis coordinate of the control point
   * @param {number} cpy Y-axis coordinate of the control point
   * @param {number} x2  X-axis coordinate of the end point
   * @param {number} y2  Y-axis coordinate of the end point
   */
  constructor(x1: number, y1: number, cpx: number, cpy: number, x2: number, y2: number) {
    super();

    this.x1 = x1;
    this.y1 = y1;
    this.cpx = cpx;
    this.cpy = cpy;
    this.x2 = x2;
    this.y2 = y2;
  }

  /**
   * Interpolate a point on this Quadratic Bézier curve
   *
   * @param {number} t Normalized time value to interpolate
   * @returns {Vector2} Interpolated coordinates on this curve
   */
  public getPoint(t: number): Vector2 {
    return new Vector2(...QuadraticBezierCurve.interpolate(t, this.x1, this.y1, this.cpx, this.cpy, this.x2, this.y2));
  }

  /**
   * Interpolate a point on a Quadratic Bézier curve
   *
   * @param {number} t   Normalized time value to interpolate
   * @param {number} x1  X-axis coordinate of the start point
   * @param {number} y1  Y-axis coordinate of the start point
   * @param {number} cpx X-axis coordinate of the control point
   * @param {number} cpy Y-axis coordinate of the control point
   * @param {number} x2  X-axis coordinate of the end point
   * @param {number} y2  Y-axis coordinate of the end point
   * @returns {Point2} Interpolated coordinates on the curve
   */
  static interpolate(t: number, x1: number, y1: number, cpx: number, cpy: number, x2: number, y2: number): Point2 {
    const x = quadraticBezier(t, x1, cpx, x2);
    const y = quadraticBezier(t, y1, cpy, y2);
    return [x, y];
  }
}
