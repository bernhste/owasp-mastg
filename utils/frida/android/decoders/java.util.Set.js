/**
 * Decodes a java.util.Set object.
 * @param {Object} value - Reference to the Set object.
 * @returns {string} The decoded Set as string.
 */
function decodeJavaUtilSet(value) {
  return value.toArray().toString();
}

module.exports = { decodeJavaUtilSet };
