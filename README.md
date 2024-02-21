# TOOSOON UTILS

TOOSOON utility functions.

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
import { lerp } from 'toosoon-utils/maths';

console.log(lerp(0.5, 0, 5)); // 2.5
```

## Functions

### Colors

##### normalizeHexString(hex)

Normalize an hexadecimal string.

- `hex`: Hexadecimal string.

```ts
normalizeHexString(hex: string) => string;
```

##### rgbToHex(rgb)

Convert RGB to hexadecimal.

- `rgb`: RGB color.

```ts
rgbToHex([r, g, b]: [number, number, number]) => number;
```

##### rgbToHexString(rgb)

Convert RGB to hexadecimal string.

- `rgb`: RGB color.

```ts
rgbToHexString([r, g, b]: [number, number, number]) => string;
```

##### hexToRgb(hex)

Convert hexadecimal to RGB.

- `hex`: Hexadecimal color.

```ts
hexToRgb(hex: number | string) => [number, number, number];
```

##### lighten(hex, amount)

Lighten a color.

- `hex`: Hexadecimal color.
- `[amount=0]`: Amount of the color offset.

```ts
lighten(hex: string, amount?: number) => string;
```

##### darken(hex, amount)

Darken a color.

- `hex`: Hexadecimal color.
- `[amount=0]`: Amount of the color offset.

```ts
darken(hex: string, amount?: number) => string;
```

##### normalizeHslString(hsl)

Normalize an HSL string.

- `hsl`: HSL string (format: `'hsl(360, 100%, 100%)'`).

```ts
normalizeHslString(hsl: string) => [number, number, number];
```

##### rgbToHsl(rgb)

Convert RGB to HSL.

- `rgb`: RGB color.

```ts
rgbToHsl([r, g, b]: [number, number, number]) => [number, number, number];
```

##### hslToRgb(hsl)

Convert HSL to RGB.

- `hsl`: HSL color.

```ts
hslToRgb([h, s, l]: [number, number, number]) => [number, number, number];
```

##### rgbToHsb(rgb)

Convert RGB to HSB.

- `rgb`: RGB color.

```ts
rgbToHsb([r, g, b]: [number, number, number]) => [number, number, number];
```

##### hsbToRgb(hsb)

Convert HSB to RGB.

- `hsb`: HSB color.

```ts
hsbToRgb([h, s, b]: [number, number, number]) => [number, number, number];
```

##### labToHcl(lab)

Convert LAB to HCL.

- `lab`: LAB color.

```ts
labToHcl([l, a, b]: [number, number, number]) => [number, number, number];
```

##### hclToLab(hcl)

Convert HCL to LAB.

- `hcl`: HCL color.

```ts
hclToLab([h, c, l]: [number, number, number]) => [number, number, number];
```

##### labToRgb(lab)

Convert LAB to RGB.

- `lab`: LAB color.

```ts
labToRgb([l, a, b]: [number, number, number]) => [number, number, number];
```

##### rgbToLab(rgb)

Convert RGB to LAB.

- `rgb`: RGB color.

```ts
rgbToLab([r, g, b]: [number, number, number]) => [number, number, number];
```

##### deltaE(labA, labB)

Get the delta from two LAB colors.

- `labA`: First LAB color.
- `labB`: Second LAB color.

```ts
deltaE(labA: [number, number, number], labB: [number, number, number]) => number;
```

##### rgbToHcl(rgb)

Convert RGB to HCL.

- `rgb`: RGB color.

```ts
rgbToHcl([r, g, b]: [number, number, number]) => [number, number, number];
```

##### hclToRgb(hcl)

Convert HCL to RGB.

- `hcl`: HCL color.

```ts
hclToRgb([h, c, l]: [number, number, number]) => [number, number, number];
```

### DOM

##### closest(element, selector)

Find the closest parent that matches a selector.

- `element`: Target element.
- `selector`: Selector or parent to match.

```ts
closest(element: Element, selector: Element | string) => Element | null;
```

##### createCanvas(width, height)

Create a canvas and 2d context.

- `width`: Width of the canvas.
- `height`: Height of the canvas.

```ts
createCanvas(width: number, height: number) => { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D };
```

##### injectStyles(styles)

Inject CSS styles in `document.head`.

- `styles`: CSS styles to inject.

```ts
injectStyles(styles: string) => void;
```

### Files

##### download(blob, filename)

Download a Blob object into user files.

- `blob`: Blob object to download.
- `filename`: Downloaded file name.

```ts
download(blob: Blob, filename: string) => void;
```

##### upload(onLoad)

Upload a file from user files.

- `onLoad`: Callback called once the file is loaded.
- `[accept='']` MIME type the file input should accept.

```ts
upload(onLoad: (dataUrl: string) => void, accept?: string) => void;
```

### Functions

##### noop()

No-op function.

```ts
noop() => void;
```

##### wait(timeout)

Promise wrapped setTimeout.

- `[timeout=0]`: Time to wait (in milliseconds).

```ts
wait(timeout?: number) => Promise<void>;
```

##### defer()

Deferred promise implementation.

```ts
defer<T>() => Deferred<T>;
```

### Geometry

##### toDegrees(radians)

Convert a radians value into degrees.

- `radians`: Angle in radians.

```ts
toDegrees(radians: number) => number;
```

##### toRadians(degrees)

Convert a degrees value into radians.

- `degrees`: Angle in degrees.

```ts
toRadians(degrees: number) => number;
```

##### angle(x1, y1, x2, y2)

Calculate the angle from a point to another.

- `x1`: X value of the first point.
- `y1`: Y value of the first point.
- `x2`: X value of the second point.
- `y2`: Y value of the second point.

```ts
angle(x1: number, y1: number, x2: number, y2: number) => number;
```

##### closestAngle(source, target)

Find the closest angle between to angles.

- `source`: Source angle in radians.
- `target`: Target angle in radians.

```ts
closestAngle(source: number, target: number) => number;
```

##### distance(x1, y1, x2, y2)

Calculate the distance between two points.

- `x1`: X coord of the first point.
- `y1`: Y coord of the first point.
- `x2`: X coord of the second point.
- `y2`: Y coord of the second point.

```ts
distance(x1: number, y1: number, x2: number, y2: number) => number;
```

##### diagonal(width, height)

Calculate the length of the diagonal of a rectangle.

- `width`: Width of the rectangle.
- `height`: Height of the rectangle.

```ts
diagonal(width: number, height: number) => number;
```

##### radToSphere(radius, phi, theta)

Convert radians to a 3D point on the surface of a unit sphere.

- `radius`: Radius of the sphere
- `phi`: Polar angle from the y (up) axis [0, PI]
- `theta`: Equator angle around the y (up) axis [0, 2*PI]
- `[target]`: Target vector

```ts
radToSphere(radius: number, phi: number, theta: number, target?: Vector3) => Vector3;
```

##### cover(target, container)

Make a target fit a container (cover mode).

- `target`: Dimension of the target.
- `container`: Dimension of the container.

```ts
cover(target: object, container: object) => object;
```

##### contain(target, container)

Make a target fit a container (contain mode).

- `target`: Dimension of the target.
- `container`: Dimension of the container.

```ts
contain(target: object, container: object) => object;
```

### Maths

##### isEven(value)

Check if a number is even.

- `value`: Value to check.

```ts
isEven(value: number) => boolean;
```

##### isOdd(value)

Check if a number is odd.

- `value`: Value to check.

```ts
isOdd(value: number) => boolean;
```

##### isPowerOf2(value)

Check if a number is a power of 2.

- `value`: Value to check.

```ts
isPowerOf2(value: number) => boolean;
```

##### toPowerOf2(value)

Find closest power of 2 that fits a number.

- `value`: Incoming value.
- `[mode='ceil']`: Can be `'floor'`, `'ceil'` or `'round'`.

```ts
toPowerOf2(value: number, mode?: string) => number;
```

##### sign(value)

Return the sign (positive or negative) of a number.

- `value`: Value to check.

```ts
sign(value: number) => number;
```

##### clamp(value, min, max)

Clamp a value between two bounds.

- `value`: Value to clamp.
- `[min=0]`: Minimum boundary.
- `[max=1]`: Maximum boundary.

```ts
clamp(value: number, min?: number, max?: number) => number;
```

##### lerp(value, min, max)

Linear interpolation between two values (lerping).

- `value`: Normalized value to interpolate.
- `min`: Minimum value.
- `max`: Maximum value.

```ts
lerp(value: number, min: number, max: number) => number;
```

##### triLerp(value, min, max, target)

Triangular interpolation between two values.

- `value`: Normalized value to interpolate.
- `min`: Minimum value.
- `max`: Maximum value.
- `target`: Triangle target value.

```ts
triLerp(value: number, min: number, max: number, target: number) => number;
```

##### expLerp(value, min, max)

Exponential interpolation between two values.

- `value`: Normalized value to interpolate.
- `min`: Minimum value.
- `max`: Maximum value.

```ts
expLerp(value: number, min: number, max: number) => number;
```

##### normalize(value, min, max)

Normalize a value between two bounds.

- `value`: Value to normalize.
- `min`: Minimum boundary.
- `max`: Maximum boundary.

```ts
normalize(value: number, min: number, max: number) => number;
```

##### map(value, currentMin, currentMax, targetMin, targetMax)

Re-map a number from one range to another.

- `value`: Value to re-map.
- `currentMin`: Lower bound of the value's current range.
- `currentMax`: Upper bound of the value's current range.
- `targetMin`: Lower bound of the value's target range.
- `targetMax`: Upper bound of the value's target range.

```ts
map(value: number, currentMin: number, currentMax: number, targetMin: number, targetMax: number) => number;
```

##### roundTo(value, multiple)

Round a number up to a nearest multiple.

- `value`: Value to round.
- `[multiple=1]`: Multiple to round to.

```ts
roundTo(value: number, multiple?: number) => number;
```

##### modAbs(value, length)

Modulo absolute a value based on a length.

- `value`: Value to modulate.
- `length`: Total length.

```ts
modAbs(value: number, length: number) => number;
```

##### pingPong(value, length)

Move back and forth a value between 0 and length, so that it is never larger than length and never smaller than 0.

- `value`: Value to modulate.
- `length`: Total length.

```ts
pingPong(value: number, length: number) => number;
```

##### smoothstep(value, min, max)

Smooth a value using cubic Hermite interpolation.

- `value`: Value to smooth.
- `[min=0]`: Minimum boundary.
- `[max=1]`: Maximum boundary.

```ts
smoothstep(value: number, min?: number, max?: number) => number;
```

##### parabola(x, power)

Re-map the [0, 1] interval into [0, 1] parabola, such that corners are remaped to 0 and the center to 1.

- `x`: Normalized coordinate on X axis.
- `[power=1]`: Parabola power.

```ts
parabola(x: number, power?: number) => number;
```

##### sum(array)

Return the sum of numbers.

- `array`: Array of numbers.

```ts
sum(array: number[]) => number;
```

##### average(array)

Return the average of numbers.

- `array`: Array of numbers.

```ts
average(array: number[]) => number;
```

##### damp(value, target, damping, delta)

Smoothly interpolate a number toward another.

- `value`: Value to interpolate.
- `target`: Destination of the interpolation.
- `damping`: A higher value will make the movement more sudden, and a lower value will make the movement more gradual.
- `delta`: Delta time (in seconds).

```ts
damp(value: number, target: number, damping: number, delta: number) => number;
```

### Now

##### now

Polyfill for "now()" functions.

```ts
now() => number;
```

### Random

##### randomBoolean(probability)

Generate a random boolean (true or false).

- `[probability=0.5]`: Probability to get `true`.

```ts
randomBoolean(probability?: number) => boolean;
```

##### randomSign(probability)

Generate a random sign (1 or -1).

- `[probability=0.5]`: Probability to get `1`.

```ts
randomSign(probability?: number) => number;
```

##### randomFloat(min, max)

Generate a random floating-point number within a specified range.

- `[min=0]`: Minimum boundary.
- `[max=1]`: Maximum boundary.
- `[precision=2]`: Number of digits after the decimal point.

```ts
randomFloat(min?: number, max?: number, precision?: number) => number;
```

##### randomInt(min, max)

Generate a random integer number within a specified range.

- `min`: Minimum boundary.
- `max`: Maximum boundary.

```ts
randomInt(min: number, max: number) => number;
```

##### randomHexColor()

Generate a random hexadecimal color.

```ts
randomHexColor() => string;
```

##### randomItem(array)

Pick a random item from a given array.

- `array`: Array to pick the item from.

```ts
randomItem<T>(array: T[]) => T | undefined;
```

##### randomObjectProperty(object)

Pick a random property value from a given object.

- `object`: Object to pick the property from.

```ts
randomObjectProperty<T>(object: { [key: string]: T }) => T | undefined;
```

##### randomIndex(weights)

Select a random index from an array of weighted items.

- `weights`: Array of weights.

```ts
randomIndex(weights?: number[]) => number;
```

##### onCircle(radius)

Produce a random 2D point around the perimiter of a unit circle.

- `[radius=1]`: Radius of the circle.
- `[target]`: Target vector.

```ts
onCircle(radius?: number, target?: Vector2) => Vector2;
```

##### insideCircle(radius)

Produce a random 2D point inside a unit circle.

- `[radius=1]`: Radius of the circle.
- `[target]` Target vector.

```ts
insideCircle(radius?: number, target?: Vector2) => Vector2;
```

##### onSphere(radius)

Produce a random 3D point on the surface of a unit sphere.

- `[radius=1]`: Radius of the sphere.
- `[target]`: Target vector.

```ts
onSphere(radius?: number, target?: Vector3) => Vector3;
```

##### insideSphere(radius)

Produce a random 3D point inside a unit sphere.

- `[radius=1]`: Radius of the sphere.
- `[target]`: Target vector.

```ts
insideSphere(radius?: number, target?: Vector3) => Vector3;
```

### Strings

##### capitalize(string)

Capitalize a string.

- `string`: String to capitalize.

```ts
capitalize(string: string) => string;
```

##### cleanPath(path)

Clean a path by removing params.

- `path`: Path to clean.

```ts
cleanPath(path: string) => string;
```

## Constants

`EPSILON`

`PI`

`TWO_PI`

`HALF_PI`

`QUARTER_PI`

`W3CX11`

## License

MIT License, see [LICENSE](https://github.com/toosoon-dev/toosoon-utils/tree/master/LICENSE) for details
