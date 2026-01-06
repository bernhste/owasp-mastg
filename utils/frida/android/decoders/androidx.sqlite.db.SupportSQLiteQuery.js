/**
 * Decodes an androidx.sqlite.db.SupportSQLiteQuery object.
 * @param {Object} value - Reference to the SupportSQLiteQuery object.
 * @returns {string} The SQL query string.
 */
function decodeAndroidxSqliteSupportSQLiteQuery(value) {
  return value.getSql();
}

module.exports = { decodeAndroidxSqliteSupportSQLiteQuery };
