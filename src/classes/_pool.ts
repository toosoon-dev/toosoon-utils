// *********************
// WIP
// *********************

export type PoolSettings = {
  max?: number;
};

export const defaultSettings: Required<PoolSettings> = {
  max: Infinity
};

type PoolItem = {
  setup?: () => void;
  reset?: () => void;
  dispose?: () => void;
};

/**
 * Abstract class for manipulating pool items
 *
 * @exports
 * @class Pool
 */
export default abstract class Pool<I extends PoolItem> {
  public items: I[] = [];
  public pool: I[] = [];

  settings: Required<PoolSettings> = { ...defaultSettings };

  constructor(settings: PoolSettings = { ...defaultSettings }) {
    this.settings = Object.assign(this.settings, settings);
  }

  /**
   * Abstract method to implement custom item creation
   *
   * @returns {PoolItem}
   */
  protected abstract create(): I;

  /**
   * Add an item to the active items
   *
   * @param {PoolItem} item Item to add to the active items
   */
  protected add(item: I): void {
    this.items.push(item);
  }

  /**
   * Remove an item from the active items
   *
   * @param {PoolItem} item Item to remove from the active items
   */
  protected remove(item: I): void {
    this.items = this.items.filter((_item) => _item !== item);
  }

  /**
   * Return an item from pool or create a new one
   *
   * @returns {PoolItem|undefined}
   */
  public get(): I | undefined {
    if (this.items.length >= this.settings.max) return;
    const item = this.pool.pop() ?? this.create();
    item.setup?.();
    this.add(item);
    return item;
  }

  /**
   * Release an item from the active items and add it to the pool
   *
   * @param {PoolItem} item Item to release
   */
  public release(item: I): void {
    this.pool.push(item);
    item.reset?.();
    this.remove(item);
  }

  /**
   * Dispose all items
   */
  public dispose(): void {
    [...this.items, ...this.pool].forEach((item: I) => item.dispose?.());
    this.items = [];
    this.pool = [];
  }
}
