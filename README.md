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

```js
import { lerp } from 'toosoon-utils/maths';

console.log(lerp(0.5, 0, 5)); // 2.5
```

## Functions

### Colors

##### normalizeHexString

Normalize an hexadecimal string.

```ts
normalizeHexString(hex: string) => string;
```

##### rgbToHex

Convert RGB to hexadecimal.

```ts
rgbToHex([r, g, b]: [number, number, number]) => number;
```

##### rgbToHexString

Convert RGB to hexadecimal string.

```ts
rgbToHexString([r, g, b]: [number, number, number]) => string;
```

##### hexToRgb

Convert hexadecimal to RGB.

```ts
hexToRgb(hex: number | string) => [number, number, number];
```

##### lighten

Lighten a color.

```ts
lighten(hex: string, amount?: number) => string;
```

##### darken

Darken a color.

```ts
darken(hex: string, amount?: number) => string;
```

##### normalizeHslString

Normalize an HSL string.

```ts
normalizeHslString(hsl: string) => [number, number, number];
```

##### rgbToHsl

Convert RGB to HSL.

```ts
rgbToHsl([r, g, b]: [number, number, number]) => [number, number, number];
```

##### hslToRgb

Convert HSL to RGB.

```ts
hslToRgb([h, s, l]: [number, number, number]) => [number, number, number];
```

##### rgbToHsb

Convert RGB to HSB.

```ts
rgbToHsb([r, g, b]: [number, number, number]) => [number, number, number];
```

##### hsbToRgb

Convert HSB to RGB.

```ts
hsbToRgb([h, s, b]: [number, number, number]) => [number, number, number];
```

##### labToHcl

Convert LAB to HCL.

```ts
labToHcl([l, a, b]: [number, number, number]) => [number, number, number];
```

##### hclToLab

Convert HCL to LAB.

```ts
hclToLab([h, c, l]: [number, number, number]) => [number, number, number];
```

##### labToRgb

Convert LAB to RGB.

```ts
labToRgb([l, a, b]: [number, number, number]) => [number, number, number];
```

##### rgbToLab

Convert RGB to LAB.

```ts
rgbToLab([r, g, b]: [number, number, number]) => [number, number, number];
```

##### deltaE

Get the delta from two LAB colors.

```ts
deltaE(labA: [number, number, number], labB: [number, number, number]) => number;
```

##### rgbToHcl

Convert RGB to HCL.

```ts
rgbToHcl([r, g, b]: [number, number, number]) => [number, number, number];
```

##### hclToRgb

Convert HCL to RGB.

```ts
hclToRgb([h, c, l]: [number, number, number]) => [number, number, number];
```

### DOM

##### closest

Find the closest parent that matches a selector.

```ts
closest(element: Element, selector: Element | string) => Element | null;
```

##### createCanvas

Create a canvas and 2d context.

```ts
createCanvas(width: number, height: number) => { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D };
```

##### injectStyles

Inject CSS styles in `document.head`.

```ts
injectStyles(cssContent: string) => void;
```

### Files

##### download

Download a Blob object into user files.

```ts
download(blob: Blob, filename: string) => void;
```

##### upload

Upload a file from user files.

```ts
upload(onLoad: (dataUrl: string) => void, accept?: string) => void;
```

### Functions

##### noop

No-op function.

```ts
noop() => void;
```

##### wait

Promise wrapped setTimeout.

```ts
wait(timeout: number) => Promise<void>;
```

##### defer

Deferred promise implementation.

```ts
defer<T>() => Deferred<T>;
```

### Geometry

##### toDegrees

Convert a radians value into degrees.

```ts
toDegrees(radians: number) => number;
```

##### toRadians

Convert a degrees value into radians.

```ts
toRadians(degrees: number) => number;
```

##### angle

Calculate the angle from a point to another.

```ts
angle(x1: number, y1: number, x2: number, y2: number) => number;
```

##### closestAngle

Find the closest angle between to angles.

```ts
closestAngle(source: number, target: number) => number;
```

##### distance

Calculate the distance between two points.

```ts
distance(x1: number, y1: number, x2: number, y2: number) => number;
```

##### diagonal

Calculate the length of the diagonal of a rectangle.

```ts
diagonal(width: number, height: number) => number;
```

##### radToSphere

Convert radians to a 3D point on the surface of a unit sphere.

```ts
radToSphere(radius: number, phi: number, theta: number, target?: Vector3) => Vector3;
```

##### cover

Make a target fit a container (cover mode).

```ts
cover(target: FitInput, container: FitInput) => FitOutput;
```

##### contain

Make a target fit a container (contain mode).

```ts
contain(target: FitInput, container: FitInput) => FitOutput;
```

### Maths

##### isEven

Check if a number is even.

```ts
isEven(value: number) => boolean;
```

##### isOdd

Check if a number is odd.

```ts
isOdd(value: number) => boolean;
```

##### isPowerOf2

Check if a number is a power of 2.

```ts
isPowerOf2(value: number) => boolean;
```

##### toPowerOf2

Find closest power of 2 that fits a number.

```ts
toPowerOf2(value: number, mode?: 'floor' | 'ceil' | 'round') => number;
```

##### sign

Return the sign (positive or negative) of a number.

```ts
sign(number: number) => number;
```

##### clamp

Clamp a value between two bounds.

```ts
clamp(value: number, min?: number, max?: number) => number;
```

##### lerp

Linear interpolation between two values (lerping).

```ts
lerp(value: number, min: number, max: number) => number;
```

##### triLerp

Triangular interpolation between two values.

```ts
triLerp(value: number, min: number, max: number, target: number) => number;
```

##### expLerp

Exponential interpolation between two values.

```ts
expLerp(value: number, min: number, max: number) => number;
```

##### normalize

Normalize a value between two bounds.

```ts
normalize(value: number, min: number, max: number) => number;
```

##### map

Re-map a number from one range to another.

```ts
map(value: number, currentMin: number, currentMax: number, targetMin: number, targetMax: number) => number;
```

##### roundTo

Round a number up to a nearest multiple.

```ts
roundTo(value: number, multiple?: number) => number;
```

##### modAbs

Modulo absolute a value based on a length.

```ts
modAbs(value: number, length: number) => number;
```

##### pingPong

Move back and forth a value between 0 and length, so that it is never larger than length and never smaller than 0.

```ts
pingPong(value: number, length: number) => number;
```

##### smoothstep

Smooth a value using cubic Hermite interpolation.

```ts
smoothstep(value: number, min?: number, max?: number) => number;
```

##### parabola

Re-map the [0, 1] interval into [0, 1] parabola, such that corners are remaped to 0 and the center to 1.

```ts
parabola(x: number, power?: number) => number;
```

##### sum

Return the sum of numbers.

```ts
sum(array: number[]) => number;
```

##### average

Return the average of numbers.

```ts
average(array: number[]) => number;
```

##### damp

Smoothly interpolate a number toward another.

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

##### randomBoolean

Generate a random boolean (true or false).

```ts
randomBoolean(probability?: number) => boolean;
```

##### randomSign

Generate a random sign (1 or -1).

```ts
randomSign(probability?: number) => number;
```

##### randomFloat

Generate a random floating-point numbers within a specified range.

```ts
randomFloat(min?: number, max?: number, precision?: number) => number;
```

##### randomInt

Generate a random integer number within a specified range.

```ts
randomInt(min: number, max: number) => number;
```

##### randomHexColor

Generate a random hexadecimal color.

```ts
randomHexColor() => string;
```

##### randomItem

Pick a random item from a given array.

```ts
randomItem<T>(array: T[] = []) => T | undefined;
```

##### randomObjectProperty

Pick a random property value from a given object.

```ts
randomObjectProperty<T>(object: { [key: string]: T }) => T | undefined;
```

##### randomIndex

Select a random index from an array of weighted items.

```ts
randomIndex(weights?: number[]) => number;
```

##### onCircle

Produce a random 2D point around the perimiter of a unit circle.

```ts
onCircle(radius?: number, target?: Vector2) => Vector2;
```

##### insideCircle

Produce a random 2D point inside a unit circle.

```ts
insideCircle(radius?: number, target?: Vector2) => Vector2;
```

##### onSphere

Produce a random 3D point on the surface of a unit sphere.

```ts
onSphere(radius?: number, target?: Vector3) => Vector3;
```

##### insideSphere

Produce a random 3D point inside a unit sphere.

```ts
insideSphere(radius?: number, target?: Vector3) => Vector3;
```

### Strings

##### capitalize

Capitalize a string.

```ts
capitalize(string: string) => string;
```

##### cleanPath

Clean a path by removing params.

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
