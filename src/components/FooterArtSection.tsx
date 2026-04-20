import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; vx: number; vy: number };

export default function FooterArtSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let nodes: Node[] = [];

    const NODE_COUNT = 200;
    const MAX_DIST = 90;
    const SPEED = 0.3;

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

          const alpha = 0.12 * (1 - dist / MAX_DIST);
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
        ctx!.fillStyle = 'rgba(0, 242, 255, 0.35)';
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    initNodes();
    draw();

    const handleResize = () => {
      resize();
      initNodes();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#131313] overflow-hidden py-1">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full"
      />
      <div className="relative z-10 flex items-center justify-center py-12">
        <div
          className="h-32 rounded-xl flex items-center justify-center border border-[#3a494b]/10 backdrop-blur-md"
          style={{ background: 'rgba(28, 27, 27, 0.2)' }}
        >
          <h1 className="font-inter font-black text-6xl text-[#e5e2e1] tracking-tighter px-4">
            THE HARNESS
          </h1>
        </div>
      </div>
    </section>
  );
}
