import type { ColorRepresentation } from '../../types';
import Color, { type ColorInterpolationsParameters, type ColorInterpolation } from './Color';

import ColorScale, { type ColorScaleProcessingParameters } from './ColorScale';

/**
 * Parameters used for color palette generation
 */
export type ColorPaletteGenerationParameters = {
  /**
   * Pre-processing parameters, for processing the color palette base color before generation
   */
  preprocessing?: ColorScaleProcessingParameters;
  /**
   * Post-processing parameters, for processing the generated color scale after generation
   */
  postprocessing?: ColorScaleProcessingParameters;
};

/**
 * Interface representing a color palette generator
 */
export type ColorPaletteGenerator<I extends ColorInterpolation = ColorInterpolation> = {
  /**
   * Type of interpolation used for generation
   */
  interpolation: I;
  /**
   * Amount of colors to generate
   */
  length: number;
  /**
   * Target color to interpolate towards
   */
  target?: Color | null;
  /**
   * Target color processing parameters, for processing the target color before generation
   */
  processing?: ColorScaleProcessingParameters;
  /**
   * Generation parameters & Interpolation parameters
   */
  params?: ColorPaletteGenerationParameters & ColorInterpolationsParameters[I];
};

/**
 * Utility class for generating color palettes
 *
 * @exports
 * @class ColorPalette
 */
export default class ColorPalette {
  readonly isColorPalette = true;
  readonly type: string = 'ColorPalette';

  protected _base = new Color();

  /**
   * Object containing this color palette color scales
   */
  public scales: Record<string, ColorScale> = {};

  /**
   * Object containing this color palette generators
   */
  public generators: Record<string, ColorPaletteGenerator> = {};

  /**
   * @param {Color|ColorRepresentation} color Base color
   * @param {object} generators Object containing generators
   */
  constructor(color: Color | ColorRepresentation, generators: Record<string, ColorPaletteGenerator> = {}) {
    this.base = color;
    this.generators = generators;
    this.update();
  }

  /**
   * Pick an interpolated color from one of this color palette color scale
   *
   * @param {string} key Name of the color scale
   * @param {number} t Normalized time value to interpolate
   * @returns {Color} Interpolated color
   */
  public getColor(key: string, t: number): Color {
    return this.scales[key]?.getColor(t) ?? this.base.clone();
  }

  /**
   * Add a given generator to this color palette
   *
   * @template {ColorInterpolation} I
   * @param {string} key Name of the generator
   * @param {ColorPaletteGenerator<I>} generator Generator to add
   */
  public subscribe<I extends ColorInterpolation>(key: string, generator: ColorPaletteGenerator<I>) {
    this.generators[key] = generator;
    this.scales[key] = this.generate(generator);
  }

  /**
   * Generate a color scale
   *
   * @param {ColorPaletteGenerator} 				 generator 							 Generator interface to use for generation
   * @param {ColorInterpolation} 						 generator.interpolation Type of interpolation used for generation
   * @param {number} 												 generator.length 			 Amount of colors to generate
   * @param {Color} 												 [generator.target] 		 Target color to interpolate towards
   * @param {ColorScaleProcessingParameters} [generator.processing]  Target color processing parameters, for processing the target color before generation
   * @param {object} 												 [generator.params]  		 Interpolation parameters
   * @returns {ColorScale} Generated color scale
   */
  public generate(generator: ColorPaletteGenerator): ColorScale {
    const { interpolation, length, target: color, processing, params } = generator;
    const base = ColorScale.processColor(this.base.clone(), params?.preprocessing);
    const target = ColorScale.processColor(color ?? this.base.clone(), processing);
    return new ColorScale().generate(interpolation, length, base, target, params).process(params?.postprocessing);
  }

  /**
   * Update this color palette color scales
   */
  public update() {
    for (let key in this.generators) {
      const generator = this.generators[key];
      this.scales[key] = this.generate(generator);
    }
  }

  /**
   * Base color of this color palette
   */
  set base(color: Color | ColorRepresentation) {
    this._base.set(color);
    this.update();
  }

  get base(): Color {
    return this._base;
  }
}

/** Generators */
const length = 9;

export const LightScaleGenerator: ColorPaletteGenerator = {
  interpolation: 'hsl',
  length,
  processing: { hsl: { lightness: 1 - 1 / length } },
  params: {
    preprocessing: { hsl: { lightness: 0.5 } },
    postprocessing: {}
  }
};

export const DarkScaleGenerator: ColorPaletteGenerator = {
  interpolation: 'hsl',
  length,
  processing: { hsl: { lightness: 1 / length } },
  params: {
    preprocessing: { hsl: { lightness: 0.5 } },
    postprocessing: {}
  }
};

export const SequentialLightGenerator: ColorPaletteGenerator = {
  interpolation: 'sequential',
  length,
  processing: { hcl: { luminance: 100 } },
  params: {
    preprocessing: { hcl: { luminance: 50 } },
    postprocessing: {}
  }
};

export const SequentialDarkGenerator: ColorPaletteGenerator = {
  interpolation: 'sequential',
  length,
  processing: { hcl: { luminance: 0 } },
  params: {
    preprocessing: { hcl: { luminance: 50 } },
    postprocessing: {}
  }
};
