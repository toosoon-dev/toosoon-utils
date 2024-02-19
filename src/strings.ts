/**
 * Capitalize a string
 *
 * @param  {string} string String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Clean a path by removing params
 *
 * @param  {string} path Path to clean
 * @returns {string} Cleaned path
 */
export function cleanPath(path: string): string {
  return path.split('#')[0].split('?')[0];
}
