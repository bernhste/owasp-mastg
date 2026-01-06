/**
 * Decodes a java.util.Date object.
 * @param {Object} value - Reference to the Date object.
 * @returns {string} The formatted date string.
 */
function decodeJavaUtilDate(value) {
  let DateFormat = Java.use('java.text.DateFormat');
  let formatter = DateFormat.getDateTimeInstance(DateFormat.MEDIUM.value, DateFormat.SHORT.value);
  return formatter.format(value);
}

module.exports = { decodeJavaUtilDate };
