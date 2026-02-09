import type { Point2 } from '../../types';

import { Vector2 } from '../geometry';

import Curve from './Curve';
import LineCurve from './LineCurve';

/**
 * Utility class for manipulating polylines
 *
 * @exports
 * @class PolylineCurve
 * @extends Curve<Vector2>
 */
export default class PolylineCurve extends Curve<Vector2> {
  readonly type: string = 'PolylineCurve';

  /**
   * Array of points defining the curve
   */
  public points: Point2[] = [];

  /**
   * @param {Point2[]} [points] Array of points defining the curve
   */
  constructor(points: Point2[] = []) {
    super();

    this.points = points;
  }

  /**
   * Interpolate a point on this curve
   *
   * @param {number} t Normalized time value to interpolate
   * @returns {Vector2} Interpolated coordinates on this curve
   */
  public getPoint(t: number): Vector2 {
    const points = this.points;

    const p = (points.length - 1) * t;
    const index = Math.floor(p);
    const weight = p - index;

    const p1 = points[index === 0 ? index : index - 1];
    const p2 = points[index];

    return new Vector2(...LineCurve.interpolate(weight, ...p1, ...p2));
  }
}
