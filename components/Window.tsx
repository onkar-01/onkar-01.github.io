"use client";

import { useEffect, useRef, useState } from "react";

const MENUBAR_H = 42;
const DOCK_H = 78;
let cascade = 0;

const isMobile = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 720px)").matches;

export interface WindowProps {
  id: string;
  label: string;
  width: number;
  open: boolean;
  z: number;
  focused: boolean;
  className?: string;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export default function Window({
  id,
  label,
  width,
  open,
  z,
  focused,
  className = "",
  onClose,
  onMinimize,
  onFocus,
  children,
}: WindowProps) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [maximized, setMaximized] = useState(false);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  /* place the window (centered cascade) the first time it opens */
  useEffect(() => {
    if (!open || pos || isMobile() || !ref.current) return;
    const el = ref.current;
    const w = el.offsetWidth || width;
    const h = el.offsetHeight || 400;
    const availH = window.innerHeight - MENUBAR_H - DOCK_H;
    const x = Math.max(12, (window.innerWidth - w) / 2 + ((cascade % 5) - 2) * 36);
    const y = Math.max(MENUBAR_H + 12, MENUBAR_H + (availH - h) / 2 + ((cascade % 4) - 1.5) * 30);
    cascade++;
    setPos({ x, y });
  }, [open, pos, width]);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button") || isMobile() || maximized) return;
    const r = ref.current!.getBoundingClientRect();
    drag.current = { sx: e.clientX, sy: e.clientY, ox: r.left, oy: r.top };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !ref.current) return;
    const { sx, sy, ox, oy } = drag.current;
    const el = ref.current;
    const x = Math.min(Math.max(ox + e.clientX - sx, -el.offsetWidth + 80), window.innerWidth - 80);
    const y = Math.min(Math.max(oy + e.clientY - sy, MENUBAR_H), window.innerHeight - 60);
    setPos({ x, y });
  };
  const onPointerUp = () => (drag.current = null);

  const style: React.CSSProperties = maximized
    ? {
        "--w": `${width}px`,
        left: 12,
        top: MENUBAR_H + 12,
        width: "calc(100vw - 24px)",
        height: `calc(100vh - ${MENUBAR_H + 12}px - ${DOCK_H + 14}px)`,
        zIndex: z,
        visibility: open ? "visible" : "hidden",
      } as React.CSSProperties
    : ({
        "--w": `${width}px`,
        left: pos?.x,
        top: pos?.y,
        zIndex: z,
        visibility: open ? "visible" : "hidden",
      } as React.CSSProperties);

  return (
    <section
      ref={ref}
      id={`win-${id}`}
      role="dialog"
      aria-label={label}
      className={`window ${open ? "show" : ""} ${focused ? "focused" : ""} ${className}`}
      style={style}
      onPointerDown={onFocus}
    >
      <div
        className="titlebar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="lights">
          <button className="close" aria-label="Close" onClick={onClose} />
          <button className="min" aria-label="Minimize" onClick={onMinimize} />
          <button
            className="zoom"
            aria-label="Zoom"
            onClick={() => !isMobile() && setMaximized((m) => !m)}
          />
        </div>
        <div className="t-label">{label}</div>
      </div>
      <div className="win-body">{children}</div>
    </section>
  );
}
