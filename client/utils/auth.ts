/**
 * Simple auth utility to check if user is logged in
 * Checks localStorage for a user session/token
 */
export function isAuthenticated(): boolean {
  // Check if user is logged in (from localStorage or sessionStorage)
  const userToken = localStorage.getItem('userToken');
  const userSession = localStorage.getItem('userSession');
  return !!(userToken || userSession);
}

/**
 * Get the redirect URL based on authentication status
 * Returns dashboard path if logged in, login path if not
 */
export function getDonateRedirect(): string {
  return isAuthenticated() ? '/donate' : '/login';
}

