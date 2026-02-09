import { PI, RAD2DEG, DEG2RAD } from './constants';

/**
 * Convert a radians angle into degrees
 *
 * @param {number} radians Angle in radians
 * @returns {number} Angle in degrees
 */
export function toDegrees(radians: number): number {
  return radians * RAD2DEG;
}

/**
 * Convert a degrees angle into radians
 *
 * @param {number} degrees Angle in degrees
 * @returns {number} Angle in radians
 */
export function toRadians(degrees: number): number {
  return degrees * DEG2RAD;
}

/**
 * Compute the angle (in radians) from a point to another
 *
 * @param  {number} x1 X-axis coordinate of the start point
 * @param  {number} y1 Y-axis coordinate of the start point
 * @param  {number} x2 X-axis coordinate of the end point
 * @param  {number} y2 Y-axis coordinate of the end point
 * @returns {number} Computed angle (in radians)
 */
export function angle(x1: number, y1: number, x2: number, y2: number): number {
  return Math.atan2(y2 - y1, x2 - x1);
}

/**
 * Compute the closest angle (in radians) between two angles
 *
 * @param {number} startAngle Start angle (in radians)
 * @param {number} endAngle   End angle (in radians)
 * @returns {number} Closest angle (in radians)
 */
export function closestAngle(startAngle: number, endAngle: number): number {
  const delta = endAngle - startAngle;
  return delta > PI ? endAngle - 2 * PI : endAngle < -PI ? delta + 2 * PI : endAngle;
}

/**
 * Compute the distance between two points
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
 * Compute the length of the diagonal of a rectangle
 *
 * @param {number} width  Width of the rectangle
 * @param {number} height Height of the rectangle
 * @returns {number} Diagonal length
 */
export function diagonal(width: number, height: number): number {
  return Math.sqrt(width * width + height * height);
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
 * @param {FitInput} target Dimensions of the target
 * @param {FitInput} container Dimensions of the container
 * @param {string} mode Can be 'contain' | 'cover'
 * @returns {FitOutput}
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
 * @param {FitInput} target Dimensions of the target
 * @param {FitInput} container Dimensions of the container
 * @returns {FitOutput}
 */
export function cover(target: FitInput, container: FitInput): FitOutput {
  return fit(target, container, 'cover');
}

/**
 * Make a target fit a container (contain mode)
 *
 * @param {FitInput} target Dimensions of the target
 * @param {FitInput} container Dimensions of the container
 * @returns {FitOutput}
 */
export function contain(target: FitInput, container: FitInput): FitOutput {
  return fit(target, container, 'contain');
}
