import { TWO_PI } from '../../constants';

import EllipseCurve from './EllipseCurve';

/**
 * Utility class for manipulating arcs
 *
 * @exports
 * @class ArcCurve
 * @extends Curve
 */
export default class ArcCurve extends EllipseCurve {
  /**
   * @param {number} cx X-axis coordinate of the center of the circle
   * @param {number} cy Y-axis coordinate of the center of the circle
   * @param {number} radius Radius of the circle
   * @param {number} [startAngle=0]  Start angle of the arc (in radians)
   * @param {number} [endAngle=2*PI] End angle of the arc (in radians)
   * @param {boolean} [counterclockwise=false] Flag indicating the direction of the arc
   */
  constructor(
    cx: number,
    cy: number,
    radius: number,
    startAngle: number = 0,
    endAngle: number = TWO_PI,
    counterclockwise: boolean = false
  ) {
    super(cx, cy, radius, radius, 0, startAngle, endAngle, counterclockwise);
  }
}
