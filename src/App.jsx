import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import ScrollProgress from './components/ScrollProgress';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', onChange);
    
    // Only initialize smooth scrolling if reduced motion is not preferred
    let lenis;
    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      mediaQuery.removeEventListener('change', onChange);
      if (lenis) {
        lenis.destroy();
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-accent selection:text-black">
      {!prefersReducedMotion && <ScrollProgress />}
      <Hero reducedMotion={prefersReducedMotion} />
      {/* Extra section for scrolling */}
      <section className="h-screen flex items-center justify-center border-t border-white/10 relative z-10 bg-[#0a0a0a]">
        <h2 className="text-4xl text-white/50">End of Journey</h2>
      </section>
    </div>
  );
}

export default App;
