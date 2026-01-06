/**
 * Makes a hex dump of a byte array. The dump is limited by the length parameter.
 * @param {Uint8Array} bytes - Byte array to be decoded to hexadecimal.
 * @param {number} length - Number of bytes which will be decoded.
 * @returns {string} The hexadecimal decoded bytes (e.g., "0x22aa3482ef...")
 */
function byteArrayHexDump(bytes, length) {
  let appendix = "...";
  if (bytes.length < length) {
    length = bytes.length;
    appendix = "";
  }

  let hexString = "0x";
  for (let i = 0; i < length; i++) {
    hexString = hexString + ("0" + (bytes[i] & 0xff).toString(16)).slice(-2);
  }

  return hexString + appendix;
}

/**
 * Converts a byte value to its uri-encoded representation
 * @param {number} byte - The byte value to encode (0-255)
 * @returns {string} The uri-encoded string (e.g., "%20", "%0A")
 */
function getUriCode(byte) {
  const text = byte.toString(16);
  if (byte < 16) {
    return "%0" + text;
  }
  return "%" + text;
}

/**
 * Tries to decode a byte array to either a string or a hex dump depending on the content of the array.
 * @param {Uint8Array} bytes - Byte array to be decoded to hexadecimal.
 * @param {number} length - Number of bytes which will be decoded.
 * @returns {string} The decoded bytes (e.g., "This is some decoded string." or "0x22aa3482ef...")
 */
function byteToString(bytes, length) {
  if (bytes.length < length) {
    length = bytes.length;
  }

  try {
    let result = "";
    for (let i = 0; i < length; ++i) {
      result += getUriCode(bytes[i]);
    }
    return decodeURIComponent(result).replace(/\0.*$/g, "");
  } catch (e) {
    return byteArrayHexDump(bytes, length);
  }
}

/**
 * Generates a simple hash from a string.
 * @param {string} str - String to hash.
 * @returns {number} Hash value as a 32-bit integer.
 */
function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h = h | 0;
  }
  return h;
}

/**
 * Extracts modulus from an RSA key.
 * @param {Object} value - Reference to the Java key object.
 * @returns {Object} Object containing modulusHex and modulusBitLength.
 */
function extractRsaModulus(value) {
  let out = {};
  try {
    let RSAKey = Java.use('java.security.interfaces.RSAKey');
    let anyRsa = Java.cast(value, RSAKey);
    let modBI = anyRsa.getModulus();
    out.modulusHex = modBI.toString(16);
    out.modulusBitLength = modBI.bitLength();
  } catch (_) {}
  return out;
}

/**
 * Extracts public exponent from an RSA public key.
 * @param {Object} value - Reference to the Java key object.
 * @returns {string|null} Public exponent in decimal or null.
 */
function extractRsaPublicExponent(value) {
  try {
    let RSAPub = Java.use('java.security.interfaces.RSAPublicKey');
    let vpub = Java.cast(value, RSAPub);
    let expBI = vpub.getPublicExponent();
    return expBI ? expBI.toString(10) : null;
  } catch (_) {
    return null;
  }
}

/**
 * Extracts private exponent from an RSA private key.
 * @param {Object} value - Reference to the Java key object.
 * @returns {Object} Object containing privateExponentDec and optionally publicExponentDec.
 */
function extractRsaPrivateExponent(value) {
  let out = {};
  let RSAPrivateCrt = null;

  try {
    RSAPrivateCrt = Java.use('java.security.interfaces.RSAPrivateCrtKey');
  } catch (_) {}

  if (RSAPrivateCrt !== null) {
    try {
      let vprivCrt = Java.cast(value, RSAPrivateCrt);
      let dBI = vprivCrt.getPrivateExponent();
      let eBI = vprivCrt.getPublicExponent();
      if (dBI) out.privateExponentDec = dBI.toString(10);
      if (eBI) out.publicExponentDec = eBI.toString(10);
    } catch (_) {}
  } else {
    try {
      let RSAPriv = Java.use('java.security.interfaces.RSAPrivateKey');
      let vpriv = Java.cast(value, RSAPriv);
      let dBI2 = vpriv.getPrivateExponent();
      if (dBI2) out.privateExponentDec = dBI2.toString(10);
    } catch (_) {}
  }

  return out;
}

/**
 * Adds key hash if modulus exists.
 * @param {Object} keyData - Key data object.
 */
function addKeyHash(keyData) {
  if (keyData.modulusHex != null) {
    keyData.keyHash = simpleHash(keyData.modulusHex);
  }
}

module.exports = {

};


module.exports = {
  byteArrayHexDump,
  getUriCode,
  byteToString,
  simpleHash,
  extractRsaModulus,
  extractRsaPublicExponent,
  extractRsaPrivateExponent,
  addKeyHash
};
