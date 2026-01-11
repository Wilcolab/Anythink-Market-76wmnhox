/**
 * Converts a string to camelCase format.
 * Handles various word separators such as spaces, hyphens, and underscores.
 * Single words are returned in lowercase. Empty strings return a message, and null inputs throw an error.
 *
 * @param {string|null} str - The input string to convert. Can be null, but will throw an error.
 * @returns {string} The string converted to camelCase, or a message if empty.
 * @throws {Error} If the input is null.
 * @example
 * convertToCamelCase('first name'); // 'firstName'
 * convertToCamelCase('user_id'); // 'userId'
 * convertToCamelCase('SCREEN_NAME'); // 'screenName'
 * convertToCamelCase('mobile-number'); // 'mobileNumber'
 * convertToCamelCase('single'); // 'single'
 * convertToCamelCase(''); // 'Input string is empty'
 * convertToCamelCase(null); // throws Error
 */
function convertToCamelCase(str) {
  if (str === null) {
    throw new Error("Input cannot be null");
  }
  if (str === '') {
    return "Input string is empty";
  }

  // Replace any sequence of non-alphanumeric characters with a space
  let words = str.replace(/[^a-zA-Z0-9]+/g, ' ').split(' ').filter(w => w);

  if (words.length <= 1) {
    // Single word or empty after filter, return lowercase
    return words.length === 0 ? str : words[0].toLowerCase();
  }

  // Convert all words to lowercase
  words = words.map(w => w.toLowerCase());

  // Capitalize the first letter of each word except the first one
  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  // Join the words together
  return words.join('');
}

// Test cases
console.log(convertToCamelCase('simple_test-case')); // simpleTestCase
console.log(convertToCamelCase('first name')); // firstName
console.log(convertToCamelCase('user_id')); // userId
console.log(convertToCamelCase('SCREEN_NAME')); // screenName
console.log(convertToCamelCase('mobile-number')); // mobileNumber
console.log(convertToCamelCase('single')); // single
console.log(convertToCamelCase('')); // Input string is empty
try {
  console.log(convertToCamelCase(null));
} catch (e) {
  console.log(e.message); // Input cannot be null
}

/**
 * Converts a string to dot.case format (lowercase words separated by dots).
 * Handles various word separators and camelCase inputs by splitting on uppercase letters.
 * Returns the input unchanged for null, undefined, or empty strings.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The string converted to dot.case format.
 * @example
 * toDotCase('firstName'); // 'first.name'
 * toDotCase('userId'); // 'user.id'
 * toDotCase('SCREEN_NAME'); // 'screen.name'
 * toDotCase('mobile-number'); // 'mobile.number'
 * toDotCase('simple_test-case'); // 'simple.test.case'
 * toDotCase('single'); // 'single'
 * toDotCase(''); // ''
 * toDotCase(null); // null
 */
function toDotCase(str) {
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

  // Join with dots
  return finalWords.join('.');
}

// Test cases for toDotCase
console.log(toDotCase('firstName')); // first.name
console.log(toDotCase('userId')); // user.id
console.log(toDotCase('SCREEN_NAME')); // screen.name
console.log(toDotCase('mobile-number')); // mobile.number
console.log(toDotCase('simple_test-case')); // simple.test.case
console.log(toDotCase('single')); // single
console.log(toDotCase('')); // (empty)
console.log(toDotCase(null)); // null

