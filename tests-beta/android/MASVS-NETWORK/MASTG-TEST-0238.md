---
title: Runtime Use of Android Network APIs Transmitting Cleartext Traffic
platform: android
id: MASTG-TEST-0238
type: [dynamic]
weakness: MASWE-0050
profiles: [L1, L2]
---

## Overview

This test intercepts Android network API (@MASTG-KNOW-0109) in the packages `java.net`, `android.net` and `android.webkit` used to establish network connections in order to detect insecure URI schemes.

This is beneficial if a security tester is not able to intercept the network traffic as described in @MASTG-TEST-0236. Further, it is possible to detect insecure URI schemes in obfuscated apps as solely @MASTG-TECH-0048 may not be sufficient to detect them.

## Steps

Hook methods which take URI schemes as arguments and verify, that they are not insecure meaning they refer to a protocol which does not support transport layer encryption for example.

The following list enumerates @MASTG-KNOW-0109 which can be used to establish network connections::

- `java.net.URL`
- `java.net.URI`
- `android.net.Uri`
- `android.net.Uri.Builder`
- `android.webkit.WebView`
- `android.webkit.WebViewClient`
- `android.media.MediaPlayer`

Aside from these components, custom code, or third-party libraries may also contain places where clear text transmission is initiated.

## Observation

The output contains information about the used URI schemes.

## Evaluation

The test passes, if _all_ URI schemes are considered secure and fails, if _any_ URI is considered insecure.

Examples of well known protocols and their secure and insecure URI are:

| secure       | insecure |
|--------------|----------|
| https        | http     |
| wss          | ws       |
| sips         | sip      |
| ldaps        | ldap     |
| ftps / sftp  | ftp      |
| rtsps        | rtsp     |
| stuns        | stun     |

A comprehensive list of well known URI schemes can found here: [iana Uniform Resource Identifier (URI) Schemes
](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml)
