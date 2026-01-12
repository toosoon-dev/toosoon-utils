import { W3CX11 } from '../../constants';
import { lerp, triLerp } from '../../maths';
import {
  normalizeColor,
  normalizeHslString,
  hexToRgb,
  hslToRgb,
  hsbToRgb,
  labToRgb,
  hclToRgb,
  rgbToHex,
  rgbToHexString,
  rgbToHsl,
  rgbToHsb,
  rgbToLab,
  rgbToHcl
} from '../../colors';
import type {
  ColorName,
  ColorHex,
  ColorRgb,
  ColorHsl,
  ColorHsb,
  ColorHcl,
  ColorLab,
  ColorRepresentation
} from '../../types';

/**
 * Parameters used for color interpolation
 */
export type ColorInterpolationsParameters = {
  rgb: Parameters<typeof Color.lerpRgb>[3];
  hsl: Parameters<typeof Color.lerpHsl>[3];
  hsb: Parameters<typeof Color.lerpHsb>[3];
  qualitative: Parameters<typeof Color.interpolateQualitative>[3];
  sequential: Parameters<typeof Color.interpolateSequential>[3];
  diverging: Parameters<typeof Color.interpolateDiverging>[3];
};

/**
 * Type of interpolation
 */
export type ColorInterpolation = keyof ColorInterpolationsParameters;

/**
 * Type of hue interpolation
 */
export type HueInterpolationMode = 'direct' | 'shortest' | 'longest';

/**
 * Utility class for manipulating colors
 *
 * @exports
 * @class Color
 */
export default class Color {
  readonly isColor = true;
  readonly type: string = 'Color';

  /**
   * Red value of this color in the RGB color space
   */
  public r: number;
  /**
   * Green value of this color in the RGB color space
   */
  public g: number;
  /**
   * Blue value of this color in the RGB color space
   */
  public b: number;

  *[Symbol.iterator](): Iterator<number> {
    yield this.r;
    yield this.g;
    yield this.b;
  }

  /**
   * @param {ColorRepresentation} [color=0x000000] Color representation of this color
   */
  constructor(color: ColorRepresentation = 0x000000) {
    const [r, g, b] = normalizeColor(color);
    this.r = r;
    this.g = g;
    this.b = b;
  }

  /**
   * Set this color RGB values
   *
   * @param {Color|ColorRepresentation} color Color to set
   * @returns {this}
   */
  public set(color: Color | ColorRepresentation): this {
    if (color instanceof Color) {
      return this.copy(color);
    }

    const [r, g, b] = normalizeColor(color);
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  }

  /**
   * Set this color values from a given color name
   *
   * @param {ColorName} colorName Color name of the color to set
   * @returns {this}
   */
  public setColorName(colorName: ColorName): this {
    const hex = W3CX11[colorName];
    return this.setHex(hex);
  }

  /**
   * Set this color values from a given RGB color
   * Note:
   *   - RGB values are contained in the interval [0, 1]
   *
   * @param {ColorRgb} rgb RGB color
   * @returns {this}
   */
  public setRgb([r, g, b]: ColorRgb): this {
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  }

  /**
   * Set this color values from a given hexadecimal color
   *
   * @param {ColorHex} hex Hexadecimal color
   * @returns {this}
   */
  public setHex(hex: ColorHex): this {
    const rgb = hexToRgb(hex);
    return this.setRgb(rgb);
  }

  /**
   * Set this color values from a given HSL color
   * Note:
   *   - HSL values are contained in the intervals:
   *     - Hue:        [0, 360]
   *     - Saturation: [0, 1]
   *     - Lightness:  [0, 1]
   *
   * @param {ColorHsl|string} hsl HSL color
   * @returns {this}
   */
  public setHsl(hsl: ColorHsl | string): this {
    if (typeof hsl === 'string') {
      hsl = normalizeHslString(hsl);
    }

    const rgb = hslToRgb(hsl);
    return this.setRgb(rgb);
  }

  /**
   * Set this color values from a given HSB color
   * Note:
   *   - HSB values are contained in the intervals:
   *     - Hue:        [0, 360]
   *     - Saturation: [0, 1]
   *     - Brightness: [0, 1]
   *
   * @param {ColorHsb} hsb HSB color
   * @returns {this}
   */
  public setHsb(hsb: ColorHsb): this {
    const rgb = hsbToRgb(hsb);
    return this.setRgb(rgb);
  }

  /**
   * Set this color values from a given L*a*b* color
   * Note:
   *   - L*a*b* values are contained in the intervals:
   *     - Lightness:        [0 à 100]
   *     - a (green, red):   [~-128, ~+128]
   *     - b (blue, yellow): [~-128, ~+128]
   *
   * @param {ColorLab} lab L*a*b* color
   * @returns {this}
   */
  public setLab(lab: ColorLab): this {
    const rgb = labToRgb(lab);
    return this.setRgb(rgb);
  }

  /**
   * Set this color values from a given HCL color
   * Note:
   *   - HCL values are contained in the intervals:
   *     - Hue:       [0, 360]
   *     - Chroma:    [0, ~150]
   *     - Lightness: [0, 100]
   *
   * @param {ColorHcl} hcl HCL color
   * @returns {this}
   */
  public setHcl(hcl: ColorHcl): this {
    const rgb = hclToRgb(hcl);
    return this.setRgb(rgb);
  }

  /**
   * Linearly interpolate this color values to given color values
   *
   * @param {number} t Normalized time value to interpolate
   * @param {Color|ColorRgb} color Color to interpolate values towards
   * @returns {this}
   */
  public lerp(t: number, [r, g, b]: Color | ColorRgb): this {
    this.r += (r - this.r) * t;
    this.g += (g - this.g) * t;
    this.b += (b - this.b) * t;
    return this;
  }

  /**
   * Linearly interpolate this color RGB values towards given RGB values
   *
   * @param {number} t Normalized time value to interpolate
   * @param {ColorRgb} rgb RGB values to interpolate towards
   * @param {Object} [params]       Interpolation parameters
   * @param {number} [params.power] Interpolation exponent
   * @returns {this}
   */
  public lerpRgb(t: number, rgb: ColorRgb, params?: Parameters<typeof Color.lerpRgb>[3]): this {
    return this.setRgb(Color.lerpRgb(t, this.rgb, rgb, params));
  }

  /**
   * Linearly interpolate this color HSL values towards given HSL values
   *
   * @param {number} t Normalized time value to interpolate
   * @param {ColorHsl} hsl HSL values to interpolate towards
   * @param {Object} [params]                Interpolation parameters
   * @param {number|number[]} [params.power] Interpolation exponent(s) : [h, s, l]
   * @param {string} [params.hueMode]        Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @returns {this}
   */
  public lerpHsl(t: number, hsl: ColorHsl, params?: Parameters<typeof Color.lerpHsl>[3]): this {
    return this.setHsl(Color.lerpHsl(t, this.hsl, hsl));
  }

  /**
   * Linearly interpolate this color HSB values towards given HSB values
   *
   * @param {number} t Normalized time value to interpolate
   * @param {ColorHsb} hsb HSB values to interpolate towards
   * @param {Object} [params]                Interpolation parameters
   * @param {number|number[]} [params.power] Interpolation exponent(s) : [h, s, b]
   * @param {string} [params.hueMode]        Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @returns {this}
   */
  public lerpHsb(t: number, hsb: ColorHsb, params?: Parameters<typeof Color.lerpHsb>[3]): this {
    return this.setHsb(Color.lerpHsb(t, this.hsb, hsb, params));
  }

  /**
   * Interpolate this color HCL values towards given HCL values following HCL Qualitative color palettes algorithm
   *
   * @param {number} t Normalized time value to interpolate
   * @param {ColorHcl} hcl HCL values to interpolate towards
   * @param {Object} [params]         Interpolation parameters
   * @param {string} [params.hueMode] Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @returns {this}
   */
  public interpolateQualitative(
    t: number,
    hcl: ColorHcl,
    params?: Parameters<typeof Color.interpolateQualitative>[3]
  ): this {
    return this.setHcl(Color.interpolateQualitative(t, this.hcl, hcl, params));
  }

  /**
   * Interpolate this color HCL values towards given HCL values following HCL Sequential color palettes algorithm
   *
   * @param {number} t Normalized time value to interpolate
   * @param {ColorHcl} hcl HCL values to interpolate towards
   * @param {Object} [params]                Interpolation parameters
   * @param {number|number[]} [params.power] Interpolation exponent(s) : [c, l]
   * @param {string} [params.hueMode]        Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @param {number} [params.chromaMax]      Maximum chroma value
   * @returns {this}
   */
  public interpolateSequential(
    t: number,
    hcl: ColorHcl,
    params?: Parameters<typeof Color.interpolateSequential>[3]
  ): this {
    return this.setHcl(Color.interpolateSequential(t, this.hcl, hcl, params));
  }

  /**
   * Interpolate this color HCL values towards given HCL values following HCL Diverging color palettes algorithm
   *
   * @param {number} t Normalized time value to interpolate
   * @param {ColorHcl} hcl HCL values to interpolate towards
   * @param {Object} [params]                Interpolation parameters
   * @param {number|number[]} [params.power] Interpolation exponent(s) : ([c, l])
   * @returns {this}
   */
  public interpolateDiverging(
    t: number,
    hcl: ColorHcl,
    params?: Parameters<typeof Color.interpolateDiverging>[3]
  ): this {
    return this.setHcl(Color.interpolateDiverging(t, this.hcl, hcl, params));
  }

  /**
   * Check if this color is equal with a given color
   *
   * @param {Color|ColorRgb} color Color to check
   * @returns {boolean} True if this color is equal with the given color, false otherwise
   */
  public equals(color: Color | ColorRgb): boolean {
    return Color.equals(this, color);
  }

  /**
   * Return this color RGB values into an array
   *
   * @returns {ColorRgb}
   */
  public toArray(): ColorRgb {
    return this.rgb;
  }

  /**
   * Set this color RGB values from a given array
   *
   * @param {number[]} values Values to set
   * @returns {this}
   */
  public fromArray([r, g, b]: number[]): this {
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  }

  /**
   * Copy the RGB values of a given color to this color
   *
   * @param {Color|ColorRgb} color Color to copy values from
   * @returns {this}
   */
  public copy([r, g, b]: Color | ColorRgb): this {
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  }

  /**
   * Create a new color with copied RGB values from this color
   *
   * @returns {Color}
   */
  public clone(): Color {
    return new Color(this.rgb);
  }

  /**
   * RGB values of this color
   */
  set rgb(rgb: ColorRgb) {
    this.setRgb(rgb);
  }

  get rgb(): ColorRgb {
    return [this.r, this.g, this.b];
  }

  /**
   * Hexadecimal value of this color
   */
  set hex(hex: ColorHex) {
    this.setHex(hex);
  }

  get hex(): number {
    return rgbToHex(this.rgb);
  }

  /**
   * Hexadecimal string representing this color
   */
  get hexString(): string {
    return rgbToHexString(this.rgb);
  }

  /**
   * HSL values of this color
   */
  set hsl(hsl: ColorHsl) {
    this.setHsl(hsl);
  }

  get hsl(): ColorHsl {
    return rgbToHsl(this.rgb);
  }

  /**
   * HSL string representing this color (format: 'hsl(360, 100%, 100%)')
   */
  get hslString(): string {
    const [h, s, l] = this.hsl;
    return `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
  }

  /**
   * HSB values of this color
   */
  set hsb(hsb: ColorHsb) {
    this.setHsb(hsb);
  }

  get hsb(): ColorHsb {
    return rgbToHsb(this.rgb);
  }

  /**
   * L*a*b* values of this color
   */
  set lab(lab: ColorLab) {
    this.setLab(lab);
  }

  get lab(): ColorLab {
    return rgbToLab(this.rgb);
  }

  /**
   * HCL values of this color
   */
  set hcl(hcl: ColorHcl) {
    this.setHcl(hcl);
  }

  get hcl(): ColorHcl {
    return rgbToHcl(this.rgb);
  }

  /**
   * Linearly interpolate a color between two colors in the RGB color space
   *
   * @param {number} t Normalized time value to interpolate
   * @param {Color|ColorRgb} rgb1 Start color
   * @param {Color|ColorRgb} rgb2 End color
   * @param {Object} [params]         Interpolation parameters
   * @param {number} [params.power=1] Interpolation exponent
   * @returns {ColorRgb} Interpolated RGB color
   */
  static lerpRgb(
    t: number,
    [r1, g1, b1]: Color | ColorRgb,
    [r2, g2, b2]: Color | ColorRgb,
    { power = 1 }: { power?: number } = {}
  ): ColorRgb {
    const tp = Math.pow(t, power);
    const r = lerp(tp, r1, r2);
    const g = lerp(tp, g1, g2);
    const b = lerp(tp, b1, b2);
    return [r, g, b];
  }

  /**
   * Linearly interpolate a color between two colors in the HSL color space
   *
   * @param {number} t Normalized time value to interpolate
   * @param {ColorHsl} hsl1 Start color
   * @param {ColorHsl} hsl2 End color
   * @param {Object} [params]                  Interpolation parameters
   * @param {number|number[]} [params.power=1] Interpolation exponent(s) : [h, s, l]
   * @param {string} [params.hueMode]          Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @returns {ColorHsl} Interpolated HSL color
   */
  static lerpHsl(
    t: number,
    [h1, s1, l1]: ColorHsl,
    [h2, s2, l2]: ColorHsl,
    { power = 1, hueMode }: { power?: number | [number, number, number]; hueMode?: HueInterpolationMode } = {}
  ): ColorHsl {
    const ph = Array.isArray(power) ? power[0] : power;
    const ps = Array.isArray(power) ? power[1] : power;
    const pl = Array.isArray(power) ? power[2] : power;
    const th = Math.pow(t, ph);
    const ts = Math.pow(t, ps);
    const tl = Math.pow(t, pl);
    const h = Color.lerpHue(th, h1, h2, hueMode);
    const s = lerp(ts, s1, s2);
    const l = lerp(tl, l1, l2);
    return [h, s, l];
  }

  /**
   * Linearly interpolate a color between two colors in the HSB color space
   *
   * @param {number} t Normalized time value to interpolate
   * @param {ColorHsb} hsb1 Start color
   * @param {ColorHsb} hsb2 End color
   * @param {Object} [params]                  Interpolation parameters
   * @param {number|number[]} [params.power=1] Interpolation exponent(s) : [h, s, b]
   * @param {string} [params.hueMode]          Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @returns {ColorHsb} Interpolated HSB color
   */
  static lerpHsb(
    t: number,
    [h1, s1, b1]: ColorHsb,
    [h2, s2, b2]: ColorHsb,
    { power = 1, hueMode }: { power?: number | [number, number, number]; hueMode?: HueInterpolationMode } = {}
  ): ColorHsb {
    const ph = Array.isArray(power) ? power[0] : power;
    const ps = Array.isArray(power) ? power[1] : power;
    const pb = Array.isArray(power) ? power[2] : power;
    const th = Math.pow(t, ph);
    const ts = Math.pow(t, ps);
    const tb = Math.pow(t, pb);
    const h = Color.lerpHue(th, h1, h2, hueMode);
    const s = lerp(ts, s1, s2);
    const b = lerp(tb, b1, b2);
    return [h, s, b];
  }

  /**
   * Interpolate a color between 2 colors following HCL Qualitative color palettes algorithm
   *   -> https://colorspace.r-forge.r-project.org/articles/hcl_palettes.html#qualitative-palettes
   *
   * Qualitative color palettes:
   *   - Hue:       Linear
   *   - Chroma:    Constant
   *   - Luminance: Constant
   *
   *   Designed for coding categorical information,
   *   where no particular ordering of categories is available
   *   and every color should receive the same perceptual weight.
   *
   * @param {number} t Normalized time value to interpolate
   * @param {ColorHcl} hcl1 Start color
   * @param {ColorHcl} hcl2 End color
   * @param {Object} [params]         Interpolation parameters
   * @param {string} [params.hueMode] Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @returns {ColorHcl} Interpolated HCL color
   */
  static interpolateQualitative(
    t: number,
    [h1, c1, l1]: ColorHcl,
    [h2]: ColorHcl,
    { hueMode }: { hueMode?: HueInterpolationMode } = {}
  ): ColorHcl {
    const h = Color.lerpHue(t, h1, h2, hueMode);
    const c = c1;
    const l = l1;
    return [h, c, l];
  }

  /**
   * Interpolate a color between 2 colors following HCL Sequential color palettes algorithm
   *   -> https://colorspace.r-forge.r-project.org/articles/hcl_palettes.html#sequential-palettes-single-hue
   *   -> https://colorspace.r-forge.r-project.org/articles/hcl_palettes.html#sequential-palettes-multi-hue
   *
   * Sequential color palettes:
   *   - Hue:       Constant | Linear
   *   - Chroma:    Linear (+power) | Triangular (+power)
   *   - Luminance: Linear (+power)
   *
   *   Designed for coding ordered/numeric information,
   *   going from high to low (or vice versa).
   *
   * @param {number} t Normalized time value to interpolate
   * @param {ColorHcl} hcl1 Start color
   * @param {ColorHcl} hcl2 End color
   * @param {Object} [params]                  Interpolation parameters
   * @param {number|number[]} [params.power=1] Interpolation exponent(s) : [c, l]
   * @param {string} [params.hueMode]          Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @param {number} [params.chromaMax]        Maximum chroma value
   * @returns {ColorHcl} Interpolated HCL color
   */
  static interpolateSequential(
    t: number,
    [h1, c1, l1]: ColorHcl,
    [h2, c2, l2]: ColorHcl,
    {
      power = 1,
      hueMode,
      chromaMax
    }: { power?: number | [number, number]; hueMode?: HueInterpolationMode; chromaMax?: number } = {}
  ): ColorHcl {
    const pc = Array.isArray(power) ? power[0] : power;
    const pl = Array.isArray(power) ? power[1] : power;
    const tc = Math.pow(t, pc);
    const tl = Math.pow(t, pl);
    const h = Color.lerpHue(t, h1, h2, hueMode);
    const c = tlerp(tc, c1, c2, chromaMax);
    const l = lerp(tl, l1, l2);
    return [h, c, l];
  }

  /**
   * Interpolate a color between 2 colors following HCL Diverging color palettes algorithm
   *   -> https://colorspace.r-forge.r-project.org/articles/hcl_palettes.html#diverging-palettes
   *
   * Diverging color palettes:
   *   - Hue:       Constants (x2)
   *   - Chroma:    Linear (+power) | Triangular (+power)
   *   - Luminance: Linear (+power)
   *
   *   Designed for coding ordered/numeric information around a central neutral value,
   *   where colors diverge from neutral to two extremes.
   *
   * @param {number} t Normalized time value to interpolate
   * @param {ColorHcl} hcl1 Start color
   * @param {ColorHcl} hcl2 End color
   * @param {Object} [params]                  Interpolation parameters
   * @param {number|number[]} [params.power=1] Interpolation exponent(s) : ([c, l])
   * @returns {ColorHcl} Interpolated HCL color
   */
  static interpolateDiverging(
    t: number,
    [h1, c1, l1]: ColorHcl,
    [h2, c2, l2]: ColorHcl,
    { power = 1 }: { power?: number | [number, number] } = {}
  ): ColorHcl {
    const pc = Array.isArray(power) ? power[0] : power;
    const pl = Array.isArray(power) ? power[1] : power;
    const tc = Math.pow(t, pc);
    const tl = Math.pow(t, pl);
    const h = tc < 0.5 ? h1 : tc > 0.5 ? h2 : 0;
    const c = tc === 0.5 ? 0 : tlerp(tc, c1, c2, 0);
    const l = lerp(tl, l1, l2);
    return [h, c, l];
  }

  /**
   * Interpolate a hue between two hue angles
   *
   * @param {number} t Normalized time value to interpolate
   * @param {number} h1 Start hue angle (in degrees)
   * @param {number} h2 End hue angle (in degrees)
   * @param {string} [mode='direct'] Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @returns {number} Interpolated hue
   */
  static lerpHue(t: number, h1: number, h2: number, mode: HueInterpolationMode = 'direct'): number {
    if (mode === 'direct') return lerp(t, h1, h2);
    let delta = ((h2 - h1 + 540) % 360) - 180;
    if (mode === 'longest') delta = delta > 0 ? delta - 360 : delta + 360;
    return (h1 + t * delta + 360) % 360;
  }

  /**
   * Check if two colors are equal to each other
   *
   * @param {Color|ColorRgb} color1 First color
   * @param {Color|ColorRgb} color2 Second color
   * @returns {boolean} True if the given colors are equal, false otherwise
   */
  static equals([r1, g1, b1]: Color | ColorRgb, [r2, g2, b2]: Color | ColorRgb): boolean {
    return r1 === r2 && g1 === g2 && b1 === b2;
  }
}

/** Utils */
function tlerp(t: number, min: number, max: number, peak?: number): number {
  // prettier-ignore
  return typeof peak === 'number' ?
    triLerp(t, min, max, peak) :
    lerp(t, min, max);
}
