const DOCUMENT_NODE_TYPE = 9;

/**
 * Find the closest parent that matches a selector
 *
 * @param {Element}          element  Target element
 * @param {(Element|string)} selector Selector or parent to match
 * @returns {Element|null}
 */
export function closest(element: Element, selector: Element | string): Element | null {
  let current: Element | null = element;
  while (current && current.nodeType !== DOCUMENT_NODE_TYPE) {
    if ((typeof selector === 'string' && current.matches(selector)) || current === selector) {
      return current;
    }
    current = element.parentNode as Element | null;
  }
  return current;
}

/**
 * Create a canvas and 2d context
 *
 * @param {Number} width  Width of the canvas
 * @param {Number} height Height of the canvas
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
 * @param {string} cssContent CSS style to inject
 */
export function injectStyles(cssContent: string): void {
  const $style = document.createElement('style');
  $style.innerHTML = cssContent;
  const $before = document.querySelector('head link[rel=stylesheet], head style');
  if ($before) document.head.insertBefore($style, $before);
  else document.head.appendChild($style);
}
