const DOCUMENT_NODE_TYPE = 9;

/**
 * Find the closest parent that matches a selector
 *
 * @param {Element|null} element Target element
 * @param {Element|null|string} selector Selector or parent to match
 * @returns {Element|null}
 */
export function closest(element: Element | null, selector: Element | null | string): Element | null {
  let current = element;
  while (current && current.nodeType !== DOCUMENT_NODE_TYPE) {
    if ((typeof selector === 'string' && current.matches(selector)) || current === selector) {
      return current;
    }
    current = current.parentElement;
  }
  return current;
}
