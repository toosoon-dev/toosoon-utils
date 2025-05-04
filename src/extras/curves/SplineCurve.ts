import type { Point2 } from '../../types';
import { Vector2 } from '../geometry';
import CatmullRomCurve from './CatmullRomCurve';
import Curve from './Curve';

/**
 * Utility class for manipulating splines
 *
 * @exports
 * @class SplineCurve
 * @extends Curve
 */
export default class SplineCurve extends Curve<Vector2> {
  readonly type: string = 'SplineCurve';

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
    const cp1 = points[index];
    const cp2 = points[index > points.length - 2 ? points.length - 1 : index + 1];
    const p2 = points[index > points.length - 3 ? points.length - 1 : index + 2];

    return new Vector2(...CatmullRomCurve.interpolate(weight, ...p1, ...cp1, ...cp2, ...p2));
  }
}
