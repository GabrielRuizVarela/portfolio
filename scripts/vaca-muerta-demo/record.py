#!/usr/bin/env python3
"""Record the Vaca Muerta en datos demo video frame by frame.

Writes public/video/vaca-muerta-demo.mp4 (1280x720, 30 fps, no audio) and its poster.

The old video was a real-time screen recording of WebGL in headless Chromium: it kept about 2 distinct frames per
second. Here every page runs on a virtual clock (virtual-time.js), so each frame is one fixed slice of time:
the recorder steps the clock, the GPU draws, and the frame is captured, however long that takes.

What it shows, in order (all on-screen text in Spanish, like the site):
  1. mundo.html, act 1 of the tour: the wells filling the basin on the satellite image, fast through the empty
     early years; then the 3D time reading (height is time) with an orbit; act 2, one fracture event with its
     parent wells; act 3, the 2,094 events morphing into the event-study chart.
  2. index.html, three result plates: the event-study gap, the placebo test, the US replication.
  3. The question agent: the real output of `uv run python -m agente.demo` in the site repo (agente-demo.txt).
  4. End card over the satellite view.

Usage:
  python3 scripts/vaca-muerta-demo/record.py                          # live site
  python3 scripts/vaca-muerta-demo/record.py --site ~/dev/vaca-muerta-data/site
Needs Python Playwright (Chromium) and ffmpeg. Headless Chromium draws on the GPU through ANGLE on Vulkan; without
a GPU it falls back to SwiftShader, which gives the same frames, only slower.
"""
from __future__ import annotations

import argparse
import base64
import functools
import html
import http.server
import math
import re
import shutil
import subprocess
import sys
import tempfile
import threading
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1]
OUT = REPO / "public" / "video" / "vaca-muerta-demo.mp4"
POSTER = REPO / "public" / "video" / "vaca-muerta-demo-poster.jpg"
LIVE = "https://vaca-muerta-en-datos.gabrielruizvarela.workers.dev/"

FPS = 30
W, H = 1280, 720
SCALE = 1.5   # draw at 1920x1080 and scale down: thin lines and small labels stay sharp
PANEL = 490   # mundo.html centres its scene right of its 490 px story panel; draw wider and crop the panel off
XFADE = 0.5   # crossfade between clips, seconds
GPU_ARGS = ["--use-angle=vulkan", "--enable-features=Vulkan", "--ignore-gpu-blocklist", "--enable-gpu"]

# The site's own panels are replaced by the captions below; the scene keeps the whole frame.
HIDE_MUNDO = "#relato, .taller, .tiempo, footer.pie, .titulo, .margen, #ficha { display: none !important; }"
# On the front page the plate keeps its title, number and band; its paragraphs are what the caption says.
PLATES = ("html, html.mov { scroll-snap-type: none !important; scroll-behavior: auto !important; }"
          " .lamina .campo-estepa .col > * { visibility: hidden !important; }")

OVERLAY_CSS = """
#vm-capa { position: fixed; top: 0; width: 1280px; height: 720px; pointer-events: none; z-index: 2147483000;
  font-family: "Archivo", "Arial Narrow", system-ui, sans-serif; color: #ece5d3; }
#vm-capa > div { position: absolute; }
#vm-capa .vm-hud { left: 38px; top: 30px; text-shadow: 0 1px 14px rgba(0,0,0,.7), 0 0 2px rgba(0,0,0,.5); }
#vm-capa .vm-hud::before { content: ""; position: absolute; z-index: -1; left: -60px; top: -50px; width: 560px; height: 190px;
  background: radial-gradient(ellipse 50% 50% at 45% 45%, rgba(8,10,12,.5), rgba(8,10,12,0)); }
#vm-capa .vm-hud .mes { font: 600 46px/1 "Archivo", sans-serif; letter-spacing: -.01em; }
#vm-capa .vm-hud .sub { font: 500 18px/1.35 "Archivo", sans-serif; color: rgba(236,229,211,.86); margin-top: 9px; }
#vm-capa .vm-hud .sub b { font-weight: 600; color: #ece5d3; }
#vm-capa .vm-cap { left: 38px; bottom: 36px; max-width: 740px; padding: 14px 20px 16px 18px; background: rgba(11,13,15,.78);
  border-left: 3px solid #f4b860; border-radius: 2px; }
#vm-capa .vm-cap .k { font: 600 13px/1 "Archivo", sans-serif; letter-spacing: .16em; text-transform: uppercase; color: #f4b860; margin: 0 0 9px; }
#vm-capa .vm-cap .t { font: 400 25px/1.32 "Faustina", Georgia, serif; margin: 0; }
#vm-capa .vm-card { inset: 0; display: grid; place-items: center;
  background: radial-gradient(ellipse 70% 70% at 50% 50%, rgba(9,11,13,.62), rgba(9,11,13,.9)); }
#vm-capa .vm-card .in { text-align: center; max-width: 900px; }
#vm-capa .vm-card h1 { font: 600 64px/1.05 "Archivo", sans-serif; letter-spacing: -.01em; margin: 0 0 14px; color: #ece5d3; }
#vm-capa .vm-card .lema { font: 400 27px/1.35 "Faustina", Georgia, serif; margin: 0 0 26px; }
#vm-capa .vm-card ul { list-style: none; margin: 0 0 30px; padding: 0; font: 500 20px/1.6 "Archivo", sans-serif; color: rgba(236,229,211,.9); }
#vm-capa .vm-card ul li::before { content: ""; display: inline-block; width: 7px; height: 7px; border-radius: 50%;
  background: #f4b860; margin: 0 12px 3px 0; }
#vm-capa .vm-card .url { font: 600 21px/1 "Archivo", sans-serif; color: #f4b860; letter-spacing: .01em; }
"""

OVERLAY_JS = """
([left, css]) => {
  const st = document.createElement("style"); st.textContent = css; document.head.append(st);
  const capa = document.createElement("div"); capa.id = "vm-capa"; capa.style.left = left + "px";
  capa.innerHTML = '<div class="vm-hud"></div><div class="vm-cap"><p class="k"></p><p class="t"></p></div>'
    + '<div class="vm-card"></div>';
  document.body.append(capa);
  const q = (s) => capa.querySelector(s), txt = (id) => (document.getElementById(id) || {}).textContent || "";
  const ultimo = {};
  window.__capa = (o) => {
    let hud = "";
    if (o.hud === "mes") hud = '<div class="mes">' + txt("mes") + '</div><div class="sub"><b>' + txt("kbbl")
      + '</b> mil barriles por día &nbsp;&middot;&nbsp; <b>' + txt("activos") + '</b> pozos produciendo</div>';
    else if (o.hud === "evento") hud = '<div class="mes">' + txt("mes") + '</div><div class="sub">' + txt("cifra") + '</div>';
    const pon = (k, v, f) => { if (ultimo[k] !== v) { ultimo[k] = v; f(v); } };
    pon("hud", hud, (v) => { q(".vm-hud").innerHTML = v; });
    pon("hudO", o.hudO, (v) => { q(".vm-hud").style.opacity = v; });
    pon("k", o.k || "", (v) => { q(".vm-cap .k").textContent = v; });
    pon("t", o.t || "", (v) => { q(".vm-cap .t").textContent = v; });
    pon("capO", o.t ? o.capO : 0, (v) => { q(".vm-cap").style.opacity = v; });
    pon("card", o.card || "", (v) => { q(".vm-card").innerHTML = v; });
    pon("cardO", o.card ? o.cardO : 0, (v) => { q(".vm-card").style.opacity = v; });
  };
}
"""


def smooth(u: float) -> float:
    u = min(1.0, max(0.0, u))
    return u * u * (3 - 2 * u)


def ease_out(u: float) -> float:
    u = min(1.0, max(0.0, u))
    return 1 - (1 - u) ** 3


def keyed(keys):
    """A rate that holds between keys and eases from one key to the next: keys are (video seconds, rate)."""
    def f(t):
        if t <= keys[0][0]:
            return keys[0][1]
        for (t0, a), (t1, b) in zip(keys, keys[1:]):
            if t <= t1:
                return a + (b - a) * smooth((t - t0) / (t1 - t0))
        return keys[-1][1]
    return f


def fit(rate, dur: float, tour: float):
    """Scale a rate so that `dur` seconds of video cover exactly `tour` seconds of the page's own clock."""
    n = round(dur * FPS)
    covered = sum(rate(i / FPS) for i in range(n)) / FPS
    return lambda t: rate(t) * tour / covered


def fade(t: float, t0: float, t1: float, f: float = 0.35) -> float:
    if t < t0 or t > t1:
        return 0.0
    return min(1.0, (t - t0) / f, (t1 - t) / f)


class Clip:
    """Frames piped into ffmpeg as PNG, scaled to 1280x720, kept nearly lossless until the final encode."""

    def __init__(self, path: Path):
        self.path, self.n = path, 0
        self.p = subprocess.Popen(
            ["ffmpeg", "-v", "error", "-y", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "png", "-i", "-",
             "-vf", f"scale={W}:{H}:flags=lanczos", "-c:v", "libx264", "-preset", "veryfast", "-crf", "8",
             "-pix_fmt", "yuv420p", str(path)],
            stdin=subprocess.PIPE)

    def add(self, png: bytes):
        self.p.stdin.write(png)
        self.n += 1

    def close(self) -> float:
        self.p.stdin.close()
        if self.p.wait():
            raise SystemExit(f"ffmpeg failed writing {self.path}")
        return self.n / FPS


class Stage:
    """One page on the virtual clock, with the caption overlay."""

    def __init__(self, ctx, url: str, crop_x: int = 0, css: str = ""):
        self.pg = ctx.new_page()
        self.pg.on("pageerror", lambda e: print("  page error:", str(e)[:300], file=sys.stderr))
        self.pg.goto(url, wait_until="load")
        self.cdp = ctx.new_cdp_session(self.pg)
        self.crop_x = crop_x
        if css:
            self.pg.add_style_tag(content=css)
        self.pg.evaluate(OVERLAY_JS, [crop_x, OVERLAY_CSS])

    def js(self, code: str, arg=None):
        return self.pg.evaluate(code, arg)

    def run(self, seconds: float):
        """Advance the page clock in steps of at most 1/60 s, as a 60 Hz display would."""
        n = max(1, math.ceil(seconds * 60 - 1e-6))
        self.pg.evaluate("([n, ms]) => { for (let i = 0; i < n; i++) window.__vt.step(ms); }", [n, seconds * 1000 / n])

    def shot(self) -> bytes:
        self.pg.evaluate("() => window.__vt.present()")
        args = {"format": "png", "optimizeForSpeed": True}
        if self.crop_x:
            args["clip"] = {"x": self.crop_x, "y": 0, "width": W, "height": H, "scale": 1}
        return base64.b64decode(self.cdp.send("Page.captureScreenshot", args)["data"])

    def play(self, clip: Clip, dur: float, rate=lambda t: 1.0, each=None, overlay=None, t0: float = 0.0):
        """Record `dur` seconds. `rate` is page-clock seconds per video second; `each(t, tour)` runs before each
        step (camera, scroll); `overlay(t)` returns the caption state. t0 is this part's start in the clip."""
        tour = 0.0
        for i in range(round(dur * FPS)):
            t = i / FPS
            if each:
                each(t, tour)
            dt = rate(t) / FPS
            self.run(dt)
            tour += dt
            self.js("(o) => window.__capa(o)", overlay(t0 + t) if overlay else {})
            clip.add(self.shot())
        return tour


def captions(spec, extra=None):
    """spec: list of (start, end, kicker, text) in clip seconds. extra(t) adds HUD or card state."""
    def f(t):
        o = {"capO": 0}
        for a, b, k, txt in spec:
            if a <= t <= b:
                o = {"k": k, "t": txt, "capO": fade(t, a, b)}
        if extra:
            o.update(extra(t))
        return o
    return f


def set_cam(st: Stage, **c):
    st.js("(c) => { const cam = window.__mundo.motor.cam; for (const k in c) cam[k] = c[k]; }", c)


def get_cam(st: Stage) -> dict:
    return st.js("() => JSON.parse(JSON.stringify(window.__mundo.motor.cam))")


def lerp_cam(a: dict, b: dict, s: float) -> dict:
    return {"t": [a["t"][i] + (b["t"][i] - a["t"][i]) * s for i in range(3)],
            "dist": math.exp(math.log(a["dist"]) + (math.log(b["dist"]) - math.log(a["dist"])) * s),
            "az": a["az"] + (b["az"] - a["az"]) * s, "el": a["el"] + (b["el"] - a["el"]) * s}


def wait_mundo(st: Stage):
    st.pg.wait_for_function("window.__mundo && window.__mundo.ir && window.__mundo.motor", timeout=120000)
    for _ in range(300):   # the satellite image decodes from the page's own data, outside the virtual clock
        foto = st.js("() => window.__mundo.motor.foto()")
        if foto is None or foto.get("lista") or foto.get("error"):
            break
        time.sleep(0.1)
    res = st.js("() => window.__mundo.resultado()")
    if not res or res["ok"] != res["total"]:
        raise SystemExit(f"mundo.html self-check failed: {res}")
    return res


# ---------------------------------------------------------------------------------------------------------- clips

def clip_mundo(ctx, base: str, clip: Clip) -> None:
    """Acts 1 to 3 of the 3D tour in one continuous take, with an orbit of the time reading between acts 1 and 2."""
    st = Stage(ctx, base + "mundo.html", PANEL, HIDE_MUNDO)
    res = wait_mundo(st)
    print(f"  mundo.html self-check {res['ok']}/{res['total']}, satellite image {st.js('() => window.__mundo.motor.foto()')}")
    # The page opened act 1 at virtual time 0. It runs 17 s of its own clock: the month goes from 2011 to 2026 in
    # 16 s and the camera lands in 17 s. Fast through the nearly empty first years, then close to real speed.
    t = 0.0
    d1 = 10.0
    r1 = fit(keyed([(0, 1.0), (1.2, 1.0), (2.0, 3.4), (3.4, 3.4), (4.6, 1.2)]), d1, 17.0)
    cap = captions([
        (0.25, 5.0, "Vaca Muerta en datos", "Cada punto es la boca de un pozo no convencional: aparece cuando el pozo empieza y crece con el petróleo de cada mes."),
        (5.2, 9.85, "Dato público", "3.498 pozos, su caudal mensual y sus fracturas, publicados por la Secretaría de Energía, de 2011 a 2026."),
    ], lambda x: {"hud": "mes", "hudO": min(1.0, x / 0.5)})
    st.play(clip, d1, r1, overlay=cap, t0=t)
    t += d1

    # The 3D time reading: each well a column from 2011 at the base to 2026 at the top. The site's own switch
    # flies up for 1.4 s; then a slow orbit that pulls back to show the whole basin.
    d2 = 6.5
    st.js("() => { window.__mundo.ir.libre(); window.__mundo.ir.lectura(1); }")
    orbit = {}

    def each2(x, tour):
        if tour < 1.42:
            return
        if not orbit:
            orbit["a"] = get_cam(st)
            a = orbit["a"]
            orbit["b"] = {"t": [0.0, a["t"][1], 5.0], "dist": 145.0, "az": a["az"] + 1.25, "el": 0.38}
            orbit["x0"] = x
        u = (x - orbit["x0"]) / (d2 - orbit["x0"])
        set_cam(st, **lerp_cam(orbit["a"], orbit["b"], smooth(u)))

    cap = captions([(t + 0.3, t + d2 - 0.1, "En 3D", "La altura es el tiempo: cada columna es un pozo, de 2011 en la base a 2026 arriba, y brilla con su petróleo de cada mes.")],
                   lambda x: {"hud": "mes", "hudO": 1.0})
    st.play(clip, d2, each=each2, overlay=cap, t0=t)
    t += d2

    # Act 2: one fracture event. The camera lands in 5 s, then the month runs from 3 before to 3 after in 13 s.
    d3 = 9.4
    st.js("() => window.__mundo.ir.acto(1)")
    r3 = fit(keyed([(0, 1.15), (3.9, 1.15), (4.6, 2.4)]), d3, 18.0)
    cap = captions([(t + 0.3, t + d3 - 0.1, "Un evento", "Se fractura un pozo nuevo, el hijo. Sus padres son los pozos que ya producían a menos de 1 km; los controles están a 2 a 5 km.")],
                   lambda x: {"hud": "evento", "hudO": fade(x, t + 0.2, t + d3 + 1, 0.5)})
    st.play(clip, d3, r3, overlay=cap, t0=t)
    t += d3

    # Act 3: every event at once. The camera lands in 7 s and the lines morph into the chart until 13.5 s;
    # after landing the camera keeps a slow push in, so the last seconds hold the result without freezing.
    d4 = 11.0
    st.js("() => window.__mundo.ir.acto(2)")
    r4 = fit(keyed([(0, 1.6), (7.6, 1.6), (8.4, 1.0)]), d4, 15.6)
    push = {}

    def each4(x, tour):
        if tour < 7.05:
            return
        if not push:
            push["a"] = get_cam(st)
            push["x0"] = x
        a = push["a"]
        set_cam(st, dist=a["dist"] * (1 - 0.16 * smooth((x - push["x0"]) / (d4 - push["x0"]))))

    cap = captions([
        (t + 0.3, t + 5.2, "Los 2.094 eventos", "Ahora todos juntos: cada línea es un padre, antes y después de la fractura de un pozo nuevo cerca."),
        (t + 5.4, t + d4, "Medido", "Un mes después, los padres rinden entre 19 y 23 puntos menos que sus controles. A los 6 meses la brecha casi se cierra."),
    ])
    st.play(clip, d4, r4, each=each4, overlay=cap, t0=t)
    st.pg.close()


def clip_plates(ctx, base: str, clips: list[Clip]) -> None:
    """Three plates of the front page: the plate's number counts up as it crosses the middle of the screen."""
    st = Stage(ctx, base + "index.html", 0, PLATES)
    st.run(1.0)
    plates = [
        ("vecino", 3.4, "Resultado", "-23 puntos al mes 1; 19 si se descuenta la brecha que ya había antes de la fractura."),
        ("artefacto", 3.8, "Placebo", "Con fechas de fractura falsas, la brecha no aparece: va de -2,4 a 0,5 puntos."),
        ("fuera", 4.2, "Replicación en EE. UU.", "Misma prueba en dos cuencas: se replica en Colorado y no en Wyoming. Se publican las dos."),
    ]
    for (sid, dur, k, txt), clip in zip(plates, clips):
        top = st.js(f"() => document.getElementById('{sid}').getBoundingClientRect().top + scrollY")
        y0, glide, drift = top - 430, 1.15, 110
        st.js(f"() => window.scrollTo(0, {y0})")
        st.run(1.5)   # the plate above settles before the take starts

        def each(x, tour):
            y = y0 + 430 * ease_out(x / glide) if x < glide else top + drift * (x - glide) / (dur - glide)
            st.js(f"() => window.scrollTo(0, {y})")

        st.play(clip, dur, each=each, overlay=captions([(0.35, dur + 1, k, txt)]))
    st.pg.close()


AGENT_CSS = """
body > *:not(#vm-agente):not(#vm-capa) { display: none !important; }
html, body { background: #101417 !important; margin: 0; overflow: hidden; }
#vm-agente { position: fixed; inset: 0; display: grid; place-items: center; background: radial-gradient(ellipse at 50% 30%, #1a2329, #0d1013); }
#vm-agente .term { width: 1150px; margin-top: -70px; padding: 26px 32px 28px; background: #0b0d0f; border: 1px solid rgba(236,229,211,.14);
  border-radius: 6px; box-shadow: 0 30px 80px rgba(0,0,0,.55); transform-origin: 50% 40%;
  font: 400 17px/1.5 "DejaVu Sans Mono", "Liberation Mono", monospace; color: #ece5d3; }
#vm-agente .l { white-space: pre-wrap; margin: 0; min-height: 1.5em; }
#vm-agente .cmd { color: rgba(236,229,211,.6); }
#vm-agente .cmd b { color: #5fd3c4; font-weight: 400; }
#vm-agente .nota { color: rgba(236,229,211,.5); font-size: 14px; }
#vm-agente .preg { color: #f4b860; }
#vm-agente .op { color: #5fd3c4; }
#vm-agente .resp { color: #ece5d3; font-weight: 700; }
#vm-agente .cita { color: rgba(236,229,211,.48); font-size: 14px; }
#vm-agente .gap { min-height: .9em; }
#vm-agente .cursor { display: inline-block; width: .6em; height: 1.1em; background: #f4b860; vertical-align: -0.18em; margin-left: 2px; }
"""


def agent_lines(transcript: Path) -> list[tuple[str, str]]:
    """(class, text) lines from two blocks of the demo transcript: a cost question and an abstention."""
    raw = transcript.read_text(encoding="utf-8")
    head = raw.split("\n\n")[0].splitlines()
    blocks = {int(m.group(1)): m.group(0) for m in re.finditer(r"^\[(\d)\].*?(?=\n\n\[|\Z)", raw, re.S | re.M)}
    lines = [("cmd", "$ <b>uv run python -m agente.demo</b>"), ("nota", head[1]), ("gap", "")]
    kinds = {"Pregunta": "preg", "Operación": "op", "Argumentos": "op", "Respuesta": "resp", "Cita": "cita"}
    for n in (3, 5):
        for ln in blocks[n].strip().splitlines()[1:]:
            key = ln.split(":")[0]
            if n == 5 and key == "Argumentos":
                continue
            if key == "Cita" and "; hash" in ln:
                ln = ln.split("; hash")[0] + "; hash de los datos crudos ..."
            lines.append((kinds.get(key, "l"), ln))
        lines.append(("gap", ""))
    return lines[:-1]


def clip_agent(ctx, base: str, clip: Clip, transcript: Path) -> None:
    st = Stage(ctx, base + "informe.html", 0, AGENT_CSS)
    lines = agent_lines(transcript)
    st.js("""(lines) => {
      const box = document.createElement("div"); box.id = "vm-agente";
      const term = document.createElement("div"); term.className = "term"; box.append(term);
      for (const [c, t] of lines) { const p = document.createElement("p"); p.className = "l " + c; p.dataset.full = t; term.append(p); }
      document.body.prepend(box);
    }""", lines)
    st.run(0.5)
    dur = 9.0
    # When each line starts and how fast it appears: questions are typed, the rest appears line by line.
    plan, t = [], 0.15
    for c, txt in lines:
        if c == "preg":
            plan.append((t, 75.0))
            t += len(txt) / 75.0 + 0.3
        elif c == "gap":
            plan.append((t, 0.0))
            t += 0.25
        else:
            plan.append((t, 0.0))
            t += 0.32 if c != "cmd" else 0.55
    cap = captions([(0.4, dur + 1, "Agente de preguntas, también servidor MCP", "Un modelo elige una de 16 operaciones tipadas y completa sus argumentos: nunca escribe SQL ni números.")])

    def each(x, tour):
        st.js("""([x, plan]) => {
          const ps = document.querySelectorAll("#vm-agente .l");
          let last = null;
          ps.forEach((p, i) => {
            const [t0, cps] = plan[i], full = p.dataset.full;
            if (x < t0) { p.style.visibility = "hidden"; return; }
            p.style.visibility = "visible";
            const typed = cps ? full.slice(0, Math.floor((x - t0) * cps)) : full;
            if (p.dataset.shown !== typed) { p.dataset.shown = typed; p.innerHTML = p.classList.contains("cmd") ? typed : typed.replace(/[&<>]/g, (ch) => ({"&": "&amp;", "<": "&lt;", ">": "&gt;"})[ch]); }
            p.style.opacity = cps ? 1 : Math.min(1, (x - t0) / 0.2);
            last = p;
          });
          document.querySelectorAll("#vm-agente .cursor").forEach((c) => c.remove());
          if (last && Math.floor(x * 2.5) % 2 === 0) { const c = document.createElement("span"); c.className = "cursor"; last.append(c); }
          document.querySelector("#vm-agente .term").style.transform = "scale(" + (1 + 0.035 * x / 9) + ")";
        }""", [x, plan])

    st.play(clip, dur, each=each, overlay=cap)
    st.pg.close()


def clip_end(ctx, base: str, clip: Clip) -> None:
    st = Stage(ctx, base + "mundo.html#libre", PANEL, HIDE_MUNDO)
    wait_mundo(st)
    st.run(1.2)   # the free view settles on the satellite reading
    a = get_cam(st)
    dur = 5.0
    card = ('<div class="in"><h1>Vaca Muerta en datos</h1>'
            '<p class="lema">Proyecto personal sobre los datos públicos de la Secretaría de Energía</p>'
            '<ul><li>Donde hubo regla de decisión, se escribió antes de correr; lo agregado después está marcado</li>'
            '<li>1.200+ pruebas automáticas &nbsp;&middot;&nbsp; código a pedido</li></ul>'
            '<div class="url">vaca-muerta-en-datos.gabrielruizvarela.workers.dev</div></div>')

    def each(x, tour):
        set_cam(st, az=a["az"] + 0.3 * x / dur, dist=a["dist"] * (1 - 0.1 * x / dur))

    st.play(clip, dur, each=each, overlay=lambda x: {"card": card, "cardO": min(1.0, max(0.0, (x - 0.2) / 0.6))})
    st.pg.close()


# ------------------------------------------------------------------------------------------------------- assembly

def assemble(clips: list[Path], out: Path) -> float:
    durs = [float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(c)]))
            for c in clips]
    args, chain, last, off = [], [], "0:v", 0.0
    for c in clips:
        args += ["-i", str(c)]
    for k in range(1, len(clips)):
        off += durs[k - 1] - XFADE
        tag = f"v{k}"
        chain.append(f"[{last}][{k}:v]xfade=transition=fade:duration={XFADE}:offset={off:.4f}[{tag}]")
        last = tag
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args, "-filter_complex", ";".join(chain), "-map", f"[{last}]",
                    "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-pix_fmt", "yuv420p", "-r", str(FPS),
                    "-movflags", "+faststart", "-an", str(out)], check=True)
    return sum(durs) - XFADE * (len(clips) - 1)


def distinct_frames(video: Path) -> tuple[int, int]:
    log = subprocess.run(["ffmpeg", "-i", str(video), "-vf", "mpdecimate", "-loglevel", "debug", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    keep, drop = log.count(" keep "), log.count(" drop ")
    return keep, keep + drop


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--site", default=LIVE, help="site URL, or a local folder with the site's pages (served on 127.0.0.1)")
    ap.add_argument("--out", type=Path, default=OUT)
    ap.add_argument("--poster", type=Path, default=POSTER)
    ap.add_argument("--poster-at", type=float, default=14.5, help="second of the video used as the poster")
    ap.add_argument("--transcript", type=Path, default=HERE / "agente-demo.txt")
    ap.add_argument("--keep", type=Path, help="keep the intermediate clips in this folder")
    a = ap.parse_args()
    if not shutil.which("ffmpeg"):
        raise SystemExit("ffmpeg is not on PATH")

    base, srv = a.site, None
    if not re.match(r"https?://", base):
        root = Path(base).expanduser().resolve()
        srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=str(root)))
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        base = f"http://127.0.0.1:{srv.server_address[1]}/"
    base = base.rstrip("/") + "/"

    work = Path(tempfile.mkdtemp(prefix="vm-demo-")) if not a.keep else a.keep
    work.mkdir(parents=True, exist_ok=True)
    started = time.time()
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=GPU_ARGS)
        ctx = browser.new_context(viewport={"width": W + PANEL, "height": H}, device_scale_factor=SCALE, color_scheme="dark")
        ctx.add_init_script(path=str(HERE / "virtual-time.js"))
        probe = ctx.new_page()
        renderer = probe.evaluate("""() => { const gl = document.createElement('canvas').getContext('webgl2'); if (!gl) return 'no WebGL2';
          const e = gl.getExtension('WEBGL_debug_renderer_info'); return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER); }""")
        probe.close()
        print(f"site {base}\nrenderer {renderer}")
        plate_ctx = browser.new_context(viewport={"width": W, "height": H}, device_scale_factor=SCALE, color_scheme="dark")
        plate_ctx.add_init_script(path=str(HERE / "virtual-time.js"))

        paths = [work / f"{i}-{n}.mp4" for i, n in enumerate(["mundo", "vecino", "artefacto", "fuera", "agente", "cierre"])]
        clips = [Clip(x) for x in paths]
        print("recording the 3D tour")
        clip_mundo(ctx, base, clips[0])
        print("recording the result plates")
        clip_plates(plate_ctx, base, clips[1:4])
        print("recording the question agent")
        clip_agent(plate_ctx, base, clips[4], a.transcript)
        print("recording the end card")
        clip_end(ctx, base, clips[5])
        for c in clips:
            print(f"  {c.path.name}: {c.close():.2f} s, {c.n} frames")
        browser.close()
    if srv:
        srv.shutdown()

    a.out.parent.mkdir(parents=True, exist_ok=True)
    total = assemble(paths, a.out)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(a.poster_at), "-i", str(a.out), "-frames:v", "1", "-q:v", "3",
                    str(a.poster)], check=True)
    keep, n = distinct_frames(a.out)
    print(f"wrote {a.out} ({total:.1f} s, {a.out.stat().st_size / 1e6:.1f} MB) and {a.poster}")
    print(f"distinct frames (mpdecimate): {keep} of {n} ({100 * keep / max(1, n):.1f}%)")
    print(f"took {time.time() - started:.0f} s")
    if not a.keep:
        shutil.rmtree(work, ignore_errors=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
