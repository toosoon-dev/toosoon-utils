import { EPSILON, HALF_PI, TWO_PI } from '../../constants';
import { toDegrees } from '../../geometry';
import type { Point2 } from '../../types';
import {
  LineCurve,
  PolylineCurve,
  QuadraticBezierCurve,
  CubicBezierCurve,
  CatmullRomCurve,
  SplineCurve,
  EllipseCurve,
  ArcCurve
} from '../curves';
import { Vector2 } from '../geometry';
import Path from './Path';

/**
 * Utility class for manipulating connected curves providing methods similar to the 2D Canvas API
 *
 * @exports
 * @class PathContext
 * @extends Path
 * @implements CanvasRenderingContext2D
 */
export default class PathContext extends Path<Vector2> implements CanvasRenderingContext2D {
  protected _currentPosition: Vector2 = new Vector2(NaN, NaN);
  protected _currentTransform: DOMMatrix = new DOMMatrix();

  private _transformStack: DOMMatrix[] = [];

  public readonly autoClose: false;

  constructor() {
    super({ autoClose: false });

    this.autoClose = false;
  }

  /**
   * Create a path from a given list of points
   *
   * @param {Point2[]} points Array of points defining the path
   * @return {this}
   */
  public setFromPoints(points: Point2[]): this {
    this.moveTo(...points[0]);
    for (const point of points) {
      this.lineTo(...point);
    }
    return this;
  }

  /**
   * Begin this path
   *
   * @return {this}
   */
  public beginPath(): this {
    this._setCurrentPosition(NaN, NaN);
    return this;
  }

  /**
   * Draw a line from the ending position to the beginning position of this path
   * Add an instance of {@link LineCurve} to this path
   *
   * @return {this}
   */
  public closePath(): this {
    const startPoint = this.curves[0]?.getPoint(0);
    const endPoint = this.curves[this.curves.length - 1]?.getPoint(1);
    if (!startPoint.equals(endPoint)) {
      const curve = new LineCurve(endPoint.x, endPoint.y, startPoint.x, startPoint.y);
      this.add(curve);
    }
    return this;
  }

  /**
   * Move {@link Path#currentPosition} to the coordinates specified by `x` and `y`
   *
   * @param {number} x X-axis coordinate of the point
   * @param {number} y Y-axis coordinate of the point
   * @return {this}
   */
  public moveTo(x: number, y: number): this {
    [x, y] = this._transformPoint([x, y]);
    this._setCurrentPosition(x, y);
    return this;
  }

  /**
   * Draw a line from the current position to the position specified by `x` and `y`
   * Add an instance of {@link LineCurve} to this path
   *
   * @param {number} x X-axis coordinate of the point
   * @param {number} y Y-axis coordinate of the point
   * @return {this}
   */
  public lineTo(x: number, y: number): this {
    [x, y] = this._transformPoint([x, y]);
    if (!this._hasCurrentPosition()) return this._setCurrentPosition(x, y);
    const curve = new LineCurve(this._currentPosition.x, this._currentPosition.y, x, y);
    this.add(curve);
    this._setCurrentPosition(x, y);
    return this;
  }

  /**
   * Draw a Polyline curve from the current position through given points
   * Add an instance of {@link PolylineCurve} to this path
   *
   * @param {Point2[]} points Array of points defining the curve
   * @returns {this}
   */
  public polylineTo(points: Point2[]): this {
    points = this._transformPoints(points);
    if (!this._hasCurrentPosition()) this._setCurrentPosition(...points[0]);
    const curve = new PolylineCurve([this._currentPosition.toArray()].concat(points));
    this.add(curve);
    this._setCurrentPosition(...points[points.length - 1]);
    return this;
  }

  /**
   * Draw a Quadratic Bézier curve from the current position to the end point specified by `x` and `y`, using the control point specified by `cpx` and `cpy`
   * Add an instance of {@link QuadraticBezierCurve} to this path
   *
   * @param {number} cpx X-axis coordinate of the control point
   * @param {number} cpy Y-axis coordinate of the control point
   * @param {number} x2  X-axis coordinate of the end point
   * @param {number} y2  Y-axis coordinate of the end point
   * @return {this}
   */
  public quadraticCurveTo(cpx: number, cpy: number, x2: number, y2: number): this {
    [cpx, cpy] = this._transformPoint([cpx, cpy]);
    [x2, y2] = this._transformPoint([x2, y2]);
    if (!this._hasCurrentPosition()) this._setCurrentPosition(cpx, cpy);
    const curve = new QuadraticBezierCurve(this._currentPosition.x, this._currentPosition.y, cpx, cpy, x2, y2);
    this.add(curve);
    this._setCurrentPosition(x2, y2);
    return this;
  }

  /**
   * Draw a Cubic Bézier curve from the current position to the end point specified by `x` and `y`, using the control point specified by (`cp1x`, `cp1y`) and (`cp2x`, `cp2y`)
   * Add an instance of {@link CubicBezierCurve} to this path
   *
   * @param {number} cp1x X-axis coordinate of the first control point
   * @param {number} cp1y Y-axis coordinate of the first control point
   * @param {number} cp2x X-axis coordinate of the second control point
   * @param {number} cp2y Y-axis coordinate of the second control point
   * @param {number} x2   X-axis coordinate of the end point
   * @param {number} y2   Y-axis coordinate of the end point
   * @return {this}
   */
  public bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): this {
    [cp1x, cp1y] = this._transformPoint([cp1x, cp1y]);
    [cp2x, cp2y] = this._transformPoint([cp2x, cp2y]);
    [x2, y2] = this._transformPoint([x2, y2]);
    if (!this._hasCurrentPosition()) this._setCurrentPosition(cp1x, cp1y);
    const curve = new CubicBezierCurve(
      this._currentPosition.x,
      this._currentPosition.y,
      cp1x,
      cp1y,
      cp2x,
      cp2y,
      x2,
      y2
    );
    this.add(curve);
    this._setCurrentPosition(x2, y2);
    return this;
  }

  /**
   * Draw a Catmull-Rom curve from the current position to the end point specified by `x` and `y`, using the control points specified by (`cp1x`, `cp1y`) and (`cp2x`, `cp2y`)
   * Add an instance of {@link CatmullRomCurve} to this path
   *
   * @param {number} cp1x X-axis coordinate of the first control point
   * @param {number} cp1y Y-axis coordinate of the first control point
   * @param {number} cp2x X-axis coordinate of the second control point
   * @param {number} cp2y Y-axis coordinate of the second control point
   * @param {number} x2   X-axis coordinate of the end point
   * @param {number} y2   Y-axis coordinate of the end point
   * @return {this}
   */
  public catmullRomCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): this {
    [cp1x, cp1y] = this._transformPoint([cp1x, cp1y]);
    [cp2x, cp2y] = this._transformPoint([cp2x, cp2y]);
    [x2, y2] = this._transformPoint([x2, y2]);
    if (!this._hasCurrentPosition()) this._setCurrentPosition(cp1x, cp1y);
    const curve = new CatmullRomCurve(this._currentPosition.x, this._currentPosition.y, cp1x, cp1y, cp2x, cp2y, x2, y2);
    this.add(curve);
    this._setCurrentPosition(x2, y2);
    return this;
  }

  /**
   * Draw a Spline curve from the current position through given points
   * Add an instance of {@link SplineCurve} to this path
   *
   * @param {Point2[]} points Array of points defining the curve
   * @return {this}
   */
  public splineTo(points: Point2[]): this {
    points = this._transformPoints(points);
    if (!this._hasCurrentPosition()) this._setCurrentPosition(...points[0]);
    const curve = new SplineCurve([this._currentPosition.toArray()].concat(points));
    this.add(curve);
    this._setCurrentPosition(...points[points.length - 1]);
    return this;
  }

  /**
   * Draw an Ellispe curve which is centered at (`cx`, `cy`) position
   * Add an instance of {@link EllipseCurve} to this path
   *
   * @param {number} cx X-axis coordinate of the center of the circle
   * @param {number} cy Y-axis coordinate of the center of the circle
   * @param {number} rx X-radius of the ellipse
   * @param {number} ry Y-radius of the ellipse
   * @param {number} rotation Rotation angle of the ellipse (in radians), counterclockwise from the positive X-axis
   * @param {number} startAngle Start angle of the arc (in radians)
   * @param {number} endAngle   End angle of the arc (in radians)
   * @param {boolean} [counterclockwise] Flag indicating the direction of the arc
   * @return {this}
   */
  public ellipse(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    counterclockwise?: boolean
  ): this {
    [cx, cy, rx, ry, rotation] = this._transformEllipse(cx, cy, rx, ry, rotation);
    const start = EllipseCurve.interpolate(0, cx, cy, rx, ry, rotation, startAngle, endAngle, counterclockwise);
    const end = EllipseCurve.interpolate(1, cx, cy, rx, ry, rotation, startAngle, endAngle, counterclockwise);
    if (this._hasCurrentPosition() && !this._currentPosition.equals(start)) {
      const line = new LineCurve(this._currentPosition.x, this._currentPosition.y, ...start);
      this.add(line);
    }
    if (rx <= EPSILON && ry <= EPSILON) return this;
    const curve = new EllipseCurve(cx, cy, rx, ry, rotation, startAngle, endAngle, counterclockwise);
    this.add(curve);
    this._setCurrentPosition(...end);
    return this;
  }

  /**
   * Draw an Arc curve which is centered at (`cx`, `cy`) position
   * Add an instance of {@link ArcCurve} to this path
   *
   * @param {number} cx X-axis coordinate of the center of the circle
   * @param {number} cy Y-axis coordinate of the center of the circle
   * @param {number} radius Radius of the circle
   * @param {number} startAngle Start angle of the arc (in radians)
   * @param {number} endAngle   End angle of the arc (in radians)
   * @param {boolean} [counterclockwise] Flag indicating the direction of the arc
   * @return {this}
   */
  public arc(
    cx: number,
    cy: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterclockwise?: boolean
  ): this {
    if (!this._isUniform || this._isRotated) {
      return this.ellipse(cx, cy, radius, radius, 0, startAngle, endAngle, counterclockwise);
    }
    [cx, cy, radius] = this._transformEllipse(cx, cy, radius, radius, 0);
    const start = EllipseCurve.interpolate(0, cx, cy, radius, radius, 0, startAngle, endAngle, counterclockwise);
    const end = EllipseCurve.interpolate(1, cx, cy, radius, radius, 0, startAngle, endAngle, counterclockwise);
    if (this._hasCurrentPosition() && !this._currentPosition.equals(start)) {
      const line = new LineCurve(this._currentPosition.x, this._currentPosition.y, ...start);
      this.add(line);
    }
    if (radius <= EPSILON) return this;
    const curve = new ArcCurve(cx, cy, radius, startAngle, endAngle, counterclockwise);
    this.add(curve);
    this._setCurrentPosition(...end);
    return this;
  }

  /**
   * Draw an Arc curve from the current position, tangential to the 2 segments created by both control points
   * Add an instance of {@link EllipseCurve} to this path
   *
   * @param {number} x1 X-axis coordinate of the first control point
   * @param {number} y1 Y-axis coordinate of the first control point
   * @param {number} x2 X-axis coordinate of the second control point
   * @param {number} y2 Y-axis coordinate of the second control point
   * @param {number} radius Arc radius (Must be non-negative)
   * @returns {this}
   */
  public arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this {
    if (radius < 0) {
      throw new Error(
        `IndexSizeError: Failed to execute 'arcTo' on 'PathContext': The radius provided (${radius}) is negative.`
      );
    }

    const p0 = new Vector2(...this._currentPosition).applyMatrix(this._currentTransform.inverse());
    const p1 = new Vector2(x1, y1);
    const p2 = new Vector2(x2, y2);

    if (Vector2.equals(p0, p1)) {
      return this;
    }

    if (Vector2.collinear(p0, p1, p2) || radius === 0) {
      return this.lineTo(x1, y1);
    }

    const v1 = p0.clone().sub(p1).normalize();
    const v2 = p2.clone().sub(p1).normalize();

    const n1 = new Vector2(-v1.y, v1.x);
    const n2 = new Vector2(-v2.y, v2.x);

    const angle = Math.acos(v1.dot(v2));
    const tangentLength = radius / Math.tan(angle / 2);

    const t1 = p1.clone().add(v1.clone().multiplyScalar(tangentLength));
    const t2 = p1.clone().add(v2.clone().multiplyScalar(tangentLength));

    const dx = t2.x - t1.x;
    const dy = t2.y - t1.y;
    const determinant = n2.x * n1.y - n2.y * n1.x;

    if (Math.abs(determinant) <= EPSILON) {
      throw new Error(`Failed to execute 'arcTo' on 'PathContext': Failed to compute arc center.`);
    }

    const normalLength = (n2.x * dy - n2.y * dx) / determinant;
    const c = t1.clone().add(n1.clone().multiplyScalar(normalLength));

    const startAngle = Math.atan2(t1.y - c.y, t1.x - c.x);
    const endAngle = Math.atan2(t2.y - c.y, t2.x - c.x);

    const counterclockwise = (p0.y - p1.y) * (p2.x - p0.x) <= (p0.x - p1.x) * (p2.y - p0.y);

    t1.applyMatrix(this._currentTransform);
    t2.applyMatrix(this._currentTransform);
    c.applyMatrix(this._currentTransform);

    const rx = this._scaleX * radius;
    const ry = this._scaleY * radius;
    const rotation = this._rotation;

    const line = new LineCurve(this._currentPosition.x, this._currentPosition.y, t1.x, t1.y);
    this.add(line);

    const ellipse = new EllipseCurve(c.x, c.y, rx, ry, rotation, startAngle, endAngle, counterclockwise);
    this.add(ellipse);

    this._setCurrentPosition(t2.x, t2.y);

    return this;
  }

  /**
   * Draw a rectangular path from the start position specified by `x` and `y` to the end position using `width` and `height`
   * Add an instance of {@link PolylineCurve} to this path
   *
   * @param {number} x X-axis coordinate of the rectangle starting point
   * @param {number} y Y-axis coordinate of the rectangle starting point
   * @param {number} width  Rectangle width (Positive values are to the right and negative to the left)
   * @param {number} height Rectangle height (Positive values are down, and negative are up)
   * @return {this}
   */
  public rect(x: number, y: number, width: number, height: number): this {
    this.moveTo(x, y);
    this.polylineTo([
      [x, y],
      [x + width, y],
      [x + width, y + height],
      [x, y + height],
      [x, y]
    ]);
    return this;
  }

  /**
   * Draw a rounded rectangular path from the start position specified by `x` and `y` to the end position using `width` and `height`
   * Add an instance of {@link Path} to this path
   *
   * @param {number} x X-axis coordinate of the rectangle starting point
   * @param {number} y Y-axis coordinate of the rectangle starting point
   * @param {number} width  Rectangle width (Positive values are to the right and negative to the left)
   * @param {number} height Rectangle height (Positive values are down, and negative are up)
   * @param {number|number[]} radius Radius of the circular arc to be used for the corners of the rectangle
   * @return {this}
   */
  public roundRect(x: number, y: number, width: number, height: number, radius: number | number[]): this {
    this.moveTo(x, y);

    let topLeftRadius = typeof radius === 'number' ? radius : radius[0];
    let topRightRadius = typeof radius === 'number' ? radius : radius[1] ?? radius[0];
    let bottomRightRadius = typeof radius === 'number' ? radius : radius[2] ?? topLeftRadius;
    let bottomLeftRadius = typeof radius === 'number' ? radius : radius[3] ?? topRightRadius;

    const maxRadius = Math.min(width / 2, height / 2);
    topLeftRadius = Math.min(topLeftRadius, maxRadius);
    topRightRadius = Math.min(topRightRadius, maxRadius);
    bottomRightRadius = Math.min(bottomRightRadius, maxRadius);
    bottomLeftRadius = Math.min(bottomLeftRadius, maxRadius);

    const curve = new PathContext();
    curve.setTransform(this.getTransform());

    // Top-Right corner
    if (topRightRadius > 0) {
      curve.lineTo(x + width - topRightRadius, y);
      curve.arcTo(x + width, y, x + width, y + topRightRadius, topRightRadius);
    } else {
      curve.lineTo(x + width, y);
    }
    // Bottom-Right corner
    if (bottomRightRadius > 0) {
      curve.lineTo(x + width, y + height - bottomRightRadius);
      curve.arcTo(x + width, y + height, x + width - bottomRightRadius, y + height, bottomRightRadius);
    } else {
      curve.lineTo(x + width, y + height);
    }
    // Bottom-Left corner
    if (bottomLeftRadius > 0) {
      curve.lineTo(x + bottomLeftRadius, y + height);
      curve.arcTo(x, y + height, x, y + height - bottomLeftRadius, bottomLeftRadius);
    } else {
      curve.lineTo(x, y + height);
    }
    // Top-Left corner
    if (topLeftRadius > 0) {
      curve.lineTo(x, y + topLeftRadius);
      curve.arcTo(x, y, x + topLeftRadius, y, topLeftRadius);
    } else {
      curve.lineTo(x, y);
    }

    curve.closePath();
    this.add(curve);

    this.moveTo(x, y);

    return this;
  }

  public setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
  public setTransform(matrix: DOMMatrix): void;
  public setTransform(a?: number | DOMMatrix, b?: number, c?: number, d?: number, e?: number, f?: number): void {
    if (a instanceof DOMMatrix) {
      const matrix = a;
      this._currentTransform = new DOMMatrix([matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f]);
    } else {
      this._currentTransform = new DOMMatrix([a!, b!, c!, d!, e!, f!]);
    }
  }

  public getTransform(): DOMMatrix {
    const { a, b, c, d, e, f } = this._currentTransform;
    return new DOMMatrix([a, b, c, d, e, f]);
  }

  public resetTransform(): void {
    this.setTransform(1, 0, 0, 1, 0, 0);
  }

  public transform(a: number, b: number, c: number, d: number, e: number, f: number): void {
    const matrix = new DOMMatrix([a, b, c, d, e, f]);
    this._currentTransform = this._currentTransform.multiply(matrix);
  }

  public translate(x: number, y: number): void {
    this._currentTransform = this._currentTransform.translate(x, y);
  }

  public rotate(angle: number): void {
    this._currentTransform = this._currentTransform.rotate(toDegrees(angle));
  }

  public scale(x: number, y: number): void {
    this._currentTransform = this._currentTransform.scale(x, y);
  }

  public save(): void {
    this._transformStack.push(this.getTransform());
  }

  public restore(): void {
    if (this._transformStack.length > 0) {
      this._currentTransform = this._transformStack.pop()!;
    }
  }

  public reset(): void {
    this.resetTransform();
    this._transformStack = [];
  }

  protected _hasCurrentPosition(): boolean {
    return !isNaN(this._currentPosition.x) && !isNaN(this._currentPosition.y);
  }

  protected _setCurrentPosition(x: number, y: number): this {
    this._currentPosition.set(x, y);
    return this;
  }

  // ****************************
  // Matrix transformations
  // ****************************
  protected _transformPoint(point: Point2): Point2 {
    if (this._isIdentity) return point;
    const { x, y } = this._currentTransform.transformPoint({ x: point[0], y: point[1] });
    return [x, y];
  }

  protected _transformPoints(points: Point2[]): Point2[] {
    if (this._isIdentity) return points;
    return points.map((point) => this._transformPoint(point));
  }

  protected _transformVector(vector: Point2): Point2 {
    if (this._isIdentity) return vector;
    const [x0, y0] = this._transformPoint([0, 0]);
    const [vx, vy] = this._transformPoint(vector);
    return [vx - x0, vy - y0];
  }

  protected _transformEllipse(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    rotation: number
  ): [number, number, number, number, number] {
    if (this._isIdentity) return [cx, cy, rx, ry, rotation];
    [cx, cy] = this._transformPoint([cx, cy]);
    const [u1x, u1y] = this._transformVector([Math.cos(rotation) * rx, Math.sin(rotation) * rx]);
    const [u2x, u2y] = this._transformVector([-Math.sin(rotation) * ry, Math.cos(rotation) * ry]);
    rx = Math.hypot(u1x, u1y);
    ry = Math.hypot(u2x, u2y);
    rotation = Math.atan2(u1y, u1x);
    return [cx, cy, rx, ry, rotation];
  }

  protected get _translateX() {
    return this._currentTransform.e;
  }

  protected get _translateY() {
    return this._currentTransform.f;
  }

  protected get _scaleX(): number {
    const { a, b } = this._currentTransform;
    return Math.hypot(a, b);
  }

  protected get _scaleY(): number {
    const { c, d } = this._currentTransform;
    return Math.hypot(c, d);
  }

  protected get _rotation(): number {
    const { a, b } = this._currentTransform;
    return Math.atan2(b, a);
  }

  protected get _isTranslated(): boolean {
    return Math.abs(this._translateX) > EPSILON || Math.abs(this._translateY) > EPSILON;
  }

  protected get _isScaled(): boolean {
    return Math.abs(this._scaleX - 1) > EPSILON || Math.abs(this._scaleY - 1) > EPSILON;
  }

  protected get _isRotated(): boolean {
    const { b, c } = this._currentTransform;
    return Math.abs(b) > EPSILON || Math.abs(c) > EPSILON;
  }

  protected get _isUniform(): boolean {
    return Math.abs(this._scaleX - this._scaleY) <= EPSILON;
  }

  protected get _isIdentity(): boolean {
    return this._currentTransform.isIdentity;
  }

  // ****************************
  // Canvas 2D interface
  // ****************************
  public canvas!: CanvasRenderingContext2D['canvas'];

  public fillStyle!: CanvasRenderingContext2D['fillStyle'];
  public strokeStyle!: CanvasRenderingContext2D['strokeStyle'];
  public lineWidth!: CanvasRenderingContext2D['lineWidth'];
  public lineCap!: CanvasRenderingContext2D['lineCap'];
  public lineJoin!: CanvasRenderingContext2D['lineJoin'];
  public lineDashOffset!: CanvasRenderingContext2D['lineDashOffset'];
  public setLineDash!: CanvasRenderingContext2D['setLineDash'];
  public getLineDash!: CanvasRenderingContext2D['getLineDash'];
  public fillText!: CanvasRenderingContext2D['fillText'];
  public strokeText!: CanvasRenderingContext2D['strokeText'];
  
  public fill!: CanvasRenderingContext2D['fill'];
  public stroke!: CanvasRenderingContext2D['stroke'];
  public clearRect!: CanvasRenderingContext2D['clearRect'];
  public fillRect!: CanvasRenderingContext2D['fillRect'];
  public strokeRect!: CanvasRenderingContext2D['strokeRect'];
  public drawImage!: CanvasRenderingContext2D['drawImage'];
  public clip!: CanvasRenderingContext2D['clip'];
  public filter!: CanvasRenderingContext2D['filter'];
  public miterLimit!: CanvasRenderingContext2D['miterLimit'];
  public globalAlpha!: CanvasRenderingContext2D['globalAlpha'];
  public globalCompositeOperation!: CanvasRenderingContext2D['globalCompositeOperation'];

  public createLinearGradient!: CanvasRenderingContext2D['createLinearGradient'];
  public createRadialGradient!: CanvasRenderingContext2D['createRadialGradient'];
  public createConicGradient!: CanvasRenderingContext2D['createConicGradient'];
  public createPattern!: CanvasRenderingContext2D['createPattern'];
  public createImageData!: CanvasRenderingContext2D['createImageData'];
  public getImageData!: CanvasRenderingContext2D['getImageData'];
  public putImageData!: CanvasRenderingContext2D['putImageData'];
  public imageSmoothingEnabled!: CanvasRenderingContext2D['imageSmoothingEnabled'];
  public imageSmoothingQuality!: CanvasRenderingContext2D['imageSmoothingQuality'];

  public font!: CanvasRenderingContext2D['font'];
  public fontKerning!: CanvasRenderingContext2D['fontKerning'];
  public fontStretch!: CanvasRenderingContext2D['fontStretch'];
  public fontVariantCaps!: CanvasRenderingContext2D['fontVariantCaps'];
  public letterSpacing!: CanvasRenderingContext2D['letterSpacing'];
  public textAlign!: CanvasRenderingContext2D['textAlign'];
  public textBaseline!: CanvasRenderingContext2D['textBaseline'];
  public textRendering!: CanvasRenderingContext2D['textRendering'];
  public wordSpacing!: CanvasRenderingContext2D['wordSpacing'];
  public direction!: CanvasRenderingContext2D['direction'];
  public measureText!: CanvasRenderingContext2D['measureText'];

  public shadowColor!: CanvasRenderingContext2D['shadowColor'];
  public shadowBlur!: CanvasRenderingContext2D['shadowBlur'];
  public shadowOffsetX!: CanvasRenderingContext2D['shadowOffsetX'];
  public shadowOffsetY!: CanvasRenderingContext2D['shadowOffsetY'];

  public drawFocusIfNeeded!: CanvasRenderingContext2D['drawFocusIfNeeded'];

  public isPointInPath!: CanvasRenderingContext2D['isPointInPath'];
  public isPointInStroke!: CanvasRenderingContext2D['isPointInStroke'];

  public getContextAttributes(): CanvasRenderingContext2DSettings {
    return {
      alpha: false
    };
  }

  public isContextLost(): boolean {
    return false;
  }
}
