// import { EPSILON } from '../../constants';
// import { dot } from '../../geometry';
// import type { Matrix2x2, Matrix2x3 } from '../../types';

// // prettier-ignore
// export const IDENTITY_MATRIX_2: Matrix2x3 = [
//   1, 0,
//   0, 1,
//   0, 0,
// ] as const;

// export default class Matrix2 {
//   readonly isMatrix2 = true;
//   readonly type: string = 'Matrix2';

//   private _matrix: Matrix2x3 = [...IDENTITY_MATRIX_2];

//   /**
//    *
//    * @param m11
//    * @param m12
//    * @param m21
//    * @param m22
//    * @param m31
//    * @param m32
//    */
//   constructor(m11: number = 1, m12: number = 0, m21: number = 0, m22: number = 1, m31: number = 0, m32: number = 0) {
//     this.set(m11, m12, m21, m22, m31, m32);
//   }

//   /**
//    *
//    * @param m11
//    * @param m12
//    * @param m21
//    * @param m22
//    * @param m31
//    * @param m32
//    */
//   public set(m11: number, m12: number, m21: number, m22: number, m31: number, m32: number): this {
//     this._matrix[0] = m11;
//     this._matrix[1] = m12;
//     this._matrix[2] = m21;
//     this._matrix[3] = m22;
//     this._matrix[4] = m31;
//     this._matrix[5] = m32;
//     return this;
//   }

//   /**
//    *
//    * @param array
//    * @returns
//    */
//   public fromArray(array: number[]): this {
//     for (let i = 0; i < 6; i++) {
//       this._matrix[i] = array[i] ?? IDENTITY_MATRIX_2[i];
//     }
//     return this;
//   }

//   /**
//    *
//    * @returns {Matrix2x3}
//    */
//   public toArray(): Matrix2x3 {
//     return [this.a, this.b, this.c, this.d, this.e, this.f];
//   }

//   public toMatrix2x2(): Matrix2x2 {
//     return [this.a, this.b, this.c, this.d];
//   }
//   public toMatrix2x3(): Matrix2x3 {
//     return [this.a, this.b, this.c, this.d, this.e, this.f];
//   }

//   public invert(): this {
//     if (Math.abs(this.determinant) <= EPSILON) {
//       this.set(NaN, NaN, NaN, NaN, NaN, NaN);
//       return this;
//     }

//     const invDet = 1 / this.determinant;
//     this.set(
//       this.d * invDet,
//       -this.b * invDet,
//       -this.c * invDet,
//       this.a * invDet,
//       (this.c * this.f - this.d * this.e) * invDet,
//       (this.b * this.e - this.a * this.f) * invDet
//     );

//     return this;
//   }

//   public multiply([a, b, c, d, e = 0, f = 0]: Matrix2 | Matrix2x2 | Matrix2x3): this {
//     return this.set(
//       this.a * a + this.c * b,
//       this.b * a + this.d * b,
//       this.a * c + this.c * d,
//       this.b * c + this.d * d,
//       this.a * e + this.c * f + this.e,
//       this.b * e + this.d * f + this.f
//     );
//   }

//   public translate(translateX: number, translateY: number): this {
//     return this.multiply([1, 0, 0, 1, translateX, translateY]);
//   }

//   public scale(scaleX: number, scaleY: number): this {
//     return this.multiply([scaleX, 0, 0, scaleY]);
//   }

//   /**
//    *
//    * @param angle (in radians)
//    * @returns
//    */
//   public rotate(angle: number) {
//     const cos = Math.cos(angle);
//     const sin = Math.sin(angle);
//     return this.multiply([cos, sin, -sin, cos]);
//   }

//   /**
//    *
//    * @param {Matrix2} matrix
//    * @returns {boolean}
//    */
//   public equals([a, b, c, d, e = 0, f = 0]: Matrix2 | Matrix2x2 | Matrix2x3): boolean {
//     return (
//       Math.abs(this.a - a) <= EPSILON &&
//       Math.abs(this.b - b) <= EPSILON &&
//       Math.abs(this.c - c) <= EPSILON &&
//       Math.abs(this.d - d) <= EPSILON &&
//       Math.abs(this.e - e) <= EPSILON &&
//       Math.abs(this.f - f) <= EPSILON
//     );
//   }

//   /**
//    *
//    * @returns
//    */
//   public identity(): this {
//     this.set(...IDENTITY_MATRIX_2);
//     return this;
//   }

//   public reset(): this {
//     return this.identity();
//   }

//   /**
//    *
//    * @returns
//    */
//   public isIdentity(): boolean {
//     return this.equals(IDENTITY_MATRIX_2);
//   }

//   /**
//    *
//    * @returns {boolean}
//    */
//   public isOrthogonal(): boolean {
//     return Math.abs(this.dot) <= EPSILON;
//   }

//   /**
//    *
//    * @returns {boolean}
//    */
//   public isUniform(): boolean {
//     return Math.abs(this.scaleX - this.scaleY) <= EPSILON && this.isOrthogonal();
//   }

//   public copy(matrix: Matrix2): Matrix2 {
//     this.set(...matrix.toArray());
//     return this;
//   }

//   public clone(): Matrix2 {
//     return new Matrix2(...this.toArray());
//   }

//   get dot(): number {
//     return dot(this.a, this.b, this.c, this.d);
//   }

//   get determinant(): number {
//     return this.a * this.d - this.b * this.c;
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
//   get rotation(): number {
//     return Math.atan2(this.b, this.a);
//   }

//   get a() {
//     return this._matrix[0];
//   }
//   get b() {
//     return this._matrix[1];
//   }
//   get c() {
//     return this._matrix[2];
//   }
//   get d() {
//     return this._matrix[3];
//   }
//   get e() {
//     return this._matrix[4];
//   }
//   get f() {
//     return this._matrix[5];
//   }

//   get m11() {
//     return this._matrix[0];
//   }
//   get m12() {
//     return this._matrix[1];
//   }
//   get m21() {
//     return this._matrix[2];
//   }
//   get m22() {
//     return this._matrix[3];
//   }
//   get m31() {
//     return this._matrix[4];
//   }
//   get m32() {
//     return this._matrix[5];
//   }

//   *[Symbol.iterator](): Iterator<number> {
//     yield this.a;
//     yield this.b;
//     yield this.c;
//     yield this.d;
//     yield this.e;
//     yield this.f;
//   }
// }
