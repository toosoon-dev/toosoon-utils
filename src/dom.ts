const DOCUMENT_NODE_TYPE = 9;

/**
 * Find the closest parent that matches a selector
 *
 * @param {Element|null}     element  Target element
 * @param {Element|string} selector Selector or parent to match
 * @returns {Element|null}
 */
export function closest(element: Element | null, selector: Element | string): Element | null {
  let current = element;
  while (current && current.nodeType !== DOCUMENT_NODE_TYPE) {
    if ((typeof selector === 'string' && current.matches(selector)) || current === selector) {
      return current;
    }
    current = current.parentElement;
  }
  return current;
}

/**
 * Create a canvas and 2d context
 *
 * @param {number} width  Width of the canvas
 * @param {number} height Height of the canvas
 * @returns {{ canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }}
 */
export function createCanvas(
  width: number,
  height: number
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d') ?? new CanvasRenderingContext2D();
  return { canvas, ctx };
}

/**
 * Inject CSS styles in `document.head`
 *
 * @param {string} styles CSS styles to inject
 */
export function injectStyles(styles: string): void {
  const $style = document.createElement('style');
  $style.innerHTML = styles;
  const $before = document.querySelector('head link[rel=stylesheet], head style');
  if ($before) document.head.insertBefore($style, $before);
  else document.head.appendChild($style);
}
