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

export type PathSVGSerializationParams = {
  approximate?: boolean;
  curveResolution?: number;
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
   * @param {object} [params]
   * @returns {string}
   */
  public toString(params: PathSVGSerializationParams = {}): string {
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
   * @param {object} [params] Serialization parameters
   * @param {boolean} [params.approximate]    Flag indicating if given curve should be approximated into straight lines
   * @param {number} [params.curveResolution] Resolution used for curve approximations
   * @returns string
   */
  static serialize(curve: Curve<Vector2>, { approximate, curveResolution }: PathSVGSerializationParams = {}): string {
    if (curve instanceof Path) {
      return PathSVG.serializePath(curve, { approximate, curveResolution });
    }

    if (approximate === true) {
      const points = PathSVG.approximate(curve, curveResolution);
      return points.map(([x, y]) => `L${x},${y}`).join(' ');
    }

    if (curve instanceof LineCurve) {
      return PathSVG.serializeLineCurve(curve);
    }
    if (curve instanceof PolylineCurve) {
      return PathSVG.serializePolylineCurve(curve);
    }
    if (curve instanceof QuadraticBezierCurve) {
      return PathSVG.serializeQuadraticBezierCurve(curve);
    }
    if (curve instanceof CubicBezierCurve) {
      return PathSVG.serializeCubicBezierCurve(curve);
    }
    if (curve instanceof CatmullRomCurve) {
      return PathSVG.serializeCatmullRomCurve(curve, curveResolution);
    }
    if (curve instanceof SplineCurve) {
      return PathSVG.serializeSplineCurve(curve, curveResolution);
    }
    if (curve instanceof EllipseCurve) {
      return PathSVG.serializeEllipseCurve(curve);
    }
    if (curve instanceof ArcCurve) {
      return PathSVG.serializeArcCurve(curve);
    }

    return '';
  }

  /**
   * Serialize a {@link LineCurve}
   *
   * @param {LineCurve} curve LineCurve to serialize
   * @returns string
   */
  static serializeLineCurve(curve: LineCurve): string {
    const { x2, y2 } = curve;
    return `L${x2},${y2}`;
  }

  /**
   * Serialize a {@link PolylineCurve}
   *
   * @param {PolylineCurve} curve PolylineCurve to serialize
   * @returns string
   */
  static serializePolylineCurve(curve: PolylineCurve): string {
    const { points } = curve;
    return points.map(([x, y]) => `L${x},${y}`).join(' ');
  }

  /**
   * Serialize a {@link QuadraticBezierCurve}
   *
   * @param {QuadraticBezierCurve} curve QuadraticBezierCurve to serialize
   * @returns string
   */
  static serializeQuadraticBezierCurve(curve: QuadraticBezierCurve): string {
    const { cpx, cpy, x2, y2 } = curve;
    return `Q${cpx},${cpy},${x2},${y2}`;
  }

  /**
   * Serialize a {@link CubicBezierCurve}
   *
   * @param {CubicBezierCurve} curve CubicBezierCurve to serialize
   * @returns string
   */
  static serializeCubicBezierCurve(curve: CubicBezierCurve): string {
    const { cp1x, cp1y, cp2x, cp2y, x2, y2 } = curve;
    return `C${cp1x},${cp1y},${cp2x},${cp2y},${x2},${y2}`;
  }

  /**
   * Serialize a {@link CatmullRomCurve} by approximating it into straight lines
   *
   * @param {CatmullRomCurve} curve CatmullRomCurve to serialize
   * @param {number} [curveResolution] Approximation resolution
   * @returns string
   */
  static serializeCatmullRomCurve(curve: CatmullRomCurve, curveResolution?: number): string {
    const points = PathSVG.approximate(curve, curveResolution);
    return points.map(([x, y]) => `L${x},${y}`).join(' ');
  }

  /**
   * Serialize a {@link SplineCurve} by approximating it into straight lines
   *
   * @param {SplineCurve} curve SplineCurve to serialize
   * @param {number} [curveResolution] Approximation resolution
   * @returns string
   */
  static serializeSplineCurve(curve: SplineCurve, curveResolution?: number): string {
    const points = PathSVG.approximate(curve, curveResolution);
    return points.map(([x, y]) => `L${x},${y}`).join(' ');
  }

  /**
   * Serialize an {@link EllipseCurve}
   *
   * @param {EllipseCurve} curve EllipseCurve to serialize
   * @returns string
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
   * @returns string
   */
  static serializeArcCurve(curve: ArcCurve): string {
    return PathSVG.serializeEllipseCurve(curve);
  }

  /**
   * Serialize an {@link Path}
   *
   * @param {Path} path Path to serialize
   * @param {object} [params]
   * @param {object} [params.curveResolution] Resolution used for curves approximations
   * @returns string
   */
  static serializePath(path: Path<Vector2>, params: PathSVGSerializationParams = {}): string {
    return path.subpaths
      .map((curve, index) => {
        let commands = ``;
        const previousPoint = path.subpaths[index - 1]?.getPoint(1);
        const newPoint = curve.getPoint(0);
        if (index === 0 || !previousPoint?.equals(newPoint)) {
          commands += `M${newPoint.x},${newPoint.y}`;
        }
        commands += PathSVG.serialize(curve, params);
        return commands;
      })
      .join(' ');
  }
}
