import { lerp } from '../../maths';
import type { Point2 } from '../../types';
import { Vector2 } from '../geometry';
import Curve from './Curve';

/**
 * Utility class for manipulating lines
 *
 * @exports
 * @class LineCurve
 * @extends Curve
 */
export default class LineCurve extends Curve<Vector2> {
  readonly type: string = 'LineCurve';

  /**
   * X-axis coordinate of the start point
   */
  public x1: number;
  /**
   * Y-axis coordinate of the start point
   */
  public y1: number;
  /**
   * X-axis coordinate of the end point
   */
  public x2: number;
  /**
   * Y-axis coordinate of the end point
   */
  public y2: number;

  /**
   * @param {number} x1 X-axis coordinate of the start point
   * @param {number} y1 Y-axis coordinate of the start point
   * @param {number} x2 X-axis coordinate of the end point
   * @param {number} y2 Y-axis coordinate of the end point
   */
  constructor(x1: number, y1: number, x2: number, y2: number) {
    super();

    this.x1 = x1;
    this.y1 = y1;
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
    return new Vector2(...LineCurve.interpolate(t, this.x1, this.y1, this.x2, this.y2));
  }

  /**
   * Interpolate a point on this line
   *
   * @param {number} u Normalized position value to interpolate
   * @returns {Vector2} Interpolated coordinates on this line
   */
  public getPointAt(u: number): Vector2 {
    return this.getPoint(u);
  }

  /**
   * Compute an unit vector tangent for a given normalized time value
   *
   * @param {number} t Normalized time value
   * @returns {Vector2} Tangent vector
   */
  public getTangent(t?: number): Vector2 {
    return new Vector2(...Vector2.sub([this.x1, this.y1], [this.x2, this.y2])).normalize();
  }

  /**
   * Compute an unit vector tangent for a given normalized position value
   *
   * @param {number} u Normalized position value
   * @returns {Vector2} Tangent vector
   */
  public getTangentAt(u?: number): Vector2 {
    return this.getTangent(u);
  }

  /**
   * Interpolate a point on a line
   *
   * @param {number} t  Normalized time value to interpolate
   * @param {number} x1 X-axis coordinate of the start point
   * @param {number} y1 Y-axis coordinate of the start point
   * @param {number} x2 X-axis coordinate of the end point
   * @param {number} y2 Y-axis coordinate of the end point
   * @returns {Point2} Interpolated coordinates on the line
   */
  static interpolate(t: number, x1: number, y1: number, x2: number, y2: number): Point2 {
    const x = lerp(t, x1, x2);
    const y = lerp(t, y1, y2);
    return [x, y];
  }
}
