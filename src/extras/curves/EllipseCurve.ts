import { EPSILON, TWO_PI } from '../../constants';
import type { Point2 } from '../../types';
import { Vector2 } from '../geometry';
import Curve from './Curve';

/**
 * Utility class for manipulating ellipses
 *
 * @exports
 * @class EllipseCurve
 * @extends Curve
 */
export default class EllipseCurve extends Curve<Vector2> {
  readonly type: string = 'EllipseCurve';

  /**
   * X-axis coordinate of the center of the ellipse
   */
  public cx: number;
  /**
   * Y-axis coordinate of the center of the ellipse
   */
  public cy: number;
  /**
   * X-radius of the ellipse
   */
  public rx: number;
  /**
   * Y-radius of the ellipse
   */
  public ry: number;
  /**
   * Rotation angle of the ellipse (in radians), counterclockwise from the positive X-axis
   */
  public rotation: number;
  /**
   * Start angle of the arc (in radians)
   */
  public startAngle: number;
  /**
   * End angle of the arc (in radians)
   */
  public endAngle: number;
  /**
   * Flag indicating the direction of the arc
   */
  public counterclockwise: boolean;

  /**
   * @param {number} cx X-axis coordinate of the center of the ellipse
   * @param {number} cy Y-axis coordinate of the center of the ellipse
   * @param {number} rx X-radius of the ellipse
   * @param {number} ry Y-radius of the ellipse
   * @param {number} [rotation=0] Rotation angle of the ellipse (in radians), counterclockwise from the positive X-axis
   * @param {number} [startAngle=0]  Start angle of the arc (in radians)
   * @param {number} [endAngle=2*PI] End angle of the arc (in radians)
   * @param {boolean} [counterclockwise=false] Flag indicating the direction of the arc
   */
  constructor(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    rotation: number = 0,
    startAngle: number = 0,
    endAngle: number = TWO_PI,
    counterclockwise: boolean = false
  ) {
    super();

    this.cx = cx;
    this.cy = cy;
    this.rx = rx;
    this.ry = ry;
    this.rotation = rotation;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.counterclockwise = counterclockwise;
  }

  /**
   * Interpolate a point on this curve
   *
   * @abstract
   * @param {number} t Normalized time value to interpolate
   * @returns {Vector2} Interpolated coordinates on this curve
   */
  public getPoint(t: number): Vector2 {
    return new Vector2(
      ...EllipseCurve.interpolate(
        t,
        this.cx,
        this.cy,
        this.rx,
        this.ry,
        this.rotation,
        this.startAngle,
        this.endAngle,
        this.counterclockwise
      )
    );
  }

  /**
   * Interpolate a point on an elliptical arc
   *
   * @param {number} t  Normalized time value to interpolate
   * @param {number} cx X-axis coordinate of the center of the ellipse
   * @param {number} cy Y-axis coordinate of the center of the ellipse
   * @param {number} rx X-radius of the ellipse
   * @param {number} ry Y-radius of the ellipse
   * @param {number} [rotation=0] Rotation angle of the ellipse (in radians), counterclockwise from the positive X-axis
   * @param {number} [startAngle=0]  Start angle of the arc (in radians)
   * @param {number} [endAngle=2*PI] End angle of the arc (in radians)
   * @param {boolean} [counterclockwise=false] Flag indicating the direction of the arc
   * @returns {Point2} Interpolated coordinates on the arc
   */
  static interpolate(
    t: number,
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    rotation: number = 0,
    startAngle: number = 0,
    endAngle: number = TWO_PI,
    counterclockwise: boolean = false
  ): Point2 {
    let deltaAngle = endAngle - startAngle;
    const isEmpty = Math.abs(deltaAngle) <= EPSILON;

    while (deltaAngle < 0) deltaAngle += TWO_PI;
    while (deltaAngle > TWO_PI) deltaAngle -= TWO_PI;

    if (deltaAngle <= EPSILON) {
      if (isEmpty) {
        deltaAngle = 0;
      } else {
        deltaAngle = TWO_PI;
      }
    }

    if (counterclockwise === true && !isEmpty) {
      if (deltaAngle === TWO_PI) {
        deltaAngle = -TWO_PI;
      } else {
        deltaAngle = deltaAngle - TWO_PI;
      }
    }

    const angle = startAngle + t * deltaAngle;
    let x = cx + rx * Math.cos(angle);
    let y = cy + ry * Math.sin(angle);

    if (rotation !== 0) {
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      const deltaX = x - cx;
      const deltaY = y - cy;
      x = deltaX * cos - deltaY * sin + cx;
      y = deltaX * sin + deltaY * cos + cy;
    }

    return [x, y];
  }
}
