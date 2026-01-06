const { decodeJavaUtilSet } = require('./java.util.Set');
const { decodeJavaUtilMap } = require('./java.util.Map');
const { decodeByteArray } = require('./byte-array');
const { decodeCharArray } = require('./char-array');
const { decodeJavaIoFile } = require('./java.io.File');
const { decodeJavaUtilDate } = require('./java.util.Date');
const { decodeAndroidxSqliteSupportSQLiteQuery } = require('./androidx.sqlite.db.SupportSQLiteQuery');
const { decodeAndroidContentClipDataItem } = require('./android.content.ClipData.Item');
const { decodeSimpleType } = require('./simple-types');
const { decodeJavaSecurityKey } = require('./java.security.Key');
const { decodeJavaSecurityPrivateKey } = require('./java.security.PrivateKey');
const { decodeJavaSecurityPublicKey } = require('./java.security.PublicKey');
const { decodeObjectArray } = require('./object-array');
const { decodeJavaUtilEnumeration } = require('./java.util.Enumeration');
const { decodeAndroidDatabaseCursor } = require('./android.database.Cursor');

/**
 * Decodes a Java object according to its type.
 * @param {string} type - Java type of the value (e.g., "java.util.Set", "java.lang.String" or "int")
 * @param {Object} value - Reference to the object.
 * @returns {string} The type-appropriate decoded string (e.g., "[1,50,21]", "Hello World" or "-12")
 */
function decodeValue(type, value) {
  let readableValue = "";

  try {
    if (value == null) {
      readableValue = "void";
    } else {
      switch (type) {
        case "java.util.Set":
          readableValue = decodeJavaUtilSet(value);
          break;

        case "java.util.Map":
          readableValue = decodeJavaUtilMap(value);
          break;

        case "[B":
          readableValue = decodeByteArray(value);
          break;

        case "[C":
          readableValue = decodeCharArray(value);
          break;

        case "java.io.File":
          readableValue = decodeJavaIoFile(value);
          break;

        case "java.util.Date":
          readableValue = decodeJavaUtilDate(value);
          break;

        case "androidx.sqlite.db.SupportSQLiteQuery":
          readableValue = decodeAndroidxSqliteSupportSQLiteQuery(value);
          break;

        case "android.content.ClipData$Item":
          readableValue = decodeAndroidContentClipDataItem(value);
          break;

        case "androidx.datastore.preferences.core.Preferences$Key":
        case "java.lang.Object":
        case "android.net.Uri":
        case "java.lang.CharSequence":
          readableValue = decodeSimpleType(value);
          break;

        case "java.security.PrivateKey":
          readableValue = decodeJavaSecurityPrivateKey(value);
          break;

        case "java.security.PublicKey":
          readableValue = decodeJavaSecurityPublicKey(value);
          break;

        case "java.security.Key":
          readableValue = decodeJavaSecurityKey(value);
          break;

        case "[Ljava.lang.Object;":
          readableValue = decodeObjectArray(value);
          break;

        case "java.util.Enumeration":
          readableValue = decodeJavaUtilEnumeration(value);
          break;

        case "android.database.Cursor":
          readableValue = decodeAndroidDatabaseCursor(value);
          break;

        default:
          readableValue = value;
          break;
      }
    }
  } catch (e) {
    console.error("Value decoding exception: " + e);
    readableValue = value;
  }

  return readableValue;
}

// Module-level cached references for performance
let _toStringMethod = null;
let _toStringMethodInitialized = false;
let _SystemCls = null;
let _SystemClsInitialized = false;

function getToStringMethod() {
  if (!_toStringMethodInitialized) {
    try {
      let ObjCls = Java.use('java.lang.Object');
      _toStringMethod = ObjCls.class.getDeclaredMethod('toString', []);
      _toStringMethod.setAccessible(true);
    } catch (_) {
      _toStringMethod = null;
    }
    _toStringMethodInitialized = true;
  }
  return _toStringMethod;
}

function getSystemCls() {
  if (!_SystemClsInitialized) {
    try {
      _SystemCls = Java.use('java.lang.System');
    } catch (_) {
      _SystemCls = null;
    }
    _SystemClsInitialized = true;
  }
  return _SystemCls;
}

/**
 * Decodes Java values according to their types.
 * @param {[string]} types - Java types of the value (e.g., ["java.util.Set", "java.lang.String", "int"])
 * @param {[string]]} args - Reference to the objects.
 * @returns {[string]} The type-appropriate decoded strings (e.g., ["java.util.Set":"[1,50,21]", "java.lang.String":"Hello World", "int":"-12"])
 */
function decodeArguments(types, args) {
  let parameters = [];
  let toStringMethod = getToStringMethod();
  let SystemCls = getSystemCls();

  for (let i in types) {
    let declaredType = types[i];
    let argVal = args[i];
    let entry = { declaredType: declaredType, value: decodeValue(declaredType, argVal) };

    // Attach runtime info if this is a Java object
    if (argVal && typeof argVal === 'object') {
      let runtimeType = null;
      try { runtimeType = argVal.$className || (argVal.getClass ? argVal.getClass().getName() : null); } catch (_) {}
      if (runtimeType) {
        entry.runtimeType = runtimeType;
        if (SystemCls) {
          try {
            entry.instanceId = '' + SystemCls.identityHashCode(argVal);
          } catch (_) {}
        }
        // Robust toString retrieval: prefer reflected method, fallback to direct call
        try {
          if (toStringMethod) {
            entry.instanceToString = '' + toStringMethod.invoke(argVal, []);
          } else {
            entry.instanceToString = '' + argVal.toString();
          }
        } catch (e1) {
          try { entry.instanceToString = '' + argVal.toString(); } catch (e2) { entry.instanceToString = '<toString-unavailable>'; }
        }
      }
    }

    parameters.push(entry);
  }
  return parameters;
}

module.exports = { decodeArguments };
