## Paths

### Path <a id="path"></a>

Utility class extending [Curve](./CURVES.md#curve) for manipulating connected curves.

- [new Path(params)](#path)
  - .isPath: `true`
  - [.subpaths](#path-subpaths): `Curve[]`
  - [.points](#path-points): `Vector[]`
  - [.autoClose](#path-auto-close): `boolean`
  - [.add()](#path-add-method): `void`
  - [.getCurveLengths()](#path-get-curve-lengths-method): `number[]`

| Parameter          | Type      | Default | Description                                                             |
| ------------------ | --------- | ------- | ----------------------------------------------------------------------- |
| [params.autoClose] | `boolean` | `false` | Define if a last point should be automatically added to close the path. |

#### Properties

##### subpaths <a id="path-subpaths"></a>

Array of curves composing the path.

```ts
Path.subpaths: Curve[];
```

##### points <a id="path-points"></a>

Array of points composing the path.

```ts
Path.points: Vector[];
```

##### autoClose <a id="path-auto-close"></a>

```ts
Path.autoClose: boolean;
```

#### Methods

##### add <a id="path-add-method"></a>

Add a curve to the path.

- `curve`: Curve to add.

```ts
Path.add(curve: Curve): void;
```

##### getCurveLengths <a id="path-get-curve-lengths-method"></a>

Compute the cumulative curve lengths of the path.

```ts
Path.getCurveLengths(): number[];
```

### PathContext <a id="path-context"></a>

Utility class extending [Path](#path) providing methods similar to the 2D Canvas API.

- [new PathContext()](#path-context)
  - [.currentPosition](#path-context-current-position): `[number, number]`
  - [.setFromPoints(points)](#path-context-set-from-points-method): `this`
  - [.beginPath()](#path-context-begin-path-method): `this`
  - [.closePath()](#path-context-close-path-method): `this`
  - [.moveTo(x, y)](#path-context-move-to-method): `this`
  - [.lineTo(x, y)](#path-context-line-to-method): `this`
  - [.polylineTo(points)](#path-context-polyline-to-method): `this`
  - [.quadraticCurveTo(cpx, cpy, x2, y2)](#path-context-quadratic-curve-to-method): `this`
  - [.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2)](#path-context-bezier-curve-to-method): `this`
  - [.catmullRomCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2)](#path-context-catmull-rom-to-method): `this`
  - [.splineTo(points)](#path-context-spline-to-method): `this`
  - [.ellipse(cx, cy, rx, ry, rotation, startAngle, endAngle, counterclockwise)](#path-context-ellipse-method): `this`
  - [.arc(cx, cy, radius, startAngle, endAngle, counterclockwise)](#path-context-arc-method): `this`
  - [.arcTo(x1, y1, x2, y2, radius)](#path-context-arc-to-method): `this`
  - [.rect(x, y, width, height)](#path-context-rect-method): `this`
  - [.roundRect(x, y, width, height, radius)](#path-context-round-rect-method): `this`

#### Properties

##### currentPosition <a id="path-context-current-position"></a>

Path current position.

```ts
PathContext.currentPosition: [number, number];
```

#### Methods

##### setFromPoints(points) <a id="path-context-set-from-points-method"></a>

Create a path from a given list of points.

- `points`: Array of points defining the path.

```ts
PathContext.setFromPoints(points: Array<[number, number]>): this;
```

##### beginPath() <a id="path-context-begin-path-method"></a>

Begin the path.

```ts
PathContext.beginPath(): this;
```

##### closePath <a id="path-context-close-path-method"></a>

Draw a line from the ending position to the beginning position of the path.
Add an instance of [LineCurve](#line-curve) to the path.

```ts
PathContext.closePath(): this;
```

##### moveTo(x, y) <a id="path-context-move-to-method"></a>

Move `currentPosition` to the coordinates specified by `x` and `y`.

- `x`: X-axis coordinate of the point.
- `y`: Y-axis coordinate of the point.

```ts
PathContext.moveTo(x: number, y: number): this;
```

##### lineTo(x, y) <a id="path-context-line-to-method"></a>

Draw a line from the current position to the position specified by `x` and `y`.
Add an instance of [LineCurve](#line-curve) to the path.

- `x`: X-axis coordinate of the point.
- `y`: Y-axis coordinate of the point.

```ts
PathContext.lineTo(x: number, y: number): this;
```

##### polylineTo(points) <a id="path-context-polyline-to-method"></a>

Draw a Polyline curve from the current position through given points.
Add an instance of [PolylineCurve](#polyline-curve) to the path.

- `points`: Array of points defining the curve.

```ts
PathContext.polylineTo(points: Array<[number, number]>): this;
```

##### quadraticCurveTo(cpx, cpy, x2, y2) <a id="path-context-quadratic-curve-to-method"></a>

Draw a Quadratic Bézier curve from the current position to the end point specified by `x` and `y`, using the control point specified by `cpx` and `cpy`.
Add an instance of [QuadraticBezierCurve](#quadratic-bezier-curve) to the path.

- `cpx`: X-axis coordinate of the control point.
- `cpy`: Y-axis coordinate of the control point.
- `x2`: X-axis coordinate of the end point.
- `y2`: Y-axis coordinate of the end point.

```ts
PathContext.quadraticCurveTo(cpx: number, cpy: number, x2: number, y2: number): this;
```

##### bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2) <a id="path-context-bezier-curve-to-method"></a>

Draw a Cubic Bézier curve from the current position to the end point specified by `x` and `y`, using the control point specified by (`cp1x`, `cp1y`) and (`cp2x`, `cp2y`).
Add an instance of [CubicBezierCurve](#cubic-bezier-curve) to the path.

- `cp1x`: X-axis coordinate of the first control point.
- `cp1y`: Y-axis coordinate of the first control point.
- `cp2x`: X-axis coordinate of the second control point.
- `cp2y`: Y-axis coordinate of the second control point.
- `x2`: X-axis coordinate of the end point.
- `y2`: Y-axis coordinate of the end point.

```ts
PathContext.bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): this;
```

##### catmullRomCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2) <a id="path-context-catmull-rom-curve-to-method"></a>

Draw a Catmull-Rom curve from the current position to the end point specified by `x` and `y`, using the control points specified by (`cp1x`, `cp1y`) and (`cp2x`, `cp2y`).
Add an instance of [CatmullRomCurve](#catmull-rom-curve) to the path.

- `cp1x`: X-axis coordinate of the first control point.
- `cp1y`: Y-axis coordinate of the first control point.
- `cp2x`: X-axis coordinate of the second control point.
- `cp2y`: Y-axis coordinate of the second control point.
- `x2`: X-axis coordinate of the end point.
- `y2`: Y-axis coordinate of the end point.

```ts
PathContext.catmullRomCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x2: number, y2: number): this;
```

##### splineTo(points) <a id="path-context-spline-to-method"></a>

Draw a Spline curve from the current position through given points.
Add an instance of [SplineCurve](#spline-curve) to the path.

- `points`: Array of points defining the curve.

```ts
PathContext.splineTo(points: Array<[number, number]>): this;
```

##### ellipse(cx, cy, rx, ry, rotation, startAngle, endAngle, counterclockwise) <a id="path-context-ellipse-method"></a>

Draw an Ellispe curve which is centered at (`cx`, `cy`) position.
Add an instance of [EllipseCurve](#ellipse-curve) to the path.

- `cx`: X-axis coordinate of the center of the ellipse.
- `cy`: Y-axis coordinate of the center of the ellipse.
- `rx`: X-radius of the ellipse.
- `ry`: Y-radius of the ellipse.
- `[rotation]`: Rotation angle of the ellipse (in radians), counterclockwise from the positive X-axis.
- `[startAngle]`: Start angle of the arc (in radians).
- `[endAngle]`: End angle of the arc (in radians).
- `[counterclockwise]`: Flag indicating the direction of the arc.

```ts
PathContext.ellipse(cx: number, cy: number, rx: number, ry: number, rotation?: number, startAngle?: number, endAngle?: number, counterclockwise?: boolean): this;
```

##### arc(cx, cy, radius, startAngle, endAngle, counterclockwise) <a id="path-context-arc-method"></a>

Draw an Arc curve which is centered at (`cx`, `cy`) position.
Add an instance of [ArcCurve](#arc-curve) to the path.

- `cx`: X-axis coordinate of the center of the circle.
- `cy`: Y-axis coordinate of the center of the circle.
- `radius`: Radius of the circle.
- `[startAngle]`: Start angle of the arc (in radians).
- `[endAngle]`: End angle of the arc (in radians).
- `[counterclockwise]`: Flag indicating the direction of the arc.

```ts
PathContext.arc(cx: number, cy: number, radius: number, startAngle?: number, endAngle?: number, counterclockwise?: boolean): this;
```

##### arcTo(x1, y1, x2, y2, radius) <a id="path-context-arc-to-method"></a>

Draw an Arc curve from the current position, tangential to the 2 segments created by both control points
Add an instance of [ArcCurve](#arc-curve) to the path.

- `x1`: X-axis coordinate of the first control point.
- `y1`: Y-axis coordinate of the first control point.
- `x2`: X-axis coordinate of the second control point.
- `y2`: Y-axis coordinate of the second control point.
- `radius`: Arc radius (Must be non-negative).

```ts
PathContext.arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this;
```

##### rect(x, y, width, height) <a id="path-context-rect-method"></a>

Draw a rectangular path from the start position specified by `x` and `y` to the end position using `width` and `height`.
Add an instance of [PolylineCurve](#polyline-curve) to the path.

- `x`: X-axis coordinate of the rectangle starting point.
- `y`: Y-axis coordinate of the rectangle starting point.
- `width`: Rectangle width (Positive values are to the right and negative to the left).
- `height`: Rectangle height (Positive values are down, and negative are up).

```ts
PathContext.rect(x: number, y: number, width: number, height: number): this;
```

##### roundRect(x, y, width, height, radius) <a id="path-context-round-rect-method"></a>

Draw a rounded rectangular path from the start position specified by `x` and `y` to the end position using `width` and `height`.
Add an instance of [Path](#path) to the path.

- `x`: X-axis coordinate of the rectangle starting point.
- `y`: Y-axis coordinate of the rectangle starting point.
- `width`: Rectangle width (Positive values are to the right and negative to the left).
- `height`: Rectangle height (Positive values are down, and negative are up).
- `radius`: Radius of the circular arc to be used for the corners of the rectangle.

```ts
PathContext.roundRect(x: number, y: number, width: number, height: number, radius: number | number[]): this;
```

### PathSVG <a id="path-svg"></a>

Utility class extending [PathContext](#path-context) for manipulating connected curves and generating SVG path.
It works by serializing 2D Canvas API to SVG path data.

- [new PathSVG()](#path-svg-constructor)
  - [.toString(params)](#path-svg-to-string-method): `string`
  - `static` [.approximate(curve, params)](#path-svg-static-serialize-method): `string`
  - `static` [.serialize(curve, params)](#path-svg-static-serialize-method): `string`
  - `static` [.serializeLineCurve(curve)](#path-svg-static-serialize-line-curve-method): `string`
  - `static` [.serializePolylineCurve(curve)](#path-svg-static-serialize-polyline-curve-method): `string`
  - `static` [.serializeQuadraticBezierCurve(curve)](#path-svg-static-serialize-quadratic-bezier-curve-method): `string`
  - `static` [.serializeCubicBezierCurve(curve)](#path-svg-static-serialize-cubic-bezier-curve-method): `string`
  - `static` [.serializeCatmullRomCurve(curve, params)](#path-svg-static-serialize-catmull-rom-curve-method): `string`
  - `static` [.serializeSplineCurve(curve, params)](#path-svg-static-serialize-spline-curve-method): `string`
  - `static` [.serializeEllipseCurve(curve)](#path-svg-static-serialize-ellipse-curve-method): `string`
  - `static` [.serializeArcCurve(curve)](#path-svg-static-serialize-arc-curve-method): `string`

#### Methods

##### toString(params) <a id="path-svg-to-string-method"></a>

Serialize the path into a SVG path string.

- `[params]`: Serialization parameters.

```ts
PathSVG.toString(params?: PathSVGSerializationParams): string;
```

##### `static` approximate(curve) <a id="path-svg-static-approximate-method"></a>

Convert a [Curve](#curve) into straight segments.

- `curve`: Curve to approximate.
- `[resolution=5]`: Approximation resolution.

```ts
static PathSVG.approximate(curve: Curve, resolution?: number): Vector2[];
```

##### `static` serialize(curve) <a id="path-svg-static-serialize-method"></a>

Serialize a [Curve](#curve).

- `curve`: Curve to serialize.
- `[params]`: Serialization parameters.
- `[params.approximate]`: Flag indicating if given curve should be approximated into straight lines.
- `[params.curveResolution]`: Resolution used for curve approximations.

```ts
static PathSVG.serialize(curve: Curve, params?: PathSVGSerializationParams): string;
```

##### `static` serializeLineCurve(curve) <a id="path-svg-static-serialize-line-curve-method"></a>

Serialize a [LineCurve](#line-curve).

- `curve`: Curve to serialize.

```ts
static PathSVG.serializeLineCurve(curve: LineCurve): string;
```

##### `static` serializePolylineCurve(curve) <a id="path-svg-static-serialize-polyline-curve-method"></a>

Serialize a [PolylineCurve](#polyline-curve).

- `curve`: PolylineCurve to serialize.

```ts
static PathSVG.serializePolylineCurve(curve: PolylineCurve): string;
```

##### `static` serializeQuadraticBezierCurve(curve) <a id="path-svg-static-serialize-quadratic-bezier-curve-method"></a>

Serialize a [QuadraticBezierCurve](#quadratic-bezier-curve).

- `curve`: QuadraticBezierCurve to serialize.

```ts
static PathSVG.serializeQuadraticBezierCurve(curve: QuadraticBezierCurve): string;
```

##### `static` serializeCubicBezierCurve(curve) <a id="path-svg-static-serialize-cubic-bezier-curve-method"></a>

Serialize a [CubicBezierCurve](#cubic-bezier-curve).

- `curve`: CubicBezierCurve to serialize.

```ts
static PathSVG.serializeCubicBezierCurve(curve: CubicBezierCurve): string;
```

##### `static` serializeCatmullRomCurve(curve) <a id="path-svg-static-serialize-catmull-rom-curve-method"></a>

Serialize a [CatmullRomCurve](#catmull-rom-curve) by approximating it into straight lines.

- `curve`: CatmullRomCurve to serialize.
- `[curveResolution]`: Approximation resolution.

```ts
static PathSVG.serializeCatmullRomCurve(curve: CatmullRomCurve, curveResolution?: number): string;
```

##### `static` serializeSplineCurve(curve) <a id="path-svg-static-serialize-spline-curve-method"></a>

Serialize a [SplineCurve](#spline-curve) by approximating it into straight lines.

- `curve`: SplineCurve to serialize.
- `[curveResolution]`: Approximation resolution.

```ts
static PathSVG.serializeSplineCurve(curve: SplineCurve, curveResolution?: number): string;
```

##### `static` serializeEllipseCurve(curve) <a id="path-svg-static-serialize-ellipse-curve-method"></a>

Serialize a [EllipseCurve](#ellipse-curve).

- `curve`: EllipseCurve to serialize.

```ts
static PathSVG.serializeEllipseCurve(curve: EllipseCurve): string;
```

##### `static` serializeArcCurve(curve) <a id="path-svg-static-serialize-arc-curve-method"></a>

Serialize a [ArcCurve](#arc-curve).

- `curve`: ArcCurve to serialize.

```ts
static PathSVG.serializeArcCurve(curve: ArcCurve): string;
```

##### `static` serializePath(path, params) <a id="path-svg-static-serialize-path-method"></a>

Serialize a [Path](#path).

- `path`: Path to serialize.
- `[params]`: Serialization parameters.

```ts
static PathSVG.serializePath(path: Path, params?: PathSVGSerializationParams): string;
```
