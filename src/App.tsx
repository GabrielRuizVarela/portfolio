import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  // Deep links like #despacho-demo (used by the CV) target elements React renders after load.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ block: 'center' });
  }, []);

  return (
    <div className="noise min-h-screen flex flex-col">
      <Header />
      <DotField>
        <Projects />
        <EngineeringProjects />
      </DotField>
      <Footer />
    </div>
  );
}

function DotField({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || !glowRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.setProperty('--glow-x', `${x}px`);
    glowRef.current.style.setProperty('--glow-y', `${y}px`);
    glowRef.current.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }, []);

  return (
    <main
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex-1 flex flex-col items-center justify-center px-6 py-20 gap-20 max-w-6xl mx-auto w-full dot-field"
    >
      <div ref={glowRef} className="dot-glow" />
      {children}
    </main>
  );
}

function Header() {
  return (
    <header className="w-full px-6 pt-10 pb-6 max-w-6xl mx-auto">
      <div className="flex items-baseline justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight text-text-primary">
            Gabriel Ruiz Varela
          </h1>
          <p className="font-mono text-sm text-text-muted mt-2 tracking-wide">
            Developer
          </p>
        </div>
        <a
          href="https://github.com/GabrielRuizVarela"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-text-muted hover:text-text-primary transition-colors link-reveal"
        >
          github.com/GabrielRuizVarela
        </a>
      </div>
      <div className="mt-6 h-px bg-gradient-to-r from-text-muted/20 via-text-muted/10 to-transparent" />
    </header>
  );
}

function Projects() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
      <div className="lg:col-span-2">
        <LutieCard />
      </div>
      <div className="lg:col-span-2">
        <DespachoCard />
      </div>
      <div className="lg:col-span-2">
        <LolDraftCard />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LUTIE — 90s bold, chunky, saturated, playful
   ───────────────────────────────────────────── */

function LutieCard() {
  const [isHovered, setIsHovered] = useState(false);
  const video = `${import.meta.env.BASE_URL}video/lutie-2.mp4`;
  const poster = `${import.meta.env.BASE_URL}video/lutie-2-poster.jpg`;

  return (
    <div
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden retro-border rounded-none bg-lutie-ink transition-all duration-300">
        {/* Soft ink-to-sky wash */}
        <div className="absolute inset-0 opacity-[0.07] bg-gradient-to-br from-lutie-rose via-lutie-bone to-lutie-sky" />

        <div className="relative z-10 p-8 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 items-center">
          <div>
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-retro text-[10px] text-lutie-rose tracking-widest uppercase">
                Commercial
              </span>
              <span className="h-px flex-1 bg-lutie-bone/20" />
              <span className="font-retro text-[8px] text-lutie-rose">
                ●
              </span>
            </div>

            {/* Title */}
            <h2 className="font-retro text-2xl md:text-3xl text-lutie-bone mb-1 leading-tight">
              LUTIE 2.0
            </h2>
            <p className="font-retro text-[10px] text-lutie-graphite mb-6 tracking-wider">
              LAUNCHING NOV 2026
            </p>

            {/* Description */}
            <p className="font-body text-sm text-text-primary/90 leading-relaxed mb-4">
              Nutrition planning SaaS for professionals. Spanish-first and mobile-first.
            </p>
            <ul className="font-body text-[13px] text-text-primary/75 leading-relaxed mb-6 space-y-1.5">
              <li>▸ 103 typed AI capabilities shared by the in-app assistant and a hosted MCP server</li>
              <li>▸ One gate for every call: schema validation, RLS, entitlements, rate limits, signed confirmations</li>
              <li>▸ Deterministic meal-plan engine (GRASP + linear programming) with a golden CI suite</li>
              <li>▸ Eval harness (LLM-as-judge, guardrail, tool-call scorers) gates model changes</li>
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['Next.js', 'Supabase', 'Cloudflare Workers', 'Vercel AI SDK', 'MCP'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-1 border-2 border-lutie-rose/40 text-lutie-rose uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://lutie.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <span className="font-retro text-[10px] text-lutie-bone uppercase tracking-widest group-hover:tracking-[0.3em] transition-all duration-300">
                Visit lutie.app
              </span>
              <span
                className="text-lutie-rose transition-transform duration-300"
                style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}
              >
                →
              </span>
            </a>
            <a
              href="https://www.instagram.com/lutie.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-retro text-[10px] text-lutie-rose/80 hover:text-lutie-rose uppercase tracking-widest transition-colors"
            >
              @lutie.app
            </a>
            </div>
          </div>

          {/* Demo video */}
          <div id="lutie-demo">
            <div className="border-2 border-lutie-sky/30 bg-black">
              <video
                src={video}
                poster={poster}
                className="block w-full aspect-video"
                controls
                playsInline
                preload="metadata"
              />
            </div>
            <details className="mt-3 font-mono text-[10px] text-text-primary/50 leading-relaxed">
              <summary className="cursor-pointer hover:text-text-primary/80">Credits</summary>
              <p className="mt-2">
                Demo recorded on Lutie's staging app with a fictional patient. Voz sintética generada con Chatterbox; referencia de voz: grabación de un voluntario anónimo (hablante arm_07049) del conjunto{' '}
                <a className="underline" href="https://www.openslr.org/61/" target="_blank" rel="noopener noreferrer">OpenSLR SLR61</a>{' '}
                (Google), licencia{' '}
                <a className="underline" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
                ; modificada: solo se usó como referencia, la locución es audio sintético nuevo. Música: «Bobbing», Stereologue. Tipografías: Archivo y Noto Sans Mono (SIL OFL 1.1).
              </p>
            </details>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="h-1 bg-gradient-to-r from-lutie-rose via-lutie-bone to-lutie-sky" />
      </div>

      {/* Shadow block — 90s offset */}
      <div className="h-2 mx-2 bg-lutie-rose/20 -mt-0" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   DESPACHO — legal paper, ink, oxblood seal
   ───────────────────────────────────────────────────── */

function DespachoCard() {
  const video = `${import.meta.env.BASE_URL}video/despacho-demo.mp4`;
  const poster = `${import.meta.env.BASE_URL}video/despacho-demo-poster.jpg`;
  const captions = `${import.meta.env.BASE_URL}video/despacho-demo.vtt`;

  const stats = [
    { value: '1,650', label: 'statutes & regulations' },
    { value: '~51k', label: 'court decisions' },
    { value: '0.47 → 0.86', label: 'held-out Recall@12' },
  ];

  const pipeline = ['Crawl + OCR', 'Chunk', 'BM25 + pgvector', 'RRF', 'Rerank', 'Cite or abstain'];

  return (
    <div className="group relative overflow-hidden rounded-sm border border-despacho-brass/25 bg-despacho-ink transition-all duration-500 hover:border-despacho-brass/50 hover:shadow-[0_0_40px_-12px_rgba(176,141,87,0.2)]">
      <div className="h-px bg-gradient-to-r from-transparent via-despacho-brass/40 to-transparent" />

      <div className="relative z-10 p-8 grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-8 items-center">
        {/* Demo video */}
        <div id="despacho-demo" className="order-last lg:order-first">
          <div className="border border-despacho-brass/30 bg-black">
            <video
              src={video}
              poster={poster}
              className="block w-full aspect-video"
              controls
              playsInline
              preload="metadata"
            >
              <track kind="captions" src={captions} srcLang="es" label="Español" default />
            </video>
          </div>
          <details className="mt-3 font-mono text-[10px] text-despacho-paper/45 leading-relaxed">
            <summary className="cursor-pointer hover:text-despacho-paper/80">Credits</summary>
            <p className="mt-2">
              Fictional parties and data; court rulings shown are public Tucumán case law with names blurred. Voz sintética generada con Chatterbox; referencia de voz: grabación de un voluntario anónimo (hablante arm_07049) del conjunto{' '}
              <a className="underline" href="https://www.openslr.org/61/" target="_blank" rel="noopener noreferrer">OpenSLR SLR61</a>{' '}
              (Google), licencia{' '}
              <a className="underline" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
              ; modificada: solo se usó como referencia, la locución es audio sintético nuevo. Música: Preludio de la Suite para violonchelo n.º 1 (BWV 1007) de J. S. Bach, interpretación «Played by Chris», dominio público (CC0),{' '}
              <a className="underline" href="https://commons.wikimedia.org/wiki/File:Bach_Cello_Suite_1_Prelude_(BWV_1007)_Played_by_Chris.ogg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
              . Tipografías: Cormorant, IBM Plex Mono, Archivo y Source Serif 4 (SIL OFL 1.1).
            </p>
          </details>
        </div>

        <div>
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] text-despacho-brass tracking-[0.2em] uppercase">
              Beta
            </span>
            <span className="h-px flex-1 bg-despacho-brass/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-despacho-oxblood" />
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl md:text-4xl text-despacho-paper mb-2 tracking-tight">
            Despacho
          </h2>

          {/* Description */}
          <p className="font-body text-sm text-despacho-paper/70 leading-relaxed mb-6">
            Legal research, deadlines and drafting for lawyers in Tucumán, Argentina. Every answer cites the law or the ruling it rests on, or abstains. Also reachable from Claude and ChatGPT as an MCP server.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-despacho-brass/30 pl-3">
                <div className="font-display text-xl text-despacho-paper">{s.value}</div>
                <div className="font-mono text-[10px] text-despacho-paper/45 leading-tight mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Pipeline */}
          <div className="flex flex-wrap items-center gap-1.5 mb-8 font-mono text-[10px] text-despacho-paper/60">
            {pipeline.map((step, i) => (
              <span key={step} className="flex items-center gap-1.5">
                <span className="px-2 py-1 border border-despacho-paper/15">{step}</span>
                {i < pipeline.length - 1 && <span className="text-despacho-oxblood">→</span>}
              </span>
            ))}
          </div>

          <a
            href="https://despacho-beta.lutie.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-despacho-brass tracking-wider hover:tracking-widest transition-all duration-500"
          >
            despacho-beta.lutie.app →
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   LOL DRAFT — bone paper, ink, one violet signal
   ───────────────────────────────────────────────────── */

function LolDraftCard() {
  const video = `${import.meta.env.BASE_URL}video/lol-draft-demo.mp4`;
  const poster = `${import.meta.env.BASE_URL}video/lol-draft-demo-poster.jpg`;

  const stats = [
    { value: '94.3%', label: 'draft actions exact, video only (7 recorded Worlds drafts)' },
    { value: '20/20', label: 'actions exact, video only, KC vs MVK G1 via the live YouTube URL' },
    { value: '<150 ms', label: 'to read all 20 slots of a frame, on CPU' },
  ];

  const pipelines = [
    { label: 'Video', steps: ['yt-dlp → ffmpeg, 2 fps 720p', '20 slot crops', 'SIFT match vs champion art', 'Per-slot state + confidence'] },
    { label: 'Audio', steps: ['same stream → 16 kHz mono', 'faster-whisper, local', 'Caster mention spotter (ban / pick cues)', 'Optional LLM turn reader'] },
    { label: 'Fuse', steps: ['Draft-order tracker', 'Lolesports cross-check', 'JSON + SSE API'] },
  ];

  return (
    <div className="group relative overflow-hidden rounded-sm border border-[#7c5cff]/30 bg-[#0f0f14] transition-all duration-500 hover:border-[#7c5cff]/60 hover:shadow-[0_0_40px_-12px_rgba(124,92,255,0.35)]">
      <div className="h-px bg-gradient-to-r from-transparent via-[#7c5cff]/60 to-transparent" />

      <div className="relative z-10 p-8 grid grid-cols-1 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] gap-8 items-start">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] text-[#a99bff] tracking-[0.2em] uppercase">
              Computer vision · Worlds 2026
            </span>
            <span className="h-px flex-1 bg-[#7c5cff]/25" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#7c5cff]" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl text-[#ece8dc] mb-2 tracking-tight">
            LoL Draft
          </h2>
          <p className="font-body text-sm text-[#ece8dc]/70 leading-relaxed mb-4">
            Two projects I built end to end for Worlds 2026. <span className="text-[#a99bff]">lol-live-capture</span> is an open-source (MIT) capture system that reads the pick/ban draft off a live broadcast, in real time, and turns it into structured data. <span className="text-[#a99bff]">LoL Draft</span> is the draft lab on top of it: before every pick or ban it shows the five likeliest champions and why, then the hit or the miss.
          </p>
          <ul className="font-body text-[13px] text-[#ece8dc]/70 leading-relaxed mb-6 space-y-1.5">
            <li>▸ <span className="text-[#ece8dc]">Video:</span> a YouTube or Twitch stream (or a saved video replayed at 1x) goes through yt-dlp and ffmpeg at 2 fps; each overlay slot is cropped and matched against a champion art bank with SIFT features</li>
            <li>▸ <span className="text-[#ece8dc]">Audio:</span> the same stream is decoded to 16 kHz mono, transcribed locally with faster-whisper in rolling windows biased toward the patch's champion names, and a spotter turns caster speech into ban and pick mentions (aliases like "Monkey King" included), optionally read by an LLM</li>
            <li>▸ <span className="text-[#ece8dc]">Fusion:</span> audio proposes, image confirms. A caster naming the champion the image sees raises confidence, and a look-alike is swapped only when the casters name the other one and the image still rates it close. A tracker that knows the 20-action order commits a pick only once the draft moves on, so a hover that changes its mind is never recorded</li>
            <li>▸ <span className="text-[#ece8dc]">Check and serve:</span> the lolesports feed grades the draft when it ends, and every action carries its confidence and the path it came from (image, audio+image, final set), served as JSON and a server-sent event stream</li>
          </ul>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-[#7c5cff]/35 pl-3">
                <div className="font-display text-xl text-[#ece8dc]">{s.value}</div>
                <div className="font-mono text-[10px] text-[#ece8dc]/45 leading-tight mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-6 font-mono text-[10px] text-[#ece8dc]/60">
            {pipelines.map((row) => (
              <div key={row.label} className="flex flex-wrap items-center gap-1.5">
                <span className="w-9 text-[#a99bff] uppercase tracking-wider">{row.label}</span>
                {row.steps.map((step, i) => (
                  <span key={step} className="flex items-center gap-1.5">
                    <span className="px-2 py-1 border border-[#ece8dc]/15">{step}</span>
                    {i < row.steps.length - 1 && <span className="text-[#7c5cff]">→</span>}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {['Python', 'OpenCV', 'ffmpeg', 'yt-dlp', 'faster-whisper', 'FastAPI', 'SSE', 'React'].map((tag) => (
              <span key={tag} className="font-mono text-[10px] px-2 py-1 border border-[#7c5cff]/40 text-[#a99bff]/80 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] tracking-wider">
            <a href="https://github.com/GabrielRuizVarela/lol-live-capture" target="_blank" rel="noopener noreferrer" className="text-[#a99bff] hover:tracking-widest transition-all duration-500">
              lol-live-capture on GitHub →
            </a>
            <a href="https://lol-draft.pages.dev" target="_blank" rel="noopener noreferrer" className="text-[#ece8dc]/60 hover:text-[#ece8dc] transition-colors">
              lol-draft.pages.dev (the draft lab)
            </a>
          </div>
        </div>

        <div id="lol-draft-demo">
          <div className="border border-[#7c5cff]/30 bg-black">
            <video src={video} poster={poster} className="block w-full aspect-video" controls playsInline preload="metadata" />
          </div>
          <p className="font-mono text-[10px] text-[#ece8dc]/45 mt-2">Demo: the LoL Draft lab.</p>
          <figure className="mt-5">
            <a href="https://github.com/GabrielRuizVarela/lol-live-capture" target="_blank" rel="noopener noreferrer">
              <img
                src={`${import.meta.env.BASE_URL}img/lol-capture-live.jpg`}
                alt="lol-live-capture in demo mode, mid-draft: bans greyed out, picks locked in gold, the next ban hovering with a dashed outline"
                className="block w-full border border-[#7c5cff]/30"
                loading="lazy"
              />
            </a>
            <figcaption className="font-mono text-[10px] text-[#ece8dc]/45 mt-2">lol-live-capture's live board in demo mode (an invented draft, no stream): locked picks, and the next ban shown as a dashed ghost until it commits.</figcaption>
          </figure>
          <details className="mt-3 font-mono text-[10px] text-[#ece8dc]/45 leading-relaxed">
            <summary className="cursor-pointer hover:text-[#ece8dc]/80">Credits</summary>
            <p className="mt-2">
              Footage of the public LoL Draft site; real Worlds 2026 drafts from the Leaguepedia record, no personal data. Not endorsed by Riot Games. Fonts: Bricolage Grotesque, JetBrains Mono and Instrument Serif (SIL OFL 1.1). Music: track supplied by the author (free_fixed.mp3).
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   ENGINEERING PROJECTS — academic/research work
   ───────────────────────────────────────────────────── */

function EngineeringProjects() {
  const projects = [
    {
      name: 'Biomechanical sound source polar pattern measurement',
      description: 'A method to measure the directivity of a biomechanical source.',
      href: 'https://drive.google.com/file/d/1rOASwHCp-RMIGml1D_QBY2APR5RGlX6Q/view?usp=sharing',
    },
    {
      name: 'Isotropy evolution in a decaying sound field inside a reverberant room',
      description: 'Systematic study of the isotropy evolution in a decaying sound field.',
      href: 'https://drive.google.com/file/d/12xD_orI_FXxF6glyaHA1aQex5ILdyOxO/view?usp=sharing',
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="font-display text-xl text-text-muted italic whitespace-nowrap">
          Engineering Research
        </h3>
        <div className="h-px flex-1 bg-text-muted/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-text-muted/10 rounded-sm p-6 hover:border-text-muted/25 transition-all duration-300 bg-surface-raised/30"
          >
            <h4 className="font-body text-sm font-medium text-text-primary/80 mb-2 group-hover:text-text-primary transition-colors leading-snug">
              {project.name}
            </h4>
            <p className="font-mono text-[11px] text-text-muted/60 leading-relaxed">
              {project.description}
            </p>
            <span className="inline-block mt-4 font-mono text-[10px] text-text-muted/40 group-hover:text-text-muted/70 tracking-wider transition-colors">
              View paper →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full px-6 py-10 max-w-6xl mx-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-text-muted/10 to-transparent mb-8" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-text-muted">
        <p className="font-mono text-[11px] tracking-wider">
          Gabriel Ruiz Varela — {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/GabrielRuizVarela"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] hover:text-text-primary transition-colors link-reveal"
          >
            GitHub
          </a>
          <a
            href="https://lutie.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] hover:text-lutie-rose transition-colors link-reveal"
          >
            lutie.app
          </a>
          <a
            href="https://www.linkedin.com/in/gabrielruizvarela/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] hover:text-text-primary transition-colors link-reveal"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default App;
