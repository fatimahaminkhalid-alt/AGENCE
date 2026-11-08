import { Fragment } from "react";

/**
 * Splits text into words, each word inside a "mask" so it can rise from below like a curtain.
 *
 * ⚠️ Important for Arabic: we split by **word** and never by **letter**.
 * Arabic letters are joined to each other, and if you put each letter in its own element the joining breaks
 * and the word shows as separate letters (م ر ح ب ا). That's why most "letter by letter" effects
 * on the libraries' sites are only suitable for English text (like the "AGENCE" word in the footer).
 *
 * Usage: <h2><SplitWords text="نربط احتياجك بالخبرة المناسبة" /></h2>
 * Screen readers read the full text from the hidden copy (sr-only), and ignore the split words.
 */

export function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span data-split>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        // The space goes **between** the words, not inside the box: the browser drops whitespace
        // at the end of an inline-block box, so the words would stick together
        <Fragment key={i}>
          <span className="split-word" aria-hidden="true">
            <span className="split-inner">{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
