/**
 * Decodes an object array ([Ljava.lang.Object;).
 * @param {Array} value - Object array to decode.
 * @returns {string} The decoded array as comma-separated string.
 */
function decodeObjectArray(value) {
  let out = "";
  for (let i in value) {
    out = out + value[i] + ", ";
  }
  return out;
}

module.exports = { decodeObjectArray };
