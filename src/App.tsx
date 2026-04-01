import { useState } from 'react';

function App() {
  return (
    <div className="noise min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 gap-20 max-w-6xl mx-auto w-full">
        <Projects />
        <EngineeringProjects />
      </main>
      <Footer />
    </div>
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
            building tools for nutrition & civic transparency
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
      <LutieCard />
      <OfficeCard />
    </div>
  );
}

/* ─────────────────────────────────────────────
   LUTIE — 90s bold, chunky, saturated, playful
   ───────────────────────────────────────────── */

function LutieCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="https://lutie.app"
      target="_blank"
      rel="noopener noreferrer"
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

        <div className="relative z-10 p-8">
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
            LUTIE
          </h2>
          <p className="font-retro text-[10px] text-lutie-cyan/80 mb-6 tracking-wider">
            + LUTIEGYM
          </p>

          {/* Description */}
          <p className="font-body text-sm text-text-primary/90 leading-relaxed mb-6 max-w-sm">
            Evidence-based nutrition planning. Spanish-first, mobile-first, offline-capable PWA.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['Next.js', 'Supabase', 'PWA', 'Offline-first'].map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2 py-1 border-2 border-lutie-pink/50 text-lutie-pink/80 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <span className="font-retro text-[10px] text-lutie-green uppercase tracking-widest group-hover:tracking-[0.3em] transition-all duration-300">
              Visit lutie.app
            </span>
            <span
              className="text-lutie-green transition-transform duration-300"
              style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}
            >
              →
            </span>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="h-1 bg-gradient-to-r from-lutie-pink via-lutie-yellow to-lutie-cyan" />
      </div>

      {/* Shadow block — 90s offset */}
      <div className="h-2 mx-2 bg-lutie-pink/10 -mt-0" />
    </a>
  );
}

/* ─────────────────────────────────────────────────────
   OFFICE OF ACCOUNTABILITY — minimal, serious, cold
   ───────────────────────────────────────────────────── */

function OfficeCard() {
  const [isHovered, setIsHovered] = useState(false);

  const investigations = [
    { id: 'I', name: 'Caso Libra', detail: '$LIBRA memecoin — $251M+ losses' },
    { id: 'II', name: 'Caso Epstein', detail: '7,276 entities mapped' },
    { id: 'III', name: 'Finanzas Políticas', detail: '329 legislators cross-referenced' },
    { id: 'IV', name: 'Obras Públicas', detail: '87,725 contracts analyzed' },
    { id: 'V', name: 'Caso Dictadura', detail: '9,415 documented victims' },
    { id: 'VI', name: 'Nuclear Risk', detail: 'In development' },
  ];

  return (
    <a
      href="https://office-of-accountability.org/"
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden grid-bg border border-office-line rounded-sm bg-surface-raised/50 transition-all duration-500 hover:border-office-steel/40">
        {/* Subtle top accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-office-steel/30 to-transparent" />

        <div className="relative z-10 p-8">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] text-office-steel tracking-[0.2em] uppercase">
              Open Source
            </span>
            <span className="h-px flex-1 bg-office-steel/15" />
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-2 tracking-tight italic">
            Office of Accountability
          </h2>

          {/* Description */}
          <p className="font-body text-sm text-text-muted leading-relaxed mb-6 max-w-md">
            Civic knowledge platform. Transforms fragmented public records into navigable knowledge graphs. Cross-references entities across datasets to reveal hidden connections.
          </p>

          {/* Investigation list */}
          <div className="space-y-1.5 mb-8">
            {investigations.map((inv) => (
              <div
                key={inv.id}
                className="flex items-baseline gap-3 font-mono text-[11px] group/inv"
              >
                <span className="text-office-steel/50 w-6 text-right shrink-0">
                  {inv.id}
                </span>
                <span className="text-text-primary/70">
                  {inv.name}
                </span>
                <span className="h-px flex-1 bg-office-line/50 translate-y-[-2px]" />
                <span className="text-text-muted/50 text-[10px]">
                  {inv.detail}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-office-steel tracking-wider group-hover:tracking-widest transition-all duration-500">
              View on GitHub
            </span>
            <span
              className="text-office-steel/60 transition-all duration-500"
              style={{
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                opacity: isHovered ? 1 : 0.6,
              }}
            >
              →
            </span>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-office-steel/20 to-transparent" />
      </div>
    </a>
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
        </div>
      </div>
    </footer>
  );
}

export default App;
