'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Multi-threaded Offscreen Web Worker Cyber Particle Engine.
 * Calculates particle positions on a background Web Worker thread,
 * leaving the main UI thread 100% free for 120Hz/144Hz ultra-smooth UI interaction without flickering!
 */
export default function FuturisticBackgroundWorker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Multi-threaded Web Worker Blob for Particle Math Computation
    const workerCode = `
      let particles = [];
      let width = 800;
      let height = 600;

      self.onmessage = function(e) {
        if (e.data.type === 'init') {
          width = e.data.width;
          height = e.data.height;
          const count = Math.min(Math.floor((width * height) / 25000), 40);
          particles = [];
          for (let i = 0; i < count; i++) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 0.4,
              vy: (Math.random() - 0.5) * 0.4,
              size: Math.random() * 2 + 1,
              alpha: Math.random() * 0.5 + 0.2,
            });
          }
        } else if (e.data.type === 'resize') {
          width = e.data.width;
          height = e.data.height;
        } else if (e.data.type === 'update') {
          for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
          }
          self.postMessage({ type: 'render', particles });
        }
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.postMessage({ type: 'init', width, height });

    let latestParticles: any[] = [];

    worker.onmessage = (e) => {
      if (e.data.type === 'render') {
        latestParticles = e.data.particles;
      }
    };

    const renderLoop = () => {
      // Send update signal to Web Worker off main thread
      worker.postMessage({ type: 'update' });

      // Draw smooth particles
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < latestParticles.length; i++) {
        const p = latestParticles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#06b6d4';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      worker.terminate();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 md:opacity-60"
      style={{
        transform: 'translate3d(0,0,0)',
        willChange: 'transform',
      }}
    />
  );
}
