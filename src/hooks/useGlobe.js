import { useEffect } from 'react';
import { techStack } from '../data/techStack';

function ll2v(lat, lon, r) {
  const phi = (90 - lat) * Math.PI / 180;
  const th = lon * Math.PI / 180;
  return [r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th)];
}
function rotY(x, z, a) {
  return [x * Math.cos(a) + z * Math.sin(a), -x * Math.sin(a) + z * Math.cos(a)];
}

/** Ports the canvas tech-stack globe: fibonacci sphere dots, drag-to-rotate, heartbeat pulse. */
export function useGlobe(canvasRef, labelsRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const labDiv = labelsRef.current;
    if (!canvas || !labDiv) return;
    const ctx = canvas.getContext('2d');
    let W, H, cx, cy, R;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = (rect.width * dpr) | 0;
      canvas.height = (rect.height * dpr) | 0;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
      W = rect.width; H = rect.height; cx = W / 2; cy = H / 2; R = Math.min(W, H) * 0.38;
    }
    resize();
    let ro;
    try { ro = new ResizeObserver(resize); ro.observe(canvas); } catch (e) { /* noop */ }

    const N = 900;
    const PHI = Math.PI * (3 - Math.sqrt(5));
    const sdots = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = PHI * i;
      return [r * Math.cos(th), y, r * Math.sin(th)];
    });

    const lels = techStack.map((t) => {
      const el = document.createElement('div');
      el.className = 'glbl';
      el.textContent = t.n;
      el.style.setProperty('--lc', t.c);
      labDiv.appendChild(el);
      return el;
    });

    let rot = 0, vel = 0.004, drag = false, lx = 0;
    function onDown(e) { drag = true; lx = e.clientX; vel = 0; }
    function onMove(e) { if (!drag) return; vel = (e.clientX - lx) * 0.004; rot += vel; lx = e.clientX; }
    function onUp() { drag = false; if (Math.abs(vel) < 0.001) vel = 0.004; }
    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    function proj(x, y, z, fov) { const f = fov / (fov + z); return [cx + x * f, cy - y * f]; }

    let gt = 0, hbt = 0, rafId;
    function draw() {
      gt += 0.012; hbt += 0.13;
      ctx.clearRect(0, 0, W, H);
      const FOV = W * 0.75;
      const isLight = document.body.classList.contains('light');
      const s = Math.sin(hbt);
      const pulse = s > 0 ? Math.pow(s, 7) : 0;
      window._globePulse = pulse;

      const glowA = isLight ? 0.025 : 0.06;
      const glowB = isLight ? 0.01 : 0.025;
      const gc1 = isLight ? `rgba(0,147,179,${(glowA + 0.03 * pulse).toFixed(3)})` : `rgba(255,170,50,${(glowA + 0.04 * pulse).toFixed(3)})`;
      const gc2 = isLight ? `rgba(0,100,160,${(glowB + 0.01 * pulse).toFixed(3)})` : `rgba(255,110,20,${(glowB + 0.015 * pulse).toFixed(3)})`;
      const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * (1.4 + 0.12 * pulse));
      sg.addColorStop(0, gc1); sg.addColorStop(0.5, gc2); sg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(cx, cy, R * (1.4 + 0.12 * pulse), 0, Math.PI * 2); ctx.fill();

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.22);
      g.addColorStop(0, isLight ? 'rgba(0,80,120,.06)' : 'rgba(0,229,255,.035)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = isLight ? 'rgba(0,80,120,.45)' : 'rgba(0,229,255,.07)';
      ctx.lineWidth = isLight ? 1.5 : 1;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

      sdots.forEach(([px, py, pz]) => {
        const [rx, rz] = rotY(px, pz, rot);
        const [sx, sy] = proj(rx * R, py * R, rz * R, FOV);
        const d = (rz + 1) / 2;
        if (rz > -0.15) {
          ctx.fillStyle = isLight ? `rgba(0,70,110,${(d * 0.7).toFixed(2)})` : `rgba(0,229,255,${(d * 0.36).toFixed(2)})`;
          ctx.beginPath(); ctx.arc(sx, sy, isLight ? 1.3 : 1.05, 0, Math.PI * 2); ctx.fill();
        }
      });

      techStack.forEach((t, i) => {
        const [px, py, pz] = ll2v(t.lat, t.lon, 1);
        const [rx, rz] = rotY(px, pz, rot);
        const [sx, sy] = proj(rx * R, py * R, rz * R, FOV);
        const [lx2, ly2, lz2] = ll2v(t.lat, t.lon, 1.36);
        const [lrx, lrz] = rotY(lx2, lz2, rot);
        const [lsx, lsy] = proj(lrx * R, ly2 * R, lrz * R, FOV);
        const op = rz > -0.04 ? Math.min(1, (rz + 0.04) * 2.8) : 0;
        if (op > 0.1) {
          ctx.shadowColor = t.c; ctx.shadowBlur = isLight ? 3 : 5; ctx.fillStyle = t.c;
          ctx.beginPath(); ctx.arc(sx, sy, 3.2, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
          ctx.strokeStyle = isLight ? `rgba(0,60,100,${(op * 0.35).toFixed(2)})` : `rgba(255,255,255,${(op * 0.12).toFixed(2)})`;
          ctx.lineWidth = isLight ? 0.8 : 0.5;
          ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(lsx, lsy); ctx.stroke();
        }
        const el = lels[i];
        el.style.transform = `translate(${lsx}px,${lsy}px) translate(-50%,-50%)`;
        el.style.opacity = op.toFixed(2);
      });

      const ag = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.13);
      ag.addColorStop(0, isLight ? 'rgba(0,80,120,0)' : 'rgba(0,229,255,0)');
      ag.addColorStop(1, isLight ? 'rgba(0,80,120,.2)' : 'rgba(0,229,255,.09)');
      ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(cx, cy, R * 1.13, 0, Math.PI * 2); ctx.fill();

      if (!drag) rot += vel;
      if (!drag && Math.abs(vel) < 0.004) vel += 0.00012;
      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      if (ro) ro.disconnect();
      lels.forEach((el) => el.remove());
    };
  }, [canvasRef, labelsRef]);
}
