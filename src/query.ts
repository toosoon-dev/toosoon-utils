const search = typeof window !== 'undefined' ? window.location.search : undefined;
const history = typeof window !== 'undefined' ? window.history : undefined;

/**
 * Get a query parameter
 *
 * @param {string} property Query property to check
 * @returns {string|null} Value associated to the given search parameter
 */
export function getQuery(property: string): string | null {
  const params = new URLSearchParams(search);
  return params.get(property);
}

/**
 * Set a query parameter
 *
 * @param {string} property Query property to set
 * @param {string} value Value to set
 */
export function setQuery(property: string, value: string): void {
  const params = new URLSearchParams(search);
  params.set(property, value);

  const string = '?' + params.toString().replace(/\=$/, '').replace(/\=\&/g, '&');
  history?.pushState({ str: string }, '', string);
}

/**
 * Check if a query parameter exists
 *
 * @param {string} property Query property to check
 * @returns {boolean} True if the given property has a query parameter value, false otherwise
 */
export function hasQuery(property: string): boolean {
  return getQuery(property) !== null;
}
