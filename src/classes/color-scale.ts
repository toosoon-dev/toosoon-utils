import { lerp, triLerp } from '../maths';
import { hclToRgb, hsbToRgb, hslToRgb, normalizeColor, rgbToHcl, rgbToHsb, rgbToHsl } from '../colors';
import { ColorRepresentation } from '../types';

export type ColorScaleSettings =
  | {
      colorSpace: 'rgb';
    }
  | {
      colorSpace: 'hsl';
      hueOffset?: number;
      saturationOffset?: number;
      lightnessOffset?: number;
    }
  | {
      colorSpace: 'hsb';
      hueOffset?: number;
      saturationOffset?: number;
      brightnessOffset?: number;
    }
  | {
      colorSpace: 'hcl';
      mode?: 'qualitative' | 'sequential' | 'diverging';
      triangular?: number;
      powerStrength?: number;
      hueOffset?: number;
      chromaOffset?: number;
      luminanceOffset?: number;
    };

export const defaultSettings: Required<ColorScaleSettings> = {
  colorSpace: 'rgb'
};

/**
 * Utility class for generating color scales and interpolating between colors
 *
 * @exports
 * @class ColorScale
 */
export default class ColorScale {
  /**
   * Array of colors composing the color scale
   */
  public colors: Array<[number, number, number]> = [];

  /**
   * @param {ColorRepresentation} input     Input color representation
   * @param {ColorRepresentation} target    Target color representation
   * @param {number} [length=5]             Amount of colors composing the color scale
   * @param {ColorScaleSettings} [settings] Color scale generation settings
   */
  constructor(
    input: ColorRepresentation,
    target: ColorRepresentation,
    length: number = 5,
    settings: ColorScaleSettings = { ...defaultSettings }
  ) {
    this.colors = ColorScale.generate(input, target, length, settings);
  }

  /**
   * Static method for generating a color scale
   *
   * @param {ColorRepresentation} input     Input color representation
   * @param {ColorRepresentation} target    Target color representation
   * @param {number} length                 Amount of colors composing the color scale
   * @param {ColorScaleSettings} [settings] Color scale generation settings
   * @returns {Array<[number, number, number]>} Color scale colors
   */
  static generate(
    input: ColorRepresentation,
    target: ColorRepresentation,
    length: number,
    settings: ColorScaleSettings = { ...defaultSettings }
  ): Array<[number, number, number]> {
    const colors: Array<[number, number, number]> = [];

    const inputColor = normalizeColor(input);
    const targetColor = normalizeColor(target);

    for (let i = 0; i < length; i++) {
      const value = i / Math.floor(length);
      colors.push(ColorScale.interpolate(inputColor, targetColor, value, settings));
    }

    return colors;
  }

  /**
   * Static method for interpolating between colors
   *
   * @param {[number,number,number]} inputColor  Input color
   * @param {[number,number,number]} targetColor Target color
   * @param {number} value                       Interpolation normalized value
   * @param {ColorScaleSettings} [settings]      Color scale settings
   * @returns {[number,number,number]} Interpolated color
   */
  static interpolate(
    inputColor: [number, number, number],
    targetColor: [number, number, number],
    value: number,
    settings: ColorScaleSettings = { ...defaultSettings }
  ): [number, number, number] {
    switch (settings.colorSpace) {
      case 'rgb': {
        const r = lerp(value, inputColor[0], targetColor[0]);
        const g = lerp(value, inputColor[1], targetColor[1]);
        const b = lerp(value, inputColor[2], targetColor[2]);
        return [r, g, b];
      }
      case 'hsl': {
        const inputHsl = rgbToHsl(inputColor);
        const targetHsl = rgbToHsl(targetColor);
        const h1 = inputHsl[0];
        const s1 = inputHsl[1];
        const l1 = inputHsl[2];
        const h2 = targetHsl[0] + (settings.hueOffset ?? 0);
        const s2 = targetHsl[1] + (settings.saturationOffset ?? 0);
        const l2 = targetHsl[2] + (settings.lightnessOffset ?? 0);
        const h = lerp(value, h1, h2);
        const s = lerp(value, s1, s2);
        const l = lerp(value, l1, l2);
        return hslToRgb([h, s, l]);
      }
      case 'hsb': {
        const inputHsb = rgbToHsb(inputColor);
        const targetHsb = rgbToHsb(targetColor);
        const h1 = inputHsb[0];
        const s1 = inputHsb[1];
        const b1 = inputHsb[2];
        const h2 = targetHsb[0] + (settings.hueOffset ?? 0);
        const s2 = targetHsb[1] + (settings.saturationOffset ?? 0);
        const b2 = targetHsb[2] + (settings.brightnessOffset ?? 0);
        const h = lerp(value, h1, h2);
        const s = lerp(value, s1, s2);
        const b = lerp(value, b1, b2);
        return hsbToRgb([h, s, b]);
      }
      case 'hcl':
        const inputHcl = rgbToHcl(inputColor);
        const targetHcl = rgbToHcl(targetColor);
        const powerValue = Math.pow(value, settings.powerStrength ?? 1);
        const h1 = inputHcl[0];
        const c1 = inputHcl[1];
        const l1 = inputHcl[2];
        const h2 = targetHcl[0] + (settings.hueOffset ?? 0);
        const c2 = targetHcl[1] + (settings.chromaOffset ?? 0);
        const l2 = targetHcl[2] + (settings.luminanceOffset ?? 0);
        let h, c, l;

        // HCL color palettes
        // -> https://colorspace.r-forge.r-project.org/articles/hcl_palettes.html
        switch (settings.mode) {
          /**
           * Qualitative
           *    Designed for coding categorical information,
           *    where no particular ordering of categories is available
           *    and every color should receive the same perceptual weight.
           *
           * - Hue:       Linear
           * - Chroma:    Constant
           * - Luminance: Constant
           */
          case 'qualitative': {
            h = lerp(value, h1, h2);
            c = c1;
            l = l1;
          }
          /**
           * Sequential
           *    Designed for coding ordered/numeric information,
           *    going from high to low (or vice versa).
           *
           * - Hue:       Constant | Linear
           * - Chroma:    Linear (+power) | Triangular (+power)
           * - Luminance: Linear (+power)
           */
          case 'sequential': {
            h = lerp(value, h1, h2);
            c = settings.triangular ? triLerp(powerValue, c1, c2, settings.triangular) : lerp(powerValue, c1, c2);
            l = lerp(powerValue, l1, l2);
          }
          /**
           * Diverging
           *    Designed for coding ordered/numeric information around a central neutral value,
           *    where colors diverge from neutral to two extremes.
           *
           * - Hue:       Constants (x2)
           * - Chroma:    Linear (+power) | Triangular (+power)
           * - Luminance: Linear (+power)
           */
          case 'diverging': {
            h = value < 0.5 ? h1 : value > 0.5 ? h2 : lerp(0.5, h1, h2);
            c = settings.triangular ? triLerp(powerValue, c1, c2, settings.triangular) : lerp(powerValue, c1, c2);
            l = lerp(powerValue, l1, l2);
          }
          default: {
            h = lerp(value, h1, h2);
            c = lerp(value, c1, c2);
            l = lerp(value, l1, l2);
          }
        }
        return hclToRgb([h, c, l]);
    }
  }
}
