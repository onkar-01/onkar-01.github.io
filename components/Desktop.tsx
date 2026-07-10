"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Window from "./Window";
import Terminal from "./Terminal";
import { AboutApp, ContactApp, ExperienceApp, ProjectsApp, SkillsApp } from "./apps";
import { GitHubIcon, LinkedInIcon } from "./icons";

export type AppId = "about" | "experience" | "projects" | "skills" | "contact" | "terminal";

interface WinState {
  open: boolean;
  running: boolean;
  z: number;
}

const APP_META: Record<AppId, { label: string; dock: string; tip: string; width: number }> = {
  about: { label: "about.md — ~/onkar", dock: "👤", tip: "About", width: 560 },
  experience: { label: "experience.log — 3 entries", dock: "💼", tip: "Experience", width: 640 },
  projects: { label: "~/projects — 6 items", dock: "🗂️", tip: "Projects", width: 840 },
  skills: { label: "skills.json — parsed OK", dock: "🧰", tip: "Skills", width: 520 },
  terminal: { label: "onkar@portfolio: ~ — zsh", dock: "🖥️", tip: "Terminal", width: 620 },
  contact: { label: "contact — say hello", dock: "✉️", tip: "Contact", width: 460 },
};
const APP_IDS = Object.keys(APP_META) as AppId[];

const initialWins = () =>
  Object.fromEntries(APP_IDS.map((id) => [id, { open: false, running: false, z: 10 }])) as Record<
    AppId,
    WinState
  >;

export default function Desktop() {
  const [wins, setWins] = useState<Record<AppId, WinState>>(initialWins);
  const [focusedId, setFocusedId] = useState<AppId | null>(null);
  const [booted, setBooted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [toast, setToast] = useState(false);
  const [clock, setClock] = useState("");
  const [termFocus, setTermFocus] = useState(0);
  const zRef = useRef(20);

  const openWin = useCallback((id: AppId) => {
    setWins((w) => ({ ...w, [id]: { open: true, running: true, z: ++zRef.current } }));
    setFocusedId(id);
    if (id === "terminal") setTermFocus((n) => n + 1);
  }, []);

  const closeWin = useCallback((id: AppId, keepRunning = false) => {
    setWins((w) => ({ ...w, [id]: { ...w[id], open: false, running: keepRunning } }));
    setFocusedId((f) => (f === id ? null : f));
  }, []);

  const focusWin = useCallback((id: AppId) => {
    setFocusedId(id);
    setWins((w) => (w[id].z === zRef.current ? w : { ...w, [id]: { ...w[id], z: ++zRef.current } }));
  }, []);

  /* boot sequence */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stepMs = (reduce ? 50 : 1300) / 7;
    const tick = setInterval(() => {
      setBootProgress((p) => {
        const next = Math.min(p + 14 + Math.random() * 22, 100);
        if (next >= 100) {
          clearInterval(tick);
          setTimeout(() => {
            setBooted(true);
            setTimeout(() => {
              openWin("about");
              setToast(true);
              setTimeout(() => setToast(false), 7000);
            }, reduce ? 0 : 450);
          }, 180);
        }
        return next;
      });
    }, stepMs);
    return () => clearInterval(tick);
  }, [openWin]);

  /* menu bar clock */
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      setClock(
        d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) +
          "  " +
          d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
      );
    };
    fmt();
    const t = setInterval(fmt, 15000);
    return () => clearInterval(t);
  }, []);

  /* Esc closes the focused window */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && focusedId && wins[focusedId].open) closeWin(focusedId);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [focusedId, wins, closeWin]);

  /* dock magnification */
  const dockRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;
    if (!matchMedia("(pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = [...dock.querySelectorAll<HTMLElement>(".dock-item")];
    const move = (e: PointerEvent) => {
      for (const it of items) {
        const r = it.getBoundingClientRect();
        const d = Math.abs(e.clientX - (r.left + r.width / 2));
        const s = 1 + 0.38 * Math.exp(-((d / 90) ** 2));
        it.style.transform = `scale(${s.toFixed(3)}) translateY(${(-(s - 1) * 10).toFixed(1)}px)`;
      }
    };
    const leave = () => items.forEach((it) => (it.style.transform = ""));
    dock.addEventListener("pointermove", move);
    dock.addEventListener("pointerleave", leave);
    return () => {
      dock.removeEventListener("pointermove", move);
      dock.removeEventListener("pointerleave", leave);
    };
  }, []);

  const windowContent: Record<AppId, React.ReactNode> = {
    about: <AboutApp />,
    experience: <ExperienceApp />,
    projects: <ProjectsApp />,
    skills: <SkillsApp />,
    contact: <ContactApp />,
    terminal: <Terminal onOpenApp={openWin} focusSignal={termFocus} />,
  };

  return (
    <>
      {/* BOOT */}
      <div className={`boot ${booted ? "done" : ""}`} aria-hidden="true">
        <div className="mark">OV</div>
        <div className="os">
          <b>OnkarOS</b> 
        </div>
        <div className="bar">
          <i style={{ width: `${bootProgress}%` }} />
        </div>
      </div>

      {/* WALLPAPER */}
      <div className="wallpaper" aria-hidden="true">
        <div className="orb o1" />
        <div className="orb o2" />
        <div className="hero-type">
          <div className="kicker">Frontend Engineer · React · Next.js · TypeScript · AI</div>
          <h1>
            ONKAR
            <br />
            <span className="fill">VATSA</span>
          </h1>
          <div className="sub">
            open an app from the dock — or try the <b>terminal</b>
          </div>
        </div>
      </div>

      {/* MENU BAR */}
      <header className="menubar">
        <div className="brand">
          <span className="gem" /> OnkarOS
        </div>
        <button className="mb-item" onClick={() => openWin("about")}>About</button>
        <button className="mb-item hide-m" onClick={() => openWin("experience")}>Experience</button>
        <button className="mb-item hide-m" onClick={() => openWin("projects")}>Projects</button>
        <button className="mb-item hide-m" onClick={() => openWin("contact")}>Contact</button>
        <div className="spacer" />
        <div className="status">
          <span className="live">
            <span className="dot" />
            open to work
          </span>
          <a href="https://github.com/onkar-01" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <span suppressHydrationWarning>{clock}</span>
        </div>
      </header>

      {/* DESKTOP SHORTCUTS */}
      <div className="desktop-icons">
        <button className="dicon" onClick={() => openWin("projects")}>
          <span className="glyph">🗂️</span>
          <span>Projects</span>
        </button>
        <a className="dicon" href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
          <span className="glyph">📄</span>
          <span>Resume.pdf</span>
        </a>
        <button className="dicon" onClick={() => openWin("terminal")}>
          <span className="glyph">🖥️</span>
          <span>Terminal</span>
        </button>
      </div>

      {/* WINDOWS */}
      {APP_IDS.map((id) => (
        <Window
          key={id}
          id={id}
          label={APP_META[id].label}
          width={APP_META[id].width}
          open={wins[id].open}
          z={wins[id].z}
          focused={focusedId === id}
          className={id === "terminal" ? "terminal" : ""}
          onClose={() => closeWin(id)}
          onMinimize={() => closeWin(id, true)}
          onFocus={() => focusWin(id)}
        >
          {windowContent[id]}
        </Window>
      ))}

      {/* DOCK */}
      <nav className="dock-wrap" aria-label="Dock">
        <div className="dock" ref={dockRef}>
          {APP_IDS.map((id) => (
            <button
              key={id}
              className={`dock-item ${wins[id].running ? "running" : ""}`}
              onClick={() => openWin(id)}
              aria-label={APP_META[id].tip}
            >
              {APP_META[id].dock}
              <span className="tip">{APP_META[id].tip}</span>
              <span className="run" />
            </button>
          ))}
          <span className="sep" />
          <a className="dock-item" href="/Resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume">
            📄<span className="tip">Resume.pdf</span>
          </a>
          <a className="dock-item" href="https://github.com/onkar-01" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHubIcon />
            <span className="tip">GitHub</span>
          </a>
          <a className="dock-item" href="https://www.linkedin.com/in/onkar-vatsa-2478b5212/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
            <span className="tip">LinkedIn</span>
          </a>
        </div>
      </nav>

      {/* TOAST */}
      <div className={`toast ${toast ? "show" : ""}`} role="status">
        <span className="ic">💡</span>
        <div>
          <b>Welcome to OnkarOS</b>Open the Terminal and type <code>help</code> — or{" "}
          <code>sudo hire-me</code>.
        </div>
      </div>
    </>
  );
}
