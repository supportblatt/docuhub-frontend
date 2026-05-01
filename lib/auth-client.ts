const TOTP_CHALLENGE_KEY = 'docuhub.auth.totp.challenge';
const TOTP_USERNAME_KEY = 'docuhub.auth.totp.username';

function isBrowser() {
  return typeof window !== 'undefined';
}

export function readCookie(name: string) {
  if (!isBrowser()) {
    return null;
  }

  const cookie = document.cookie
    .split(';')
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.slice(name.length + 1));
}

export function setPendingTotpChallenge(challengeToken: string, username: string) {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(TOTP_CHALLENGE_KEY, challengeToken);
  localStorage.setItem(TOTP_USERNAME_KEY, username);
}

export function getPendingTotpChallenge() {
  if (!isBrowser()) {
    return null;
  }

  const challengeToken = localStorage.getItem(TOTP_CHALLENGE_KEY);
  if (!challengeToken) {
    return null;
  }

  return {
    challengeToken,
    username: localStorage.getItem(TOTP_USERNAME_KEY) ?? ''
  };
}

export function clearPendingTotpChallenge() {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(TOTP_CHALLENGE_KEY);
  localStorage.removeItem(TOTP_USERNAME_KEY);
}
