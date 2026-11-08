/**
 * Basic validation rules shared by every form on the site (contact, login, register...).
 * When a rule changes (say, accepting international numbers), you change it here once.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Saudi mobile: 05xxxxxxxx or +9665xxxxxxxx or 009665xxxxxxxx
export const PHONE_RE = /^(\+966|00966|0)?5\d{8}$/;

export const isEmail = (v: string) => EMAIL_RE.test(v.trim()) && v.trim().length <= 200;

export const isPhone = (v: string) => PHONE_RE.test(v.replace(/[\s-]/g, ""));

/** Email or phone number (for login and password recovery) */
export const isEmailOrPhone = (v: string) => isEmail(v) || isPhone(v);

/** Password: at least 8 characters, with at least one letter and one number */
export const isStrongPassword = (v: string) =>
  v.length >= 8 && v.length <= 128 && /[A-Za-z؀-ۿ]/.test(v) && /\d/.test(v);
