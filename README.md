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
import { maths } from 'toosoon-utils';

console.log(maths.lerp(0.5, 0, 5)); // 2.5
```

```js
import { PI } from 'toosoon-utils/lib/constants';

console.log(PI); // 3.141592653589793
```

## Functions

### Colors

```ts
// Normalize an hexadecimal string
normalizeHexString(hex: string) => string;
```

```ts
// Convert RGB to hexadecimal
rgbToHex([r, g, b]: [number, number, number]) => number;
```

```ts
// Convert RGB to hexadecimal string
rgbToHexString([r, g, b]: [number, number, number]) => string;
```

```ts
// Convert hexadecimal to RGB
hexToRgb(hex: number | string) => [number, number, number];
```

```ts
// Lighten a color
lighten(hex: string, amount?: number) => string;
```

```ts
// Darken a color
darken(hex: string, amount?: number) => string;
```

```ts
// Normalize an HSL string
normalizeHslString(hsl: string) => [number, number, number];
```

```ts
// Convert RGB to HSL
rgbToHsl([r, g, b]: [number, number, number]) => [number, number, number];
```

```ts
// Convert HSL to RGB
hslToRgb([h, s, l]: [number, number, number]) => [number, number, number];
```

```ts
// Convert RGB to HSB
rgbToHsb([r, g, b]: [number, number, number]) => [number, number, number];
```

```ts
// Convert HSB to RGB
hsbToRgb([h, s, b]: [number, number, number]) => [number, number, number];
```

```ts
// Convert LAB to HCL
labToHcl([l, a, b]: [number, number, number]) => [number, number, number];
```

```ts
// Convert HCL to LAB
hclToLab([h, c, l]: [number, number, number]) => [number, number, number];
```

```ts
// Convert LAB to RGB
labToRgb([l, a, b]: [number, number, number]) => [number, number, number];
```

```ts
// Convert RGB to LAB
rgbToLab([r, g, b]: [number, number, number]) => [number, number, number];
```

```ts
// Get the delta from two LAB colors
deltaE(labA: [number, number, number], labB: [number, number, number]) => number;
```

```ts
// Convert RGB to HCL
rgbToHcl([r, g, b]: [number, number, number]) => [number, number, number];
```

```ts
// Convert HCL to RGB
hclToRgb([h, c, l]: [number, number, number]) => [number, number, number];
```

### DOM

```ts
// Find the closest parent that matches a selector
closest(element: Element, selector: Element | string) => Element | null;
```

```ts
// Create a canvas and 2d context
createCanvas(width: number, height: number) => { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D };
```

```ts
// Inject CSS styles in `document.head`
injectStyles(cssContent: string) => void;
```

### Files

```ts
// Download a Blob object into user files
download(blob: Blob, filename: string) => void;
```

```ts
// Upload a file from user files
upload(onLoad: (dataUrl: string) => void, accept?: string) => void;
```

### Functions

```ts
// No-op function
noop() => void;
```

```ts
// Promise wrapped setTimeout
wait(timeout: number) => Promise<void>;
```

```ts
// Deferred promise implementation
defer<T>() => Deferred<T>;
```

### Geometry

```ts
// Convert a radians value into degrees
toDegrees(radians: number) => number;
```

```ts
// Convert a degrees value into radians
toRadians(degrees: number) => number;
```

```ts
// Calculate the angle from a point to another
angle(x1: number, y1: number, x2: number, y2: number) => number;
```

```ts
// Find the closest angle between to angles
closestAngle(source: number, target: number) => number;
```

```ts
// Calculate the distance between two points
distance(x1: number, y1: number, x2: number, y2: number) => number;
```

```ts
// Calculate the length of the diagonal of a rectangle
diagonal(width: number, height: number) => number;
```

```ts
// Convert radians to a 3D point on the surface of a unit sphere
radToSphere(radius: number, phi: number, theta: number, target?: Vector3) => Vector3;
```

```ts
// Make a target fit a container (cover mode)
cover(target: FitInput, container: FitInput) => FitOutput;
```

```ts
// Make a target fit a container (contain mode)
contain(target: FitInput, container: FitInput) => FitOutput;
```

### Maths

```ts
// Check if a number is even
isEven(value: number) => boolean;
```

```ts
// Check if a number is odd
isOdd(value: number) => boolean;
```

```ts
// Check if a number is a power of 2
isPowerOf2(value: number) => boolean;
```

```ts
// Find closest power of 2 that fits a number
toPowerOf2(value: number, mode?: 'floor' | 'ceil' | 'round') => number;
```

```ts
// Return the sign (positive or negative) of a number
sign(number: number) => number;
```

```ts
// Clamp a value between two bounds
clamp(value: number, min?: number, max?: number) => number;
```

```ts
// Linear interpolation between two values (lerping)
lerp(value: number, min: number, max: number) => number;
```

```ts
// Triangular interpolation between two values
triLerp(value: number, min: number, max: number, target: number) => number;
```

```ts
// Exponential interpolation between two values
expLerp(value: number, min: number, max: number) => number;
```

```ts
// Normalize a value between two bounds
normalize(value: number, min: number, max: number) => number;
```

```ts
// Re-map a number from one range to another
map(value: number, currentMin: number, currentMax: number, targetMin: number, targetMax: number) => number;
```

```ts
// Round a number up to a nearest multiple
roundTo(value: number, multiple?: number) => number;
```

```ts
// Modulo absolute a value based on a length
modAbs(value: number, length: number) => number;
```

```ts
// Move back and forth a value between 0 and length, so that it is never larger than length and never smaller than 0
pingPong(value: number, length: number) => number;
```

```ts
// Smooth a value using cubic Hermite interpolation
smoothstep(value: number, min?: number, max?: number) => number;
```

```ts
// Re-map the [0, 1] interval into [0, 1] parabola, such that corners are remaped to 0 and the center to 1
parabola(x: number, power?: number) => number;
```

```ts
// Return the sum of numbers
sum(array: number[]) => number;
```

```ts
// Return the average of numbers
average(array: number[]) => number;
```

```ts
// Smoothly interpolate a number toward another
damp(value: number, target: number, damping: number, delta: number) => number;
```

### Now

```ts
// Polyfill for "now()" functions
now() => number;
```

### Random

```ts
// Generate a random boolean (true or false)
randomBoolean(probability?: number) => boolean;
```

```ts
// Generate a random sign (1 or -1)
randomSign(probability?: number) => number;
```

```ts
// Generate a random float number
randomFloat(min?: number, max?: number, precision?: number) => number;
```

```ts
// Generate a random integer number
randomInt(min: number, max: number) => number;
```

```ts
// Generate a random hexadecimal color
randomHexColor() => string;
```

```ts
// Pick a random item from an array
randomItem<T>(array: T[] = []) => T | undefined;
```

```ts
// Pick a random property from an object
randomObjectProperty<T>(object: { [key: string]: T }) => T | undefined;
```

```ts
// Return a random index from an array of weights
randomIndex(weights?: number[]) => number;
```

```ts
// Produce a random 2D point around the perimiter of a unit circle
onCircle(radius?: number, target?: Vector2) => Vector2;
```

```ts
// Produce a random 2D point inside a unit circle
insideCircle(radius?: number, target?: Vector2) => Vector2;
```

```ts
// Produce a random 3D point on the surface of a unit sphere
onSphere(radius?: number, target?: Vector3) => Vector3;
```

```ts
// Produce a random 3D point inside a unit sphere
insideSphere(radius?: number, target?: Vector3) => Vector3;
```

### Strings

```ts
// Capitalize a string
capitalize(string: string) => string;
```

```ts
// Clean a path by removing params
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
