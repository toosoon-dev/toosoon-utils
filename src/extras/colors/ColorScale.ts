import { clamp, lerp } from '../../maths';
import type { Range } from '../../types';
import Color, { type ColorInterpolationsParameters, type ColorInterpolation } from './Color';

/**
 * Processing parameter used to modify an input value into a target.
 *   - If the target is a number, the input will be set to its value
 *   - If the target is an array of numbers, the input will be clamped inside the range [min, max]
 *   - If the target is undefined, the input will stay the same
 */
export type ColorScaleProcessingTarget = number | Range | undefined;

/**
 * Parameters used for color scale processing
 */
export type ColorScaleProcessingParameters = {
  /**
   * Processing HSL modifiers
   */
  hsl?: {
    hue?: ColorScaleProcessingTarget;
    saturation?: ColorScaleProcessingTarget;
    lightness?: ColorScaleProcessingTarget;
  };
  /**
   * Processing HSB modifiers
   */
  hsb?: {
    hue?: ColorScaleProcessingTarget;
    saturation?: ColorScaleProcessingTarget;
    brightness?: ColorScaleProcessingTarget;
  };
  /**
   * Processing HCL modifiers
   */
  hcl?: {
    hue?: ColorScaleProcessingTarget;
    chroma?: ColorScaleProcessingTarget;
    luminance?: ColorScaleProcessingTarget;
  };
};

/**
 * Utility class for generating and processing color scales
 *
 * @exports
 * @class ColorScale
 */
export default class ColorScale {
  readonly isColorScale = true;
  readonly type: string = 'ColorScale';

  /**
   * Array of colors composing this color scale
   */
  public colors: Color[] = [];

  *[Symbol.iterator](): Iterator<Color> {
    yield* this.colors;
  }

  /**
   * Pick an interpolated color from this color scale
   *
   * @param {number} t Normalized time value to interpolate
   * @returns {Color} Interpolated color on this scale
   */
  public getColor(t: number): Color {
    const index = lerp(t, 0, this.length - 1);
    return this.colors[index];
  }

  /**
   * Set this color scale colors to an array of interpolated colors
   *
   * @param {ColorInterpolation} interpolation Type of interpolation used for generation
   * @param {number} length Amount of colors to generate
   * @param {Color} color1 Start color
   * @param {Color} color2 End color
   * @param {object} [params] Interpolation parameters
   * @returns {this}
   */
  public generate<I extends ColorInterpolation>(
    interpolation: I,
    length: number,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters[I]
  ): this {
    this.colors = ColorScale.generate(interpolation, length, color1, color2, params);
    return this;
  }

  /**
   * Set this color scale colors to an array of interpolated colors in the RGB color space
   *
   * @param {number} length Amount of colors to generate
   * @param {Color} color1 Start color
   * @param {Color} color2 End color
   * @param {object} [params]       Interpolation parameters
   * @param {number} [params.power] Interpolation exponent
   * @returns {this}
   */
  public generateRgb(
    length: number,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters['rgb']
  ): this {
    this.colors = ColorScale.generateRgb(length, color1, color2, params);
    return this;
  }

  /**
   * Set this color scale colors to an array of interpolated colors in the HSL color space
   *
   * @param {number} length Amount of colors to generate
   * @param {Color} color1 Start color
   * @param {Color} color2 End color
   * @param {object} [params]                Interpolation parameters
   * @param {number|number[]} [params.power] Interpolation exponent(s) : [h, s, l]
   * @param {string} [params.hueMode]        Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @returns {this}
   */
  public generateHsl(
    length: number,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters['hsl']
  ): this {
    this.colors = ColorScale.generateHsl(length, color1, color2, params);
    return this;
  }

  /**
   * Set this color scale colors to an array of interpolated colors in the HSB color space
   *
   * @param {number} length Amount of colors to generate
   * @param {Color} color1 Start color
   * @param {Color} color2 End color
   * @param {object} [params]                Interpolation parameters
   * @param {number|number[]} [params.power] Interpolation exponent(s) : [h, s, b]
   * @param {string} [params.hueMode]        Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @returns {this}
   */
  public generateHsb(
    length: number,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters['hsb']
  ): this {
    this.colors = ColorScale.generateHsb(length, color1, color2, params);
    return this;
  }

  /**
   * Set this color scale colors to an array of interpolated colors following HCL Qualitative color palettes algorithm
   *
   * @param {number} length Amount of colors to generate
   * @param {Color} color1 Start color
   * @param {Color} color2 End color
   * @param {object} [params]         Interpolation parameters
   * @param {string} [params.hueMode] Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @returns {this}
   */
  public generateQualitative(
    length: number,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters['qualitative']
  ): this {
    this.colors = ColorScale.generateQualitative(length, color1, color2, params);
    return this;
  }

  /**
   * Set this color scale colors to an array of interpolated colors following HCL Sequential color palettes algorithm
   *
   * @param {number} length Amount of colors to generate
   * @param {Color} color1 Start color
   * @param {Color} color2 End color
   * @param {number|number[]} [params.power] Interpolation exponent(s) : [c, l]
   * @param {string} [params.hueMode]        Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @param {number} [params.chromaMax]      Maximum chroma value
   * @returns {this}
   */
  public generateSequential(
    length: number,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters['sequential']
  ): this {
    this.colors = ColorScale.generateSequential(length, color1, color2, params);
    return this;
  }

  /**
   * Set this color scale colors to an array of interpolated colors following HCL Diverging color palettes algorithm
   *
   * @param {number} length Amount of colors to generate
   * @param {Color} color1 Start color
   * @param {Color} color2 End color
   * @param {object} [params]                Interpolation parameters
   * @param {number|number[]} [params.power] Interpolation exponent(s) : ([c, l])
   * @returns {this}
   */
  public generateDiverging(
    length: number,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters['diverging']
  ): this {
    this.colors = ColorScale.generateDiverging(length, color1, color2, params);
    return this;
  }

  /**
   * Process all colors composing this scale
   *
   * @param {ColorScaleProcessingParameters} [params] Processing parameters
   * @returns {this}
   */
  public process(params?: ColorScaleProcessingParameters): this {
    ColorScale.process(this, params);
    return this;
  }

  /**
   * Amount of colors composing this color scale
   */
  get length(): number {
    return this.colors.length;
  }

  /**
   * Generate an array of interpolated colors
   *
   * @param {ColorInterpolation} interpolation Type of interpolation used for generation
   * @param {number} length Amount of colors to generate
   * @param {Color} color1 Start color
   * @param {Color} color2 End color
   * @param {object} [params] Interpolation parameters
   * @returns {Color[]} Generated color scale
   */
  static generate<I extends ColorInterpolation>(
    interpolation: I,
    length: number,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters[I]
  ): Color[] {
    const interpolate = ColorScale._getInterpolateFunction(interpolation, color1, color2, params);
    const colors: Color[] = [];
    for (let i = 0; i < length; i++) {
      const t = i / (length - 1);
      const color = interpolate(t);
      colors.push(color);
    }
    return colors;
  }

  /**
   * Generate an array of interpolated colors in the RGB color space
   *
   * @param {number} length Amount of colors to generate
   * @param {Color} color1 Start color
   * @param {Color} color2 End color
   * @param {object} [params]       Interpolation parameters
   * @param {number} [params.power] Interpolation exponent
   * @returns {Color[]} Generated RGB color scale
   */
  static generateRgb(
    length: number,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters['rgb']
  ): Color[] {
    return ColorScale.generate('rgb', length, color1, color2, params);
  }

  /**
   * Generate an array of interpolated colors in the HSL color space
   *
   * @param {number} length Amount of colors to generate
   * @param {Color} color1 Start color
   * @param {Color} color2 End color
   * @param {object} [params]                Interpolation parameters
   * @param {number|number[]} [params.power] Interpolation exponent(s) : [h, s, l]
   * @param {string} [params.hueMode]        Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @returns {Color[]} Generated HSL color scale
   */
  static generateHsl(
    length: number,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters['hsl']
  ): Color[] {
    return ColorScale.generate('hsl', length, color1, color2, params);
  }

  /**
   * Generate an array of interpolated colors in the HSB color space
   *
   * @param {number} length Amount of colors to generate
   * @param {Color} color1 Start color
   * @param {Color} color2 End color
   * @param {object} [params]                Interpolation parameters
   * @param {number|number[]} [params.power] Interpolation exponent(s) : [h, s, b]
   * @param {string} [params.hueMode]        Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @returns {Color[]} Generated HSB color scale
   */
  static generateHsb(
    length: number,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters['hsb']
  ): Color[] {
    return ColorScale.generate('hsb', length, color1, color2, params);
  }

  /**
   * Generate an array of interpolated colors following HCL Qualitative color palettes algorithm
   *
   * @param {number} length Amount of colors to generate
   * @param {Color} color1 Start color
   * @param {Color} color2 End color
   * @param {object} [params]         Interpolation parameters
   * @param {string} [params.hueMode] Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @returns {Color[]} Generated qualitative color scale
   */
  static generateQualitative(
    length: number,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters['qualitative']
  ): Color[] {
    return ColorScale.generate('qualitative', length, color1, color2, params);
  }

  /**
   * Generate an array of interpolated colors following HCL Sequential color palettes algorithm
   *
   * @param {number} length Amount of colors to generate
   * @param {Color} color1 Start color
   * @param {Color} color2 End color
   * @param {object} [params]                Interpolation parameters
   * @param {number|number[]} [params.power] Interpolation exponent(s) : [c, l]
   * @param {string} [params.hueMode]        Hue interpolation mode. Can be 'direct' | 'shortest' | 'longest'
   * @param {number} [params.chromaMax]      Maximum chroma value
   * @returns {Color[]} Generated sequential color scale
   */
  static generateSequential(
    length: number,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters['sequential']
  ): Color[] {
    return ColorScale.generate('sequential', length, color1, color2, params);
  }

  /**
   * Generate an array of interpolated colors following HCL Diverging color palettes algorithm
   *
   * @param {number} length Amount of colors to generate
   * @param {Color} color1 Start color
   * @param {Color} color2 End color
   * @param {object} [params]                Interpolation parameters
   * @param {number|number[]} [params.power] Interpolation exponent(s) : ([c, l])
   * @returns {Color[]} Generated diverging color scale
   */
  static generateDiverging(
    length: number,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters['diverging']
  ): Color[] {
    return ColorScale.generate('diverging', length, color1, color2, params);
  }

  /**
   * Process a given value
   *
   * @param {number} value Value to process
   * @param {ColorScaleProcessingTarget} [target] Processing target
   * @returns {number} Processed value
   */
  static processValue(value: number, target: ColorScaleProcessingTarget): number {
    if (typeof target === 'undefined') return value;
    if (typeof target === 'number') return target;
    if (Array.isArray(target)) return clamp(value, target[0], target[1]);
    return value;
  }

  /**
   * Process a given color
   *
   * @param {Color} color Color to process
   * @param {ColorScaleProcessingParameters} [params] Processing parameters
   * @returns {Color} Processed color
   */
  static processColor(color: Color, params: ColorScaleProcessingParameters = {}): Color {
    if (params.hsl) {
      let [h, s, l] = color.hsl;
      h = this.processValue(h, params.hsl.hue);
      s = this.processValue(s, params.hsl.saturation);
      l = this.processValue(l, params.hsl.lightness);
      color.setHsl([h, s, l]);
    }
    if (params.hsb) {
      let [h, s, b] = color.hsb;
      h = this.processValue(h, params.hsb.hue);
      s = this.processValue(s, params.hsb.saturation);
      b = this.processValue(b, params.hsb.brightness);
      color.setHsb([h, s, b]);
    }
    if (params.hcl) {
      let [h, c, l] = color.hcl;
      h = this.processValue(h, params.hcl.hue);
      c = this.processValue(c, params.hcl.chroma);
      l = this.processValue(l, params.hcl.luminance);
      color.setHcl([h, c, l]);
    }
    return color;
  }

  /**
   * Process all colors composing a given scale
   *
   * @param {ColorScale} scale Color scale to process
   * @param {ColorScaleProcessingParameters} [params] Processing parameters
   * @returns {ColorScale} Processed color scale
   */
  static process(scale: ColorScale, params: ColorScaleProcessingParameters = {}): ColorScale {
    scale.colors.forEach((color) => this.processColor(color, params));
    return scale;
  }

  protected static _getInterpolateFunction<I extends ColorInterpolation>(
    interpolation: I,
    color1: Color,
    color2: Color,
    params?: ColorInterpolationsParameters[I]
  ): (t: number) => Color {
    switch (interpolation) {
      case 'rgb':
      default:
        return (t: number) => {
          const rgb = Color.lerpRgb(t, color1.rgb, color2.rgb, params as ColorInterpolationsParameters['rgb']);
          const color = new Color().setRgb(rgb);
          return color;
        };
      case 'hsl':
        return (t) => {
          const hsl = Color.lerpHsl(t, color1.hsl, color2.hsl, params as ColorInterpolationsParameters['hsl']);
          const color = new Color().setHsl(hsl);
          return color;
        };
      case 'hsb':
        return (t) => {
          const hsb = Color.lerpHsb(t, color1.hsb, color2.hsb, params as ColorInterpolationsParameters['hsb']);
          const color = new Color().setHsb(hsb);
          return color;
        };
      case 'qualitative':
        return (t) => {
          const hcl = Color.interpolateQualitative(
            t,
            color1.hcl,
            color2.hcl,
            params as ColorInterpolationsParameters['qualitative']
          );
          const color = new Color().setHcl(hcl);
          return color;
        };
      case 'sequential':
        return (t) => {
          const hcl = Color.interpolateSequential(
            t,
            color1.hcl,
            color2.hcl,
            params as ColorInterpolationsParameters['sequential']
          );
          const color = new Color().setHcl(hcl);
          return color;
        };
      case 'diverging':
        return (t) => {
          const hcl = Color.interpolateDiverging(
            t,
            color1.hcl,
            color2.hcl,
            params as ColorInterpolationsParameters['diverging']
          );
          const color = new Color().setHcl(hcl);
          return color;
        };
    }
  }
}
