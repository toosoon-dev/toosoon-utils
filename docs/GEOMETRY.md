## Geometry

### Vector2 <a id="vector-2"></a>

Utility class for manipulating a 2D vectors.

- [new Vector2(x, y)](#vector-2)
  - .isVector2: `true`
  - [.x](#vector-2-x): `number`
  - [.y](#vector-2-y): `number`
  - [.set(x, y)](#vector-2-set): `this`
  - [.setScalar(scalar)](#vector-2-set-scalar): `this`
  - [.setX(x)](#vector-2-set-x): `this`
  - [.setY(Y)](#vector-2-set-y): `this`
  - [.setValue(index, value)](#vector-2-set-value): `this`
  - [.getValue(index)](#vector-2-get-value): `number`
  - [.add(vector)](#vector-2-add): `this`
  - [.addScalar(scalar)](#vector-2-add-scalar): `this`
  - [.sub(vector)](#vector-2-sub): `this`
  - [.subScalar(scalar)](#vector-2-sub-scalar): `this`
  - [.multiply(vector)](#vector-2-multiply): `this`
  - [.multiplyScalar(scalar)](#vector-2-multiply-scalar): `this`
  - [.divide(vector)](#vector-2-divide): `this`
  - [.divideScalar(scalar)](#vector-2-divide-scalar): `this`
  - [.min(vector)](#vector-2-min): `this`
  - [.max(vector)](#vector-2-max): `this`
  - [.clamp(min, max)](#vector-2-clamp): `this`
  - [.clampScalar(min, max)](#vector-2-clamp-scalar): `this`
  - [.floor()](#vector-2-floor): `this`
  - [.ceil()](#vector-2-ceil): `this`
  - [.round()](#vector-2-round): `this`
  - [.trunc()](#vector-2-trunc): `this`
  - [.negate()](#vector-2-negate): `this`
  - [.rotateAround(center, angle)](#vector-2-rotate-around): `this`
  - [.lerp(vector, t)](#vector-2-lerp): `this`
  - [.normalize()](#vector-2-normalize): `this`
  - [.applyMatrix(matrix)](#vector-2-apply-matrix): `this`
  - [.setLength(length)](#vector-2-set-length): `this`
  - [.length()](#vector-2-length): `number`
  - [.squaredLength()](#vector-2-squared-length): `number`
  - [.manhattanLength()](#vector-2-manhattan-length): `number`
  - [.equals(vector)](#vector-2-equals): `boolean`
  - [.collinear(vector1, vector2)](#vector-2-collinear): `boolean`
  - [.dot(vector)](#vector-2-dot): `number`
  - [.cross(vector)](#vector-2-cross): `number`
  - [.angle()](#vector-2-angle): `number`
  - [.angleTo(vector)](#vector-2-angle-to): `number`
  - [.distanceTo(vector)](#vector-2-distance-to): `number`
  - [.squaredDistanceTo(vector)](#vector-2-squared-distance-to): `number`
  - [.manhattanDistanceTo(vector)](#vector-2-manhattan-distance-to): `number`
  - [.toArray()](#vector-2-to-array): `[number, number]`
  - [.fromArray(values)](#vector-2-from-array): `this`
  - [.fromCircular(angle, radius)](#vector-2-from-circular): `this`
  - [.copy(vector)](#vector-2-copy): `this`
  - [.clone()](#vector-2-clone): `Vector2`
  - `static` [.add(vector1, vector2)](#vector-2-static-add-method)
  - `static` [.sub(vector1, vector2)](#vector-2-static-sub-method)
  - `static` [.multiply(vector1, vector2)](#vector-2-static-multiply-method)
  - `static` [.divide(vector1, vector2)](#vector-2-static-divide-method)
  - `static` [.rotate(vector, center, angle)](#vector-2-static-rotate-method)
  - `static` [.lerp(t, min, max)](#vector-2-static-lerp-method)
  - `static` [.equals(vector1, vector2)](#vector-2-static-equals-method)
  - `static` [.collinear(vector1, vector2, vector3)](#vector-2-static-collinear-method)
  - `static` [.dot(vector1, vector2)](#vector-2-static-dot-method)
  - `static` [.cross(vector1, vector2)](#vector-2-static-cross-method)
  - `static` [.angle(vector)](#vector-2-static-angle-method)
  - `static` [.distance(vector1, vector2)](#vector-2-static-distance-method)
  - `static` [.squaredDistance(vector1, vector2)](#vector-2-static-squared-distance-method)
  - `static` [.manhattanDistance(vector1, vector2)](#vector-2-static-manhattan-distance-method)
  - `static` [.length(vector)](#vector-2-static-length-method)
  - `static` [.squaredLength(vector)](#vector-2-static-squared-length-method)
  - `static` [.manhattanLength(vector)](#vector-2-static-manhattan-length-method)
  - `static` [.fromCircularCoords(angle, radius)](#vector-2-static-from-circular-coords-method)

| Parameter | Type     | Default | Description   |
| --------- | -------- | ------- | ------------- |
| x         | `number` | `0`     | X-axis value. |
| y         | `number` | `0`     | Y-axis value. |

#### Properties

##### x <a id="vector-2-x"></a>

X-axis value of the vector.

```ts
Vector2.x: number;
```

##### y <a id="vector-2-y"></a>

Y-axis value of the vector.

```ts
Vector2.y: number;
```

#### Methods

##### set(x, y) <a id="vector-2-set"></a>

Set the vector values.

- `x`: X-axis value.
- `y`: Y-axis value.

```ts
Vector2.set(x: number, y: number): this;
```

##### setScalar(scalar) <a id="vector-2-set-scalar"></a>

Set a given scalar value to all values of the vector.

- `scalar`: Value to set for all vector values.

```ts
Vector2.setScalar(scalar: number): this;
```

##### setX(x) <a id="vector-2-set-x"></a>

Set the vector X-axis value.

- `x`: X-axis value to set.

```ts
Vector2.setX(x: number): this;
```

##### setY(y) <a id="vector-2-set-y"></a>

Set the vector Y-axis value.

- `y`: Y-axis value to set.

```ts
Vector2.setY(y: number): this;
```

##### setValue(index, value) <a id="vector-2-set-value"></a>

Set a given value from the vector.

- `index`: `0` equals to `x`, `1` equals to `y`.
- `value`: Value to set.

```ts
Vector2.setValue(index: 'x' | 'y' | number, value: number): this;
```

##### getValue(index) <a id="vector-2-get-value"></a>

Return a value from the vector.

- `index`: `0` equals to `x`, `1` equals to `y`.

```ts
Vector2.getValue(index: 'x' | 'y' | number): number;
```

##### add(vector) <a id="vector-2-add"></a>

Add a given vector to the vector.

- `vector`: Vector to add.

```ts
Vector2.add(vector: Vector2 | [number, number]): this;
```

##### addScalar(scalar) <a id="vector-2-add-scalar"></a>

Add a given scalar value to all values of the vector.

- `scalar`: Scalar value to add.

```ts
Vector2.addScalar(scalar: number): this;
```

##### sub(vector) <a id="vector-2-sub"></a>

Subtract a given vector to the vector.

- `vector`: Vector to subtract.

```ts
Vector2.sub(vector: Vector2 | [number, number]): this;
```

##### subScalar(scalar) <a id="vector-2-sub-scalar"></a>

Subtract a given scalar value to all values of the vector.

- `scalar`: Scalar value to subtract.

```ts
Vector2.subScalar(scalar: number): this;
```

##### multiply(vector) <a id="vector-2-multiply"></a>

Multiply a given vector to the vector.

- `vector`: Vector to multiply.

```ts
Vector2.multiply(vector: Vector2 | [number, number]): this;
```

##### multiplyScalar(scalar) <a id="vector-2-multiply-scalar"></a>

Multiply a given scalar value to all values of the vector.

- `scalar`: Scalar value to multiply.

```ts
Vector2.multiplyScalar(scalar: number): this;
```

##### divide(vector) <a id="vector-2-divide"></a>

Divide a given vector to the vector.

- `vector`: Vector to divide.

```ts
Vector2.divide(vector: Vector2 | [number, number]): this;
```

##### divideScalar(scalar) <a id="vector-2-divide-scalar"></a>

Divide a given scalar value to all values of the vector.

- `scalar`: Scalar value to divide.

```ts
Vector2.divideScalar(scalar: number): this;
```

##### min(vector) <a id="vector-2-min"></a>

Set the vector values to the min values compared to a given vector.

- `vector`: Vector to compare values with.

```ts
Vector2.min(vector: Vector2 | [number, number]): this;
```

##### max(vector) <a id="vector-2-max"></a>

Set the vector values to the max values compared to a given vector.

- `vector`: Vector to compare values with.

```ts
Vector2.max(vector: Vector2 | [number, number]): this;
```

##### clamp(min, max) <a id="vector-2-clamp"></a>

Clamp the vector values to given boundaries.

- `min`: Minimum boundaries.
- `max`: Maximum boundaries.

```ts
Vector2.clamp(min: Vector2 | [number, number], max: Vector2 | [number, number]): this;
```

##### clampScalar(min, max) <a id="vector-2-clamp-scalar"></a>

Clamp the vector values to given scalar values.

- `min`: Minimum scalar boundary.
- `max`: Maximum scalar boundary.

```ts
Vector2.clampScalar(min: number, max: number): this;
```

##### floor() <a id="vector-2-floor"></a>

Round down to the nearest integer value the vector values.

```ts
Vector2.floor(): this;
```

##### ceil() <a id="vector-2-ceil"></a>

Round up to the nearest integer value the vector values.

```ts
Vector2.ceil(): this;
```

##### round() <a id="vector-2-round"></a>

Round to the nearest integer value the vector values.

```ts
Vector2.round(): this;
```

##### trunc() <a id="vector-2-trunc"></a>

Remove any fractional digits of the vector values.

```ts
Vector2.trunc(): this;
```

##### negate() <a id="vector-2-negate"></a>

Set the vector values to their negative values.

```ts
Vector2.negate(): this;
```

##### rotateAround(center, angle) <a id="vector-2-rotate-around"></a>

Rotate the vector around a given center by the given angle.

- `center`: Vector around which to rotate.
- `angle`: Angle to rotate (in radians).

```ts
Vector2.rotateAround(center: Vector2 | [number, number], angle: number): this;
```

##### lerp(vector, t) <a id="vector-2-lerp"></a>

Interpolate the vector values between a given vector and the vector.

- `vector`: Vector to interpolate values towards.
- `t`: Normalized time value to interpolate.

```ts
Vector2.lerp(vector: Vector2 | [number, number], t: number): this;
```

##### normalize() <a id="vector-2-normalize"></a>

Convert the vector to a unit vector.

```ts
Vector2.normalize(): this;
```

##### applyMatrix(matrix) <a id="vector-2-apply-matrix"></a>

Transform the vector by a given matrix.

- `matrix`: Matrix to apply.

```ts
Vector2.applyMatrix(matrix: DOMMatrix): this;
```

##### setLength(length) <a id="vector-2-set-length"></a>

Set the vector values to the same direction but with a given length.

- `length`: Length value.

```ts
Vector2.setLength(length: number): this;
```

##### length() <a id="vector-2-length"></a>

Calculate the Euclidean length of the vector.

```ts
Vector2.length(): number;
```

##### squaredLength() <a id="vector-2-squared-length"></a>

Calculate the squared length of the vector.

```ts
Vector2.squaredLength(): number;
```

##### manhattanLength() <a id="vector-2-manhattan-length"></a>

Calculate the Manhattan length of the vector.

```ts
Vector2.manhattanLength(): number;
```

##### equals(vector) <a id="vector-2-equals"></a>

Check if the vector is equal with a given vector.

- `vector`: Vector to check.

```ts
Vector2.equals(vector: Vector2 | [number, number]): boolean;
```

##### collinear(v1, v2) <a id="vector-2-collinear"></a>

Check if the vector is collinear with given vectors.

- `vector1`: First vector to check.
- `vector2`: Second vector to check.

```ts
Vector2.collinear(v1: Vector2 | [number, number], v2: Vector2 | [number, number]): boolean;
```

##### dot(vector) <a id="vector-2-dot"></a>

Calculate the dot product of a given vector with the vector.

- `vector`: Vector to compute the dot product with.

```ts
Vector2.dot(vector: Vector2 | [number, number]): number;
```

##### cross(vector) <a id="vector-2-cross"></a>

Calculate the cross product of a given vector with the vector.

- `vector`: Vector to compute the cross product with.

```ts
Vector2.cross(vector: Vector2 | [number, number]): number;
```

##### angle() <a id="vector-2-angle"></a>

Calculate the angle of the vector with respect to the positive X-axis.

```ts
Vector2.angle(): number;
```

##### angleTo(vector) <a id="vector-2-angle-to"></a>

Calculate the angle between a given vector and the vector.

- `vector`: Vector to compute the angle with.

```ts
Vector2.angleTo(vector: Vector2 | [number, number]): number;
```

##### distanceTo(vector) <a id="vector-2-distance-to"></a>

Calculate the Euclidean distance from a given vector to the vector.

- `vector`: tor to compute the distance to.

```ts
Vector2.distanceTo(vector: Vector2 | [number, number]): number;
```

##### squaredDistanceTo(vector) <a id="vector-2-squared-distance-to"></a>

Calculate the squared distance from a given vector to the vector.

- `vector`: Vector to compute the squared distance to.

```ts
Vector2.squaredDistanceTo(vector: Vector2 | [number, number]): number;
```

##### manhattanDistanceTo(vector) <a id="vector-2-manhattan-distance-to"></a>

Calculate the Manhattan distance from a given vector to the vector.

- `vector`: Vector to compute the Manhattan distance to.

```ts
Vector2.manhattanDistanceTo(vector: Vector2 | [number, number]): number;
```

##### toArray() <a id="vector-2-to-array"></a>

Return the vector values into an array.

```ts
Vector2.toArray(): [number, number];
```

##### fromArray(values) <a id="vector-2-from-array"></a>

Set the vector values from a given array.

- `values`: Values to set.

```ts
Vector2.fromArray(values: number[]): this;
```

##### fromCircularCoords(angle, radius?) <a id="vector-2-from-circular"></a>

Set the vector values from given circular coordinates.

- `angle`: Angle (in radians).
- `[radius]`: Radius of the circle.

```ts
Vector2.fromCircularCoords(angle: number, radius?: number): this;
```

##### copy(vector) <a id="vector-2-copy"></a>

Copy the values of a given vector to the vector.

- `vector`: Vector to copy values from.

```ts
Vector2.copy(vector: Vector2 | [number, number]): this;
```

##### clone() <a id="vector-2-clone"></a>

Create a new 2D vector with copied values from the vector.

```ts
Vector2.clone(): Vector2;
```

##### `static` add(vector1, vector2) <a id="vector-2-static-add-method"></a>

Add two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.add(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): [number, number];
```

##### `static` sub(vector1, vector2) <a id="vector-2-static-sub-method"></a>

Subtract two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.sub(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): [number, number];
```

##### `static` multiply(vector1, vector2) <a id="vector-2-static-multiply-method"></a>

Multiply two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.multiply(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): [number, number];
```

##### `static` divide(vector1, vector2) <a id="vector-2-static-divide-method"></a>

Divide two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.divide(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): [number, number];
```

##### `static` rotate(vector, center, angle) <a id="vector-2-static-rotate-method"></a>

Rotate a vector around a given center by a given angle.

- `vector`: Vector to rotate.
- `center`: Vector around which to rotate.
- `angle`: Angle to rotate (in radians).

```ts
static Vector2.rotate(vector: Vector2 | [number, number], center: Vector2 | [number, number], angle: number): [number, number];
```

##### `static` lerp(t, min, max) <a id="vector-2-static-lerp-method"></a>

Interpolate a point between two vectors.

- `t`: Normalized time value to interpolate.
- `min`: Minimum boundaries.
- `max`: Maximum boundaries.

```ts
static Vector2.lerp(t: number, min: Vector2 | [number, number], max: Vector2 | [number, number]): [number, number];
```

##### `static` equals(vector1, vector2) <a id="vector-2-static-equals-method"></a>

Check if two vectors are equal to each other.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.equals(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): boolean;
```

##### `static` collinear(vector1, vector2, vector3) <a id="vector-2-static-collinear-method"></a>

Check if three vectors are collinear (aligned on the same line).

- `vector1`: First vector.
- `vector2`: Second vector.
- `vector3`: Third vector.

```ts
static Vector2.collinear(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number], vector2: Vector2 | [number, number]): boolean;
```

##### `static` dot(vector1, vector2) <a id="vector-2-static-dot-method"></a>

Calculate the dot product of two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.dot(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): number;
```

##### `static` cross(vector1, vector2) <a id="vector-2-static-cross-method"></a>

Calculate the cross product of two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.cross(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): number;
```

##### `static` angle(vector1, vector2) <a id="vector-2-static-angle-method"></a>

Calculate the angle of a given vector with respect to the positive X-axis.

- `vector`: Vector to compute angle from.

```ts
static Vector2.angle(vector: Vector2 | [number, number]): number;
```

##### `static` distance(vector1, vector2) <a id="vector-2-static-distance-method"></a>

Calculate the Euclidean distance between two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.distance(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): number;
```

##### `static` squaredDistance(vector1, vector2) <a id="vector-2-static-squared-distance-method"></a>

Calculate the squared distance between two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.squaredDistance(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): number;
```

##### `static` manhattanDistance(vector1, vector2) <a id="vector-2-static-manhattan-distance-method"></a>

Calculate the Manhattan distance between two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector2.manhattanDistance(vector1: Vector2 | [number, number], vector2: Vector2 | [number, number]): number;
```

##### `static` length(vector) <a id="vector-2-static-length-method"></a>

Calculate the Euclidean length of a vector.

- `vector`: Vector to compute Euclidean length from.

```ts
static Vector2.length(vector: Vector2 | [number, number]): number;
```

##### `static` squaredLength(vector) <a id="vector-2-static-squared-length-method"></a>

Calculate the squared length of a vector.

- `vector`: Vector to compute squared length from.

```ts
static Vector2.squaredLength(vector: Vector2 | [number, number]): number;
```

##### `static` manhattanLength(vector) <a id="vector-2-static-manhattan-length-method"></a>

Calculate the Manhattan length of a vector.

- `vector`: Vector to compute Manhattan length from.

```ts
static Vector2.manhattanLength(vector: Vector2 | [number, number]): number;
```

##### `static` fromCircularCoords <a id="vector-2-static-from-circular-coords-method"></a>

Convert circular coordinates to a 2D point on the surface of a circle.

- `angle`: Angle (in radians).
- `[radius=1]`: Radius of the circle.

```ts
static Vector2.fromCircularCoords(angle: number, radius?: number): [number, number];
```

### Vector3 <a id="vector-3"></a>

Utility class for manipulating a 3D vectors.

- [new Vector3(x, y, z)](#vector-3)
  - .isVector3: `true`
  - [.x](#vector-3-x): `number`
  - [.y](#vector-3-y): `number`
  - [.z](#vector-3-z): `number`
  - [.set(x, y, z)](#vector-3-set): `this`
  - [.setScalar(scalar)](#vector-3-set-scalar): `this`
  - [.setX(x)](#vector-3-set-x): `this`
  - [.setY(y)](#vector-3-set-y): `this`
  - [.setZ(z)](#vector-3-set-z): `this`
  - [.setValue(index, value)](#vector-3-set-value): `this`
  - [.getValue(index)](#vector-3-get-value): `number`
  - [.add(vector)](#vector-3-add): `this`
  - [.addScalar(scalar)](#vector-3-add-scalar): `this`
  - [.sub(vector)](#vector-3-sub): `this`
  - [.subScalar(scalar)](#vector-3-sub-scalar): `this`
  - [.multiply(vector)](#vector-3-multiply): `this`
  - [.multiplyScalar(scalar)](#vector-3-multiply-scalar): `this`
  - [.divide(vector)](#vector-3-divide): `this`
  - [.divideScalar(scalar)](#vector-3-divide-scalar): `this`
  - [.min(vector)](#vector-3-min): `this`
  - [.max(vector)](#vector-3-max): `this`
  - [.clamp(min, max)](#vector-3-clamp): `this`
  - [.clampScalar(min, max)](#vector-3-clamp-scalar): `this`
  - [.floor()](#vector-3-floor): `this`
  - [.ceil()](#vector-3-ceil): `this`
  - [.round()](#vector-3-round): `this`
  - [.trunc()](#vector-3-trunc): `this`
  - [.negate()](#vector-3-negate): `this`
  - [.lerp(vector, t)](#vector-3-lerp): `this`
  - [.normalize()](#vector-3-normalize): `this`
  - [.applyMatrix(matrix)](#vector-3-apply-matrix): `this`
  - [.setLength(length)](#vector-3-set-length): `this`
  - [.projectOnVector(vector)](#vector-3-project-on-vector): `this`
  - [.length()](#vector-3-length): `number`
  - [.squaredLength()](#vector-3-squared-length): `number`
  - [.manhattanLength()](#vector-3-manhattan-length): `number`
  - [.equals(vector)](#vector-3-equals): `boolean`
  - [.collinear(vector1, vector2)](#vector-3-collinear): `boolean`
  - [.dot(vector)](#vector-3-dot): `number`
  - [.cross(vector)](#vector-3-cross): `[number, number, number]`
  - [.angleTo(vector)](#vector-3-angle-to): `number`
  - [.distanceTo(vector)](#vector-3-distance-to): `number`
  - [.squaredDistanceTo(vector)](#vector-3-squared-distance-to): `number`
  - [.manhattanDistanceTo(vector)](#vector-3-manhattan-distance-to): `number`
  - [.toArray()](#vector-3-to-array): `[number, number, number]`
  - [.fromArray(values)](#vector-3-from-array): `this`
  - [.fromSphericalCoords(radius, phi, theta)](#vector-3-from-spherical): `this`
  - [.fromCylindricalCoords(radius, theta, y)](#vector-3-from-cylindrical): `this`
  - [.copy(vector)](#vector-3-copy): `this`
  - [.clone()](#vector-3-clone): `Vector3`
  - `static` [.add(vector1, vector2)](#vector-3-static-add-method)
  - `static` [.sub(vector1, vector2)](#vector-3-static-sub-method)
  - `static` [.multiply(vector1, vector2)](#vector-3-static-multiply-method)
  - `static` [.divide(vector1, vector2)](#vector-3-static-divide-method)
  - `static` [.lerp(t, min, max)](#vector-3-static-lerp-method)
  - `static` [.equals(vector1, vector2)](#vector-3-static-equals-method)
  - `static` [.collinear(vector1, vector2, vector3)](#vector-3-static-collinear-method)
  - `static` [.dot(vector1, vector2)](#vector-3-static-dot-method)
  - `static` [.cross(vector1, vector2)](#vector-3-static-cross-method)
  - `static` [.distance(vector1, vector2)](#vector-3-static-distance-method)
  - `static` [.squaredDistance(vector1, vector2)](#vector-3-static-squared-distance-method)
  - `static` [.manhattanDistance(vector1, vector2)](#vector-3-static-manhattan-distance-method)
  - `static` [.length(vector)](#vector-3-static-length-method)
  - `static` [.squaredLength(vector)](#vector-3-static-squared-length-method)
  - `static` [.manhattanLength(vector)](#vector-3-static-manhattan-length-method)
  - `static` [.fromSphericalCoords(radius, phi, theta)](#vector-3-static-from-spherical-coords-method)
  - `static` [.fromCylindricalCoords(radius, theta, y)](#vector-3-static-from-cylindrical-coords-method)

| Parameter | Type     | Default | Description   |
| --------- | -------- | ------- | ------------- |
| x         | `number` | `0`     | X-axis value. |
| y         | `number` | `0`     | Y-axis value. |
| z         | `number` | `0`     | Z-axis value. |

#### Properties

##### x <a id="vector-3-x"></a>

X-axis value of the vector.

```ts
Vector3.x: number;
```

##### y <a id="vector-3-y"></a>

Y-axis value of the vector.

```ts
Vector3.y: number;
```

##### z <a id="vector-3-z"></a>

Z-axis value of the vector.

```ts
Vector3.z: number;
```

#### Methods

##### set(x, y, z) <a id="vector-3-set"></a>

Set the vector values.

- `x`: X-axis value.
- `y`: Y-axis value.
- `z`: Z-axis value.

```ts
Vector3.set(x: number, y: number, z: number): this;
```

##### setScalar(scalar) <a id="vector-3-set-scalar"></a>

Set a given scalar value to all values of the vector.

- `scalar`: Value to set for all vector values.

```ts
Vector3.setScalar(scalar: number): this;
```

##### setX(x) <a id="vector-3-set-x"></a>

Set the vector X-axis value.

- `x`: X-axis value to set.

```ts
Vector3.setX(x: number): this;
```

##### setY(y) <a id="vector-3-set-y"></a>

Set the vector Y-axis value.

- `y`: Y-axis value to set.

```ts
Vector3.setY(y: number): this;
```

##### setZ(z) <a id="vector-3-set-z"></a>

Set the vector Z-axis value.

- `z`: Z-axis value to set.

```ts
Vector3.setZ(z: number): this;
```

##### setValue(index, value) <a id="vector-3-set-value"></a>

Set a given value of the vector.

- `index`: `0` equals to `x`, `1` equals to `y`, `2` equals to `z`.
- `value`: Value to set.

```ts
Vector3.setValue(index: 'x' | 'y' | 'z' | number, value: number): this;
```

##### getValue(index) <a id="vector-3-get-value"></a>

Return a value from the vector.

- `index`: `0` equals to `x`, `1` equals to `y`, `2` equals to `z`.

```ts
Vector3.getValue(index: 'x' | 'y' | 'z' | number): number;
```

##### add(vector) <a id="vector-3-add"></a>

Add a given vector to the vector.

- `vector`: Vector to add.

```ts
Vector3.add(vector: Vector3 | [number, number, number]): this;
```

##### addScalar(scalar) <a id="vector-3-add-scalar"></a>

Add a given scalar value to all values of the vector.

- `scalar`: Scalar value to add.

```ts
Vector3.addScalar(scalar: number): this;
```

##### sub(vector) <a id="vector-3-sub"></a>

Subtract a given vector to the vector.

- `vector`: Vector to subtract.

```ts
Vector3.sub(vector: Vector3 | [number, number, number]): this;
```

##### subScalar(scalar) <a id="vector-3-sub-scalar"></a>

Subtract a given scalar value to all values of the vector.

- `scalar`: Scalar value to subtract.

```ts
Vector3.subScalar(scalar: number): this;
```

##### multiply(vector) <a id="vector-3-multiply"></a>

Multiply a given vector to the vector.

- `vector`: Vector to multiply.

```ts
Vector3.multiply(vector: Vector3 | [number, number, number]): this;
```

##### multiplyScalar(scalar) <a id="vector-3-multiply-scalar"></a>

Multiply a given scalar value to all values of the vector.

- `scalar`: Scalar value to multiply.

```ts
Vector3.multiplyScalar(scalar: number): this;
```

##### divide(vector) <a id="vector-3-divide"></a>

Divide a given vector to the vector.

- `vector`: Vector to divide.

```ts
Vector3.divide(vector: Vector3 | [number, number, number]): this;
```

##### divideScalar(scalar) <a id="vector-3-divide-scalar"></a>

Divide a given scalar value to all values of the vector.

- `scalar`: Scalar value to multiply.

```ts
Vector3.divideScalar(scalar: number): this;
```

##### min(vector) <a id="vector-3-min"></a>

Set the vector values to the min values compared to a given vector.

- `vector`: Vector to compare values with.

```ts
Vector3.min(vector: Vector3 | [number, number, number]): this;
```

##### max(vector) <a id="vector-3-max"></a>

Set the vector values to the max values compared to a given vector.

- `vector`: Vector to compare values with.

```ts
Vector3.max(vector: Vector3 | [number, number, number]): this;
```

##### clamp(min, max) <a id="vector-3-clamp"></a>

Clamp the vector values to given boundaries.

- `min`: Minimum boundaries.
- `max`: Maximum boundaries.

```ts
Vector3.clamp(min: Vector3 | [number, number, number], max: Vector3 | [number, number, number]): this;
```

##### clampScalar(min, max) <a id="vector-3-clamp-scalar"></a>

Clamp the vector values to given scalar values.

- `min`: Minimum scalar boundary.
- `max`: Maximum scalar boundary.

```ts
Vector3.clampScalar(min: number, max: number): this;
```

##### floor() <a id="vector-3-floor"></a>

Round down to the nearest integer value the vector values.

```ts
Vector3.floor(): this;
```

##### ceil() <a id="vector-3-ceil"></a>

Round up to the nearest integer value the vector values.

```ts
Vector3.ceil(): this;
```

##### round() <a id="vector-3-round"></a>

Round to the nearest integer value the vector values.

```ts
Vector3.round(): this;
```

##### trunc() <a id="vector-3-trunc"></a>

Remove any fractional digits of the vector values.

```ts
Vector3.trunc(): this;
```

##### negate() <a id="vector-3-negate"></a>

Set the vector values to their negative values.

```ts
Vector3.negate(): this;
```

##### lerp(vector, t) <a id="vector-3-lerp"></a>

Interpolate the vector values between a given vector and the vector.

- `vector`: Vector to interpolate values towards.
- `t`: Normalized time value to interpolate.

```ts
Vector3.lerp(vector: Vector3 | [number, number, number], t: number): this;
```

##### normalize() <a id="vector-3-normalize"></a>

Convert the vector to a unit vector.

```ts
Vector3.normalize(): this;
```

##### applyMatrix(matrix) <a id="vector-3-apply-matrix"></a>

Transform the vector by a given matrix.

- `matrix`: Matrix to apply.

```ts
Vector3.applyMatrix(matrix: DOMMatrix): this;
```

##### setLength(length) <a id="vector-3-set-length"></a>

Set the vector values to the same direction but with a given length.

- `length`: Length value.

```ts
Vector3.setLength(length: number): this;
```

##### projectOnVector(vector) <a id="vector-3-project-on-vector"></a>

Project the vector onto a given vector.

- `vector`: Vector to project to.

```ts
Vector3.projectOnVector(vector: Vector3 | [number, number, number]): this;
```

##### length() <a id="vector-3-length"></a>

Calculate the Euclidean length of the vector.

```ts
Vector3.length(): number;
```

##### squaredLength() <a id="vector-3-squared-length"></a>

Calculate the squared length of the vector.

```ts
Vector3.squaredLength(): number;
```

##### manhattanLength() <a id="vector-3-manhattan-length"></a>

Calculate the Manhattan length of the vector.

```ts
Vector3.manhattanLength(): number;
```

##### equals(vector) <a id="vector-3-equals"></a>

Check if the vector is equal with a given vector.

- `vector`: Vector to check.

```ts
Vector3.equals(vector: Vector3 | [number, number, number]): boolean;
```

##### collinear(vector1, vector2) <a id="vector-3-collinear"></a>

Check if the vector is collinear with given vectors.

- `vector1`: First vector to check.
- `vector2`: Second vector to check.

```ts
Vector3.collinear(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): boolean;
```

##### dot(vector) <a id="vector-3-dot"></a>

Calculate the dot product of a given vector with the vector.

- `vector`: Vector to compute the dot product with.

```ts
Vector3.dot(vector: Vector3 | [number, number, number]): number;
```

##### cross(vector) <a id="vector-3-cross"></a>

Calculate the cross product of a given vector with the vector.

- `vector`: Vector to compute the cross product with.

```ts
Vector3.cross(vector: Vector3 | [number, number, number]): [number, number, number];
```

##### angleTo(vector) <a id="vector-3-angle-to"></a>

Calculate the angle between a given vector and the vector.

- `vector`: Vector to compute the angle with.

```ts
Vector3.angleTo(vector: Vector3 | [number, number, number]): number;
```

##### distanceTo(vector) <a id="vector-3-distance-to"></a>

Calculate the Euclidean distance from a given vector to the vector.

- `vector`: Vector to compute the distance to.

```ts
Vector3.distanceTo(vector: Vector3 | [number, number, number]): number;
```

##### squaredDistanceTo(vector) <a id="vector-3-squared-distance-to"></a>

Calculate the squared distance from a given vector to the vector.

- `vector`: Vector to compute the squared distance to.

```ts
Vector3.squaredDistanceTo(vector: Vector3 | [number, number, number]): number;
```

##### manhattanDistanceTo(vector) <a id="vector-3-manhattan-distance-to"></a>

Calculate the Manhattan distance from a given vector to the vector.

- `vector`: Vector to compute the Manhattan distance to.

```ts
Vector3.manhattanDistanceTo(vector: Vector3 | [number, number, number]): number;
```

##### toArray() <a id="vector-3-to-array"></a>

Return the vector values into an array.

```ts
Vector3.toArray(): [number, number, number];
```

##### fromArray(values) <a id="vector-3-from-array"></a>

Set the vector values from a given array.

- `values`: Values to set.

```ts
Vector3.fromArray(values: number[]): this;
```

##### fromSphericalCoords(radius, phi, theta) <a id="vector-3-from-spherical-coords"></a>

Set the vector values from given spherical coordinates.

- `radius`: Radius of the sphere.
- `phi`: Polar angle from the y (up) axis : [0, PI]
- `theta`: Equator angle around the y (up) axis : [0, 2*PI]

```ts
Vector3.fromSphericalCoords(radius: number, phi: number, theta: number): this;
```

##### fromCylindricalCoords(radius, theta, y) <a id="vector-3-from-cylindrical-coords"></a>

Set the vector values from given cylindrical coordinates.

- `radius`: Radius of the cylinder.
- `theta`: Equator angle around the y (up) axis : [0, 2*PI]
- `y`: Y-axis value.

```ts
Vector3.fromCylindricalCoords(radius: number, theta: number, y: number): this;
```

##### copy(vector) <a id="vector-3-copy"></a>

Copy the values of a given vector to the vector.

- `vector`: Vector to copy values from.

```ts
Vector3.copy(vector: Vector3 | [number, number, number]): this;
```

##### clone() <a id="vector-3-clone"></a>

Create a new 3D vector with copied values from the vector.

```ts
Vector3.clone(): Vector3;
```

##### `static` add(vector1, vector2) <a id="vector-3-static-add-method"></a>

Add two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.add(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): [number, number, number];
```

##### `static` sub(vector1, vector2) <a id="vector-3-static-sub-method"></a>

Subtract two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.sub(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): [number, number, number];
```

##### `static` multiply(vector1, vector2) <a id="vector-3-static-multiply-method"></a>

Multiply two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.multiply(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): [number, number, number];
```

##### `static` divide(vector1, vector2) <a id="vector-3-static-divide-method"></a>

Divide two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.divide(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): [number, number, number];
```

##### `static` lerp(t, min, max) <a id="vector-3-static-lerp-method"></a>

Interpolate a point between two vectors.

- `t`: Normalized time value to interpolate.
- `min`: Minimum boundaries.
- `max`: Maximum boundaries.

```ts
static Vector3.lerp(t: number, min: Vector3 | [number, number, number], max: Vector3 | [number, number, number]): [number, number, number];
```

##### `static` equals(vector1, vector2) <a id="vector-3-static-equals-method"></a>

Check if two vectors are equal to each other.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.equals(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): boolean;
```

##### `static` collinear(vector1, vector2, vector3) <a id="vector-3-static-collinear-method"></a>

Check if three vectors are collinear (aligned on the same line).

- `vector1`: First vector.
- `vector2`: Second vector.
- `vector3`: Third vector.

```ts
static Vector3.collinear(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number], vector3: Vector3 | [number, number, number]): boolean;
```

##### `static` dot(vector1, vector2) <a id="vector-3-static-dot-method"></a>

Calculate the dot product of two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.dot(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): number;
```

##### `static` cross(vector1, vector2) <a id="vector-3-static-cross-method"></a>

Calculate the cross product of two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.cross(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): [number, number, number];
```

##### `static` distance(vector1, vector2) <a id="vector-3-static-distance-method"></a>

Calculate the Euclidean distance between two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.distance(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): number;
```

##### `static` squaredDistance(vector1, vector2) <a id="vector-3-static-squared-distance-method"></a>

Calculate the squared distance between two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.squaredDistance(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): number;
```

##### `static` manhattanDistance(vector1, vector2) <a id="vector-3-static-manhattan-distance-method"></a>

Calculate the Manhattan distance between two vectors.

- `vector1`: First vector.
- `vector2`: Second vector.

```ts
static Vector3.manhattanDistance(vector1: Vector3 | [number, number, number], vector2: Vector3 | [number, number, number]): number;
```

##### `static` length(vector) <a id="vector-3-static-length-method"></a>

Calculate the Euclidean length of a vector.

- `vector`: Vector to compute Euclidean length from.

```ts
static Vector3.length(vector: Vector3 | [number, number, number]): number;
```

##### `static` squaredLength(vector) <a id="vector-3-static-squared-length-method"></a>

Calculate the squared length of a vector.

- `vector`: Vector to compute squared length from.

```ts
static Vector3.squaredLength(vector: Vector3 | [number, number, number]): number;
```

##### `static` manhattanLength(vector) <a id="vector-3-static-manhattan-length-method"></a>

Calculate the Manhattan length of a vector.

- `vector`: Vector to compute Manhattan length from.

```ts
static Vector3.manhattanLength(vector: Vector3 | [number, number, number]): number;
```

##### `static` fromSphericalCoords(radius, phi, theta) <a id="vector-3-static-from-spherical-coords-method"></a>

Convert spherical coordinates to a 3D point on the surface of a sphere.

- `phi`: Polar angle from the y (up) axis : [0, PI]
- `theta`: Equator angle around the y (up) axis : [0, 2*PI]
- `[radius=1]`: Radius of the sphere.

```ts
static Vector3.fromSphericalCoords(phi: number, theta: number, radius?: number): [number, number, number];
```

##### `static` fromCylindricalCoords(radius, theta, y) <a id="vector-3-static-from-cylindrical-coords-method"></a>

Convert cylindrical coordinates to a 3D point on the surface of a cylinder.

- `theta`: Equator angle around the y (up) axis : [0, 2*PI]
- `y`: Y-axis value.
- `[radius=1]`: Radius of the cylinder.

```ts
static Vector3.fromCylindricalCoords(theta: number, y: number, radius?: number): [number, number, number];
```
