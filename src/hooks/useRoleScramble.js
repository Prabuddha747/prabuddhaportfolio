import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-_#$%^&*=+?01ABCDabcd';
const WORDS = ['Freelance', 'AI Builder', 'Full-Stack Dev', 'Go Developer', 'ML Engineer'];

class Scramble {
  constructor(onUpdate) {
    this.onUpdate = onUpdate;
    this.update = this.update.bind(this);
  }
  set(text) {
    this.q = text.split('').map((to, i) => ({
      to,
      start: Math.floor(Math.random() * 10),
      end: Math.floor(Math.random() * 14) + 22 + i * 2,
      char: '',
    }));
    clearTimeout(this.raf);
    this.f = 0;
    this.update();
    return new Promise((res) => { this.res = res; });
  }
  update() {
    let out = '';
    let done = 0;
    for (const q of this.q) {
      if (this.f >= q.end) { done++; out += q.to; }
      else if (this.f >= q.start) {
        if (!q.char || Math.random() < 0.22) q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        out += `<span style="color:rgba(0,229,255,.5)">${q.char}</span>`;
      } else out += q.to === ' ' ? ' ' : '&nbsp;';
    }
    this.onUpdate(out);
    if (done === this.q.length) { this.res(); return; }
    this.raf = setTimeout(() => requestAnimationFrame(this.update), 22);
    this.f++;
  }
}

/** Returns an HTML string to dangerously-set on the role word span. */
export function useRoleScramble() {
  const [html, setHtml] = useState(WORDS[0]);
  const idxRef = useRef(0);

  useEffect(() => {
    const fx = new Scramble(setHtml);
    let cancelled = false;
    let timer;
    (function next() {
      idxRef.current = (idxRef.current + 1) % WORDS.length;
      timer = setTimeout(() => {
        fx.set(WORDS[idxRef.current]).then(() => { if (!cancelled) next(); });
      }, 3800);
    })();
    return () => { cancelled = true; clearTimeout(timer); clearTimeout(fx.raf); };
  }, []);

  return html;
}
