"use client";

/**
 * Messages page: conversation list (right) + the open conversation (left).
 * - Searching filters conversations by name or message text
 * - Choosing a conversation opens it and removes the unread mark
 * - Sending adds your message to the conversation (demo: until it's connected to a server, it disappears on reload)
 * On phones: the list shows first, and choosing a conversation opens it with a back button.
 */

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Paperclip, Search, Send } from "lucide-react";
import type { ChatMessage, Conversation } from "@/lib/client-dashboard";
import ui from "./ui.module.css";
import styles from "./Messenger.module.css";

function nowTime() {
  const d = new Date();
  const h = d.getHours();
  return `${((h + 11) % 12) + 1}:${String(d.getMinutes()).padStart(2, "0")} ${h < 12 ? "ص" : "م"}`;
}

type Props = {
  conversations: Conversation[];
  /** The text before the request or project name under the person's name (e.g. "على طلب" or "على مشروع") */
  contextLabel?: string;
};

export default function Messenger({ conversations, contextLabel = "على طلب" }: Props) {
  const [list, setList] = useState(conversations);
  const [activeId, setActiveId] = useState(conversations[0]?.id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const messagesBox = useRef<HTMLDivElement>(null);

  const active = list.find((c) => c.id === activeId);
  const q = query.trim();
  const filtered = q
    ? list.filter((c) => c.name.includes(q) || c.messages.some((m) => m.text.includes(q)))
    : list;

  // Scroll to the latest message when you open a conversation or send a message.
  // We scroll the messages box only: scrollIntoView would also scroll the whole page
  useEffect(() => {
    const box = messagesBox.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [activeId, active?.messages.length, mobileOpen]);

  function open(id: string) {
    setActiveId(id);
    setMobileOpen(true);
    setList((l) => l.map((c) => (c.id === id ? { ...c, unread: false } : c)));
  }

  function send(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !active) return;
    const msg: ChatMessage = { id: `m${Date.now()}`, from: "me", text, time: nowTime() };
    setList((l) => l.map((c) => (c.id === active.id ? { ...c, messages: [...c.messages, msg], lastTime: msg.time } : c)));
    setDraft("");
  }

  const last = (c: Conversation) => c.messages[c.messages.length - 1]?.text ?? "";

  return (
    <div className={`${ui.card} ${styles.box} ${mobileOpen ? styles.showThread : ""}`}>
      {/* Conversation list */}
      <aside className={styles.sidebar} aria-label="المحادثات">
        <label className={styles.search}>
          <Search size={18} aria-hidden />
          <input
            type="search"
            placeholder="ابحث في الرسائل"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="ابحث في الرسائل"
          />
        </label>

        <ul className={styles.convos}>
          {filtered.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                className={`${styles.convo} ${c.id === activeId ? styles.convoActive : ""}`}
                onClick={() => open(c.id)}
                aria-current={c.id === activeId ? "true" : undefined}
              >
                <span className={`${ui.avatar} ${ui.avatarSm} ${c.tone === "orange" ? ui.avatarOrange : ""}`} aria-hidden>
                  {c.initial}
                </span>
                <span className={styles.convoText}>
                  <span className={styles.convoName}>{c.name}</span>
                  <span className={styles.convoLast}>{last(c)}</span>
                </span>
                <span className={styles.convoMeta}>
                  <span>{c.lastTime}</span>
                  {c.unread && <span className={styles.unread} aria-label="رسالة غير مقروءة" />}
                </span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && <li className={styles.noResults}>لا توجد نتائج لـ «{q}»</li>}
        </ul>
      </aside>

      {/* Open conversation */}
      {active && (
        <section className={styles.thread} aria-label={`محادثة مع ${active.name}`}>
          <header className={styles.threadHead}>
            <button type="button" className={styles.back} onClick={() => setMobileOpen(false)} aria-label="العودة إلى المحادثات">
              <ArrowRight size={20} aria-hidden />
            </button>
            <span className={`${ui.avatar} ${ui.avatarSm} ${active.tone === "orange" ? ui.avatarOrange : ""}`} aria-hidden>
              {active.initial}
            </span>
            <div>
              <p className={styles.threadName}>{active.name}</p>
              <p className={styles.threadReq}>
                {contextLabel}: {active.requestTitle}
              </p>
            </div>
          </header>

          <div ref={messagesBox} className={styles.messages} role="log" aria-live="polite" data-lenis-prevent>
            {active.messages.map((m) => (
              <div key={m.id} className={`${styles.msg} ${m.from === "me" ? styles.mine : styles.theirs}`}>
                <p className={styles.bubble}>{m.text}</p>
                <span className={styles.time}>{m.time}</span>
              </div>
            ))}
          </div>

          <form className={styles.composer} onSubmit={send}>
            <button type="button" className={styles.attach} aria-label="إرفاق ملف" title="إرفاق ملف">
              <Paperclip size={20} aria-hidden />
            </button>
            <input
              className={styles.input}
              placeholder="اكتب رسالتك..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              aria-label="اكتب رسالتك"
            />
            <button type="submit" className={styles.send} aria-label="إرسال" disabled={!draft.trim()}>
              <Send size={20} aria-hidden />
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
