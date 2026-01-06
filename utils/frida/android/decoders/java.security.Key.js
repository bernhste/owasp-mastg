const { extractRsaModulus, extractRsaPublicExponent, extractRsaPrivateExponent, addKeyHash } = require('./utils.js');

/**
 * Decodes a java.security.Key object (attempts both public and private).
 * @param {Object} value - Reference to the Key object.
 * @returns {Object} Object containing key parameters.
 */
function decodeJavaSecurityKey(value) {
  let out = {};

  try {
    Object.assign(out, extractRsaModulus(value));

    let pubExp = extractRsaPublicExponent(value);
    if (pubExp) out.publicExponentDec = pubExp;

    Object.assign(out, extractRsaPrivateExponent(value));

    addKeyHash(out);
  } catch (_) {}

  return out;
}

module.exports = { decodeJavaSecurityKey };
