import type { InputHTMLAttributes } from "react";
import styles from "./forms.module.css";

/**
 * A text field with its label and error message, in one consistent shape across every form.
 *   <Field label="البريد الإلكتروني" name="email" type="email" error={errors.email} ... />
 */

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: string;
  /** Red border with no message under the field (when the message is shown in the alert above) */
  invalid?: boolean;
};

export function Field({ label, name, error, invalid, id, ...input }: Props) {
  const inputId = id ?? name;
  const errorId = `${inputId}-error`;
  const bad = Boolean(error) || Boolean(invalid);
  return (
    <div className={`${styles.field} ${bad ? styles.hasError : ""}`}>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        name={name}
        aria-invalid={bad ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...input}
      />
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
