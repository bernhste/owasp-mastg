/**
 * Decodes an android.content.ClipData$Item object.
 * @param {Object} value - Reference to the ClipData$Item object.
 * @returns {string} The text content.
 */
function decodeAndroidContentClipDataItem(value) {
  return value.getText().toString();
}

module.exports = { decodeAndroidContentClipDataItem };
