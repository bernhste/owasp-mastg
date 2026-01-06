/**
 * Decodes a char array ([C).
 * @param {Array} value - Char array to decode.
 * @returns {string} The decoded char array.
 */
function decodeCharArray(value) {
  let readableValue = "";
  for (let i in value) {
    readableValue = readableValue + value[i];
  }
  return readableValue;
}

module.exports = { decodeCharArray };
