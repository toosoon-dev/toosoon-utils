import { EPSILON, PI, TWO_PI } from '../../constants';
import { toDegrees } from '../../geometry';
import {
  Curve,
  LineCurve,
  PolylineCurve,
  QuadraticBezierCurve,
  CubicBezierCurve,
  CatmullRomCurve,
  SplineCurve,
  EllipseCurve,
  ArcCurve
} from '../curves';
import { type Vector2 } from '../geometry';
import PathContext from './PathContext';
import Path from './Path';

/**
 * Parameters used for SVG serialization of a path
 */
export type PathSVGSerializationParameters = {
  /**
   * Flag indicating if given curve should be approximated into straight lines
   */
  approximate?: boolean;
  /**
   * Resolution used for approximations
   */
  resolution?: number;
};

/**
 * Utility class for manipulating connected curves and generating SVG path
 *
 * It works by serializing 2D Canvas API to SVG path data
 *
 * @exports
 * @class PathSVG
 * @extends PathContext
 */
export default class PathSVG extends PathContext {
  /**
   * Serialize this path into a SVG path string
   *
   * @param {PathSVGSerializationParameters} [params] Serialization parameters
   * @returns {string}
   */
  public toString(params?: PathSVGSerializationParameters): string {
    return PathSVG.serialize(this, params);
  }

  /**
   * Convert a {@link Curve} into spaced points
   *
   * @param {Curve} curve Curve to approximate
   * @param {number} [resolution=5] Approximation resolution
   * @returns
   */
  static approximate(curve: Curve<Vector2>, resolution: number = 5): Vector2[] {
    const divisions = (curve.getLength() * resolution) / 100;
    return curve.getSpacedPoints(divisions);
  }

  /**
   * Serialize a {@link Curve}
   *
   * @param {Curve} curve Curve to serialize
   * @param {PathSVGSerializationParameters} [params] Serialization parameters
   * @returns {string}
   */
  static serialize(curve: Curve<Vector2>, { approximate, resolution }: PathSVGSerializationParameters = {}): string {
    if (curve instanceof Path) {
      return this.serializePath(curve, { approximate, resolution });
    }

    if (approximate === true) {
      const points = this.approximate(curve, resolution);
      return points.map(([x, y]) => `L${x},${y}`).join(' ');
    }

    if (curve instanceof LineCurve) {
      return this.serializeLineCurve(curve);
    }
    if (curve instanceof PolylineCurve) {
      return this.serializePolylineCurve(curve);
    }
    if (curve instanceof QuadraticBezierCurve) {
      return this.serializeQuadraticBezierCurve(curve);
    }
    if (curve instanceof CubicBezierCurve) {
      return this.serializeCubicBezierCurve(curve);
    }
    if (curve instanceof CatmullRomCurve) {
      return this.serializeCatmullRomCurve(curve, resolution);
    }
    if (curve instanceof SplineCurve) {
      return this.serializeSplineCurve(curve, resolution);
    }
    if (curve instanceof EllipseCurve) {
      return this.serializeEllipseCurve(curve);
    }
    if (curve instanceof ArcCurve) {
      return this.serializeArcCurve(curve);
    }

    return '';
  }

  /**
   * Serialize a {@link LineCurve}
   *
   * @param {LineCurve} curve LineCurve to serialize
   * @returns {string}
   */
  static serializeLineCurve(curve: LineCurve): string {
    const { x2, y2 } = curve;
    return `L${x2},${y2}`;
  }

  /**
   * Serialize a {@link PolylineCurve}
   *
   * @param {PolylineCurve} curve PolylineCurve to serialize
   * @returns {string}
   */
  static serializePolylineCurve(curve: PolylineCurve): string {
    const { points } = curve;
    return points.map(([x, y]) => `L${x},${y}`).join(' ');
  }

  /**
   * Serialize a {@link QuadraticBezierCurve}
   *
   * @param {QuadraticBezierCurve} curve QuadraticBezierCurve to serialize
   * @returns {string}
   */
  static serializeQuadraticBezierCurve(curve: QuadraticBezierCurve): string {
    const { cpx, cpy, x2, y2 } = curve;
    return `Q${cpx},${cpy},${x2},${y2}`;
  }

  /**
   * Serialize a {@link CubicBezierCurve}
   *
   * @param {CubicBezierCurve} curve CubicBezierCurve to serialize
   * @returns {string}
   */
  static serializeCubicBezierCurve(curve: CubicBezierCurve): string {
    const { cp1x, cp1y, cp2x, cp2y, x2, y2 } = curve;
    return `C${cp1x},${cp1y},${cp2x},${cp2y},${x2},${y2}`;
  }

  /**
   * Serialize a {@link CatmullRomCurve} by approximating it into straight lines
   *
   * @param {CatmullRomCurve} curve CatmullRomCurve to serialize
   * @param {number} [resolution] Approximation resolution
   * @returns {string}
   */
  static serializeCatmullRomCurve(curve: CatmullRomCurve, resolution?: number): string {
    const points = this.approximate(curve, resolution);
    return points.map(([x, y]) => `L${x},${y}`).join(' ');
  }

  /**
   * Serialize a {@link SplineCurve} by approximating it into straight lines
   *
   * @param {SplineCurve} curve SplineCurve to serialize
   * @param {number} [resolution] Approximation resolution
   * @returns {string}
   */
  static serializeSplineCurve(curve: SplineCurve, resolution?: number): string {
    const points = this.approximate(curve, resolution);
    return points.map(([x, y]) => `L${x},${y}`).join(' ');
  }

  /**
   * Serialize an {@link EllipseCurve}
   *
   * @param {EllipseCurve} curve EllipseCurve to serialize
   * @returns {string}
   */
  static serializeEllipseCurve(curve: EllipseCurve): string {
    const { cx, cy, rx, ry, rotation, startAngle, endAngle, counterclockwise } = curve;

    let deltaAngle = counterclockwise ? startAngle - endAngle : endAngle - startAngle;
    if (deltaAngle < 0) deltaAngle = (deltaAngle % TWO_PI) + TWO_PI;

    const [x0, y0] = EllipseCurve.interpolate(0, cx, cy, rx, ry, rotation, startAngle, endAngle, counterclockwise);
    const [x1, y1] = EllipseCurve.interpolate(1, cx, cy, rx, ry, rotation, startAngle, endAngle, counterclockwise);
    const xAxisRotation = toDegrees(rotation);
    const largeArcFlag = deltaAngle >= PI ? 1 : 0;
    const sweepFlag = counterclockwise ? 0 : 1;

    if (deltaAngle > TWO_PI - EPSILON) {
      return (
        `A${rx},${ry},${xAxisRotation},1,${sweepFlag},${x0},${y0}` +
        `A${rx},${ry},${xAxisRotation},1,${sweepFlag},${x1},${y1}`
      );
    } else if (deltaAngle > EPSILON) {
      return `A${rx},${ry},${xAxisRotation},${largeArcFlag},${sweepFlag},${x1},${y1}`;
    }

    return '';
  }

  /**
   * Serialize an {@link ArcCurve}
   *
   * @param {ArcCurve} curve ArcCurve to serialize
   * @returns {string}
   */
  static serializeArcCurve(curve: ArcCurve): string {
    return this.serializeEllipseCurve(curve);
  }

  /**
   * Serialize an {@link Path}
   *
   * @param {Path} path Path to serialize
   * @param {PathSVGSerializationParameters} [params] Serialization parameters
   * @returns {string}
   */
  static serializePath(path: Path<Vector2>, params?: PathSVGSerializationParameters): string {
    return path.curves
      .map((curve, index) => {
        let commands = ``;
        const previousPoint = path.curves[index - 1]?.getPoint(1);
        const newPoint = curve.getPoint(0);
        if (index === 0 || !previousPoint?.equals(newPoint)) {
          commands += `M${newPoint.x},${newPoint.y}`;
        }
        commands += this.serialize(curve, params);
        return commands;
      })
      .join(' ');
  }
}
