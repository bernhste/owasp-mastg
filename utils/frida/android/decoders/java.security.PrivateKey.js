const { extractRsaModulus, extractRsaPrivateExponent, addKeyHash } = require('./utils.js');

/**
 * Decodes a java.security.PrivateKey object.
 * @param {Object} value - Reference to the PrivateKey object.
 * @returns {Object} Object containing key parameters.
 */
function decodeJavaSecurityPrivateKey(value) {
  let out = {};

  try {
    Object.assign(out, extractRsaModulus(value));
    Object.assign(out, extractRsaPrivateExponent(value));
    addKeyHash(out);
  } catch (_) {}

  return out;
}

module.exports = { decodeJavaSecurityPrivateKey };
