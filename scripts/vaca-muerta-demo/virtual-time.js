// Virtual clock for frame-by-frame capture. Injected before any page script runs.
//
// The page's requestAnimationFrame callbacks, performance.now(), setTimeout/setInterval and its Web Animations
// (CSS transitions and element.animate) all run on a clock that only moves when the recorder calls
// window.__vt.step(ms). Each captured frame therefore shows exactly one fixed slice of time, however long the
// GPU or the screenshot takes, so the video has no dropped or repeated frames.
(() => {
  const realRAF = window.requestAnimationFrame.bind(window);
  let vt = 0;
  let nextFrame = 1;
  const frames = new Map();
  let nextTimer = 1;
  const timers = new Map();
  const started = new WeakMap();

  function syncAnimations() {
    if (!document.getAnimations) return;
    for (const a of document.getAnimations()) {
      if (!started.has(a)) {
        started.set(a, vt);
        try { a.pause(); } catch (e) { /* already finished */ }
      }
      try { a.currentTime = vt - started.get(a); } catch (e) { /* not seekable */ }
    }
  }

  function runTimers() {
    for (;;) {
      let due = null;
      for (const [id, t] of timers) if (t.at <= vt && (!due || t.at < due[1].at)) due = [id, t];
      if (!due) return;
      const [id, t] = due;
      if (t.every) t.at += Math.max(1, t.every); else timers.delete(id);
      try { typeof t.fn === "function" ? t.fn(...t.args) : (0, eval)(String(t.fn)); } catch (e) { console.error("vt timer", e); }
    }
  }

  window.__vt = {
    now: () => vt,
    step(ms) {
      vt += ms;
      runTimers();
      const due = Array.from(frames.values());
      frames.clear();
      for (const cb of due) {
        try { cb(vt); } catch (e) { console.error("vt frame", e && e.stack || e); }
      }
      syncAnimations();
      return due.length;
    },
    // Resolves once the compositor has shown what the last step drew.
    present: () => new Promise((resolve) => realRAF(() => realRAF(() => resolve()))),
  };

  window.requestAnimationFrame = (cb) => { const id = nextFrame++; frames.set(id, cb); return id; };
  window.cancelAnimationFrame = (id) => { frames.delete(id); };
  window.setTimeout = (fn, ms = 0, ...args) => { const id = nextTimer++; timers.set(id, { fn, args, at: vt + (Number(ms) || 0) }); return id; };
  window.setInterval = (fn, ms = 0, ...args) => { const id = nextTimer++; timers.set(id, { fn, args, at: vt + (Number(ms) || 0), every: Number(ms) || 0 }); return id; };
  window.clearTimeout = window.clearInterval = (id) => { timers.delete(id); };
  performance.now = () => vt;
})();
