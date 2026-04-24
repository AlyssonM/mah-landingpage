import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; vx: number; vy: number };

export default function CTASection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let nodes: Node[] = [];

    const NODE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 200;
    const MAX_DIST = typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 150;
    const SPEED = 0.23;

    function resize() {
      canvas!.width = canvas!.offsetWidth * window.devicePixelRatio;
      canvas!.height = canvas!.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function initNodes() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
      }));
    }

    function draw() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dxIJ = nodes[i].x - nodes[j].x;
          const dyIJ = nodes[i].y - nodes[j].y;
          const distIJ = Math.sqrt(dxIJ * dxIJ + dyIJ * dyIJ);
          if (distIJ > MAX_DIST) continue;

          for (let k = j + 1; k < nodes.length; k++) {
            const dxIK = nodes[i].x - nodes[k].x;
            const dyIK = nodes[i].y - nodes[k].y;
            const distIK = Math.sqrt(dxIK * dxIK + dyIK * dyIK);
            if (distIK > MAX_DIST) continue;

            const dxJK = nodes[j].x - nodes[k].x;
            const dyJK = nodes[j].y - nodes[k].y;
            const distJK = Math.sqrt(dxJK * dxJK + dyJK * dyJK);
            if (distJK > MAX_DIST) continue;

            const avgDist = (distIJ + distIK + distJK) / 3;
            const alpha = 0.008 * (1 - avgDist / MAX_DIST);
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.lineTo(nodes[k].x, nodes[k].y);
            ctx!.closePath();
            ctx!.fillStyle = `rgba(0, 242, 255, ${alpha})`;
            ctx!.fill();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > MAX_DIST) continue;

          const alpha = 0.06 * (1 - dist / MAX_DIST);
          ctx!.beginPath();
          ctx!.moveTo(nodes[i].x, nodes[i].y);
          ctx!.lineTo(nodes[j].x, nodes[j].y);
          ctx!.strokeStyle = `rgba(0, 242, 255, ${alpha})`;
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
        }
      }

      for (const node of nodes) {
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(0, 242, 255, 0.2)';
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    initNodes();
    draw();

    const handleResize = () => { resize(); initNodes(); };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-[100px]" style={{ minHeight: 'clamp(320px, 60vh, 480px)' }}>
      {/* Full-width mesh canvas */}
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 z-0 w-full h-full" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Glass headline card */}
        <div
          className="rounded-xl flex items-center justify-center border border-[#3a494b]/10 backdrop-blur-md px-6 py-6 md:px-12 md:py-8"
          style={{ background: 'rgba(28, 27, 27, 0.21)' }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#e5e2e1] leading-[1.1] tracking-tight font-inter text-center">
            Route to the right agent.<br />Load only what it needs.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-[#2792ff]">Ship.</span>
          </h2>
        </div>

        {/* Subheadline */}
        <p className="text-[#e5e2e1]/70 text-lg md:text-xl max-w-[540px] font-inter text-center">
          Expertise routing, bounded context, and headless execution — out of the box. CLI-first, TUI-optional.
        </p>

        {/* Buttons + Trust signals */}
        <div className="flex flex-col items-center gap-6">
          {/* Primary CTA */}
          <a
            className="px-12 py-5 rounded-xl font-bold text-white text-lg tracking-tight hover:brightness-110 active:scale-[0.98] transition-all"
            href="#"
            style={{
              background: 'linear-gradient(135deg, #00f2ff 0%, #2792ff 100%)',
              boxShadow: '0 12px 24px rgba(0,242,255,0.15)',
            }}
          >
            mah init --yes
          </a>

          {/* Secondary Link */}
          <a
            className="text-[#00f2ff] font-space-grotesk text-base font-medium tracking-wide hover:text-[#00dbe7] transition-colors py-2 flex items-center gap-2"
            href="#"
          >
            Explore the repository
            <svg className="text-[18px] w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Trust Signals Row */}
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#201f1f] rounded-full">
              <svg className="text-[#00f2ff] text-[14px] w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-space-grotesk text-xs uppercase tracking-widest text-[#e5e2e1]/80">MIT License</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#201f1f] rounded-full">
              <svg className="text-[#00f2ff] text-[14px] w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-space-grotesk text-xs uppercase tracking-widest text-[#e5e2e1]/80">Runtime-agnostic</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#201f1f] rounded-full">
              <svg className="text-[#00f2ff] text-[14px] w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="font-space-grotesk text-xs uppercase tracking-widest text-[#e5e2e1]/80">Evidence-based</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f2ff]/30 to-transparent"></div>
    </section>
  );
}