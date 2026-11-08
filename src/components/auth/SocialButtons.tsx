"use client";

/**
 * "المتابعة باستخدام Google / Apple" buttons + the "أو بالبريد الإلكتروني" divider.
 *
 * ⚠️ Signing in with Google and Apple needs app setup with each company (OAuth),
 * usually done through a library like Auth.js. Until it's set up, the click shows a clear message instead of doing nothing.
 */

import { useState } from "react";
import { FormAlert } from "@/components/forms/FormAlert";
import styles from "./auth.module.css";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.1a11 11 0 0 0 0 9.8l3.7-2.8z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7.1l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.5-1-2.5-3.9zM14 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4z"
      />
    </svg>
  );
}

export function SocialButtons() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <>
      <div className={styles.social}>
        <button type="button" className={styles.socialBtn} onClick={() => setNotice("Google")}>
          <GoogleIcon />
          المتابعة باستخدام Google
        </button>
        <button type="button" className={`${styles.socialBtn} ${styles.apple}`} onClick={() => setNotice("Apple")}>
          <AppleIcon />
          المتابعة باستخدام Apple
        </button>
      </div>

      {notice && <FormAlert type="info">الدخول باستخدام {notice} سيتوفر قريبًا. استخدم البريد الإلكتروني حاليًا.</FormAlert>}

      <p className={styles.divider}>أو بالبريد الإلكتروني</p>
    </>
  );
}
