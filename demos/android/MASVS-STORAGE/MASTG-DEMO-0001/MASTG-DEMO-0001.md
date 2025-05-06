---
platform: android
title: Using MediaStore API to create external files
id: MASTG-DEMO-0001
code: [kotlin]
test: MASTG-TEST-0200
tools: [frida, adb]
---

### Sample

The snippet below shows sample code that creates two files in the external storage using the `getExternalFilesDir` method and the `MediaStore` API.

{{ MastgTest.kt }}


<!---
TODO: This is for the PoC only, should be automated
-->

### Test Implementations

1. [Frida.re](./tools/frida/MASTG-DEMO-0001-FRIDA.md)
2. [adb](./tools/adb/MASTG-DEMO-0001-ADB.md)

