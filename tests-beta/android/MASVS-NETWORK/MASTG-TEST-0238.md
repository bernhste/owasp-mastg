---
title: Runtime Use of Android Network APIs Transmitting Cleartext Traffic
platform: android
id: MASTG-TEST-0238
type: [dynamic]
weakness: MASWE-0050
profiles: [L1, L2]
---

## Overview

This test intercepts Android network API (@MASTG-KNOW-0109) in the packages `java.net`, `android.net` and `android.webkit` used to establish network connections in oder to detect insecure URI schemes.

This is beneficial if a security tester is not able to intercept the network traffic as described in @MASTG-TEST-0236. Further, it is possible to detect insecure URI schemes in obfuscated apps as solely @MASTG-TECH-0048 may not be sufficient to detect them.

## Steps

Hook the following methods make sure, that they are not initiated with URI schemes which don't support encryption:

- `java.net.URL(String spec)`
- `java.net.URL(String protocol, String host, int port, String file)`
- `java.net.URL(String protocol, String host, int port, String file, URLStreamHandler handler)`
- `java.net.URL(String protocol, String host, String file)`
- `java.net.URI(String spec)`
- `java.net.URI(String scheme, String ssp, String fragment)`
- `java.net.URI(String scheme, String host, String path, String fragment)`
- `java.net.URI(String scheme, String authority, String path, String query, String fragment)`
- `android.net.Uri.parse(String uriString)`
- `android.net.Uri.Builder.scheme(String scheme)`
- `android.webkit.WebView.loadUrl(String url)`
- `android.webkit.WebView.loadDataWithBaseURL(String baseUrl, String data, String mimeType, String encoding, String historyUrl)`
- `android.webkit.WebView.postUrl(String url, byte[] postData)`
- `android.webkit.WebViewClient.doUpdateVisitedHistory(WebView view, String url, boolean isReload)`
- `android.webkit.WebViewClient.onLoadResource(WebView view, String url)`
- `android.webkit.WebViewClient.onPageCommitVisible(WebView view, String url)`
- `android.webkit.WebViewClient.onPageFinished(WebView view, String url)`
- `android.webkit.WebViewClient.onPageStarted(WebView view, String url, Bitmap favicon)`
- `android.webkit.WebViewClient.shouldInterceptRequest(WebView view, String url)`
- `android.webkit.WebViewClient.shouldOverrideUrlLoading(WebView view, String url)`
- `android.media.MediaPlayer.setDataSource(String path)`

## Observation

The output contains information about the used URI schemes.

## Evaluation

The test passes, if all URI schemes are considered secure. Examples are:

- HTTPS
- WSS
- SIPS
- LDAPS
- FTPS
- SFTP
- RTSPS
- STUNS

The test fails if a URI scheme is considered insecure. Examples are:

- HTTP
- WS
- SIP
- LDAP
- FTP
- RTSP
- STUN

A comprehensive list of well known URI schemes can found here: [iana Uniform Resource Identifier (URI) Schemes
](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml)
