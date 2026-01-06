/**
 * Decodes a java.io.File object.
 * @param {Object} value - Reference to the File object.
 * @returns {string} The absolute path of the file.
 */
function decodeJavaIoFile(value) {
  return value.getAbsolutePath();
}

module.exports = { decodeJavaIoFile };
