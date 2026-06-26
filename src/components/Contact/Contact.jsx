import { useState } from 'react';
import Reveal from '../Reveal/Reveal';
import JellyBlobs from '../JellyBlobs/JellyBlobs';
import { socialLinks } from '../../data/socialLinks';
import styles from './Contact.module.css';

const JELLY = [
  { x: '75%', y: '55%', w: 'min(380px, 47vw)', c1: 'rgba(0,229,255,.055)', c2: 'rgba(0,200,230,.02)', dur: '16s', del: '-4s' },
  { x: '2%', y: '15%', w: 'min(300px, 38vw)', c1: 'rgba(166,108,255,.05)', c2: 'transparent', dur: '13s', del: '-10s' },
];

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null); // { text, error }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim() || 'Portfolio Inquiry';
    const msg = form.message.value.trim();

    if (!name || !email || !msg) {
      setMessage({ text: '⚠ Please fill all required fields.', error: true });
      setTimeout(() => setMessage(null), 4000);
      return;
    }

    setSending(true);
    const data = new FormData();
    data.append('name', name); data.append('email', email);
    data.append('subject', subject); data.append('message', msg);
    data.append('_captcha', 'false'); data.append('_template', 'basic');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${socialLinks.email}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const json = await res.json();
      if (json.success === 'true' || json.success === true) {
        setMessage({ text: "✓ Message sent! I'll get back to you soon.", error: false });
        form.reset();
      } else {
        throw new Error('Failed');
      }
    } catch {
      setMessage({ text: '✓ Redirecting to your email client…', error: false });
      const body = `Hi Prabuddha,\n\nFrom: ${name} (${email})\n\n${msg}`;
      window.open(`mailto:${socialLinks.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    } finally {
      setSending(false);
      setTimeout(() => setMessage(null), 6000);
    }
  }

  return (
    <section id="contact" className={styles.contact} aria-label="Contact">
      <JellyBlobs configs={JELLY} />
      <div className={styles.grid}>
        <div>
          <Reveal as="div" className="s-label">Say hello</Reveal>
          <Reveal as="h2" delay="rd1" className={styles.big}>Let's work<br />together.</Reveal>
          <Reveal as="p" delay="rd2" className={styles.sub}>
            I'm actively looking for full-time roles in AI engineering and backend development.
            If you're building something ambitious and want someone who ships — let's talk.
          </Reveal>
          <Reveal as="div" delay="rd3" className={styles.acts}>
            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${socialLinks.email}`} className="btn btn-fill">Email Me Directly</a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener" className="btn btn-out">LinkedIn</a>
          </Reveal>
        </div>
        <Reveal as="div" delay="rd2">
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="cf-name">Name</label>
                <input className={styles.input} type="text" id="cf-name" name="name" placeholder="Your name" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="cf-email">Email</label>
                <input className={styles.input} type="email" id="cf-email" name="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="cf-subject">Subject</label>
              <input className={styles.input} type="text" id="cf-subject" name="subject" placeholder="What's this about?" />
            </div>
            <div className={styles.field}>
              <label htmlFor="cf-msg">Message</label>
              <textarea className={styles.textarea} id="cf-msg" name="message" placeholder="Tell me about the opportunity or project…" required />
            </div>
            <div className={styles.foot}>
              <button type="submit" className="btn btn-fill" disabled={sending}>{sending ? 'Sending…' : 'Send Message'}</button>
              {message && (
                <span className={styles.ok} style={message.error ? { color: 'rgba(255,100,80,.9)' } : undefined}>
                  {message.text}
                </span>
              )}
            </div>
          </form>
        </Reveal>
      </div>

      <Reveal as="div" delay="rd4" className={styles.footer}>
        <span className={styles.copy}>© 2026 Prabuddha Verma — Built with care.</span>
        <div className={styles.ficons}>
          <a href={socialLinks.github} target="_blank" rel="noopener" aria-label="GitHub">
            <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
          </a>
          <a href={`mailto:${socialLinks.email}`} aria-label="Email">
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
