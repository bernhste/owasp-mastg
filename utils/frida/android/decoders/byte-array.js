const { byteToString } = require('./utils');

/**
 * Decodes a byte array ([B).
 * @param {Uint8Array} value - Byte array to decode.
 * @returns {string} The decoded byte array.
 */
function decodeByteArray(value) {
  // for performance reasons only decode the first 256 bytes of the full byte array
  return byteToString(value, 256);
}

module.exports = { decodeByteArray };
