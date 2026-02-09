import { catmullRom } from '../../math';
import type { Point2 } from '../../types';

import { Vector2 } from '../geometry';

import Curve from './Curve';

/**
 * Utility class for manipulating Catmull-Rom curves
 *
 * @exports
 * @class CatmullRomCurve
 * @extends Curve<Vector2>
 */
export default class CatmullRomCurve extends Curve<Vector2> {
  readonly type: string = 'CatmullRomCurve';

  /**
   * X-axis coordinate of the start point
   */
  public x1: number;
  /**
   * Y-axis coordinate of the start point
   */
  public y1: number;
  /**
   * X-axis coordinate of the first control point
   */
  public cp1x: number;
  /**
   * Y-axis coordinate of the first control point
   */
  public cp1y: number;
  /**
   * X-axis coordinate of the second control point
   */
  public cp2x: number;
  /**
   * Y-axis coordinate of the second control point
   */
  public cp2y: number;
  /**
   * X-axis coordinate of the end point
   */
  public x2: number;
  /**
   * Y-axis coordinate of the end point
   */
  public y2: number;

  /**
   * @param {number} x1   X-axis coordinate of the start point
   * @param {number} y1   Y-axis coordinate of the start point
   * @param {number} cp1x X-axis coordinate of the first control point
   * @param {number} cp1y Y-axis coordinate of the first control point
   * @param {number} cp2x X-axis coordinate of the second control point
   * @param {number} cp2y Y-axis coordinate of the second control point
   * @param {number} x2   X-axis coordinate of the end point
   * @param {number} y2   Y-axis coordinate of the end point
   */
  constructor(x1: number, y1: number, cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number) {
    super();

    this.x1 = x1;
    this.y1 = y1;
    this.cp1x = cp1x;
    this.cp1y = cp1y;
    this.cp2x = cp2x;
    this.cp2y = cp2y;
    this.x2 = x2;
    this.y2 = y2;
  }

  /**
   * Interpolate a point on this curve
   *
   * @param {number} t Normalized time value to interpolate
   * @returns {Vector2} Interpolated coordinates on this curve
   */
  public getPoint(t: number): Vector2 {
    return new Vector2(
      ...CatmullRomCurve.interpolate(t, this.x1, this.y1, this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.x2, this.y2)
    );
  }

  /**
   * Interpolate a point on a Catmull-Rom curve
   *
   * @param {number} x1   X-axis coordinate of the start point
   * @param {number} y1   Y-axis coordinate of the start point
   * @param {number} cp1x X-axis coordinate of the first control point
   * @param {number} cp1y Y-axis coordinate of the first control point
   * @param {number} cp2x X-axis coordinate of the second control point
   * @param {number} cp2y Y-axis coordinate of the second control point
   * @param {number} x2   X-axis coordinate of the end point
   * @param {number} y2   Y-axis coordinate of the end point
   * @returns {Point2} Interpolated coordinates on the curve
   */
  static interpolate(
    t: number,
    x1: number,
    y1: number,
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x2: number,
    y2: number
  ): Point2 {
    const x = catmullRom(t, x1, cp1x, cp2x, x2);
    const y = catmullRom(t, y1, cp1y, cp2y, y2);
    return [x, y];
  }
}
