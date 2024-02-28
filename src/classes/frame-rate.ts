import { now } from '../functions';

/**
 * Utility class for controlling FPS calls
 *
 * @exports
 * @class FrameRate
 */
export default class FrameRate {
  private _fps: number;
  private interval = 0;
  private time = 0;
  private elapsedTime = 0;
  private lastUpdate = 0;

  /**
   * @param {number} [fps=30] Frame per second limit
   */
  constructor(fps: number = 30) {
    this._fps = fps;
    this.fps = fps;
  }

  /**
   * Return true if elapsed time since last update is higher than current FPS
   *
   * @returns {boolean}
   */
  update(): boolean {
    this.time = now();
    this.elapsedTime = this.time - this.lastUpdate;

    if (this.elapsedTime < this.interval) {
      return false;
    }

    this.lastUpdate = this.time - (this.elapsedTime % this.interval);
    return true;
  }

  get fps(): number {
    return this._fps;
  }

  set fps(fps: number) {
    this._fps = fps;
    this.interval = 1000 / fps;
  }
}
