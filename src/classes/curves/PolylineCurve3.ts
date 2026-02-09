import type { Point3 } from '../../types';

import { Vector3 } from '../geometry';

import Curve from './Curve';
import LineCurve3 from './LineCurve3';

/**
 * Utility class for manipulating 3D polylines
 *
 * @exports
 * @class PolylineCurve3
 * @extends Curve<Vector3>
 */
export default class PolylineCurve3 extends Curve<Vector3> {
  readonly type: string = 'PolylineCurve3';

  /**
   * Array of points defining the curve
   */
  public points: Point3[] = [];

  /**
   * @param {Point3[]} [points] Array of points defining the curve
   */
  constructor(points: Point3[] = []) {
    super();

    this.points = points;
  }

  /**
   * Interpolate a point on this curve
   *
   * @param {number} t Normalized time value to interpolate
   * @returns {Vector3} Interpolated coordinates on this curve
   */
  public getPoint(t: number): Vector3 {
    const points = this.points;

    const p = (points.length - 1) * t;
    const index = Math.floor(p);
    const weight = p - index;

    const p1 = points[index === 0 ? index : index - 1];
    const p2 = points[index];

    return new Vector3(...LineCurve3.interpolate(weight, ...p1, ...p2));
  }
}
