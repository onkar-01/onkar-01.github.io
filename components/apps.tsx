/* Content of each OnkarOS app window */
import { ArrowUpRight, BadgeIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from "./icons";

export function AboutApp() {
  return (
    <>
      <div className="about-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/about/51211_550x640.jpg" alt="Onkar Vatsa" />
        <div>
          <h2>
            Onkar <span className="grad">Vatsa</span>
          </h2>
          <div className="role">~ frontend engineer @ Infyni</div>
        </div>
      </div>
      <p>
        I build <strong>fast, accessible, pixel-perfect interfaces</strong> — and I care about the
        details: the milliseconds of load time, the easing curve of an animation, the way a UI feels
        under your fingers.
      </p>
      <p>
        At <strong>Infyni</strong> I&apos;ve built multiple e-learning platforms from scratch —
        marketplaces, live-class experiences and personalized homework programs — across{" "}
        <strong>Next.js, TypeScript and Node.js</strong>. I&apos;ve integrated{" "}
        <strong>AI-powered features</strong> into the products, built real-time experiences with{" "}
        <strong>WebSockets / Socket.IO</strong>, and led performance optimization across the
        platform. Before that, I helped two startups ship their first products. Certifications live
        on{" "}
        <a className="a-link" href="https://www.credly.com/users/onkar-vatsa/badges" target="_blank" rel="noopener noreferrer">
          Credly
        </a>
        .
      </p>
      <div className="about-stats">
        <div className="as"><b>3<i>+</i></b><span>years building</span></div>
        <div className="as"><b>6<i>+</i></b><span>products shipped</span></div>
        <div className="as"><b>2<i>×</i></b><span>startups 0→1</span></div>
      </div>
      <div className="btn-row">
        <a className="cta" href="mailto:onkarvatsa@gmail.com">Get in touch</a>
        <a className="cta ghost" href="/Resume.pdf" target="_blank" rel="noopener noreferrer">Resume ↓</a>
      </div>
    </>
  );
}

const EXPERIENCE = [
  {
    when: "FEB 2024 — PRESENT",
    title: "Software Development Engineer",
    org: "Infyni & Affiliates",
    current: true,
    points: [
      "Built multiple interactive e-learning platforms from scratch, improving outcomes for thousands of students.",
      "Integrated AI-powered features into the learning products — from intelligent assistance to AI-driven personalization.",
      "Built real-time experiences (live classes, chat, presence) with WebSockets and Socket.IO.",
      "Led performance optimization across the platform — faster loads, smoother interactions, better Core Web Vitals.",
      "Own frontend architecture across marketplace, live-class and homework-program products.",
    ],
    tags: ["Next.js", "TypeScript", "AI Integration", "Socket.IO", "Node.js", "Performance"],
  },
  {
    when: "2023 — 2024 · 3 MO ON-SITE",
    title: "React.js Intern",
    org: "Infyni",
    current: false,
    points: [
      "Collaborated on an ed-tech marketplace built from scratch, supporting live and self-paced courses.",
      "Shipped production UI with Next.js, TypeScript, SASS, Material UI and Tailwind.",
    ],
    tags: ["Next.js", "TypeScript", "SASS", "Material UI"],
  },
  {
    when: "2023 · 6 MO REMOTE",
    title: "Full-Stack Intern",
    org: "KEIC — K.R. Mangalam",
    current: false,
    points: [
      "Built the backend of a multi-vendor food ordering app with Node.js and Express.",
      "Developed the customer-facing frontend in React.",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB"],
  },
];

export function ExperienceApp() {
  return (
    <>
      <h2>
        Where I&apos;ve <span className="grad">worked</span>
      </h2>
      <p style={{ marginBottom: 24 }}>
        Shipping high-performance applications in fast-moving product teams.
      </p>
      {EXPERIENCE.map((xp) => (
        <div key={xp.title} className={`xp-item ${xp.current ? "current" : ""}`}>
          <div className="when">{xp.when}</div>
          <h3>{xp.title}</h3>
          <div className="org">{xp.org}</div>
          <ul>
            {xp.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
          <div className="chips">
            {xp.tags.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

const PROJECTS = [
  {
    name: "Infyni",
    shot: "/img/portfolio/Infyni.png",
    desc: "Ed-tech marketplace with live and self-paced courses for students and teachers.",
    tags: ["Next.js", "TypeScript", "MUI"],
    href: "https://www.infyni.com/",
  },
  {
    name: "Homework Program",
    shot: "/img/portfolio/HomeworkProgram.png",
    desc: "Personalized homework help programs on the Infyni platform.",
    tags: ["Next.js", "React", "Tailwind"],
  },
  {
    name: "StoreStreak",
    shot: "/img/portfolio/StoreStreak.png",
    desc: "Kolkata-based grocery marketplace, built for speed on low-end devices.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    name: "WinkEat",
    shot: "/img/portfolio/winkeat.png",
    desc: "Multi-vendor food ordering for food courts — menu to pickup in real time.",
    tags: ["React", "Express", "Node.js"],
  },
  {
    name: "vStrive",
    shot: "/img/portfolio/vstrive.png",
    desc: "Ed-tech startup — designed and built conversion-focused layouts.",
    tags: ["React", "UI Design"],
  },
  {
    name: "HACK KRMU 2.0",
    shot: "/img/portfolio/Hackkrmu.png",
    desc: "Official site for a 3-day hackathon — landing, registration, teams.",
    tags: ["HTML/CSS", "JavaScript"],
    href: "https://hackkrmu.github.io/",
  },
];

export function ProjectsApp() {
  return (
    <>
      <h2>
        Selected <span className="grad">work</span>
      </h2>
      <p style={{ marginBottom: 22 }}>
        Production platforms, startup products and community projects.
      </p>
      <div className="proj-grid">
        {PROJECTS.map((p) => (
          <article key={p.name} className="proj">
            <div className="shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.shot} alt={p.name} loading="lazy" />
            </div>
            <div className="pb">
              <h3>
                {p.name} <ArrowUpRight />
              </h3>
              <p>{p.desc}</p>
              <div className="chips">
                {p.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
            {p.href && (
              <a className="cover" href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${p.name}`} />
            )}
          </article>
        ))}
      </div>
    </>
  );
}

const SKILLS: [string, string[]][] = [
  ["// frontend", ["React", "Next.js", "TypeScript", "JavaScript ES2023", "HTML5", "CSS3"]],
  ["// ai & realtime", ["AI integration", "LLM-powered features", "WebSockets", "Socket.IO", "Live experiences"]],
  ["// styling & ui", ["Tailwind CSS", "SASS", "Material UI", "Animations", "Responsive design"]],
  ["// backend & data", ["Node.js", "Express", "MongoDB", "REST APIs"]],
  ["// practices", ["Performance optimization", "Core Web Vitals", "Accessibility", "Git & GitHub", "Code review", "Agile"]],
];

export function SkillsApp() {
  return (
    <>
      <h2>
        The <span className="grad">toolbox</span>
      </h2>
      <p style={{ marginBottom: 20 }}>What I reach for when building for the web.</p>
      {SKILLS.map(([group, items]) => (
        <div key={group} className="skill-block">
          <h3>{group}</h3>
          <div className="chips">
            {items.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export function ContactApp() {
  return (
    <div className="contact-body">
      <div style={{ fontSize: 38 }}>👋</div>
      <div className="big">
        Let&apos;s build something
        <br />
        people <span className="grad">remember</span>.
      </div>
      <p>
        Open to product work, partnerships and interesting frontend problems. My inbox is always
        open.
      </p>
      <div className="btn-row" style={{ justifyContent: "center" }}>
        <a className="cta" href="mailto:onkarvatsa@gmail.com">onkarvatsa@gmail.com</a>
      </div>
      <div className="contact-socials">
        <a href="https://github.com/onkar-01" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon /></a>
        <a href="https://www.linkedin.com/in/onkar-vatsa-2478b5212/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
        <a href="https://www.instagram.com/om_._.vatsa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
        <a href="https://www.credly.com/users/onkar-vatsa/badges" target="_blank" rel="noopener noreferrer" aria-label="Credly badges"><BadgeIcon /></a>
      </div>
    </div>
  );
}
