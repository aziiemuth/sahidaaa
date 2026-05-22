"use client";

import { useEffect, useRef } from "react";

const COLORS = [
  "rgba(224,90,158,",
  "rgba(240,140,200,",
  "rgba(200,100,180,",
  "rgba(216,120,190,",
  "rgba(247,184,239,",
];

interface Particle {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  a: number;
  c: string;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    function makeParticle(): Particle {
      return {
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        r: 0.3 + Math.random() * 1.6,
        dx: (Math.random() - 0.5) * 0.28,
        dy: -0.1 - Math.random() * 0.32,
        a: Math.random() * 0.4 + 0.08,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    }

    const particles: Particle[] = Array.from({ length: 70 }, makeParticle);

    let animId: number;
    function loop() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach((p, i) => {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.c + p.a + ")";
        ctx!.fill();
        p.x += p.dx;
        p.y += p.dy;
        p.a -= 0.00075;
        if (p.a <= 0 || p.y < -5) particles[i] = makeParticle();
      });
      animId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}
    />
  );
}
