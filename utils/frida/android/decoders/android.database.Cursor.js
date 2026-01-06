/**
 * Decodes a `android.database.Cursor` object.
 * @param {object} value - Reference to the object.
 * @returns {string} The decoded rows and columns.
 */
function decodeAndroidDatabaseCursor(value) {
  let out = "";
  let cursor = value;
  let originalCursorPosition = cursor.getPosition();

  // rows
  for (let i = 0; i < cursor.getColumnCount(); i++) {
    let columnName = cursor.getColumnName(i);
    out = out + columnName + " | ";
  }

  out = out + "\n----------------------\n";

  // columns
  if (cursor.moveToFirst()) {
    do {
      for (let i = 0; i < cursor.getColumnCount(); i++) {
        try {
          let columnValue = cursor.getString(i);
          out = out + columnValue + " | ";
        } catch (e) {
          out = out + " | ";
        }
      }
      out = out + "\n";
    } while (cursor.moveToNext());

    cursor.moveToPosition(originalCursorPosition);
  }
  return out;
}

module.exports = { decodeAndroidDatabaseCursor };
