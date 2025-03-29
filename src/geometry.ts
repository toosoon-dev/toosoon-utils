import { PI } from './constants';
import type { Vector3 } from './types';

/**
 * Convert a radians value into degrees
 *
 * @param {number} radians Angle in radians
 * @returns {number} Angle in degrees
 */
export function toDegrees(radians: number): number {
  return (radians * 180) / PI;
}

/**
 * Convert a degrees value into radians
 *
 * @param {number} degrees Angle in degrees
 * @returns {number} Angle in radians
 */
export function toRadians(degrees: number): number {
  return (degrees * PI) / 180;
}

/**
 * Calculate the angle from a point to another
 *
 * @param  {number} x1 X-axis coordinate of the start point
 * @param  {number} y1 Y-axis coordinate of the start point
 * @param  {number} x2 X-axis coordinate of the end point
 * @param  {number} y2 Y-axis coordinate of the end point
 * @returns {number} Angle
 */
export function angle(x1: number, y1: number, x2: number, y2: number): number {
  return Math.atan2(y2 - y1, x2 - x1);
}

/**
 * Find the closest angle between to angles
 *
 * @param {number} source Source angle in radians
 * @param {number} target Target angle in radians
 * @returns {number} Closest angle
 */
export function closestAngle(source: number, target: number): number {
  const delta = target - source;
  return delta > PI ? target - 2 * PI : target < -PI ? delta + 2 * PI : target;
}

/**
 * Calculate the distance between two points
 *
 * @param {number} x1 X-axis coordinate of the start point
 * @param {number} y1 Y-axis coordinate of the start point
 * @param {number} x2 X-axis coordinate of the end point
 * @param {number} y2 Y-axis coordinate of the end point
 * @returns {number} Computed distance
 */
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate the length of the diagonal of a rectangle
 *
 * @param {number} width  Width of the rectangle
 * @param {number} height Height of the rectangle
 * @returns {number} Diagonal length
 */
export function diagonal(width: number, height: number): number {
  return Math.sqrt(width * width + height * height);
}

/**
 * Convert radians to a 3D point on the surface of a unit sphere
 *
 * @param  {number} radius  Radius of the sphere
 * @param  {number} phi     Polar angle from the y (up) axis     : [0, PI]
 * @param  {number} theta   Equator angle around the y (up) axis : [0, 2*PI]
 * @param  {Vector3} target Target vector
 * @returns {Vector3}
 */
export function radToSphere(
  radius: number,
  phi: number,
  theta: number,
  target: Vector3 = { x: 0, y: 0, z: 0 }
): Vector3 {
  target.x = radius * Math.sin(phi) * Math.sin(theta);
  target.y = radius * Math.cos(phi);
  target.z = radius * Math.sin(phi) * Math.cos(theta);
  return target;
}

// *********************
// Curves
// *********************

/**
 * Interpolate a point on an elliptical arc Cubic Bézier curve
 *
 * @param {number} t    Normalized time value to interpolate
 * @param {number} x1   X-axis coordinate of the start point
 * @param {number} y1   Y-axis coordinate of the start point
 * @param {number} cpx1 X-axis coordinate of the first control point
 * @param {number} cpy1 Y-axis coordinate of the first control point
 * @param {number} cpx2 X-axis coordinate of the second control point
 * @param {number} cpy2 Y-axis coordinate of the second control point
 * @param {number} x2   X-axis coordinate of the end point
 * @param {number} y2   Y-axis coordinate of the end point
 * @returns {[number, number]} Interpolated coordinates on the curve
 */
export function cubicBezier(
  t: number,
  x1: number,
  y1: number,
  cpx1: number,
  cpy1: number,
  cpx2: number,
  cpy2: number,
  x2: number,
  y2: number
): [number, number] {
  const t2 = t * t;
  const t3 = t2 * t;
  const T = 1 - t;
  const T2 = T * T;
  const T3 = T2 * T;
  const x = T3 * x1 + 3 * T2 * t * cpx1 + 3 * T * t2 * cpx2 + t3 * x2;
  const y = T3 * y1 + 3 * T2 * t * cpy1 + 3 * T * t2 * cpy2 + t3 * y2;
  return [x, y];
}

/**
 * Compute the curvature of a Cubic Bézier curve
 *
 * @param {number} x1   X-axis coordinate of the start point
 * @param {number} y1   Y-axis coordinate of the start point
 * @param {number} cpx1 X-axis coordinate of the first control point
 * @param {number} cpy1 Y-axis coordinate of the first control point
 * @param {number} cpx2 X-axis coordinate of the second control point
 * @param {number} cpy2 Y-axis coordinate of the second control point
 * @param {number} x2   X-axis coordinate of the end point
 * @param {number} y2   Y-axis coordinate of the end point
 * @returns {number} Computed curvature
 */
export function computeCubicBezierCurvature(
  x1: number,
  y1: number,
  cpx1: number,
  cpy1: number,
  cpx2: number,
  cpy2: number,
  x2: number,
  y2: number
): number {
  const d1 = Math.hypot(cpx1 - x1, cpy1 - y1);
  const d2 = Math.hypot(cpx2 - x2, cpy2 - y2);
  const d3 = Math.hypot(x2 - x1, y2 - y1);
  return (d1 + d2) / d3;
}

/**
 * Interpolate a point on an elliptical arc Quadratic Bézier curve
 *
 * @param {number} t   Normalized time value to interpolate
 * @param {number} x1  X-axis coordinate of the start point
 * @param {number} y1  Y-axis coordinate of the start point
 * @param {number} cpx X-axis coordinate of the control point
 * @param {number} cpy Y-axis coordinate of the control point
 * @param {number} x2  X-axis coordinate of the end point
 * @param {number} y2  Y-axis coordinate of the end point
 * @returns {[number, number]} Interpolated coordinates on the curve
 */
export function quadraticBezier(
  t: number,
  x1: number,
  y1: number,
  cpx: number,
  cpy: number,
  x2: number,
  y2: number
): [number, number] {
  const t2 = t * t;
  const T = 1 - t;
  const T2 = T * T;
  const x = T2 * x1 + 2 * T * t * cpx + t2 * x2;
  const y = T2 * y1 + 2 * T * t * cpy + t2 * y2;
  return [x, y];
}

/**
 * Compute the curvature of a Quadratic Bézier curve
 *
 * @param {number} x1  X-axis coordinate of the start point
 * @param {number} y1  Y-axis coordinate of the start point
 * @param {number} cpx X-axis coordinate of the control point
 * @param {number} cpy Y-axis coordinate of the control point
 * @param {number} x2  X-axis coordinate of the end point
 * @param {number} y2  Y-axis coordinate of the end point
 * @returns {number} Computed curvature
 */
export function computeQuadraticBezierCurvature(
  x1: number,
  y1: number,
  cpx: number,
  cpy: number,
  x2: number,
  y2: number
): number {
  const d1 = Math.hypot(cpx - x1, cpy - y1);
  const d2 = Math.hypot(cpx - x2, cpy - y2);
  const d3 = Math.hypot(x2 - x1, y2 - y1);
  return (d1 + d2) / d3;
}

type ComputedArc = {
  cx: number;
  cy: number;
  cosAngle: number;
  sinAngle: number;
  startAngle: number;
  deltaAngle: number;
};

/**
 * @param {number} x1    X-axis coordinate of the starting point of the arc
 * @param {number} y1    Y-axis coordinate of the starting point of the arc
 * @param {number} x2    X-axis coordinate of the ending point of the arc
 * @param {number} y2    Y-axis coordinate of the ending point of the arc
 * @param {number} rx    X-radius of the ellipse
 * @param {number} ry    Y-radius of the ellipse
 * @param {number} angle Rotation angle of the ellipse (in radians)
 * @param {boolean} [largeArc=true]  Flag indicating whether to draw the larger of the two possible arcs
 * @param {boolean} [clockwise=true] Flag indicating the direction of the arc
 * @returns {ComputedArc}
 */
function computeArc(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  rx: number,
  ry: number,
  angle: number,
  largeArc: boolean = true,
  clockwise: boolean = true
): ComputedArc {
  const centerX = (x1 - x2) / 2;
  const centerY = (y1 - y2) / 2;
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);

  const x1p = cosAngle * centerX + sinAngle * centerY;
  const y1p = -sinAngle * centerX + cosAngle * centerY;

  rx = Math.abs(rx);
  ry = Math.abs(ry);

  const lambda = x1p ** 2 / rx ** 2 + y1p ** 2 / ry ** 2;
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }

  const sign = largeArc !== clockwise ? 1 : -1;
  const factor =
    sign *
    Math.sqrt(
      Math.max(
        0,
        (rx ** 2 * ry ** 2 - rx ** 2 * y1p ** 2 - ry ** 2 * x1p ** 2) / (rx ** 2 * y1p ** 2 + ry ** 2 * x1p ** 2)
      )
    );

  const cxp = (factor * rx * y1p) / ry;
  const cyp = (-factor * ry * x1p) / rx;

  const cx = cosAngle * cxp - sinAngle * cyp + (x1 + x2) / 2;
  const cy = sinAngle * cxp + cosAngle * cyp + (y1 + y2) / 2;

  const startAngle = Math.atan2((y1p - cyp) / ry, (x1p - cxp) / rx);
  const endAngle = Math.atan2((-y1p - cyp) / ry, (-x1p - cxp) / rx);

  let deltaAngle = endAngle - startAngle;
  if (clockwise === false && deltaAngle > 0) {
    deltaAngle -= 2 * PI;
  } else if (clockwise === true && deltaAngle < 0) {
    deltaAngle += 2 * PI;
  }

  return {
    cx,
    cy,
    cosAngle,
    sinAngle,
    startAngle,
    deltaAngle
  };
}

/**
 * Interpolate a point on an elliptical arc
 *
 * @param {number} t     Normalized time value to interpolate
 * @param {number} x1    X-axis coordinate of the starting point of the arc
 * @param {number} y1    Y-axis coordinate of the starting point of the arc
 * @param {number} x2    X-axis coordinate of the ending point of the arc
 * @param {number} y2    Y-axis coordinate of the ending point of the arc
 * @param {number} rx    X-radius of the ellipse
 * @param {number} ry    Y-radius of the ellipse
 * @param {number} angle Rotation angle of the ellipse (in radians)
 * @param {boolean} [largeArc]  Flag indicating whether to draw the larger of the two possible arcs
 * @param {boolean} [clockwise] Flag indicating the direction of the arc
 * @returns {[number, number]} Interpolated coordinates on the arc
 */
export function arc(
  t: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  rx: number,
  ry: number,
  angle: number,
  largeArc?: boolean,
  clockwise?: boolean
): [number, number] {
  const arc = computeArc(x1, y1, x2, y2, rx, ry, angle, largeArc, clockwise);
  const { cx, cy, cosAngle, sinAngle, startAngle, deltaAngle } = arc;

  const theta = startAngle + t * deltaAngle;
  const x = cx + rx * Math.cos(theta) * cosAngle - ry * Math.sin(theta) * sinAngle;
  const y = cy + rx * Math.cos(theta) * sinAngle + ry * Math.sin(theta) * cosAngle;

  return [x, y];
}

/**
 * Compute the curvature of an elliptical arc
 *
 * @param {number} x1    X-axis coordinate of the starting point of the arc
 * @param {number} y1    Y-axis coordinate of the starting point of the arc
 * @param {number} x2    X-axis coordinate of the ending point of the arc
 * @param {number} y2    Y-axis coordinate of the ending point of the arc
 * @param {number} rx    X-radius of the ellipse
 * @param {number} ry    Y-radius of the ellipse
 * @param {number} angle Rotation angle of the ellipse (in radians)
 * @param {boolean} [largeArc]  Flag indicating whether to draw the larger of the two possible arcs
 * @param {boolean} [clockwise] Flag indicating the direction of the arc
 * @returns Computed curvature
 */
export function computeArcCurvature(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  rx: number,
  ry: number,
  angle: number,
  largeArc: boolean = true,
  clockwise: boolean = true
): number {
  const { deltaAngle } = computeArc(x1, y1, x2, y2, rx, ry, angle, largeArc, clockwise);
  return deltaAngle / PI;
}

// *********************
// Fit
// *********************
export type FitInput = {
  width: number;
  height: number;
};

export type FitOutput = {
  left: number;
  top: number;
  width: number;
  height: number;
  scale: number;
};

/**
 * Make a target fit a container
 *
 * @param {object} target    Dimensions of the target
 * @param {object} container Dimensions of the container
 * @param {'contain'|'cover'} mode      Can be 'contain' | 'cover'
 * @returns {object}
 */
function fit(target: FitInput, container: FitInput, mode: 'contain' | 'cover'): FitOutput {
  const ratioWidth = container.width / target.width;
  const ratioHeight = container.height / target.height;

  let scale: number;
  if (mode === 'contain') {
    scale = ratioWidth < ratioHeight ? ratioWidth : ratioHeight;
  } else {
    scale = ratioWidth > ratioHeight ? ratioWidth : ratioHeight;
  }

  return {
    left: (container.width - target.width * scale) >> 1,
    top: (container.height - target.height * scale) >> 1,
    width: target.width * scale,
    height: target.height * scale,
    scale
  };
}

/**
 * Make a target fit a container (cover mode)
 *
 * @param {FitInput} target    Dimensions of the target
 * @param {FitInput} container Dimensions of the container
 * @returns {FitOutput}
 */
export function cover(target: FitInput, container: FitInput): FitOutput {
  return fit(target, container, 'cover');
}

/**
 * Make a target fit a container (contain mode)
 *
 * @param {FitInput} target    Dimensions of the target
 * @param {FitInput} container Dimensions of the container
 * @returns {FitOutput}
 */
export function contain(target: FitInput, container: FitInput): FitOutput {
  return fit(target, container, 'contain');
}
