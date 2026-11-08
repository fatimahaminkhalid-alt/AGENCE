import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./forms.module.css";

/** Checkbox with a custom look and its text, e.g. accepting the terms */
type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  name: string;
  children: ReactNode;
  error?: string;
};

export function Checkbox({ name, children, error, id, ...input }: Props) {
  const inputId = id ?? name;
  const errorId = `${inputId}-error`;
  return (
    <div className={`${styles.checkWrap} ${error ? styles.hasError : ""}`}>
      <div className={styles.check}>
        <input
          type="checkbox"
          id={inputId}
          name={name}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...input}
        />
        <label htmlFor={inputId}>{children}</label>
      </div>
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
