import {
  Curve,
  LineCurve,
  LineCurve3,
  PolylineCurve,
  PolylineCurve3,
  SplineCurve,
  SplineCurve3,
  EllipseCurve
} from '../curves';
import { type Vector, Vector2, Vector3 } from '../geometry';

/**
 * Utility class for manipulating connected curves
 *
 * @exports
 * @class Path
 * @extends Curve
 */
export default class Path<V extends Vector = Vector2 | Vector3, S extends Curve<V> = Curve<V>> extends Curve<V> {
  readonly isPath = true;
  readonly type: string = 'Path';

  /**
   * Array of curves composing this path
   */
  public subpaths: S[] = [];

  /**
   * Array of points composing this path
   */
  public points: V[] = [];

  /**
   * Define if a last point should be automatically added to close this path
   */
  public autoClose: boolean;

  constructor({ autoClose = false }: { autoClose?: boolean } = {}) {
    super();

    this.autoClose = autoClose;
  }

  /**
   * Add a curve to this path
   *
   * @param {Curve} curve Curve to add
   */
  public add(curve: S) {
    this.subpaths.push(curve);
  }

  /**
   * Interpolate a point on this path
   *
   * @param {number} t Normalized time value to interpolate
   * @returns {Vector} Interpolated coordinates on the curve
   */
  public getPoint(t: number): V {
    const d = t * this.getLength();
    const curveLengths = this.getCurveLengths();

    let i = 0;

    while (i < curveLengths.length) {
      if (curveLengths[i] >= d) {
        const delta = curveLengths[i] - d;
        const curve = this.subpaths[i];

        const segmentLength = curve.getLength();
        const u = segmentLength === 0 ? 0 : 1 - delta / segmentLength;

        return curve.getPointAt(u);
      }

      i++;
    }

    console.warn(`Path.getPoint()`, `No point found in curve.`, this);

    return this.subpaths[0].getPoint(0);
  }

  /**
   * Compute the curve shape into an array of points
   *
   * @param {number} [divisions=40] Number of divisions
   * @returns {Vector[]}
   */
  public getPoints(divisions: number = 40): V[] {
    const points: V[] = [];

    let lastPoint: V | null = null;

    for (let i = 0; i < this.subpaths.length; i++) {
      const curve = this.subpaths[i];

      let resolution: number = divisions;
      if (curve instanceof LineCurve || curve instanceof LineCurve3) {
        resolution = 1;
      } else if (curve instanceof PolylineCurve || curve instanceof PolylineCurve3) {
        resolution = curve.points.length;
      } else if (curve instanceof SplineCurve || curve instanceof SplineCurve3) {
        resolution *= curve.points.length;
      } else if (curve instanceof EllipseCurve) {
        resolution *= 2;
      }

      const pts = this.subpaths[i].getPoints(resolution);
      for (let j = 0; j < pts.length; j++) {
        const point = pts[j];
        if (point?.equals(lastPoint)) continue;
        points.push(point);
        lastPoint = point;
      }
    }

    const isClosed = points.length > 1 && points[0].equals(points[points.length - 1]);
    if (this.autoClose && !isClosed) {
      points.push(points[0]);
    }

    return points;
  }

  /**
   * Compute the curve shape into an array of equi-spaced points across the entire curve path
   *
   * @param {number} [divisions=40] Number of divisions
   * @returns {Vector[]}
   */
  public getSpacedPoints(divisions: number = 40): V[] {
    const points: V[] = [];

    for (let i = 0; i <= divisions; i++) {
      points.push(this.getPoint(i / divisions));
    }

    const isClosed = points.length > 1 && points[0].equals(points[points.length - 1]);
    if (this.autoClose && !isClosed) {
      points.push(points[0]);
    }

    return points;
  }

  /**
   * Compute the total arc length of this path
   *
   * @returns {number}
   */
  public getLength(): number {
    const lengths = this.getCurveLengths();
    return lengths[lengths.length - 1];
  }

  /**
   * Compute the cumulative curve lengths of this path
   *
   * @returns {number[]}
   */
  public getCurveLengths(): number[] {
    if (this._cacheArcLengths.length === this.subpaths.length) {
      return this._cacheArcLengths;
    }

    const lengths = [];
    let sums = 0;

    for (let i = 0, j = this.subpaths.length; i < j; i++) {
      sums += this.subpaths[i].getLength();
      lengths.push(sums);
    }

    this._cacheArcLengths = lengths;

    return lengths;
  }

  /**
   * Update the cached cumulative segment lengths
   */
  public updateArcLengths() {
    this.needsUpdate = true;
    this._cacheArcLengths = [];
    this.getCurveLengths();
  }
}
