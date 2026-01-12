/**
 * Decodes a android.content.ContentValues object.
 * @param {Object} value - Reference to the android.content.ContentValues object.
 * @returns {array} The decoded ContentValues as an array of data. They
 */

function decodeAndroidContentContentValues(value) {
  const { decodeValue } = require('./decoder.js');

  const keySet = value.keySet();
  const iterator = keySet.iterator();
  const decodedContentValues = [];

  while (iterator.hasNext()) {
    const key = iterator.next();
    const v = value.get(key);

    if (v === null) continue;

    let type = null;
    let decodedValue = null;

    try {
      type = v.getClass().getName();

      if (type === '[B') {
        decodedValue = decodeValue("[B", Java.array('byte', v));
      } else {
        decodedValue = v.toString();
      }

      decodedContentValues.push({
        key: key.toString(),
        type: type,
        value: decodedValue
      });
    } catch (e) {
      console.error("Error decoding android.content.ContentValues: " +  e)
    }
  }

  return decodedContentValues;
}

module.exports = { decodeAndroidContentContentValues };
