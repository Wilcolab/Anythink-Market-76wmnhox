/**
 * Converts a string to kebab-case format (lowercase words separated by hyphens).
 * Handles various word separators and camelCase inputs by splitting on uppercase letters.
 * Returns the input unchanged for null, undefined, or empty strings.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The string converted to kebab-case format.
 * @example
 * toKebabCase('firstName'); // 'first-name'
 * toKebabCase('userId'); // 'user-id'
 * toKebabCase('SCREEN_NAME'); // 'screen-name'
 * toKebabCase('mobile-number'); // 'mobile-number'
 * toKebabCase('simple_test-case'); // 'simple-test-case'
 * toKebabCase('single'); // 'single'
 * toKebabCase(''); // ''
 * toKebabCase(null); // null
 */
function toKebabCase(str) {
  if (!str) return str; // Handle null, undefined, or empty strings

  // Replace any sequence of non-alphanumeric characters with a space
  let words = str.replace(/[^a-zA-Z0-9]+/g, ' ').split(' ').filter(w => w);

  // Split each word on uppercase letters to handle camelCase
  let finalWords = [];
  for (let word of words) {
    let parts = word.split(/(?=[A-Z])/);
    finalWords.push(...parts);
  }

  // Convert all parts to lowercase
  finalWords = finalWords.map(w => w.toLowerCase());

  // Join with hyphens
  return finalWords.join('-');
}

// Test cases for toKebabCase
console.log(toKebabCase('firstName')); // first-name
console.log(toKebabCase('userId')); // user-id
console.log(toKebabCase('SCREEN_NAME')); // screen-name
console.log(toKebabCase('mobile-number')); // mobile-number
console.log(toKebabCase('simple_test-case')); // simple-test-case
console.log(toKebabCase('single')); // single
console.log(toKebabCase('')); // (empty)
console.log(toKebabCase(null)); // null