import React, { useEffect, useRef } from 'react';

const Particles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = Array.from({ length: 20 }, (_, i) => {
      const el = document.createElement('div');
      el.className = 'particle';
      el.style.left = `${Math.random() * 100}%`;
      el.style.width = `${Math.random() * 3 + 1}px`;
      el.style.height = el.style.width;
      el.style.animationDuration = `${Math.random() * 15 + 10}s`;
      el.style.animationDelay = `${Math.random() * 10}s`;
      el.style.opacity = (Math.random() * 0.4 + 0.1).toString();
      container.appendChild(el);
      return el;
    });

    return () => particles.forEach(p => p.remove());
  }, []);

  return <div className="particles" ref={containerRef} />;
};

export default Particles;
