const { extractRsaModulus, extractRsaPublicExponent, addKeyHash } = require('./utils.js');

/**
 * Decodes a java.security.PublicKey object.
 * @param {Object} value - Reference to the PublicKey object.
 * @returns {Object} Object containing key parameters.
 */
function decodeJavaSecurityPublicKey(value) {
  let out = {};

  try {
    Object.assign(out, extractRsaModulus(value));
    let pubExp = extractRsaPublicExponent(value);
    if (pubExp) out.publicExponentDec = pubExp;
    addKeyHash(out);
  } catch (_) {}

  return out;
}

module.exports = { decodeJavaSecurityPublicKey };
