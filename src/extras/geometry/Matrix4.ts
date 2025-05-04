// import { EPSILON } from '../../constants';
// import Vector3 from './Vector3';
// import type { Matrix4x4, Vector3D } from '../../types';

// // prettier-ignore
// export const IDENTITY_MATRIX_4: Matrix4x4 = [
//     1, 0, 0, 0,
//     0, 1, 0, 0,
//     0, 0, 1, 0,
//     0, 0, 0, 1,
// ] as const;

// /**
//  * Represent a 4×4 matrix
//  *
//  * Note on Row-Major and Column-Major Ordering
//  *  The constructor and methods take arguments in row-major order:
//  *   n11, n12, n13, n14
//  *   n21, n22, n23, n24
//  *   n31, n32, n33, n34
//  *   n41, n42, n43, n44
//  *
//  *  Meanwhile, the intern values are stored in column-major order:
//  *   m11, m21, m31, m41
//  *   m12, m22, m32, m42
//  *   m13, m23, m33, m43
//  *   m14, m24, m34, m44
//  *
//  * 2D matrix transform aliases:
//  * | 2D  | 3D equivalent |
//  * | --- | ------------  |
//  * | `a` | `n11` | `m11` |
//  * | `b` | `n21` | `m12` |
//  * | `c` | `n12` | `m21` |
//  * | `d` | `n22` | `m22` |
//  * | `e` | `n14` | `m41` |
//  * | `f` | `n24` | `m42` |
//  *
//  *  a, b  |  a, c, 0, e
//  *  c, d  |  b, d, 0, f
//  *  0, 0  |
//  *  e, f  |
//  *
//  * @exports
//  * @class Matrix4
//  */
// export default class Matrix4 {
//   readonly isMatrix4 = true;
//   readonly type: string = 'Matrix4';

//   public values!: Matrix4x4;

//   static identity = new Matrix4();

//   /**
//    * Create a new matrix and set its values (in row-major order)
//    *
//    * @param {number} [n11] 1-1 matrix value
//    * @param {number} [n12] 1-2 matrix value
//    * @param {number} [n13] 1-3 matrix value
//    * @param {number} [n14] 1-4 matrix value
//    * @param {number} [n21] 2-1 matrix value
//    * @param {number} [n22] 2-2 matrix value
//    * @param {number} [n23] 2-3 matrix value
//    * @param {number} [n24] 2-4 matrix value
//    * @param {number} [n31] 3-1 matrix value
//    * @param {number} [n32] 3-2 matrix value
//    * @param {number} [n33] 3-3 matrix value
//    * @param {number} [n34] 3-4 matrix value
//    * @param {number} [n41] 4-1 matrix value
//    * @param {number} [n42] 4-2 matrix value
//    * @param {number} [n43] 4-3 matrix value
//    * @param {number} [n44] 4-4 matrix value
//    */
//   constructor(
//     n11: number = IDENTITY_MATRIX_4[0],
//     n12: number = IDENTITY_MATRIX_4[1],
//     n13: number = IDENTITY_MATRIX_4[2],
//     n14: number = IDENTITY_MATRIX_4[3],
//     n21: number = IDENTITY_MATRIX_4[4],
//     n22: number = IDENTITY_MATRIX_4[5],
//     n23: number = IDENTITY_MATRIX_4[6],
//     n24: number = IDENTITY_MATRIX_4[7],
//     n31: number = IDENTITY_MATRIX_4[8],
//     n32: number = IDENTITY_MATRIX_4[9],
//     n33: number = IDENTITY_MATRIX_4[10],
//     n34: number = IDENTITY_MATRIX_4[11],
//     n41: number = IDENTITY_MATRIX_4[12],
//     n42: number = IDENTITY_MATRIX_4[13],
//     n43: number = IDENTITY_MATRIX_4[14],
//     n44: number = IDENTITY_MATRIX_4[15]
//   ) {
//     this.set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
//   }

//   /**
//    * Set this matrix values (in row-major order)
//    *
//    * @param {number} n11 1-1 matrix value
//    * @param {number} n12 1-2 matrix value
//    * @param {number} n13 1-3 matrix value
//    * @param {number} n14 1-4 matrix value
//    * @param {number} n21 2-1 matrix value
//    * @param {number} n22 2-2 matrix value
//    * @param {number} n23 2-3 matrix value
//    * @param {number} n24 2-4 matrix value
//    * @param {number} n31 3-1 matrix value
//    * @param {number} n32 3-2 matrix value
//    * @param {number} n33 3-3 matrix value
//    * @param {number} n34 3-4 matrix value
//    * @param {number} n41 4-1 matrix value
//    * @param {number} n42 4-2 matrix value
//    * @param {number} n43 4-3 matrix value
//    * @param {number} n44 4-4 matrix value
//    * @returns {this}
//    */
//   public set(
//     n11: number,
//     n12: number,
//     n13: number,
//     n14: number,
//     n21: number,
//     n22: number,
//     n23: number,
//     n24: number,
//     n31: number,
//     n32: number,
//     n33: number,
//     n34: number,
//     n41: number,
//     n42: number,
//     n43: number,
//     n44: number
//   ): this {
//     (this.values[0] = n11), (this.values[4] = n12), (this.values[8] = n13), (this.values[12] = n14);
//     (this.values[1] = n21), (this.values[5] = n22), (this.values[9] = n23), (this.values[13] = n24);
//     (this.values[2] = n31), (this.values[6] = n32), (this.values[10] = n33), (this.values[14] = n34);
//     (this.values[3] = n41), (this.values[7] = n42), (this.values[11] = n43), (this.values[15] = n44);
//     return this;
//   }

//   /**
//    * Set this matrix to the 4x4 identity matrix
//    *
//    * @returns {this}
//    */
//   public identity(): this {
//     return this.set(...IDENTITY_MATRIX_4);
//   }

//   /**
//    * Set this matrix values from a given array
//    *
//    * @param {number[]} values Matrix values (in column-major order)
//    * @returns {this}
//    */
//   public fromArray(values: number[]): this {
//     for (let i = 0; i < 16; i++) {
//       this.values[i] = values[i] ?? IDENTITY_MATRIX_4[i];
//     }
//     return this;
//   }

//   /**
//    * Return this matrix values into an array (in column-major order)
//    *
//    * @returns {Matrix4x4}
//    */
//   public toArray(): Matrix4x4 {
//     return [...this.values];
//   }

//   /**
//    * Check if this matrix is equal with another given 4x4 matrix
//    *
//    * @param {Matrix4} matrix The matrix to test for equality
//    * @returns {boolean}
//    */
//   public equals(matrix: Matrix4): boolean {
//     for (let i = 0; i < 16; i++) {
//       if (Math.abs(this.values[i] - matrix.values[i]) > EPSILON) return false;
//     }
//     return true;
//   }

//   /**
//    * Post-multiply this matrix by a given 4x4 matrix
//    *
//    * @param {Matrix4} matrix The matrix to multiply with
//    * @returns {this}
//    */
//   public multiply(matrix: Matrix4): this {
//     return this.set(...Matrix4.multiplyMatrices(this, matrix));
//   }

//   /**
//    * Pre-multiply this matrix by a given 4x4 matrix
//    *
//    * @param {Matrix4} matrix The matrix to multiply with
//    * @returns {this}
//    */
//   public premultiply(matrix: Matrix4): this {
//     return this.set(...Matrix4.multiplyMatrices(matrix, this));
//   }

//   /**
//    * Multipliy all values of this matrix
//    *
//    * @param {number} s The scalar to multiply with
//    * @returns {this}
//    */
//   public multiplyScalar(s: number): this {
//     (this.values[0] *= s), (this.values[4] *= s), (this.values[8] *= s), (this.values[12] *= s);
//     (this.values[1] *= s), (this.values[5] *= s), (this.values[9] *= s), (this.values[13] *= s);
//     (this.values[2] *= s), (this.values[6] *= s), (this.values[10] *= s), (this.values[14] *= s);
//     (this.values[3] *= s), (this.values[7] *= s), (this.values[11] *= s), (this.values[15] *= s);
//     return this;
//   }

//   /**
//    * Transpose this matrix
//    *
//    * @returns {this}
//    */
//   public transpose(): this {
//     const values = [...this.values];
//     (this.values[1] = values[4]), (this.values[4] = values[1]);
//     (this.values[2] = values[8]), (this.values[8] = values[2]);
//     (this.values[6] = values[9]), (this.values[9] = values[6]);
//     (this.values[3] = values[12]), (this.values[12] = values[3]);
//     (this.values[7] = values[13]), (this.values[13] = values[7]);
//     (this.values[11] = values[14]), (this.values[14] = values[11]);
//     return this;
//   }

//   // public invert() {}

//   /**
//    * Set the position values of this matrix
//    *
//    * @param {Vector3|Vector3D} vector Vector to set values from
//    * @returns {this}
//    */
//   public setPosition([x, y, z]: Vector3 | Vector3D): this {
//     this.values[12] = x;
//     this.values[13] = y;
//     this.values[14] = z;
//     return this;
//   }

//   /**
//    * Multiply the columns of this matrix
//    *
//    * @param {Vector3|Vector3D} vector Scale vector
//    * @returns {this}
//    */
//   public scale([x, y, z]: Vector3 | Vector3D): this {
//     (this.values[0] *= x), (this.values[4] *= y), (this.values[8] *= z);
//     (this.values[1] *= x), (this.values[5] *= y), (this.values[9] *= z);
//     (this.values[2] *= x), (this.values[6] *= y), (this.values[10] *= z);
//     (this.values[3] *= x), (this.values[7] *= y), (this.values[11] *= z);
//     return this;
//   }

//   /**
//    * Set this matrix as a translation transformation
//    *
//    * @param {Vector3|Vector3D} vector Translation vector
//    * @returns {this}
//    */
//   public makeTranslation([x, y, z]: Vector3 | Vector3D): this {
//     // prettier-ignore
//     return this.set(
//       1, 0, 0, x,
//       0, 1, 0, y,
//       0, 0, 1, z,
//       0, 0, 0, 1
//     );
//   }

//   /**
//    * Set this matrix as a rotational transformation around the X-axis
//    *
//    * @param {number} theta Rotation angle (in radians)
//    * @returns {this}
//    */
//   public makeRotationX(theta: number): this {
//     const cos = Math.cos(theta);
//     const sin = Math.sin(theta);
//     // prettier-ignore
//     return this.set(
// 			1, 0,   0,    0,
// 			0, cos, -sin, 0,
// 			0, sin, cos,  0,
// 			0, 0,   0,    1,
// 		);
//   }

//   /**
//    * Set this matrix as a rotational transformation around the Y-axis
//    *
//    * @param {number} theta Rotation angle (in radians)
//    * @returns {this}
//    */
//   public makeRotationY(theta: number): this {
//     const cos = Math.cos(theta);
//     const sin = Math.sin(theta);
//     // prettier-ignore
//     return this.set(
// 			cos,  0, sin, 0,
// 			0,    1, 0,   0,
// 			-sin, 0, cos, 0,
// 			0,    0, 0,   1,
// 		);
//   }

//   /**
//    * Set this matrix as a rotational transformation around the Z-axis
//    *
//    * @param {number} theta Rotation angle (in radians)
//    * @returns {this}
//    */
//   public makeRotationZ(theta: number): this {
//     const cos = Math.cos(theta);
//     const sin = Math.sin(theta);
//     // prettier-ignore
//     return this.set(
// 			cos, -sin, 0, 0,
// 			sin, cos,  0, 0,
// 			0,   0,    1, 0,
// 			0,   0,    0, 1,
// 		);
//   }

//   /**
//    * Set this matrix as a rotational transformation
//    *
//    * @param {Vector3|Vector3D} vector Rotation normalized vector
//    * @param {number} angle Rotation angle (in radians)
//    * @returns {this}
//    */
//   public makeRotationAxis([x, y, z]: Vector3 | Vector3D, angle: number): this {
//     const cos = Math.cos(angle);
//     const sin = Math.sin(angle);
//     const t = 1 - cos;
//     const tx = t * x;
//     const ty = t * y;
//     // prettier-ignore
//     return this.set(
//       tx * x + cos,     tx * y - sin * z, tx * z + sin * y, 0,
// 			tx * y + sin * z, ty * y + cos,     ty * z - sin * x, 0,
// 			tx * z - sin * y, ty * z + sin * x, t * z * z + cos,  0,
// 			0,                0,                0,                1,
//     );
//   }

//   /**
//    * Set this matrix as a scale transformation
//    *
//    * @param {Vector3|Vector3D} vector Scale vector
//    * @returns
//    */
//   public makeScale([x, y, z]: Vector3 | Vector3D): this {
//     // prettier-ignore
//     return this.set(
//       x, 0, 0, 0,
// 			0, y, 0, 0,
// 			0, 0, z, 0,
// 			0, 0, 0, 1,
//     );
//   }

//   /**
//    * Set this matrix as a shear transformation
//    *
//    * @param {number} xy The amount to shear X by Y
//    * @param {number} xz The amount to shear X by Y
//    * @param {number} yx The amount to shear X by Y
//    * @param {number} yz The amount to shear X by Y
//    * @param {number} zx The amount to shear X by Y
//    * @param {number} zy The amount to shear X by Y
//    * @returns {this}
//    */
//   public makeShear(xy: number, xz: number, yx: number, yz: number, zx: number, zy: number): this {
//     // prettier-ignore
//     return this.set(
//       1,  yx, zx, 0,
//       xy, 1,  zy, 0,
//       xz, yz, 1,  0,
//       0,  0,  0,  1,
//     );
//   }

//   /**
//    * Copy all values of a given matrix to this one
//    *
//    * @param {Matrix4} matrix Matrix to copy values from
//    * @returns {this}
//    */
//   public copy(matrix: Matrix4): this {
//     this.values[0] = matrix.values[0];
//     this.values[1] = matrix.values[1];
//     this.values[2] = matrix.values[2];
//     this.values[3] = matrix.values[3];
//     this.values[4] = matrix.values[4];
//     this.values[5] = matrix.values[5];
//     this.values[6] = matrix.values[6];
//     this.values[7] = matrix.values[7];
//     this.values[8] = matrix.values[8];
//     this.values[9] = matrix.values[9];
//     this.values[10] = matrix.values[10];
//     this.values[11] = matrix.values[11];
//     this.values[12] = matrix.values[12];
//     this.values[13] = matrix.values[13];
//     this.values[14] = matrix.values[14];
//     this.values[15] = matrix.values[15];
//     return this;
//   }

//   /**
//    * Create a new matrix from this one
//    *
//    * @returns {Matrix4}
//    */
//   public clone(): Matrix4 {
//     return new Matrix4().fromArray(this.values);
//   }

//   /**
//    * Check if this matrix is equal to the 4x4 identity matrix
//    *
//    * @returns {boolean}
//    */
//   public isIdentity(): boolean {
//     return this.equals(Matrix4.identity);
//   }

//   /**
//    * Check if this matrix does not contain any 3D transformation
//    *
//    * @returns {boolean}
//    */
//   public is2D(): boolean {
//     const { a, b, c, d, e, f } = this;
//     // prettier-ignore
//     return this.equals(
//       new Matrix4(
//         a, c, 0, e,
//         b, d, 0, f,
//         0, 0, 1, 0,
//         0, 0, 0, 1
//       )
//     );
//   }

//   /**
//    * Multiply given 4x4 matrices
//    *
//    * @param matrix1 The first matrix
//    * @param matrix2 The second matrix
//    * @returns {Matrix4x4} Matrix values (in row-major order)
//    */
//   static multiplyMatrices(matrix1: Matrix4, matrix2: Matrix4): Matrix4x4 {
//     const m1 = matrix1.toArray();
//     const m2 = matrix2.toArray();

//     // prettier-ignore
//     const
//       a11 = m1[0], a12 = m1[4], a13 = m1[8], a14 = m1[12],
//       a21 = m1[1], a22 = m1[5], a23 = m1[9], a24 = m1[13],
//       a31 = m1[2], a32 = m1[6], a33 = m1[10], a34 = m1[14],
//       a41 = m1[3], a42 = m1[7], a43 = m1[11], a44 = m1[15],

//       b11 = m2[0], b12 = m2[4], b13 = m2[8], b14 = m2[12],
//       b21 = m2[1], b22 = m2[5], b23 = m2[9], b24 = m2[13],
//       b31 = m2[2], b32 = m2[6], b33 = m2[10], b34 = m2[14],
//       b41 = m2[3], b42 = m2[7], b43 = m2[11], b44 = m2[15];

//     const values: Matrix4x4 = [...IDENTITY_MATRIX_4];

//     values[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
//     values[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
//     values[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
//     values[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
//     values[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
//     values[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
//     values[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
//     values[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
//     values[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
//     values[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
//     values[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
//     values[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
//     values[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
//     values[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
//     values[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
//     values[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

//     return values;
//   }

//   /**
//    * n11, n12, n13, n14
//    * n21, n22, n23, n24
//    * n31, n32, n33, n34
//    * n41, n42, n43, n44
//    */
//   get n11(): number {
//     return this.values[0];
//   }
//   get n12(): number {
//     return this.values[1];
//   }
//   get n13(): number {
//     return this.values[2];
//   }
//   get n14(): number {
//     return this.values[3];
//   }
//   get n21(): number {
//     return this.values[4];
//   }
//   get n22(): number {
//     return this.values[5];
//   }
//   get n23(): number {
//     return this.values[6];
//   }
//   get n24(): number {
//     return this.values[7];
//   }
//   get n31(): number {
//     return this.values[8];
//   }
//   get n32(): number {
//     return this.values[9];
//   }
//   get n33(): number {
//     return this.values[10];
//   }
//   get n34(): number {
//     return this.values[11];
//   }
//   get n41(): number {
//     return this.values[12];
//   }
//   get n42(): number {
//     return this.values[13];
//   }
//   get n43(): number {
//     return this.values[14];
//   }
//   get n44(): number {
//     return this.values[15];
//   }

//   /**
//    * m11, m21, m31, m41
//    * m12, m22, m32, m42
//    * m13, m23, m33, m43
//    * m14, m24, m34, m44
//    */
//   get m11(): number {
//     return this.values[0];
//   }
//   get m21(): number {
//     return this.values[1];
//   }
//   get m31(): number {
//     return this.values[2];
//   }
//   get m41(): number {
//     return this.values[3];
//   }
//   get m12(): number {
//     return this.values[4];
//   }
//   get m22(): number {
//     return this.values[5];
//   }
//   get m32(): number {
//     return this.values[6];
//   }
//   get m42(): number {
//     return this.values[7];
//   }
//   get m13(): number {
//     return this.values[8];
//   }
//   get m23(): number {
//     return this.values[9];
//   }
//   get m33(): number {
//     return this.values[10];
//   }
//   get m43(): number {
//     return this.values[11];
//   }
//   get m14(): number {
//     return this.values[12];
//   }
//   get m24(): number {
//     return this.values[13];
//   }
//   get m34(): number {
//     return this.values[14];
//   }
//   get m44(): number {
//     return this.values[15];
//   }

//   /**
//    * a, b  |  a, c, 0, e
//    * c, d  |  b, d, 0, f
//    * 0, 0  |
//    * e, f  |
//    */
//   get a(): number {
//     return this.n11;
//   }
//   get b(): number {
//     return this.n12;
//   }
//   get c(): number {
//     return this.n21;
//   }
//   get d(): number {
//     return this.n22;
//   }
//   get e(): number {
//     return this.n41;
//   }
//   get f(): number {
//     return this.n42;
//   }

//   get translateX(): number {
//     return this.e;
//   }

//   get translateY(): number {
//     return this.f;
//   }

//   get scaleX(): number {
//     return Math.hypot(this.a, this.b);
//   }

//   get scaleY(): number {
//     return Math.hypot(this.c, this.d);
//   }

//   get rotationXY(): number {
//     return Math.atan2(this.b, this.a);
//   }

//   *[Symbol.iterator](): Iterator<number> {
//     yield this.n11;
//     yield this.n12;
//     yield this.n13;
//     yield this.n14;
//     yield this.n21;
//     yield this.n22;
//     yield this.n23;
//     yield this.n24;
//     yield this.n31;
//     yield this.n32;
//     yield this.n33;
//     yield this.n34;
//     yield this.n41;
//     yield this.n42;
//     yield this.n43;
//     yield this.n44;
//   }
// }
