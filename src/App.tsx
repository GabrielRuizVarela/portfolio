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
            AI product engineer · legal RAG & nutrition SaaS
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
      <div className="relative overflow-hidden scanlines retro-border rounded-none bg-surface-raised transition-all duration-300 glitch-hover">
        {/* Hot gradient background */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-lutie-pink via-lutie-yellow to-lutie-cyan" />

        {/* Floating pixel decorations */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-lutie-pink animate-float" />
        <div className="absolute top-8 right-10 w-2 h-2 bg-lutie-yellow animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-6 left-6 w-2 h-2 bg-lutie-cyan animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-8 w-3 h-3 bg-lutie-green animate-float" style={{ animationDelay: '0.5s' }} />

        <div className="relative z-10 p-8 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 items-center">
          <div>
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-retro text-[10px] text-lutie-yellow tracking-widest uppercase">
                Commercial
              </span>
              <span className="h-px flex-1 bg-lutie-yellow/30" />
              <span className="font-retro text-[8px] text-lutie-pink animate-blink">
                ●
              </span>
            </div>

            {/* Title */}
            <h2 className="font-retro text-2xl md:text-3xl text-lutie-yellow mb-1 leading-tight">
              LUTIE 2.0
            </h2>
            <p className="font-retro text-[10px] text-lutie-cyan/80 mb-6 tracking-wider">
              LAUNCHING NOV 2026
            </p>

            {/* Description */}
            <p className="font-body text-sm text-text-primary/90 leading-relaxed mb-4">
              Nutrition planning SaaS for professionals. Spanish-first, mobile-first PWA.
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
                  className="font-mono text-[10px] px-2 py-1 border-2 border-lutie-pink/50 text-lutie-pink/80 uppercase tracking-wider"
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
              <span className="font-retro text-[10px] text-lutie-green uppercase tracking-widest group-hover:tracking-[0.3em] transition-all duration-300">
                Visit lutie.app
              </span>
              <span
                className="text-lutie-green transition-transform duration-300"
                style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}
              >
                →
              </span>
            </a>
            <a
              href="https://www.instagram.com/lutie.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-retro text-[10px] text-lutie-pink/80 hover:text-lutie-pink uppercase tracking-widest transition-colors"
            >
              @lutie.app
            </a>
            </div>
          </div>

          {/* Demo video */}
          <div id="lutie-demo" className="border-2 border-lutie-cyan/40 bg-black">
            <video
              src={video}
              poster={poster}
              className="block w-full aspect-video"
              controls
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="h-1 bg-gradient-to-r from-lutie-pink via-lutie-yellow to-lutie-cyan" />
      </div>

      {/* Shadow block — 90s offset */}
      <div className="h-2 mx-2 bg-lutie-pink/10 -mt-0" />
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
        <div id="despacho-demo" className="order-last lg:order-first border border-despacho-brass/30 bg-black">
          <video
            src={video}
            poster={poster}
            className="block w-full aspect-video"
            controls
            playsInline
            preload="metadata"
          >
            <track kind="captions" src={captions} srcLang="es" label="Español" />
          </video>
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
            className="font-mono text-[11px] hover:text-lutie-yellow transition-colors link-reveal"
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
