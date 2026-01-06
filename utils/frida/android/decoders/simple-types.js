/**
 * Decodes simple types that use toString().
 * @param {Object} value - Reference to the object.
 * @returns {string} The string representation.
 */
function decodeSimpleType(value) {
  return value.toString();
}

module.exports = { decodeSimpleType };
