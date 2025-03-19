import { now } from '../functions';

/**
 * Utility class for controlling FPS calls
 *
 * @exports
 * @class FrameRate
 */
export default class FrameRate {
  private _fps!: number;
  private _interval: number = 0;
  private _time: number = 0;
  private _elapsedTime: number = 0;
  private _lastUpdate: number = 0;

  /**
   * @param {number} [fps=30] Frame per second limit
   */
  constructor(fps: number = 30) {
    this.fps = fps;
  }

  /**
   * Return true if elapsed time since last update is higher than current FPS
   *
   * @returns {boolean}
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

  get fps(): number {
    return this._fps;
  }

  set fps(fps: number) {
    this._fps = fps;
    this._interval = 1000 / fps;
  }
}
