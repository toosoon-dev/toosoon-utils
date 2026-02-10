## Geometry

### Vector2 <a id="vector-2"></a>

Utility class for manipulating a 2D vectors.

- [new Vector2(x?, y?)](#vector-2-constructor)
  - .isVector2: `true`
  - [.x](#vector-2-x): `number`
  - [.y](#vector-2-y): `number`
  - [.width](#vector-width): `width`
  - [.height](#vector-height): `height`
  - [.set(x, y)](#vector-2-set-method): `this`
  - [.setScalar(scalar)](#vector-2-set-scalar-method): `this`
  - [.setX(x)](#vector-2-set-x-method): `this`
  - [.setY(Y)](#vector-2-set-y-method): `this`
  - [.setValue(index, value)](#vector-2-set-value-method): `this`
  - [.getValue(index)](#vector-2-get-value-method): `number`
  - [.add(vector)](#vector-2-add-method): `this`
  - [.addScalar(scalar)](#vector-2-add-scalar-method): `this`
  - [.sub(vector)](#vector-2-sub-method): `this`
  - [.subScalar(scalar)](#vector-2-sub-scalar-method): `this`
  - [.multiply(vector)](#vector-2-multiply-method): `this`
  - [.multiplyScalar(scalar)](#vector-2-multiply-scalar-method): `this`
  - [.divide(vector)](#vector-2-divide-method): `this`
  - [.divideScalar(scalar)](#vector-2-divide-scalar-method): `this`
  - [.min(vector)](#vector-2-min-method): `this`
  - [.max(vector)](#vector-2-max-method): `this`
  - [.clamp(min, max)](#vector-2-clamp-method): `this`
  - [.clampScalar(min, max)](#vector-2-clamp-scalar-method): `this`
  - [.floor()](#vector-2-floor-method): `this`
  - [.ceil()](#vector-2-ceil-method): `this`
  - [.round()](#vector-2-round-method): `this`
  - [.trunc()](#vector-2-trunc-method): `this`
  - [.negate()](#vector-2-negate-method): `this`
  - [.rotateAround(center, angle)](#vector-2-rotate-around-method): `this`
  - [.lerp(t, vector)](#vector-2-lerp-method): `this`
  - [.normalize()](#vector-2-normalize-method): `this`
  - [.applyMatrix(matrix)](#vector-2-apply-matrix-method): `this`
  - [.setLength(length)](#vector-2-set-length-method): `this`
  - [.length()](#vector-2-length-method): `number`
  - [.squaredLength()](#vector-2-squared-length-method): `number`
  - [.manhattanLength()](#vector-2-manhattan-length-method): `number`
  - [.equals(vector)](#vector-2-equals-method): `boolean`
  - [.collinear(vector1, vector2)](#vector-2-collinear-method): `boolean`
  - [.dot(vector)](#vector-2-dot-method): `number`
  - [.cross(vector)](#vector-2-cross-method): `number`
  - [.angle()](#vector-2-angle-method): `number`
  - [.angleTo(vector)](#vector-2-angle-to-method): `number`
  - [.distanceTo(vector)](#vector-2-distance-to-method): `number`
  - [.squaredDistanceTo(vector)](#vector-2-squared-distance-to-method): `number`
  - [.manhattanDistanceTo(vector)](#vector-2-manhattan-distance-to-method): `number`
  - [.toArray()](#vector-2-to-array-method): `[number, number]`
  - [.fromArray(values)](#vector-2-from-array-method): `this`
  - [.fromCircular(angle, radius?)](#vector-2-from-circular-method): `this`
  - [.copy(vector)](#vector-2-copy-method): `this`
  - [.clone()](#vector-2-clone-method): `Vector2`
  - `static` [.add(vector1, vector2)](#vector-2-static-add-method): `[number, number]`
  - `static` [.sub(vector1, vector2)](#vector-2-static-sub-method): `[number, number]
  - `static` [.multiply(vector1, vector2)](#vector-2-static-multiply-method): `[number, number]
  - `static` [.divide(vector1, vector2)](#vector-2-static-divide-method): `[number, number]
  - `static` [.rotate(vector, center, angle)](#vector-2-static-rotate-method): `[number, number]`
  - `static` [.lerp(t, min, max)](#vector-2-static-lerp-method): `[number, number]`
  - `static` [.equals(vector1, vector2)](#vector-2-static-equals-method): `boolean`
  - `static` [.collinear(vector1, vector2, vector3)](#vector-2-static-collinear-method): `boolean`
  - `static` [.dot(vector1, vector2)](#vector-2-static-dot-method): `number`
  - `static` [.cross(vector1, vector2)](#vector-2-static-cross-method): `number`
  - `static` [.angle(vector)](#vector-2-static-angle-method): `number`
  - `static` [.distance(vector1, vector2)](#vector-2-static-distance-method): `number`
  - `static` [.squaredDistance(vector1, vector2)](#vector-2-static-squared-distance-method): `number`
  - `static` [.manhattanDistance(vector1, vector2)](#vector-2-static-manhattan-distance-method): `number`
  - `static` [.length(vector)](#vector-2-static-length-method): `number`
  - `static` [.squaredLength(vector)](#vector-2-static-squared-length-method): `number`
  - `static` [.manhattanLength(vector)](#vector-2-static-manhattan-length-method): `number`
  - `static` [.fromCircularCoords(angle, radius)](#vector-2-static-from-circular-coords-method): `[number, number]`

#### Constructor <a id="vector-2-constructor"></a>

| Parameter | Type     | Default | Description   |
| --------- | -------- | ------- | ------------- |
| x         | `number` | `0`     | X-axis value. |
| y         | `number` | `0`     | Y-axis value. |

#### Properties

##### .`x` <a id="vector-2-x"></a>

X-axis value of the vector.

```ts
Vector2.x: number;
```

##### .`y` <a id="vector-2-y"></a>

Y-axis value of the vector.

```ts
Vector2.y: number;
```

##### .`width` <a id="vector-2-width"></a>

X-axis value of the vector.

```ts
Vector2.width: number;
```

##### .`height` <a id="vector-2-height"></a>

Y-axis value of the vector.

```ts
Vector2.height: number;
```

#### Methods

##### .`set(x, y)` <a id="vector-2-set-method"></a>

Set the vector values.

- `x`: X-axis value.
- `y`: Y-axis value.

```ts
Vector2.set(x: number, y: number): this;
```

##### .`setScalar(scalar)` <a id="vector-2-set-scalar-method"></a>

Set a given scalar value to all values of the vector.

- `scalar`: Value to set for all values.

```ts
Vector2.setScalar(scalar: number): this;
```

##### .`setX(x)` <a id="vector-2-set-x-method"></a>

Set the vector X-axis value.

- `x`: X-axis value to set.

```ts
Vector2.setX(x: number): this;
```

##### .`setY(Y)` <a id="vector-2-set-y-method"></a>

Set the vector Y-axis value.

- `y`: Y-axis value to set.

```ts
Vector2.setY(y: number): this;
```

##### .`setValue(index, value)` <a id="vector-2-set-value-method"></a>

Set a given value from the vector.

- `index`: `0` equals to `x`, `1` equals to `y`.
- `value`: Value to set.

```ts
Vector2.setValue(index: 'x' | 'y' | number, value: number): this;
```

##### .`getValue(index)` <a id="vector-2-get-value-method"></a>

Return a value from the vector.

- `index`: `0` equals to `x`, `1` equals to `y`.

```ts
Vector2.getValue(index: 'x' | 'y' | number): number;
```

##### .`add(vector)` <a id="vector-2-add-method"></a>

Add a given vector to the vector.

- `vector`: Vector to add.

```ts
Vector2.add(vector: Vector2 | [number, number]): this;
```

##### .`addScalar(scalar)` <a id="vector-2-add-scalar-method"></a>

Add a given scalar value to all values of the vector.

- `scalar`: Scalar value to add.

```ts
Vector2.addScalar(scalar: number): this;
```

##### .`sub(vector)` <a id="vector-2-sub-method"></a>

Subtract a given vector to the vector.

- `vector`: Vector to subtract.

```ts
Vector2.sub(vector: Vector2 | [number, number]): this;
```

##### .`subScalar(scalar)` <a id="vector-2-sub-scalar-method"></a>

Subtract a given scalar value to all values of the vector.

- `scalar`: Scalar value to subtract.

```ts
Vector2.subScalar(scalar: number): this;
```

##### .`multiply(vector)` <a id="vector-2-multiply-method"></a>

Multiply a given vector to the vector.

- `vector`: Vector to multiply.

```ts
Vector2.multiply(vector: Vector2 | [number, number]): this;
```

##### .`multiplyScalar(scalar)` <a id="vector-2-multiply-scalar-method"></a>

Multiply a given scalar value to all values of the vector.

- `scalar`: Scalar value to multiply.

```ts
Vector2.multiplyScalar(scalar: number): this;
```

##### .`divide(vector)` <a id="vector-2-divide-method"></a>

Divide a given vector to the vector.

- `vector`: Vector to divide.

```ts
Vector2.divide(vector: Vector2 | [number, number]): this;
```

##### .`divideScalar(scalar)` <a id="vector-2-divide-scalar-method"></a>

Divide a given scalar value to all values of the vector.

- `scalar`: Scalar value to divide.

```ts
Vector2.divideScalar(scalar: number): this;
```

##### .`min(vector)` <a id="vector-2-min-method"></a>

Set the vector values to the min values compared to a given vector.

- `vector`: Vector to compare values with.

```ts
Vector2.min(vector: Vector2 | [number, number]): this;
```

##### .`max(vector)` <a id="vector-2-max-method"></a>

Set the vector values to the max values compared to a given vector.

- `vector`: Vector to compare values with.

```ts
Vector2.max(vector: Vector2 | [number, number]): this;
```

##### .`clamp(min, max)` <a id="vector-2-clamp-method"></a>

Clamp the vector values to given boundaries.

- `min`: Minimum boundaries.
- `max`: Maximum boundaries.

```ts
Vector2.clamp(min: Vector2 | [number, number], max: Vector2 | [number, number]): this;
```

##### .`clampScalar(min, max)` <a id="vector-2-clamp-scalar-method"></a>

Clamp the vector values to given scalar values.

- `min`: Minimum scalar boundary.
- `max`: Maximum scalar boundary.

```ts
Vector2.clampScalar(min: number, max: number): this;
```

##### .`floor()` <a id="vector-2-floor-method"></a>

Round down to the nearest integer value the vector values.

```ts
Vector2.floor(): this;
```

##### .`ceil()` <a id="vector-2-ceil-method"></a>

Round up to the nearest integer value the vector values.

```ts
Vector2.ceil(): this;
```

##### .`round()` <a id="vector-2-round-method"></a>

Round to the nearest integer value the vector values.

```ts
Vector2.round(): this;
```

##### .`trunc()` <a id="vector-2-trunc-method"></a>

Remove any fractional digits of the vector values.

```ts
Vector2.trunc(): this;
```

##### .`negate()` <a id="vector-2-negate-method"></a>

Set the vector values to their negative values.

```ts
Vector2.negate(): this;
```

##### .`rotateAround(center, angle)` <a id="vector-2-rotate-around-method"></a>

Rotate the vector around a given center by a given angle.

- `center`: Vector around which to rotate.
- `angle`: Angle to rotate (in radians).

```ts
Vector2.rotateAround(center: Vector2 | [number, number], angle: number): this;
```

##### .`lerp(t, vector)` <a id="vector-2-lerp-method"></a>

Linearly interpolate the vector values towards a given vector values.

- `t`: Normalized time value to interpolate.
- `vector`: Vector to interpolate values towards.

```ts
Vector2.lerp(t: number, vector: Vector2 | [number, number]): this;
```

##### .`normalize()` <a id="vector-2-normalize-method"></a>

Convert the vector to a unit vector.

```ts
Vector2.normalize(): this;
```

##### .`applyMatrix(matrix)` <a id="vector-2-apply-matrix-method"></a>

Transform the vector by a given matrix.

- `matrix`: Matrix to apply.

```ts
Vector2.applyMatrix(matrix: DOMMatrix): this;
```

##### .`setLength(length)` <a id="vector-2-set-length-method"></a>

Set the vector values to the same direction but with a given length.

- `length`: Length value.

```ts
Vector2.setLength(length: number): this;
```

##### .`length()` <a id="vector-2-length-method"></a>

Compute the Euclidean length of the vector.

```ts
Vector2.length(): number;
```

##### .`squaredLength()` <a id="vector-2-squared-length-method"></a>

Compute the squared length of the vector.

```ts
Vector2.squaredLength(): number;
```

##### .`manhattanLength()` <a id="vector-2-manhattan-length-method"></a>

Compute the Manhattan length of the vector.

```ts
Vector2.manhattanLength(): number;
```

##### .`equals(vector)` <a id="vector-2-equals-method"></a>

Check if the vector is equal with a given vector.

- `vector`: Vector to check.

```ts
Vector2.equals(vector: Vector2 | [number, number]): boolean;
```

##### .`collinear(vector1, vector2)` <a id="vector-2-collinear-method"></a>

Check if the vector is collinear with given vectors.

- `vector1`: First vector to check.
- `vector2`: Second vector to check.

```ts
Vector2.collinear(v1: Vector2 | [number, number], v2: Vector2 | [number, number]): boolean;
```

##### .`dot(vector)` <a id="vector-2-dot-method"></a>

Compute the dot product of a given vector with the vector.

- `vector`: Vector to compute the dot product with.

```ts
Vector2.dot(vector: Vector2 | [number, number]): number;
```

##### .`cross(vector)` <a id="vector-2-cross-method"></a>

Compute the cross product of a given vector with the vector.

- `vector`: Vector to compute the cross product with.

```ts
Vector2.cross(vector: Vector2 | [number, number]): number;
```

##### .`angle()` <a id="vector-2-angle-method"></a>

Compute the angle of the vector with respect to the positive X-axis.

```ts
Vector2.angle(): number;
```

##### .`angleTo(vector)` <a id="vector-2-angle-to-method"></a>

Compute the angle between a given vector and the vector.

- `vector`: Vector to compute the angle with.

```ts
Vector2.angleTo(vector: Vector2 | [number, number]): number;
```

##### .`distanceTo(vector)` <a id="vector-2-distance-to-method"></a>

Compute the Euclidean distance from a given vector to the vector.

- `vector`: tor to compute the distance to.

```ts
Vector2.distanceTo(vector: Vector2 | [number, number]): number;
```

##### .`squaredDistanceTo(vector)` <a id="vector-2-squared-distance-to-method"></a>

Compute the squared distance from a given vector to the vector.

- `vector`: Vector to compute the squared distance to.

```ts
Vector2.squaredDistanceTo(vector: Vector2 | [number, number]): number;
```

##### .`manhattanDistanceTo(vector)` <a id="vector-2-manhattan-distance-to-method"></a>

Compute the Manhattan distance from a given vector to the vector.

- `vector`: Vector to compute the Manhattan distance to.

```ts
Vector2.manhattanDistanceTo(vector: Vector2 | [number, number]): number;
```

##### .`toArray()` <a id="vector-2-to-array-method"></a>

Return the vector values into an array.

```ts
Vector2.toArray(): [number, number];
```

##### .`fromArray(values)` <a id="vector-2-from-array-method"></a>

Set the vector values from a given array.

- `values`: Values to set.

```ts
Vector2.fromArray(values: number[]): this;
```

##### .`fromCircular(angle, radius?)` <a id="vector-2-from-circular-method"></a>

Set the vector values from given circular coordinates.

- `angle`: Angle (in radians).
- `[radius]`: Radius of the circle.

```ts
Vector2.fromCircularCoords(angle: number, radius?: number): this;
```

##### .`copy(vector)` <a id="vector-2-copy-method"></a>

Copy the values of a given vector to the vector.

- `vector`: Vector to copy values from.

```ts
Vector2.copy(vector: Vector2 | [number, number]): this;
```

##### .`clone()` <a id="vector-2-clone-method"></a>

Create a new 2D vector with copied values from the vector.

```ts
Vector2.clone(): Vector2;
```

##### `static` Vector2.`add(vector1, vector2)` <a id="vector-2-static-add-method"></a>

Add two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.add(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): [number, number];
```

##### `static` Vector2.`sub(vector1, vector2)` <a id="vector-2-static-sub-method"></a>

Subtract two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.sub(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): [number, number];
```

##### `static` Vector2.`multiply(vector1, vector2)` <a id="vector-2-static-multiply-method"></a>

Multiply two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.multiply(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): [number, number];
```

##### `static` Vector2.`divide(vector1, vector2)` <a id="vector-2-static-divide-method"></a>

Divide two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.divide(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): [number, number];
```

##### `static` Vector2.`rotate(vector, center, angle)` <a id="vector-2-static-rotate-method"></a>

Rotate a vector around a given center by a given angle.

- `vector`: Vector to rotate.
- `center`: Vector around which to rotate.
- `angle`: Angle to rotate (in radians).

```ts
static Vector2.rotate(vector: Vector2 | [number, number], center: Vector2 | [number, number], angle: number): [number, number];
```

##### `static` Vector2.`lerp(t, min, max)` <a id="vector-2-static-lerp-method"></a>

Linearly interpolate a point between two vectors.

- `t`: Normalized time value to interpolate.
- `min`: Minimum boundaries.
- `max`: Maximum boundaries.

```ts
static Vector2.lerp(t: number, min: Vector2 | [number, number], max: Vector2 | [number, number]): [number, number];
```

##### `static` Vector2.`equals(vector1, vector2)` <a id="vector-2-static-equals-method"></a>

Check if two vectors are equal to each other.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.equals(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): boolean;
```

##### `static` Vector2.`collinear(vector1, vector2, vector3)` <a id="vector-2-static-collinear-method"></a>

Check if three vectors are collinear (aligned on the same line).

- `vector1`: First vector.
- `vector2`: Second vector.
- `vector3`: Third vector.

```ts
static Vector2.collinear(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number], vector2: Vector2 | [number, number]): boolean;
```

##### `static` Vector2.`dot(vector1, vector2)` <a id="vector-2-static-dot-method"></a>

Compute the dot product of two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.dot(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): number;
```

##### `static` Vector2.`cross(vector1, vector2)` <a id="vector-2-static-cross-method"></a>

Compute the cross product of two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.cross(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): number;
```

##### `static` Vector2.`angle(vector)` <a id="vector-2-static-angle-method"></a>

Compute the angle of a given vector with respect to the positive X-axis.

- `vector`: Vector to compute angle from.

```ts
static Vector2.angle(vector: Vector2 | [number, number]): number;
```

##### `static` Vector2.`distance(vector1, vector2)` <a id="vector-2-static-distance-method"></a>

Compute the Euclidean distance between two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.distance(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): number;
```

##### `static` Vector2.`squaredDistance(vector1, vector2)` <a id="vector-2-static-squared-distance-method"></a>

Compute the squared distance between two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.squaredDistance(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): number;
```

##### `static` Vector2.`manhattanDistance(vector1, vector2)` <a id="vector-2-static-manhattan-distance-method"></a>

Compute the Manhattan distance between two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.manhattanDistance(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): number;
```

##### `static` Vector2.`length(vector)` <a id="vector-2-static-length-method"></a>

Compute the Euclidean length of a vector.

- `vector`: Vector to compute Euclidean length from.

```ts
static Vector2.length(vector: Vector2 | [number, number]): number;
```

##### `static` Vector2.`squaredLength(vector)` <a id="vector-2-static-squared-length-method"></a>

Compute the squared length of a vector.

- `vector`: Vector to compute squared length from.

```ts
static Vector2.squaredLength(vector: Vector2 | [number, number]): number;
```

##### `static` Vector2.`manhattanLength(vector)` <a id="vector-2-static-manhattan-length-method"></a>

Compute the Manhattan length of a vector.

- `vector`: Vector to compute Manhattan length from.

```ts
static Vector2.manhattanLength(vector: Vector2 | [number, number]): number;
```

##### `static` Vector2.`fromCircularCoords(angle, radius?)` <a id="vector-2-static-from-circular-coords-method"></a>

Convert circular coordinates to a 2D point on the surface of a circle.

- `angle`: Angle (in radians).
- `[radius=1]`: Radius of the circle.

```ts
static Vector2.fromCircularCoords(angle: number, radius?: number): [number, number];
```

### Vector3 <a id="vector-3"></a>

Utility class for manipulating a 3D vectors.

- [new Vector3(x?, y?, z?)](#vector-3-constructor)
  - .isVector3: `true`
  - [.x](#vector-3-x): `number`
  - [.y](#vector-3-y): `number`
  - [.z](#vector-3-z): `number`
  - [.set(x, y, z)](#vector-3-set-method): `this`
  - [.setScalar(scalar)](#vector-3-set-scalar-method): `this`
  - [.setX(x)](#vector-3-set-x-method): `this`
  - [.setY(y)](#vector-3-set-y-method): `this`
  - [.setZ(z)](#vector-3-set-z-method): `this`
  - [.setValue(index, value)](#vector-3-set-value-method): `this`
  - [.getValue(index)](#vector-3-get-value-method): `number`
  - [.add(vector)](#vector-3-add-method): `this`
  - [.addScalar(scalar)](#vector-3-add-scalar-method): `this`
  - [.sub(vector)](#vector-3-sub-method): `this`
  - [.subScalar(scalar)](#vector-3-sub-scalar-method): `this`
  - [.multiply(vector)](#vector-3-multiply-method): `this`
  - [.multiplyScalar(scalar)](#vector-3-multiply-scalar-method): `this`
  - [.divide(vector)](#vector-3-divide-method): `this`
  - [.divideScalar(scalar)](#vector-3-divide-scalar-method): `this`
  - [.min(vector)](#vector-3-min-method): `this`
  - [.max(vector)](#vector-3-max-method): `this`
  - [.clamp(min, max)](#vector-3-clamp-method): `this`
  - [.clampScalar(min, max)](#vector-3-clamp-scalar-method): `this`
  - [.floor()](#vector-3-floor-method): `this`
  - [.ceil()](#vector-3-ceil-method): `this`
  - [.round()](#vector-3-round-method): `this`
  - [.trunc()](#vector-3-trunc-method): `this`
  - [.negate()](#vector-3-negate-method): `this`
  - [.lerp(t, vector)](#vector-3-lerp-method): `this`
  - [.normalize()](#vector-3-normalize-method): `this`
  - [.applyMatrix(matrix)](#vector-3-apply-matrix-method): `this`
  - [.setLength(length)](#vector-3-set-length-method): `this`
  - [.projectOnVector(vector)](#vector-3-project-on-vector-method): `this`
  - [.length()](#vector-3-length-method): `number`
  - [.squaredLength()](#vector-3-squared-length-method): `number`
  - [.manhattanLength()](#vector-3-manhattan-length-method): `number`
  - [.equals(vector)](#vector-3-equals-method): `boolean`
  - [.collinear(vector1, vector2)](#vector-3-collinear-method): `boolean`
  - [.dot(vector)](#vector-3-dot-method): `number`
  - [.cross(vector)](#vector-3-cross-method): `[number, number, number]`
  - [.angleTo(vector)](#vector-3-angle-to-method): `number`
  - [.distanceTo(vector)](#vector-3-distance-to-method): `number`
  - [.squaredDistanceTo(vector)](#vector-3-squared-distance-to-method): `number`
  - [.manhattanDistanceTo(vector)](#vector-3-manhattan-distance-to-method): `number`
  - [.toArray()](#vector-3-to-array-method): `[number, number, number]`
  - [.fromArray(values)](#vector-3-from-array-method): `this`
  - [.fromSphericalCoords(phi, theta, radius?)](#vector-3-from-spherical-method): `this`
  - [.fromCylindricalCoords(theta, y, radius?)](#vector-3-from-cylindrical-method): `this`
  - [.copy(vector)](#vector-3-copy-method): `this`
  - [.clone()](#vector-3-clone-method): `Vector3`
  - `static` [.add(vector1, vector2)](#vector-3-static-add-method): `[number, number, number]`
  - `static` [.sub(vector1, vector2)](#vector-3-static-sub-method): `[number, number, number]`
  - `static` [.multiply(vector1, vector2)](#vector-3-static-multiply-method): `[number, number, number]`
  - `static` [.divide(vector1, vector2)](#vector-3-static-divide-method): `[number, number, number]`
  - `static` [.lerp(t, min, max)](#vector-3-static-lerp-method): `[number, number, number]`
  - `static` [.equals(vector1, vector2)](#vector-3-static-equals-method): `boolean`
  - `static` [.collinear(vector1, vector2, vector3)](#vector-3-static-collinear-method): `boolean`
  - `static` [.dot(vector1, vector2)](#vector-3-static-dot-method): `number`
  - `static` [.cross(vector1, vector2)](#vector-3-static-cross-method): `[number, number, number]`
  - `static` [.distance(vector1, vector2)](#vector-3-static-distance-method): `number`
  - `static` [.squaredDistance(vector1, vector2)](#vector-3-static-squared-distance-method): `number`
  - `static` [.manhattanDistance(vector1, vector2)](#vector-3-static-manhattan-distance-method): `number`
  - `static` [.length(vector)](#vector-3-static-length-method): `number`
  - `static` [.squaredLength(vector)](#vector-3-static-squared-length-method): `number`
  - `static` [.manhattanLength(vector)](#vector-3-static-manhattan-length-method): `number`
  - `static` [.fromSphericalCoords(phi, theta, radius?)](#vector-3-static-from-spherical-coords-method): `[number, number, number]`
  - `static` [.fromCylindricalCoords(theta, y, radius?)](#vector-3-static-from-cylindrical-coords-method): `[number, number, number]`

#### Constructor <a id="vector-3-constructor"></a>

| Parameter | Type     | Default | Description   |
| --------- | -------- | ------- | ------------- |
| x         | `number` | `0`     | X-axis value. |
| y         | `number` | `0`     | Y-axis value. |
| z         | `number` | `0`     | Z-axis value. |

#### Properties

##### .`x` <a id="vector-3-x"></a>

X-axis value of the vector.

```ts
Vector3.x: number;
```

##### .`y` <a id="vector-3-y"></a>

Y-axis value of the vector.

```ts
Vector3.y: number;
```

##### .`z` <a id="vector-3-z"></a>

Z-axis value of the vector.

```ts
Vector3.z: number;
```

#### Methods

##### .`set(x, y, z)` <a id="vector-3-set-method"></a>

Set the vector values.

- `x`: X-axis value.
- `y`: Y-axis value.
- `z`: Z-axis value.

```ts
Vector3.set(x: number, y: number, z: number): this;
```

##### .`setScalar(scalar)` <a id="vector-3-set-scalar-method"></a>

Set a given scalar value to all values of the vector.

- `scalar`: Value to set for all values.

```ts
Vector3.setScalar(scalar: number): this;
```

##### .`setX(x)` <a id="vector-3-set-x-method"></a>

Set the vector X-axis value.

- `x`: X-axis value to set.

```ts
Vector3.setX(x: number): this;
```

##### .`setY(y)` <a id="vector-3-set-y-method"></a>

Set the vector Y-axis value.

- `y`: Y-axis value to set.

```ts
Vector3.setY(y: number): this;
```

##### .`setZ(z)` <a id="vector-3-set-z-method"></a>

Set the vector Z-axis value.

- `z`: Z-axis value to set.

```ts
Vector3.setZ(z: number): this;
```

##### .`setValue(index, value)` <a id="vector-3-set-value-method"></a>

Set a given value of the vector.

- `index`: `0` equals to `x`, `1` equals to `y`, `2` equals to `z`.
- `value`: Value to set.

```ts
Vector3.setValue(index: 'x' | 'y' | 'z' | number, value: number): this;
```

##### .`getValue(index)` <a id="vector-3-get-value-method"></a>

Return a value from the vector.

- `index`: `0` equals to `x`, `1` equals to `y`, `2` equals to `z`.

```ts
Vector3.getValue(index: 'x' | 'y' | 'z' | number): number;
```

##### .`add(vector)` <a id="vector-3-add-method"></a>

Add a given vector to the vector.

- `vector`: Vector to add.

```ts
Vector3.add(vector: Vector3 | [number, number, number]): this;
```

##### .`addScalar(scalar)` <a id="vector-3-add-scalar-method"></a>

Add a given scalar value to all values of the vector.

- `scalar`: Scalar value to add.

```ts
Vector3.addScalar(scalar: number): this;
```

##### .`sub(vector)` <a id="vector-3-sub-method"></a>

Subtract a given vector to the vector.

- `vector`: Vector to subtract.

```ts
Vector3.sub(vector: Vector3 | [number, number, number]): this;
```

##### .`subScalar(scalar)` <a id="vector-3-sub-scalar-method"></a>

Subtract a given scalar value to all values of the vector.

- `scalar`: Scalar value to subtract.

```ts
Vector3.subScalar(scalar: number): this;
```

##### .`multiply(vector)` <a id="vector-3-multiply-method"></a>

Multiply a given vector to the vector.

- `vector`: Vector to multiply.

```ts
Vector3.multiply(vector: Vector3 | [number, number, number]): this;
```

##### .`multiplyScalar(scalar)` <a id="vector-3-multiply-scalar-method"></a>

Multiply a given scalar value to all values of the vector.

- `scalar`: Scalar value to multiply.

```ts
Vector3.multiplyScalar(scalar: number): this;
```

##### .`divide(vector)` <a id="vector-3-divide-method"></a>

Divide a given vector to the vector.

- `vector`: Vector to divide.

```ts
Vector3.divide(vector: Vector3 | [number, number, number]): this;
```

##### .`divideScalar(scalar)` <a id="vector-3-divide-scalar-method"></a>

Divide a given scalar value to all values of the vector.

- `scalar`: Scalar value to multiply.

```ts
Vector3.divideScalar(scalar: number): this;
```

##### .`min(vector)` <a id="vector-3-min-method"></a>

Set the vector values to the min values compared to a given vector.

- `vector`: Vector to compare values with.

```ts
Vector3.min(vector: Vector3 | [number, number, number]): this;
```

##### .`max(vector)` <a id="vector-3-max-method"></a>

Set the vector values to the max values compared to a given vector.

- `vector`: Vector to compare values with.

```ts
Vector3.max(vector: Vector3 | [number, number, number]): this;
```

##### .`clamp(min, max)` <a id="vector-3-clamp-method"></a>

Clamp the vector values to given boundaries.

- `min`: Minimum boundaries.
- `max`: Maximum boundaries.

```ts
Vector3.clamp(min: Vector3 | [number, number, number], max: Vector3 | [number, number, number]): this;
```

##### .`clampScalar(min, max)` <a id="vector-3-clamp-scalar-method"></a>

Clamp the vector values to given scalar values.

- `min`: Minimum scalar boundary.
- `max`: Maximum scalar boundary.

```ts
Vector3.clampScalar(min: number, max: number): this;
```

##### .`floor()` <a id="vector-3-floor-method"></a>

Round down to the nearest integer value the vector values.

```ts
Vector3.floor(): this;
```

##### .`ceil()` <a id="vector-3-ceil-method"></a>

Round up to the nearest integer value the vector values.

```ts
Vector3.ceil(): this;
```

##### .`round()` <a id="vector-3-round-method"></a>

Round to the nearest integer value the vector values.

```ts
Vector3.round(): this;
```

##### .`trunc()` <a id="vector-3-trunc-method"></a>

Remove any fractional digits of the vector values.

```ts
Vector3.trunc(): this;
```

##### .`negate()` <a id="vector-3-negate-method"></a>

Set the vector values to their negative values.

```ts
Vector3.negate(): this;
```

##### .`lerp(t, vector)` <a id="vector-3-lerp-method"></a>

Linearly interpolate the vector values towards a given vector values.

- `t`: Normalized time value to interpolate.
- `vector`: Vector to interpolate values towards.

```ts
Vector3.lerp(t: number, vector: Vector3 | [number, number, number]): this;
```

##### .`normalize()` <a id="vector-3-normalize-method"></a>

Convert the vector to a unit vector.

```ts
Vector3.normalize(): this;
```

##### .`applyMatrix(matrix)` <a id="vector-3-apply-matrix-method"></a>

Transform the vector by a given matrix.

- `matrix`: Matrix to apply.

```ts
Vector3.applyMatrix(matrix: DOMMatrix): this;
```

##### .`setLength(length)` <a id="vector-3-set-length-method"></a>

Set the vector values to the same direction but with a given length.

- `length`: Length value.

```ts
Vector3.setLength(length: number): this;
```

##### .`projectOnVector(vector)` <a id="vector-3-project-on-vector-method"></a>

Project the vector onto a given vector.

- `vector`: Vector to project to.

```ts
Vector3.projectOnVector(vector: Vector3 | [number, number, number]): this;
```

##### .`length()` <a id="vector-3-length-method"></a>

Compute the Euclidean length of the vector.

```ts
Vector3.length(): number;
```

##### .`squaredLength()` <a id="vector-3-squared-length-method"></a>

Compute the squared length of the vector.

```ts
Vector3.squaredLength(): number;
```

##### .`manhattanLength()` <a id="vector-3-manhattan-length-method"></a>

Compute the Manhattan length of the vector.

```ts
Vector3.manhattanLength(): number;
```

##### .`equals(vector)` <a id="vector-3-equals-method"></a>

Check if the vector is equal with a given vector.

- `vector`: Vector to check.

```ts
Vector3.equals(vector: Vector3 | [number, number, number]): boolean;
```

##### .`collinear(vector1, vector2)` <a id="vector-3-collinear-method"></a>

Check if the vector is collinear with given vectors.

- `vector1`: First vector to check.
- `vector2`: Second vector to check.

```ts
Vector3.collinear(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): boolean;
```

##### .`dot(vector)` <a id="vector-3-dot-method"></a>

Compute the dot product of a given vector with the vector.

- `vector`: Vector to compute the dot product with.

```ts
Vector3.dot(vector: Vector3 | [number, number, number]): number;
```

##### .`cross(vector)` <a id="vector-3-cross-method"></a>

Compute the cross product of a given vector with the vector.

- `vector`: Vector to compute the cross product with.

```ts
Vector3.cross(vector: Vector3 | [number, number, number]): [number, number, number];
```

##### .`angleTo(vector)` <a id="vector-3-angle-to-method"></a>

Compute the angle between a given vector and the vector.

- `vector`: Vector to compute the angle with.

```ts
Vector3.angleTo(vector: Vector3 | [number, number, number]): number;
```

##### .`distanceTo(vector)` <a id="vector-3-distance-to-method"></a>

Compute the Euclidean distance from a given vector to the vector.

- `vector`: Vector to compute the distance to.

```ts
Vector3.distanceTo(vector: Vector3 | [number, number, number]): number;
```

##### .`squaredDistanceTo(vector)` <a id="vector-3-squared-distance-to-method"></a>

Compute the squared distance from a given vector to the vector.

- `vector`: Vector to compute the squared distance to.

```ts
Vector3.squaredDistanceTo(vector: Vector3 | [number, number, number]): number;
```

##### .`manhattanDistanceTo(vector)` <a id="vector-3-manhattan-distance-to-method"></a>

Compute the Manhattan distance from a given vector to the vector.

- `vector`: Vector to compute the Manhattan distance to.

```ts
Vector3.manhattanDistanceTo(vector: Vector3 | [number, number, number]): number;
```

##### .`toArray()` <a id="vector-3-to-array-method"></a>

Return the vector values into an array.

```ts
Vector3.toArray(): [number, number, number];
```

##### .`fromArray(values)` <a id="vector-3-from-array-method"></a>

Set the vector values from a given array.

- `values`: Values to set.

```ts
Vector3.fromArray(values: number[]): this;
```

##### .`fromSphericalCoords(phi, theta, radius?)` <a id="vector-3-from-spherical-coords-method"></a>

Set the vector values from given spherical coordinates.

- `phi`: Polar angle from the y (up) axis : [0, PI]
- `theta`: Equator angle around the y (up) axis : [0, 2*PI]
- `[radius]`: Radius of the sphere.

```ts
Vector3.fromSphericalCoords(phi: number, theta: number, radius?: number): this;
```

##### .`fromCylindricalCoords(theta, y, radius?)` <a id="vector-3-from-cylindrical-coords-method"></a>

Set the vector values from given cylindrical coordinates.

- `theta`: Equator angle around the y (up) axis : [0, 2*PI]
- `y`: Y-axis value.
- `[radius]`: Radius of the cylinder.

```ts
Vector3.fromCylindricalCoords(theta: number, y: number, radius?: number): this;
```

##### .`copy(vector)` <a id="vector-3-copy-method"></a>

Copy the values of a given vector to the vector.

- `vector`: Vector to copy values from.

```ts
Vector3.copy(vector: Vector3 | [number, number, number]): this;
```

##### .`clone()` <a id="vector-3-clone-method"></a>

Create a new 3D vector with copied values from the vector.

```ts
Vector3.clone(): Vector3;
```

##### `static` Vector3.`add(vector1, vector2)` <a id="vector-3-static-add-method"></a>

Add two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.add(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): [number, number, number];
```

##### `static` Vector3.`sub(vector1, vector2)` <a id="vector-3-static-sub-method"></a>

Subtract two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.sub(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): [number, number, number];
```

##### `static` Vector3.`multiply(vector1, vector2)` <a id="vector-3-static-multiply-method"></a>

Multiply two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.multiply(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): [number, number, number];
```

##### `static` Vector3.`divide(vector1, vector2)` <a id="vector-3-static-divide-method"></a>

Divide two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.divide(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): [number, number, number];
```

##### `static` Vector3.`lerp(t, min, max)` <a id="vector-3-static-lerp-method"></a>

Linearly interpolate a point between two vectors.

- `t`: Normalized time value to interpolate.
- `min`: Minimum boundaries.
- `max`: Maximum boundaries.

```ts
static Vector3.lerp(t: number, min: Vector3 | [number, number, number], max: Vector3 | [number, number, number]): [number, number, number];
```

##### `static` Vector3.`equals(vector1, vector2)` <a id="vector-3-static-equals-method"></a>

Check if two vectors are equal to each other.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.equals(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): boolean;
```

##### `static` Vector3.`collinear(vector1, vector2, vector3)` <a id="vector-3-static-collinear-method"></a>

Check if three vectors are collinear (aligned on the same line).

- `vector1`: First vector.
- `vector2`: Second vector.
- `vector3`: Third vector.

```ts
static Vector3.collinear(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number], vector3: Vector3 | [number, number, number]): boolean;
```

##### `static` Vector3.`dot(vector1, vector2)` <a id="vector-3-static-dot-method"></a>

Compute the dot product of two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.dot(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): number;
```

##### `static` Vector3.`cross(vector1, vector2)` <a id="vector-3-static-cross-method"></a>

Compute the cross product of two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.cross(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): [number, number, number];
```

##### `static` Vector3.`distance(vector1, vector2)` <a id="vector-3-static-distance-method"></a>

Compute the Euclidean distance between two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.distance(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): number;
```

##### `static` Vector3.`squaredDistance(vector1, vector2)` <a id="vector-3-static-squared-distance-method"></a>

Compute the squared distance between two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.squaredDistance(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): number;
```

##### `static` Vector3.`manhattanDistance(vector1, vector2)` <a id="vector-3-static-manhattan-distance-method"></a>

Compute the Manhattan distance between two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.manhattanDistance(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): number;
```

##### `static` Vector3.`length(vector)` <a id="vector-3-static-length-method"></a>

Compute the Euclidean length of a vector.

- `vector`: Vector to compute Euclidean length from.

```ts
static Vector3.length(vector: Vector3 | [number, number, number]): number;
```

##### `static` Vector3.`squaredLength(vector)` <a id="vector-3-static-squared-length-method"></a>

Compute the squared length of a vector.

- `vector`: Vector to compute squared length from.

```ts
static Vector3.squaredLength(vector: Vector3 | [number, number, number]): number;
```

##### `static` Vector3.`manhattanLength(vector)` <a id="vector-3-static-manhattan-length-method"></a>

Compute the Manhattan length of a vector.

- `vector`: Vector to compute Manhattan length from.

```ts
static Vector3.manhattanLength(vector: Vector3 | [number, number, number]): number;
```

##### `static` Vector3.`fromSphericalCoords(phi, theta, radius?)` <a id="vector-3-static-from-spherical-coords-method"></a>

Convert spherical coordinates to a 3D point on the surface of a sphere.

- `phi`: Polar angle from the y (up) axis : [0, PI]
- `theta`: Equator angle around the y (up) axis : [0, 2*PI]
- `[radius=1]`: Radius of the sphere.

```ts
static Vector3.fromSphericalCoords(phi: number, theta: number, radius?: number): [number, number, number];
```

##### `static` Vector3.`fromCylindricalCoords(theta, y, radius?)` <a id="vector-3-static-from-cylindrical-coords-method"></a>

Convert cylindrical coordinates to a 3D point on the surface of a cylinder.

- `theta`: Equator angle around the y (up) axis : [0, 2*PI]
- `y`: Y-axis value.
- `[radius=1]`: Radius of the cylinder.

```ts
static Vector3.fromCylindricalCoords(theta: number, y: number, radius?: number): [number, number, number];
```
