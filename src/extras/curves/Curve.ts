import { type Vector, Vector2, Vector3 } from '../geometry';

/**
 * Utility abstract class for manipulating curves
 *
 * @exports
 * @class Curve
 * @abstract
 */
export default abstract class Curve<V extends Vector = Vector2 | Vector3> {
  readonly isCurve = true;
  readonly type: string = 'Curve';

  /**
   * Amount of divisions when calculating the cumulative segment lengths of a curve
   */
  public arcLengthDivisions: number = 200;

  /**
   * Must be set to `true` if the curve parameters have changed
   */
  public needsUpdate: boolean = false;

  protected _cacheArcLengths: number[] = [];

  /**
   * Interpolate a point on this curve
   *
   * @abstract
   * @param {number} t Normalized time value to interpolate
   * @returns {Vector} Interpolated coordinates on this curve
   */
  public abstract getPoint(t: number): V;

  /**
   * Interpolate a point on this curve
   *
   * @param {number} u Normalized position value to interpolate
   * @returns {Vector} Interpolated coordinates on this curve
   */
  public getPointAt(u: number): V {
    const t = this.getUtoTmapping(u);
    return this.getPoint(t);
  }

  /**
   * Compute this curve shape into an array of points
   *
   * @param {number} [divisions=5] Number of divisions
   * @returns {Vector[]}
   */
  public getPoints(divisions: number = 5): V[] {
    const points = [];
    for (let i = 0; i <= divisions; i++) {
      points.push(this.getPoint(i / divisions));
    }
    return points;
  }

  /**
   * Compute this curve shape into an array of equi-spaced points across the entire curve
   *
   * @param {number} [divisions=5] Number of divisions
   * @returns {Vector[]}
   */
  public getSpacedPoints(divisions: number = 5): V[] {
    const points = [];
    for (let i = 0; i <= divisions; i++) {
      points.push(this.getPointAt(i / divisions));
    }
    return points;
  }

  /**
   * Compute the total arc length of this curve
   *
   * @returns {number}
   */
  public getLength(): number {
    const lengths = this.getLengths();
    return lengths[lengths.length - 1];
  }

  /**
   * Compute the cumulative segment lengths of this curve
   *
   * @param {number} [divisions=this.arcLengthDivisions] Number of divisions
   * @returns {number[]}
   */
  public getLengths(divisions: number = this.arcLengthDivisions): number[] {
    if (this._cacheArcLengths.length === divisions + 1 && !this.needsUpdate) {
      return this._cacheArcLengths;
    }

    this.needsUpdate = false;

    const lengths = [0];
    let currentPoint: V;
    let lastPoint: V = this.getPoint(0);
    let sum = 0;
    for (let i = 1; i <= divisions; i++) {
      currentPoint = this.getPoint(i / divisions);
      sum += currentPoint.distanceTo(lastPoint);
      lengths.push(sum);
      lastPoint = currentPoint;
    }

    this._cacheArcLengths = lengths;

    return lengths;
  }

  /**
   * Update the cached cumulative segment lengths
   */
  public updateArcLengths() {
    this.needsUpdate = true;
    this.getLengths();
  }

  /**
   * Re-map a normalized position value into normalized time
   *
   * @param {number} u 								 Normalized position value to interpolate
   * @param {number} [targetArcLength] Distance on this curve
   * @returns {number} Updated interpolation value
   */
  public getUtoTmapping(u: number, targetArcLength?: number): number {
    const arcLengths = this.getLengths();

    let i = 0;
    const length = arcLengths.length;

    targetArcLength = targetArcLength ?? u * arcLengths[length - 1];

    let low = 0;
    let high = length - 1;
    let comparison: number;

    while (low <= high) {
      i = Math.floor(low + (high - low) / 2);
      comparison = arcLengths[i] - targetArcLength;
      if (comparison < 0) {
        low = i + 1;
      } else if (comparison > 0) {
        high = i - 1;
      } else {
        high = i;
        break;
      }
    }

    i = high;

    if (arcLengths[i] === targetArcLength) {
      return i / (length - 1);
    }

    const lengthBefore = arcLengths[i];
    const lengthAfter = arcLengths[i + 1];

    const segmentLength = lengthAfter - lengthBefore;
    const segmentFraction = (targetArcLength - lengthBefore) / segmentLength;

    const t = (i + segmentFraction) / (length - 1);

    return t;
  }

  /**
   * Compute an unit vector tangent for the given normalized time value
   *
   * @param {number} t Normalized time value
   * @returns {Vector} Tangent vector
   */
  public getTangent(t: number): V {
    const delta = 0.0001;
    let t0 = Math.max(0, t - delta);
    let t1 = Math.min(1, t + delta);

    const p0 = this.getPoint(t0);
    const p1 = this.getPoint(t1);

    return p1.clone().sub(p0).normalize();
  }

  /**
   * Compute an unit vector tangent for the given normalized position value
   *
   * @param {number} u Normalized position value
   * @returns {Vector} Tangent vector
   */
  public getTangentAt(u: number): V {
    const t = this.getUtoTmapping(u);
    return this.getTangent(t);
  }

  /**
   * Check if this curve is closed
   *
   * @returns {boolean} True if the curve is closed, false otherwise
   */
  public isClosed(): boolean {
    return this.getPoint(0).equals(this.getPoint(1));
  }
}
