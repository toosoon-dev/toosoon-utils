import { PI } from './constants';
import { Vector3 } from './types';

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
 * @param  {number} x1 X value of the first point
 * @param  {number} y1 Y value of the first point
 * @param  {number} x2 X value of the second point
 * @param  {number} y2 Y value of the second point
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
 * @param {number} x1 X coord of the first point
 * @param {number} y1 Y coord of the first point
 * @param {number} x2 X coord of the second point
 * @param {number} y2 Y coord of the second point
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
// Fit
// *********************
interface FitInput {
  width: number;
  height: number;
}

interface FitOutput {
  left: number;
  top: number;
  width: number;
  height: number;
  scale: number;
}

/**
 * Make a target fit a container
 *
 * @param {FitInput} target    Dimension of the target
 * @param {FitInput} container Dimension of the container
 * @param {string} mode        Can be 'contain' | 'cover'
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
 * @param {FitInput} target    Dimension of the target
 * @param {FitInput} container Dimension of the container
 * @returns {FitOutput}
 */
export function cover(target: FitInput, container: FitInput): FitOutput {
  return fit(target, container, 'cover');
}

/**
 * Make a target fit a container (contain mode)
 *
 * @param {FitInput} target    Dimension of the target
 * @param {FitInput} container Dimension of the container
 * @returns {FitOutput}
 */
export function contain(target: FitInput, container: FitInput): FitOutput {
  return fit(target, container, 'contain');
}
