"use client";

import { useEffect, useRef, useState } from "react";
import type { AppId } from "./Desktop";

interface Line {
  html: string;
  cls: string;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const NEOFETCH = [
  "   ██████╗ ██╗   ██╗   <b>onkar</b>@<b>portfolio</b>",
  "  ██╔═══██╗██║   ██║   ─────────────────",
  "  ██║   ██║██║   ██║   <b>OS</b>: OnkarOS",
  "  ██║   ██║╚██╗ ██╔╝   <b>Role</b>: Frontend Engineer @ Infyni",
  "  ╚██████╔╝ ╚████╔╝    <b>Stack</b>: React · Next.js · TypeScript",
  "   ╚═════╝   ╚═══╝     <b>Uptime</b>: 3+ years in production",
  "                       <b>Shell</b>: react-server-components",
].join("\n");

const HELP = `<b>available commands</b>
  <span class="acc">whoami</span>       who is this guy
  <span class="acc">skills</span>       tech I work with
  <span class="acc">experience</span>   where I've worked
  <span class="acc">projects</span>     things I've shipped
  <span class="acc">contact</span>      how to reach me
  <span class="acc">open</span> &lt;app&gt;   open a window (about|projects|experience|skills|contact)
  <span class="acc">resume</span>       download my resume
  <span class="acc">neofetch</span>     system info
  <span class="acc">sudo hire-me</span> 🚀
  <span class="acc">clear</span>        clear the screen`;

const APPS: AppId[] = ["about", "projects", "experience", "skills", "contact", "terminal"];

export default function Terminal({
  onOpenApp,
  focusSignal,
}: {
  onOpenApp: (app: AppId) => void;
  focusSignal: number;
}) {
  const [lines, setLines] = useState<Line[]>([
    { html: "<b>OnkarOS terminal</b> — type <span class='acc'>help</span> to get started", cls: "dim" },
  ]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const hIdx = useRef(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusSignal > 0) inputRef.current?.focus({ preventScroll: true });
  }, [focusSignal]);

  useEffect(() => {
    const el = bodyRef.current?.parentElement;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const print = (html: string, cls = "") => setLines((ls) => [...ls, { html, cls }]);

  const run = (raw: string) => {
    const input = raw.trim();
    print(`<span class="p">onkar@portfolio ~ %</span> ${esc(input)}`);
    if (!input) return;
    const [cmd, ...args] = input.toLowerCase().split(/\s+/);

    switch (cmd) {
      case "help":
        print(HELP, "dim");
        return;
      case "whoami":
        print(
          "Onkar Vatsa — frontend engineer building fast, accessible, pixel-perfect\ninterfaces. Currently shipping AI-powered, real-time e-learning products\nat <b>Infyni</b>.",
          "dim"
        );
        return;
      case "skills":
        print(
          "frontend : React · Next.js · TypeScript · JavaScript\nai       : AI integration · LLM-powered features\nrealtime : WebSockets · Socket.IO · live experiences\nstyling  : Tailwind · SASS · Material UI\nbackend  : Node.js · Express · MongoDB\nquality  : performance optimization · Core Web Vitals · accessibility",
          "dim"
        );
        return;
      case "experience":
        print(
          "2024–now  SDE @ Infyni — e-learning platforms from scratch: AI-powered\n          features, Socket.IO real-time experiences, performance optimization\n2023–24   React.js Intern @ Infyni — ed-tech marketplace UI\n2023      Full-Stack Intern @ KEIC — multi-vendor food ordering app",
          "dim"
        );
        return;
      case "projects":
        print(
          `Infyni            <a href="https://www.infyni.com/" target="_blank" rel="noopener">infyni.com</a>\nHomework Program  personalized learning @ Infyni\nStoreStreak       grocery marketplace startup\nWinkEat           multi-vendor food ordering\nvStrive           ed-tech startup UI\nHACK KRMU 2.0     <a href="https://hackkrmu.github.io/" target="_blank" rel="noopener">hackkrmu.github.io</a>\n\ntip: <span class="acc">open projects</span> for screenshots`,
          "dim"
        );
        return;
      case "contact":
        print(
          `email     <a href="mailto:onkarvatsa@gmail.com">onkarvatsa@gmail.com</a>\ngithub    <a href="https://github.com/onkar-01" target="_blank" rel="noopener">github.com/onkar-01</a>\nlinkedin  <a href="https://www.linkedin.com/in/onkar-vatsa-2478b5212/" target="_blank" rel="noopener">linkedin.com/in/onkar-vatsa</a>`,
          "dim"
        );
        return;
      case "neofetch":
        print(NEOFETCH, "acc");
        return;
      case "resume":
        print("opening Resume.pdf …", "dim");
        window.open("/Resume.pdf", "_blank");
        return;
      case "clear":
        setLines([]);
        return;
      case "date":
        print(new Date().toString(), "dim");
        return;
      case "pwd":
        print("/Users/onkar/portfolio", "dim");
        return;
      case "ls":
        print("about.md  experience.log  projects/  skills.json  Resume.pdf", "dim");
        return;
      case "echo":
        print(esc(raw.trim().slice(5)) || " ", "dim");
        return;
      case "sudo":
        if (args.join(" ") === "hire-me") {
          print("[sudo] password for visitor: ********", "dim");
          setTimeout(() => print("permission granted ✔ — drafting offer letter…", "acc"), 350);
          setTimeout(() => {
            print("opening mail client…", "dim");
            window.location.href = "mailto:onkarvatsa@gmail.com?subject=Let's%20work%20together";
          }, 1100);
          return;
        }
        break;
      case "open": {
        const app = args[0] as AppId;
        if (APPS.includes(app)) {
          print(`launching ${app} …`, "dim");
          onOpenApp(app);
        } else {
          print(`open: unknown app "${esc(args[0] || "")}"`, "err");
        }
        return;
      }
    }
    print(`zsh: command not found: ${esc(cmd)} — try <span class="acc">help</span>`, "err");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (value.trim()) {
        history.current.unshift(value);
        hIdx.current = -1;
      }
      setValue("");
      run(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hIdx.current < history.current.length - 1) setValue(history.current[++hIdx.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setValue(hIdx.current > 0 ? history.current[--hIdx.current] : ((hIdx.current = -1), ""));
    }
  };

  return (
    <div
      ref={bodyRef}
      onClick={() => {
        if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
      }}
    >
      <div className="term-out">
        {lines.map((ln, i) => (
          <div key={i} className={`ln ${ln.cls}`} dangerouslySetInnerHTML={{ __html: ln.html }} />
        ))}
      </div>
      <div className="term-line">
        <span className="p">onkar@portfolio&nbsp;~&nbsp;%</span>
        <input
          ref={inputRef}
          className="term-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal input"
        />
      </div>
    </div>
  );
}
