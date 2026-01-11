function toCamelCase(str) {
  // Replace any sequence of non-alphanumeric characters with a space
  let words = str.replace(/[^a-zA-Z0-9]+/g, ' ').split(' ').filter(w => w);
  
  if (words.length === 0) return '';
  
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
console.log(toCamelCase("first name")); // firstName
console.log(toCamelCase("user_id")); // userId
console.log(toCamelCase("SCREEN_NAME")); // screenName
console.log(toCamelCase("mobile-number")); // mobileNumber
