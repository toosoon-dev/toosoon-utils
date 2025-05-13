import { now } from '../../functions';

/**
 * Utility class for controlling FPS calls
 *
 * @exports
 * @class FrameRate
 */
export default class FrameRate {
  protected _fps!: number;
  protected _interval: number = 0;

  protected _time: number = 0;
  protected _elapsedTime: number = 0;
  protected _lastUpdate: number = 0;

  /**
   * @param {number} [fps=60] Frame per second limit
   */
  constructor(fps: number = 60) {
    this.fps = fps;
  }

  /**
   * Check if elapsed time since last update is higher than current FPS
   *
   * @returns {boolean} True if elapsed time since last update is higher than current FPS, false otherwise
   */
  public update(): boolean {
    this._time = now();
    this._elapsedTime = this._time - this._lastUpdate;

    if (this._elapsedTime < this._interval) {
      return false;
    }

    this._lastUpdate = this._time - (this._elapsedTime % this._interval);

    return true;
  }

  /**
   * Frame per second limit
   */
  set fps(fps: number) {
    this._fps = fps;
    this._interval = 1000 / fps;
  }

  get fps(): number {
    return this._fps;
  }
}
