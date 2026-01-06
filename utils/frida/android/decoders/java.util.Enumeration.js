/**
 * Decodes a java.util.Enumeration object.
 * @param {Object} value - Reference to the Enumeration object.
 * @returns {string} The decoded enumeration as JSON string.
 */
function decodeJavaUtilEnumeration(value) {
  let elements = [];
  while (value.hasMoreElements()) {
    elements.push(value.nextElement().toString());
  }
  return JSON.stringify(elements);
}

module.exports = { decodeJavaUtilEnumeration };
