// ******************************************
// Cases
// ******************************************

/**
 * Capitalize a string
 *
 * @param {string} string String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Convert a string to kebab-case
 *  - 'Hello world' -> 'hello-world'
 *
 * @param {string} string String to convert
 * @returns {string} Converted string
 */
export function toKebabCase(string: string): string {
  return (
    string
      // Insert a hyphen between lowercase and uppercase letters
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      // Replace spaces and underscores with hyphens
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
  );
}

/**
 * Convert a string to snake_case
 *   - 'Hello world' -> 'hello_world'
 *
 * @param {string} string String to convert
 * @returns {string} Converted string
 */
export function toSnakeCase(string: string): string {
  return (
    string
      // Insert an underscore between lowercase and uppercase letters
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      // Replace spaces and hyphens with underscores
      .replace(/[\s-]+/g, '_')
      .toLowerCase()
  );
}

/**
 * Convert a string to camelCase
 *   - 'Hello world' -> 'helloWorld'
 *
 * @param {string} string String to convert
 * @returns {string} Converted string
 */
export function toCamelCase(string: string): string {
  return (
    string
      // Remove separators and capitalize the following letter
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      // Ensure the first letter is lowercase
      .replace(/^([A-Z])/, (c) => c.toLowerCase())
  );
}

/**
 * Convert a string to PascalCase
 *   - 'Hello world' -> 'HelloWorld'
 *
 * @param {string} string String to convert
 * @returns {string} Converted string
 */
export function toPascalCase(string: string): string {
  return (
    string
      // Remove separators and capitalizes the following letter
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      // Ensure the first letter is uppercase
      .replace(/^([a-z])/, (c) => c.toUpperCase())
  );
}

/**
 * Convert a string to Train-Case
 *   - 'Hello world' -> 'Hello-World'
 *
 * @param {string} string String to convert
 * @returns {string} Converted string
 */
export function toTrainCase(string: string): string {
  return (
    string
      // Insert a hyphen between lowercase and uppercase letters
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      // Replace spaces and underscores with hyphens
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
      // Capitalizes each word
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

/**
 * Convert a string to CONSTANT_CASE
 *   - 'Hello world' -> 'HELLO_WORLD'
 *
 * @param {string} string String to convert
 * @returns {string} Converted string
 */
export function toConstantCase(string: string): string {
  return (
    string
      // Insert an underscore between lowercase and uppercase letters
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      // Replace spaces and hyphens with underscores
      .replace(/[\s-]+/g, '_')
      .toUpperCase()
  );
}

// ******************************************
// Paths
// ******************************************

/**
 * Clean a path by removing its parameters
 *
 * @param {string} path Path to clean
 * @returns {string} Cleaned path
 */
export function cleanPath(path: string): string {
  return path.split('#')[0].split('?')[0];
}

/**
 * Convert a path by ensuring it has a trailing slash
 *
 * @param {string} path Path to convert
 * @returns {string} Converted path
 */
export function addTrailingSlash(path: string): string {
  if (path.match(/\.[a-z]{2,4}$/i) || path.match(/^mailto:/) || path.endsWith('/')) return path;
  return `${path}/`;
}

/**
 * Convert a path by ensuring it has not a trailing slash
 *
 * @param {string} path Path to convert
 * @returns {string} Converted path
 */
export function removeTrailingSlash(path: string): string {
  if (path.endsWith('/')) return path.slice(0, -1);
  return `${path}`;
}
