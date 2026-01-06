/**
 * Decodes a java.util.Map object.
 * @param {Object} value - Reference to the Map object.
 * @returns {string} The decoded Map as string.
 */
function decodeJavaUtilMap(value) {
  let entrySet = value.entrySet();
  return entrySet.toArray().toString();
}

module.exports = { decodeJavaUtilMap };
