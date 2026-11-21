/**
 * Utility to decode Google OAuth JWT Credential returned by Google Identity Services (GIS)
 * Decodes the payload containing: { name, email, picture, sub, email_verified, ... }
 */
export function decodeGoogleCredential(credentialToken) {
  try {
    const base64Url = credentialToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to parse Google JWT credential:', error);
    return null;
  }
}

/**
 * Loads the official Google Identity Services client script dynamically if not present
 */
export function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve(window.google);
      return;
    }

    const existing = document.getElementById('google-gsi-client');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google));
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-gsi-client';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
}
