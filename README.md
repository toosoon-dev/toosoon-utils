# TOOSOON Utils

Utility functions & classes.

[![NPM](https://nodei.co/npm/toosoon-utils.png)](https://nodei.co/npm/toosoon-utils/)

## Installation

Yarn:

```properties
$ yarn add toosoon-utils
```

NPM:

```properties
$ npm install toosoon-utils
```

## Usage

```ts
import { lerp } from 'toosoon-utils/math';

lerp(0.5, 0, 5); // 2.5
```

## Summary

- [Utility functions](#utility-functions)
  - [Math](#math-functions)
  - [Geometry](#geometry-functions)
  - [Color](#color-functions)
  - [Functions](#functions-functions)
  - [String](#string-functions)
  - [Query](#query-functions)
  - [DOM](#dom-functions)
  - [File](#file-functions)
  - [Random](#random-functions)
- [Utility classes](#utility-classes)
  - [Geometry](#geometry-classes)
  - [Curves](#curves-classes)
  - [Paths](#paths-classes)
  - [Color](#color-classes)
  - [Performance](#performance-class)
- [Constants](#constants)
- [License](#license)

## Utility functions

### Math <a id="math-functions"></a>

##### `isEven(value)`

Check if a number is even.

- `value`: Value to check.

```ts
isEven(value: number): boolean;
```

##### `isOdd(value)`

Check if a number is odd.

- `value`: Value to check.

```ts
isOdd(value: number): boolean;
```

##### `isPowerOf2(value)`

Check if a number is a power of 2.

- `value`: Value to check.

```ts
isPowerOf2(value: number): boolean;
```

##### `toPowerOf2(value)`

Compute the closest greater power of 2 from a number.

- `value`: Value to compute power of 2 for.

```ts
toPowerOf2(value: number): number;
```

##### `sign(value)`

Return the sign (positive or negative) of a number.

- `value`: Value to check.

```ts
sign(value: number): number;
```

##### `clamp(value, min?, max?)`

Constrain a number between two bounds.

- `value`: Value to constrain.
- `[min=0]`: Minimum boundary.
- `[max=1]`: Maximum boundary.

```ts
clamp(value: number, min?: number, max?: number): number;
```

##### `snap(value, multiple?)`

Round a number up to a nearest multiple.

- `value`: Value to round.
- `[multiple=1]`: Multiple to round to.

```ts
snap(value: number, multiple?: number): number;
```

##### `lerp(t, min, max)`

Interpolate a number between two bounds using Linear interpolation (lerping).

- `t`: Normalized time value to interpolate.
- `min`: Minimum boundary.
- `max`: Maximum boundary.

```ts
lerp(t: number, min: number, max: number): number;
```

##### `normalize(value, min, max)`

Normalize a number between two bounds.

- `value`: Value to normalize.
- `min`: Minimum boundary.
- `max`: Maximum boundary.

```ts
normalize(value: number, min: number, max: number): number;
```

##### `map(value, currentMin, currentMax, targetMin, targetMax)`

Re-map a number from one range to another.

- `value`: Value to re-map.
- `currentMin`: Lower bound of the value's current range.
- `currentMax`: Upper bound of the value's current range.
- `targetMin`: Lower bound of the value's target range.
- `targetMax`: Upper bound of the value's target range.

```ts
map(value: number, currentMin: number, currentMax: number, targetMin: number, targetMax: number): number;
```

##### `triLerp(t, min, max, peak)`

Interpolate a number between two values using Triangular interpolation.

- `t`: Normalized time value to interpolate.
- `min`: Minimum boundary.
- `max`: Maximum boundary.
- `peak`: Peak value controling the interpolation triangle shape.

```ts
triLerp(t: number, min: number, max: number, peak: number): number;
```

##### `expLerp(t, min, max, power)`

Interpolate a number between two bounds using Exponential interpolation.

- `t`: Normalized time value to interpolate.
- `min`: Minimum boundary.
- `max`: Maximum boundary.
- `power`: Exponent controling the interpolation curve shape.

```ts
expLerp(t: number, min: number, max: number, power: number): number;
```

##### `quadraticBezier(t, p1, cp, p2)`

Interpolate a number using Quadratic Bézier interpolation.

- `t`: Normalized time value to interpolate.
- `p1`: Start point.
- `cp`: Control point.
- `p2`: End point.

```ts
quadraticBezier(t: number, p1: number, cp: number, p2: number): number;
```

##### `cubicBezier(t, p1, cp1, cp2, p2)`

Interpolate a number using Cubic Bézier interpolation.

- `t`: Normalized time value to interpolate.
- `p1`: Start point.
- `cp1`: First control point.
- `cp2`: Second control point.
- `p2`: End point.

```ts
cubicBezier(t: number, p1: number, cp1: number, cp2: number, p2: number): number;
```

##### `catmullRom(t, p1, cp1, cp2, p2)`

Interpolate a number using Catmull-Rom interpolation.

- `t`: Normalized time value to interpolate.
- `p1`: Start point.
- `cp1`: First control point.
- `cp2`: Second control point.
- `p2`: End point.

```ts
catmullRom(t: number, p1: number, cp1: number, cp2: number, p2: number): number;
```

##### `parabola(x, power?)`

Re-map the [0, 1] interval into [0, 1] parabola, such that corners are remaped to 0 and the center to 1.

- `x`: Normalized coordinate on X axis.
- `[power=1]`: Parabola exponent.

```ts
parabola(x: number, power?: number): number;
```

##### `step(value, edge)`

Compare two numbers.

- `value`: Value to compare to the edge.
- `edge`: Value of the edge.

```ts
step(value: number, edge: number): number;
```

> The order of arguments is not the same as the one used in the GLSL language.

##### `smoothstep(value, min?, max?)`

Interpolate a number between two bounds using Hermite interpolation.

- `value`: Value to interpolate.
- `[min=0]`: Minimum boundary.
- `[max=1]`: Maximum boundary.

```ts
smoothstep(value: number, min?: number, max?: number): number;
```

> The order of arguments is not the same as the one used in the GLSL language.

##### `fract(value)`

Compute the fractional part of a number.

- `value`: Value to compute the fractional part of.

```ts
fract(value: number): number;
```

##### `mod(value, modulo)`

Compute the value of a number modulo another.

- `value`: Value to modulate.
- `modulo`: Value to modulate by.

```ts
mod(value: number, modulo: number): number;
```

##### `pingPong(value, length)`

Move back and forth a number between 0 and a length, so that it is never larger than length and never smaller than 0.

- `value`: Value to modulate.
- `length`: Total length.

```ts
pingPong(value: number, length: number): number;
```

##### `sum(numbers)`

Compute the sum of an array of numbers.

- `numbers`: Array of numbers to compute the sum from.

```ts
sum(numbers: number[]): number;
```

##### `average(numbers)`

Compute the average of an array of numbers.

- `numbers`: Array of numbers to compute the average from.

```ts
average(numbers: number[]): number;
```

##### `damp(value, target, damping, delta)`

Smoothly interpolate a number toward another.

- `value`: Value to interpolate.
- `target`: Destination of the interpolation.
- `damping`: A higher value will make the movement more sudden, and a lower value will make the movement more gradual.
- `delta`: Delta time (in seconds).

```ts
damp(value: number, target: number, damping: number, delta: number): number;
```

### Geometry <a id="geometry-functions"></a>

##### `toDegrees(radians)`

Convert a radians angle into degrees.

- `radians`: Angle in radians.

```ts
toDegrees(radians: number): number;
```

##### `toRadians(degrees)`

Convert a degrees angle into radians.

- `degrees`: Angle in degrees.

```ts
toRadians(degrees: number): number;
```

##### `angle(x1, y1, x2, y2)`

Compute the angle (in radians) from a point to another.

- `x1`: X-axis coordinate of the start point.
- `y1`: Y-axis coordinate of the start point.
- `x2`: X-axis coordinate of the end point.
- `y2`: Y-axis coordinate of the end point.

```ts
angle(x1: number, y1: number, x2: number, y2: number): number;
```

##### `closestAngle(startAngle, endAngle)`

Compute the closest angle (in radians) between two angles.

- `startAngle`: Start angle (in radians).
- `endAngle`: End angle (in radians).

```ts
closestAngle(startAngle: number, endAngle: number): number;
```

##### `distance(x1, y1, x2, y2)`

Compute the distance between two points.

- `x1`: X-axis coordinate of the start point.
- `y1`: Y-axis coordinate of the start point.
- `x2`: X-axis coordinate of the end point.
- `y2`: Y-axis coordinate of the end point.

```ts
distance(x1: number, y1: number, x2: number, y2: number): number;
```

##### `diagonal(width, height)`

Compute the length of the diagonal of a rectangle.

- `width`: Width of the rectangle.
- `height`: Height of the rectangle.

```ts
diagonal(width: number, height: number): number;
```

#### Fit

```ts
type FitInput = {
  width: number;
  height: number;
};

type FitOutput = {
  left: number;
  top: number;
  width: number;
  height: number;
  scale: number;
};
```

##### `cover(target, container)`

Make a target fit a container (cover mode).

- `target`: Dimension of the target.
- `container`: Dimension of the container.

```ts
cover(target: FitInput, container: FitInput): FitOutput;
```

##### `contain(target, container)`

Make a target fit a container (contain mode).

- `target`: Dimension of the target.
- `container`: Dimension of the container.

```ts
contain(target: FitInput, container: FitInput): FitOutput;
```

### Color <a id="color-functions"></a>

##### `normalizeHexString(hex)`

Normalize an hexadecimal string.

- `hex`: Hexadecimal string.

```ts
normalizeHexString(hex: string): string;
```

##### `rgbToHex(rgb)`

Convert RGB to hexadecimal.

- `rgb`: RGB color.

```ts
rgbToHex([r, g, b]: [number, number, number]): number;
```

##### `rgbToHexString(rgb)`

Convert RGB to hexadecimal string.

- `rgb`: RGB color.

```ts
rgbToHexString([r, g, b]: [number, number, number]): string;
```

##### `hexToRgb(hex)`

Convert hexadecimal to RGB.

- `hex`: Hexadecimal color.

```ts
hexToRgb(hex: number | string): [number, number, number];
```

##### `lighten(hex, amount?)`

Lighten a color.

- `hex`: Hexadecimal color.
- `[amount=0]`: Amount of the color offset.

```ts
lighten(hex: string, amount?: number): string;
```

##### `darken(hex, amount?)`

Darken a color.

- `hex`: Hexadecimal color.
- `[amount=0]`: Amount of the color offset.

```ts
darken(hex: string, amount?: number): string;
```

##### `normalizeHslString(hsl)`

Normalize an HSL string.

- `hsl`: HSL string (format: `'hsl(360, 100%, 100%)'`).

```ts
normalizeHslString(hsl: string): [number, number, number];
```

##### `rgbToHsl(rgb)`

Convert RGB to HSL.

- `rgb`: RGB color.

```ts
rgbToHsl([r, g, b]: [number, number, number]): [number, number, number];
```

##### `hslToRgb(hsl)`

Convert HSL to RGB.

- `hsl`: HSL color.

```ts
hslToRgb([h, s, l]: [number, number, number]): [number, number, number];
```

##### `rgbToHsb(rgb)`

Convert RGB to HSB.

- `rgb`: RGB color.

```ts
rgbToHsb([r, g, b]: [number, number, number]): [number, number, number];
```

##### `hsbToRgb(hsb)`

Convert HSB to RGB.

- `hsb`: HSB color.

```ts
hsbToRgb([h, s, b]: [number, number, number]): [number, number, number];
```

##### `labToHcl(lab)`

Convert L*a*b\* to HCL.

- `lab`: L*a*b\* color.

```ts
labToHcl([l, a, b]: [number, number, number]): [number, number, number];
```

##### `hclToLab(hcl)`

Convert HCL to L\*a\*b\*.

- `hcl`: HCL color.

```ts
hclToLab([h, c, l]: [number, number, number]): [number, number, number];
```

##### `labToRgb(lab)`

Convert L\*a\*b\* to RGB.

- `lab`: L\*a\*b\* color.

```ts
labToRgb([l, a, b]: [number, number, number]): [number, number, number];
```

##### `rgbToLab(rgb)`

Convert RGB to L\*a\*b\*.

- `rgb`: RGB color.

```ts
rgbToLab([r, g, b]: [number, number, number]): [number, number, number];
```

##### `deltaE(lab1, lab2)`

Get the delta from two L\*a\*b\* colors.

- `lab1`: First L\*a\*b\* color.
- `lab2`: Second L\*a\*b\* color.

```ts
deltaE(lab1: [number, number, number], lab2: [number, number, number]): number;
```

##### `rgbToHcl(rgb)`

Convert RGB to HCL.

- `rgb`: RGB color.

```ts
rgbToHcl([r, g, b]: [number, number, number]): [number, number, number];
```

##### `hclToRgb(hcl)`

Convert HCL to RGB.

- `hcl`: HCL color.

```ts
hclToRgb([h, c, l]: [number, number, number]): [number, number, number];
```

### Functions <a id="functions-functions"></a>

##### `noop()`

No-op function.

```ts
noop(): void;
```

##### `wait(delay?)`

Promise wrapped setTimeout.

- `[delay=0]`: Time to wait (in milliseconds).

```ts
wait(delay?: number): Promise<void>;
```

##### `isDefined(value)`

Check if a value is defined.

- `value`: Value to check.

```ts
isDefined<T>(value: T): boolean;
```

##### `debounce(callback, delay)`

Create a debounced function that delays the execution of a given callback until a specified delay time has passed since the last call.

- `callback`: Function to debounce.
- `delay`: Delay (in milliseconds).

```ts
debounce<T>(callback: T, delay: number): Function;
```

##### `throttle(callback, limit)`

Create a throttled function that limits the execution of a given callback to once every specified limit time.

- `callback`: Function to throttle.
- `limit`: Minimum interval between two calls (in milliseconds).

```ts
throttle<T>(callback: T, limit: number): Function;
```

##### `now()`

Polyfill for `now()` functions.

```ts
now(): number;
```

### String <a id="string-functions"></a>

#### Case

##### `capitalize(string)`

Capitalize a string.

- `string`: String to capitalize.

```ts
capitalize(string: string): string;
```

##### `toKebabCase(string)`

Convert a string to kebab-case: 'Hello world' -> 'hello-world'.

- `string`: String to convert.

```ts
toKebabCase(string: string): string;
```

##### `toSnakeCase(string)`

Convert a string to snake_case: 'Hello world' -> 'hello_world'.

- `string`: String to convert.

```ts
toSnakeCase(string: string): string;
```

##### `toCamelCase(string)`

Convert a string to camelCase: 'Hello world' -> 'helloWorld'.

- `string`: String to convert.

```ts
toCamelCase(string: string): string;
```

##### `toPascalCase(string)`

Convert a string to PascalCase: 'Hello world' -> 'HelloWorld'.

- `string`: String to convert.

```ts
toPascalCase(string: string): string;
```

##### `toTrainCase(string)`

Convert a string to Train-Case: 'Hello world' -> 'Hello-World'.

- `string`: String to convert.

```ts
toTrainCase(string: string): string;
```

##### `toConstantCase(string)`

Convert a string to CONSTANT_CASE: 'Hello world' -> 'HELLO_WORLD'.

- `string`: String to convert.

```ts
toConstantCase(string: string): string;
```

#### Path

##### `cleanPath(path)`

Clean a path by removing its parameters.

- `path`: Path to clean.

```ts
cleanPath(path: string): string;
```

##### `addTrailingSlash(path)`

Convert a path by ensuring it has a trailing slash.

- `path`: Path to convert.

```ts
addTrailingSlash(path: string): string;
```

##### `removeTrailingSlash(path)`

Convert a path by ensuring it has not a trailing slash.

- `path`: Path to convert.

```ts
removeTrailingSlash(path: string): string;
```

### Query parameters <a id="query-functions"></a>

##### `getQuery(property)`

Get a query parameter.

- `property`: Query property to check.

```ts
getQuery(property: string): string | null;
```

##### `setQuery(property, value)`

Set a query parameter.

- `property`: Query property to set.
- `value`: Value to set.

```ts
setQuery(property: string, value: string): void;
```

##### `hasQuery(property)`

Check if a query parameter exists.

- `property`: Query property to check.

```ts
hasQuery(property: string): boolean;
```

### DOM <a id="dom-functions"></a>

##### `closest(element, selector)`

Find the closest parent that matches a selector.

- `element`: Target element.
- `selector`: Selector or parent to match.

```ts
closest(element: Element | null, selector: Element | null | string): Element | null;
```

### File <a id="file-functions"></a>

##### `load(file)`

Load a file.

- `file`: File to load.

```ts
async load(file: File): Promise<string>;
```

##### `download(blob, params)`

Download a Blob object into user files.

- `blob`: Blob object to download.
- `params`: Download parameters.
- `params.filename`: Downloaded file name.

```ts
download(blob: Blob, params: { filename: string }): void;
```

##### `upload(onLoad, accept?)`

Upload a file from user files.

- `onLoad`: Callback called once the file is loaded.
- `[accept='']` MIME type the file input should accept.

```ts
upload(onLoad: (dataUrl: string) => void, accept?: string): void;
```

##### `share(blob, params)`

Share a Blob object with the user's device.

- `blob`: Blob object to share.
- `params`: Share parameters.
- `params.filename`: Shared file name.

```ts
async share(blob: Blob, params: { filename: string } & ShareData): Promise<void>;
```

### Random <a id="random-functions"></a>

##### `randomBoolean(probability?)`

Generate a random boolean (true or false).

- `[probability=0.5]`: Probability to get true.

```ts
randomBoolean(probability?: number): boolean;
```

##### `randomSign(probability?)`

Generate a random sign (1 or -1).

- `[probability=0.5]`: Probability to get 1.

```ts
randomSign(probability?: number): number;
```

##### `randomFloat(min?, max?, precision?)`

Generate a random floating-point number within a specified range.

- `[min=0]`: Minimum boundary.
- `[max=1]`: Maximum boundary.
- `[precision=2]`: Number of digits after the decimal point.

```ts
randomFloat(min?: number, max?: number, precision?: number): number;
```

##### `randomInt(min, max)`

Generate a random integer number within a specified range.

- `min`: Minimum boundary.
- `max`: Maximum boundary.

```ts
randomInt(min: number, max: number): number;
```

##### `randomHexColor()`

Generate a random hexadecimal color.

```ts
randomHexColor(): string;
```

##### `randomItem(array)`

Pick a random item from an array.

- `array`: Array to pick the item from.

```ts
randomItem<T>(array: T[]): T | undefined;
```

##### `randomObjectProperty(object)`

Pick a random property value from an object.

- `object`: Object to pick the property from.

```ts
randomObjectProperty<T>(object: Record<string, T>): T | undefined;
```

##### `randomIndex(weights)`

Select a random index from an array of weighted items.

- `weights`: Array of weights.

```ts
randomIndex(weights: number[]): number;
```

##### `randomGaussian(mean?, spread?)`

Generate a random number fitting a Gaussian (normal) distribution.

- `[mean=0]`: Mean (central) value of the distribution.
- `[spread=1]`: Spread (standard deviation) of the distribution.

```ts
randomGaussian(mean?: number, spread?: number): number;
```

##### `onCircle(radius?)`

Produce a random 2D point around the perimiter of a unit circle.

- `[radius=1]`: Radius of the circle.

```ts
onCircle(radius?: number): [number, number];
```

##### `insideCircle(radius?)`

Produce a random 2D point inside a unit circle.

- `[radius=1]`: Radius of the circle.

```ts
insideCircle(radius?: number): [number, number];
```

##### `onSphere(radius?)`

Produce a random 3D point on the surface of a sphere.

- `[radius=1]`: Radius of the sphere.

```ts
onSphere(radius?: number): [number, number, number];
```

##### `insideSphere(radius?)`

Produce a random 3D point inside a sphere.

- `[radius=1]`: Radius of the sphere.

```ts
insideSphere(radius?: number): [number, number, number];
```

## Utility classes

### Geometry <a id="geometry-classes"></a>

See Geometry utility classes documentation [here](./docs/GEOMETRY.md).

#### [Vector2](./docs//GEOMETRY.md#vector-2)

#### [Vector3](./docs//GEOMETRY.md#vector-3)

### Curves <a id="curves-classes"></a>

See Curves utility classes documentation [here](./docs/CURVES.md).

#### [Curve](./docs/CURVES.md#curve)

#### [LineCurve](./docs/CURVES.md#line-curve)

#### [LineCurve3](./docs/CURVES.md#line-curve-3)

#### [PolylineCurve](./docs/CURVES.md#polyline-curve)

#### [PolylineCurve3](./docs/CURVES.md#polyline-curve-3)

#### [QuadraticBezierCurve](./docs/CURVES.md#quadratic-bezier-curve)

#### [QuadraticBezierCurve3](./docs/CURVES.md#quadratic-bezier-curve-3)

#### [CubicBezierCurve](./docs/CURVES.md#cubic-bezier-curve)

#### [CubicBezierCurve3](./docs/CURVES.md#cubic-bezier-curve-3)

#### [CatmullRomCurve](./docs/CURVES.md#catmull-rom-curve)

#### [CatmullRomCurve3](./docs/CURVES.md#catmull-rom-curve-3)

#### [SplineCurve](./docs/CURVES.md#spline-curve)

#### [SplineCurve3](./docs/CURVES.md#spline-curve-3)

#### [EllipseCurve](./docs/CURVES.md#ellipse-curve)

#### [ArcCurve](./docs/CURVES.md#arc-curve)

### Paths <a id="paths-classes"></a>

See Paths utility classes documentation [here](./docs/PATHS.md).

#### [Path](./docs/PATHS.md#path)

#### [PathContext](./docs/PATHS.md#path-context)

#### [PathSVG](./docs/PATHS.md#path-svg)

### Color <a id="color-classes"></a>

See Color utility classes documentation [here](./docs/COLOR.md).

#### [Color](./docs/COLOR.md#color)

#### [ColorScale](./docs/COLOR.md#color-scale)

#### [ColorPalette](./docs/COLOR.md#color-palette)

### Performance <a id="performance-classes"></a>

See Performance utility classes documentation [here](./docs/PERFORMANCE.md).

#### [FrameRate](./docs/PERFORMANCE.md#frame-rate)

## Constants

### Math

`EPSILON`

### Geometry

`PI`

`TWO_PI` / `TAU`

`HALF_PI`

`QUARTER_PI`

`RAD2DEG`

`DEG2RAD`

### Color

`COLORS`

## License

MIT License, see [LICENSE](https://github.com/toosoon-dev/toosoon-utils/tree/master/LICENSE) for details.
