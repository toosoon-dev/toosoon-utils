## Curves

### Curve <a id="curve"></a>

Utility abstract class for manipulating curves.

- new Curve()
  - .isCurve: `true`
  - [.arcLengthDivisions](#curve-arc-length-divisions): `number`
  - [.needsUpdate](#curve-needs-update): `boolean`
  - [.getPoint(t)](#curve-get-point-method): `Vector`
  - [.getPointAt(u)](#curve-get-point-at-method): `Vector`
  - [.getPoints(divisions)](#curve-get-points-method): `Vector[]`
  - [.getSpacedPoints(divisions)](#curve-get-spaced-points-method): `Vector[]`
  - [.getLengths()](#curve-get-length-method): `number`
  - [.getLengths()](#curve-get-lengths-method): `number[]`
  - [.updateArcLengths()](#curve-update-arc-lengths-method): `void`
  - [.getUtoTmapping(t, targetArcLength)](#curve-get-u-to-t-mapping-method): `number`
  - [.getTangent(t)](#curve-get-tangent-method): `Vector`
  - [.getTangentAt(u)](#curve-get-tangent-at-method): `Vector`
  - [.isClosed()](#curve-is-closed-method): `boolean`

#### Properties

##### arcLengthDivisions <a id="curve-arc-length-divisions"></a>

Amount of divisions when calculating the cumulative segment lengths of a curve.

```ts
Curve.arcLengthDivisions: number;
```

##### needsUpdate <a id="curve-needs-update"></a>

Must be set to `true` if the curve parameters have changed.

```ts
Curve.needsUpdate: boolean;
```

#### Methods

##### getPoint(t) <a id="curve-get-point-method"></a>

Interpolate a point on the curve.

- `u`: Normalized time value to interpolate.

```ts
Curve.getPoint(t: number): Vector;
```

##### getPointAt(u) <a id="curve-get-point-at-method"></a>

Interpolate a point on the curve.

- `u`: Normalized position value to interpolate.

```ts
Curve.getPointAt(u: number): Vector;
```

##### getPoints(divisions) <a id="curve-get-points-method"></a>

Compute the curve shape into an array of points.

- `[divisions=5]`: Number of divisions.

```ts
Curve.getPoints(divisions?: number): Vector[];
```

##### getSpacedPoints(divisions) <a id="curve-get-spaced-points-method"></a>

Compute the curve shape into an array of equi-spaced points across the entire curve.

- `[divisions=5]`: Number of divisions.

```ts
Curve.getSpacedPoints(divisions?: number): Vector[];
```

##### getLength() <a id="curve-get-lengt-methodh"></a>

Compute the total arc length of the curve.

```ts
Curve.getLength(): number;
```

##### getLengths() <a id="curve-get-lengths-method"></a>

Compute the cumulative segment lengths of the curve.

- `[divisions]`: Number of divisions.

```ts
Curve.getLengths(divisions?: number): number[];
```

##### updateArcLengths() <a id="curve-get-point-method"></a>

Update the cached cumulative segment lengths.

```ts
Curve.updateArcLengths(): void;
```

##### getUtoTmapping(t, targetArcLength) <a id="curve-get-u-to-t)mapping-method"></a>

Re-map a normalized position value into normalized time.

- `u`: Normalized position value to interpolate.
- `[targetArcLength]`: Distance on the curve.

```ts
Curve.getUtoTmapping(u: number, targetArcLength?: number): number;
```

##### getTangent(t) <a id="curve-get-tangent-method"></a>

Compute an unit vector tangent for a given normalized time value.

- `t`: Normalized time value.

```ts
Curve.getTangent(t: number): Vector;
```

##### getTangentAt(u) <a id="curve-get-tangent-at-method"></a>

Compute an unit vector tangent for a given normalized position value.

- `u`: Normalized position value.

```ts
Curve.getTangentAt(u: number): Vector;
```

##### isClosed() <a id="curve-is-closed-method"></a>

Check if the curve is closed.

```ts
Curve.isClosed(): boolean;
```

### LineCurve <a id="line-curve"></a>

Utility class extending [Curve](#curve) for manipulating lines.

- new LineCurve(x1, y1, x2, y2)
  - `static` [.interpolate(t, x1, y1, x2, y2)](#line-curve-static-interpolate-method)

| Parameter | Type     | Default | Description                           |
| --------- | -------- | ------- | ------------------------------------- |
| x1        | `number` |         | X-axis coordinate of the start point. |
| y1        | `number` |         | Y-axis coordinate of the start point. |
| x2        | `number` |         | X-axis coordinate of the end point.   |
| y2        | `number` |         | Y-axis coordinate of the end point.   |

##### `static` interpolate(t, x1, y1, x2, y2) <a id="line-curve-static-interpolate-method"></a>

Interpolate a point on a line.

```ts
static LineCurve.interpolate(
	t: number,
	x1: number, y1: number,
	x2: number, y2: number
): [number, number];
```

### LineCurve3 <a id="line-curve-3"></a>

Utility class extending [Curve](#curve) for manipulating 3D lines.

- new LineCurve3(x1, y1, z1, x2, y2, z2)
  - `static` [.interpolate(t, x1, y1, z1, x2, y2, z2)](#line-curve-3-static-interpolate-method)

| Parameter | Type     | Default | Description                           |
| --------- | -------- | ------- | ------------------------------------- |
| x1        | `number` |         | X-axis coordinate of the start point. |
| y1        | `number` |         | Y-axis coordinate of the start point. |
| z1        | `number` |         | Z-axis coordinate of the start point. |
| x2        | `number` |         | X-axis coordinate of the end point.   |
| y2        | `number` |         | Y-axis coordinate of the end point.   |
| z2        | `number` |         | Z-axis coordinate of the end point.   |

##### `static` interpolate(t, x1, y1, z1, x2, y2, z2) <a id="line-curve-3-static-interpolate-method"></a>

Interpolate a point on a 3D line.

```ts
static LineCurve3.interpolate(
	t: number,
	x1: number, y1: number, z1: number,
	x2: number, y2: number, z2: number
): [number, number, number];
```

### PolylineCurve <a id="polyline-curve"></a>

Utility class extending [Curve](#curve) for manipulating polylines.

- new PolylineCurve(points)

| Parameter | Type                      | Default | Description                         |
| --------- | ------------------------- | ------- | ----------------------------------- |
| [points]  | `Array<[number, number]>` | `[]`    | Array of points defining the curve. |

### PolylineCurve3 <a id="polyline-curve-3"></a>

Utility class extending [Curve](#curve) for manipulating 3D polylines.

- new PolylineCurve3(points)

| Parameter | Type                              | Default | Description                         |
| --------- | --------------------------------- | ------- | ----------------------------------- |
| [points]  | `Array<[number, number, number]>` | `[]`    | Array of points defining the curve. |

### QuadraticBezierCurve <a id="quadratic-bezier-curve"></a>

Utility class extending [Curve](#curve) for manipulating Quadratic Bézier curves.

- new QuadraticBezierCurve(x1, y1, cpx, cpy, x2, y2)
  - `static` [.interpolate(t, x1, y1, cpx, cpy, x2, y2)](#quadratic-bezier-curve-static-interpolate-method)

| Parameter | Type     | Default | Description                             |
| --------- | -------- | ------- | --------------------------------------- |
| x1        | `number` |         | X-axis coordinate of the start point.   |
| y1        | `number` |         | Y-axis coordinate of the start point.   |
| cpx       | `number` |         | X-axis coordinate of the control point. |
| cpy       | `number` |         | Y-axis coordinate of the control point. |
| x2        | `number` |         | X-axis coordinate of the end point.     |
| y2        | `number` |         | Y-axis coordinate of the end point.     |

##### `static` interpolate(t, x1, y1, cpx, cpy, x2, y2) <a id="quadratic-bezier-curve-static-interpolate-method"></a>

Interpolate a point on a 2D Quadratic Bézier curve.

```ts
static QuadraticBezierCurve.interpolate(
	t: number,
	x1: number, y1: number,
	cpx: number, cpy: number,
	x2: number, y2: number
): [number, number];
```

### QuadraticBezierCurve3 <a id="quadratic-bezier-curve-3"></a>

Utility class extending [Curve](#curve) for manipulating Quadratic Bézier 3D curves.

- new QuadraticBezierCurve3(x1, y1, z1, cpx, cpy, cpz, x2, y2, z2)
  - `static` [.interpolate(t, x1, y1, z1, cpx, cpy, cpz, x2, y2, z2)](#quadratic-bezier-curve-3-static-interpolate-method)

| Parameter | Type     | Default | Description                             |
| --------- | -------- | ------- | --------------------------------------- |
| x1        | `number` |         | X-axis coordinate of the start point.   |
| y1        | `number` |         | Y-axis coordinate of the start point.   |
| z1        | `number` |         | Z-axis coordinate of the start point.   |
| cpx       | `number` |         | X-axis coordinate of the control point. |
| cpy       | `number` |         | Y-axis coordinate of the control point. |
| cpz       | `number` |         | Z-axis coordinate of the control point. |
| x2        | `number` |         | X-axis coordinate of the end point.     |
| y2        | `number` |         | Y-axis coordinate of the end point.     |
| z2        | `number` |         | Z-axis coordinate of the end point.     |

##### `static` interpolate(t, x1, y1, z1, cpx, cpy, cpz, x2, y2, z2) <a id="quadratic-bezier-curve-3-static-interpolate-method"></a>

Interpolate a point on a 3D Quadratic Bézier curve.

```ts
static QuadraticBezierCurve3.interpolate(
	t: number,
	x1: number, y1: number, z1: number,
	cpx: number, cpy: number, cpz: number,
	x2: number, y2: number, z2: number
): [number, number, number];
```

### CubicBezierCurve <a id="cubic-bezier-curve"></a>

Utility class extending [Curve](#curve) for manipulating Cubic Bézier curves.

- new CubicBezierCurve(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2)
  - `static` [.interpolate(t, x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2)](#cubic-bezier-curve-static-interpolate-method)

| Parameter | Type     | Default | Description                                    |
| --------- | -------- | ------- | ---------------------------------------------- |
| x1        | `number` |         | X-axis coordinate of the start point.          |
| y1        | `number` |         | Y-axis coordinate of the start point.          |
| cp1x      | `number` |         | X-axis coordinate of the first control point.  |
| cp1y      | `number` |         | Y-axis coordinate of the first control point.  |
| cp2x      | `number` |         | X-axis coordinate of the second control point. |
| cp2y      | `number` |         | Y-axis coordinate of the second control point. |
| x2        | `number` |         | X-axis coordinate of the end point.            |
| y2        | `number` |         | Y-axis coordinate of the end point.            |

##### `static` interpolate(t, x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2) <a id="cubic-bezier-curve-static-interpolate-method"></a>

Interpolate a point on a 2D Cubic Bézier curve.

```ts
static CubicBezierCurve.interpolate(
  t: number,
  x1: number, y1: number,
  cp1x: number, cp1y: number,
  cp2x: number, cp2y: number,
  x2: number, y2: number
): [number, number];
```

### CubicBezierCurve3 <a id="cubic-bezier-curve-3"></a>

Utility class extending [Curve](#curve) for manipulating Cubic Bézier 3D curves.

- new CubicBezierCurve3(x1, y1, z1, cp1x, cp1y, cp1z, cp2x, cp2y, cp2z, x2, y2, z2)
  - `static` [.interpolate(t, x1, y1, z1, cp1x, cp1y, cp1z, cp2x, cp2y, cp2z, x2, y2, z2)](#cubic-bezier-curve-3-static-interpolate-method)

| Parameter | Type     | Default | Description                                    |
| --------- | -------- | ------- | ---------------------------------------------- |
| x1        | `number` |         | X-axis coordinate of the start point.          |
| y1        | `number` |         | Y-axis coordinate of the start point.          |
| z1        | `number` |         | Z-axis coordinate of the start point.          |
| cp1x      | `number` |         | X-axis coordinate of the first control point.  |
| cp1y      | `number` |         | Y-axis coordinate of the first control point.  |
| cp1z      | `number` |         | Z-axis coordinate of the first control point.  |
| cp2x      | `number` |         | X-axis coordinate of the second control point. |
| cp2y      | `number` |         | Y-axis coordinate of the second control point. |
| cp2z      | `number` |         | Z-axis coordinate of the second control point. |
| x2        | `number` |         | X-axis coordinate of the end point.            |
| y2        | `number` |         | Y-axis coordinate of the end point.            |
| z2        | `number` |         | Z-axis coordinate of the end point.            |

##### `static` interpolate(t, x1, y1, z1, cp1x, cp1y, cp1z, cp2x, cp2y, cp2z, x2, y2, z2) <a id="cubic-bezier-curve-3-static-interpolate-method"></a>

Interpolate a point on a 3D Cubic Bézier curve.

```ts
static CubicBezierCurve3.interpolate(
  t: number,
  x1: number, y1: number, z1: number,
  cp1x: number, cp1y: number, cp1z: number,
  cp2x: number, cp2y: number, cp2z: number,
  x2: number, y2: number, z2: number
): [number, number, number];
```

### CatmullRomCurve <a id="catmull-rom-curve"></a>

Utility class extending [Curve](#curve) for manipulating Catmull-Rom curves.

- new CatmullRomCurve(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2)
  - `static` [.interpolate(t, x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2)](#catmull-rom-curve-static-interpolate-method)

| Parameter | Type     | Default | Description                                    |
| --------- | -------- | ------- | ---------------------------------------------- |
| x1        | `number` |         | X-axis coordinate of the start point.          |
| y1        | `number` |         | Y-axis coordinate of the start point.          |
| cp1x      | `number` |         | X-axis coordinate of the first control point.  |
| cp1y      | `number` |         | Y-axis coordinate of the first control point.  |
| cp2x      | `number` |         | X-axis coordinate of the second control point. |
| cp2y      | `number` |         | Y-axis coordinate of the second control point. |
| x2        | `number` |         | X-axis coordinate of the end point.            |
| y2        | `number` |         | Y-axis coordinate of the end point.            |

##### `static` interpolate(t, x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2) <a id="catmull-rom-curve-static-interpolate-method"></a>

Interpolate a point on a 2D Catmull-Rom spline.

```ts
static CatmullRomCurve.interpolate(
  t: number,
  x1: number, y1: number,
  cp1x: number, cp1y: number,
  cp2x: number, cp2y: number,
  x2: number, y2: number
): [number, number];
```

### CatmullRomCurve3 <a id="catmull-rom-curve-3"></a>

Utility class extending [Curve](#curve) for manipulating Catmull-Rom 3D curves.

- new CatmullRomCurve3(x1, y1, z1, cp1x, cp1y, cp1z, cp2x, cp2y, cp2z, x2, y2, z2)
  - `static` [.interpolate(t, x1, y1, z1, cp1x, cp1y, cp1z, cp2x, cp2y, cp2z, x2, y2, z2)](#catmull-rom-curve-3-static-interpolate-method)

| Parameter | Type     | Default | Description                                    |
| --------- | -------- | ------- | ---------------------------------------------- |
| x1        | `number` |         | X-axis coordinate of the start point.          |
| y1        | `number` |         | Y-axis coordinate of the start point.          |
| z1        | `number` |         | Z-axis coordinate of the start point.          |
| cp1x      | `number` |         | X-axis coordinate of the first control point.  |
| cp1y      | `number` |         | Y-axis coordinate of the first control point.  |
| cp1z      | `number` |         | Z-axis coordinate of the first control point.  |
| cp2x      | `number` |         | X-axis coordinate of the second control point. |
| cp2y      | `number` |         | Y-axis coordinate of the second control point. |
| cp2z      | `number` |         | Z-axis coordinate of the second control point. |
| x2        | `number` |         | X-axis coordinate of the end point.            |
| y2        | `number` |         | Y-axis coordinate of the end point.            |
| z2        | `number` |         | Z-axis coordinate of the end point.            |

##### `static` interpolate(t, x1, y1, z1, cp1x, cp1y, cp1z, cp2x, cp2y, cp2z, x2, y2, z2) <a id="catmull-rom-curve-3-static-interpolate-method"></a>

Interpolate a point on a 3D Catmull-Rom spline.

```ts
static CatmullRomCurve3.interpolate(
  t: number,
  x1: number, y1: number, z1: number,
  cp1x: number, cp1y: number, cp1z: number,
  cp2x: number, cp2y: number, cp2z: number,
  x2: number, y2: number, z2: number
): [number, number, number];
```

### SplineCurve <a id="spline-curve"></a>

Utility class extending [Curve](#curve) for manipulating splines.

- new SplineCurve(points)

| Parameter | Type                      | Default | Description                         |
| --------- | ------------------------- | ------- | ----------------------------------- |
| [points]  | `Array<[number, number]>` | `[]`    | Array of points defining the curve. |

### SplineCurve3 <a id="spline-curve-3"></a>

Utility class extending [Curve](#curve) for manipulating 3D splines.

- new SplineCurve3(points)

| Parameter | Type                              | Default | Description                         |
| --------- | --------------------------------- | ------- | ----------------------------------- |
| [points]  | `Array<[number, number, number]>` | `[]`    | Array of points defining the curve. |

### EllipseCurve <a id="ellipse-curve"></a>

Utility class extending [Curve](#curve) for manipulating ellipses.

- new EllipseCurve(cx, cy, rx, ry, rotation, startAngle, endAngle, counterclockwise)
  - `static` [.interpolate(t, cx, cy, rx, ry, rotation, startAngle, endAngle, counterclockwise)](#ellipse-curve-static-interpolate-method)

| Parameter          | Type      | Default  | Description                                                                            |
| ------------------ | --------- | -------- | -------------------------------------------------------------------------------------- |
| cx                 | `number`  |          | X-axis coordinate of the center of the ellipse.                                        |
| cy                 | `number`  |          | Y-axis coordinate of the center of the ellipse.                                        |
| rx                 | `number`  |          | X-radius of the ellipse.                                                               |
| ry                 | `number`  |          | Y-radius of the ellipse.                                                               |
| [rotation]         | `number`  | `0`      | Rotation angle of the ellipse (in radians), counterclockwise from the positive X-axis. |
| [startAngle]       | `number`  | `0`      | Start angle of the arc (in radians).                                                   |
| [endAngle]         | `number`  | `2 * PI` | End angle of the arc (in radians).                                                     |
| [counterclockwise] | `boolean` | `false`  | Flag indicating the direction of the arc.                                              |

##### `static` interpolate(t, cx, cy, rx, ry, rotation, startAngle, endAngle, counterclockwise) <a id="ellipse-curve-static-interpolate-method"></a>

Interpolate a point on an elliptical arc.

```ts
static EllipseCurve.interpolate(
	t: number,
	cx: number,
	cy: number,
	rotation?: number,
	startAngle?: number,
	endAngle?: number,
	counterclockwise?: boolean
): [number, number];
```

### ArcCurve <a id="arc-curve"></a>

Utility class extending [EllipseCurve](#ellipse-curve) for manipulating arcs.

- new ArcCurve(cx, cy, radius, startAngle, endAngle, counterclockwise)

| Parameter          | Type      | Default  | Description                                    |
| ------------------ | --------- | -------- | ---------------------------------------------- |
| cx                 | `number`  |          | X-axis coordinate of the center of the circle. |
| cy                 | `number`  |          | Y-axis coordinate of the center of the circle. |
| radius             | `number`  |          | X-radius of the circle.                        |
| [startAngle]       | `number`  | `0`      | Start angle of the arc (in radians).           |
| [endAngle]         | `number`  | `2 * PI` | End angle of the arc (in radians).             |
| [counterclockwise] | `boolean` | `false`  | Flag indicating the direction of the arc.      |
