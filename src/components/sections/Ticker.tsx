import { tickerItems } from "@/lib/content";
import styles from "./Ticker.module.css";

/** Moving strip of the service areas. The list is repeated twice so the loop has no gap. */
export function Ticker() {
  return (
    <div className={styles.ticker} aria-label="مجالات الخدمات">
      <div className={styles.track} data-ticker>
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.list} aria-hidden={copy === 1 ? true : undefined}>
            {tickerItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
