// Detects in-app webviews where Google OAuth is disallowed.
// Background: Google blocks OAuth in embedded browsers (WhatsApp, FB, IG, etc.)
// with a "disallowed_useragent" error. We must redirect users to a real browser.

const WEBVIEW_PATTERNS = [
  /WhatsApp/i, // WhatsApp in-app browser
  /FBAN|FBAV|FB_IAB/i, // Facebook
  /Instagram/i,
  /Line\//i,
  /Twitter/i,
  /MicroMessenger/i, // WeChat
  /TikTok|musical_ly/i,
  /Snapchat/i,
  /Telegram/i,
  /; wv\)/i, // Generic Android WebView marker
];

export function isInAppWebView(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  return WEBVIEW_PATTERNS.some((re) => re.test(userAgent));
}

export function isAndroid(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  return /Android/i.test(userAgent);
}

export function isIOS(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  return /iPhone|iPad|iPod/i.test(userAgent);
}
