import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Car from './Car';
import Stats from './Stats';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ reducedMotion }) {
  const containerRef = useRef(null);
  
  const headline = "W E L C O M E   I T Z   F I Z Z";
  // Split headline into characters for animation
  const headlineChars = headline.split("").map((char, index) => (
    <span 
      key={index} 
      className={`headline-char inline-block opacity-0 translate-y-10 ${char === ' ' ? 'w-4' : ''}`}
    >
      {char}
    </span>
  ));

  useEffect(() => {
    if (reducedMotion) {
      gsap.set(".headline-char", { opacity: 1, y: 0 });
      gsap.set(".stat-item", { opacity: 1, y: 0 });
      document.querySelectorAll(".stat-number").forEach(el => {
        el.innerText = el.getAttribute("data-target");
      });
      return;
    }

    const ctx = gsap.context(() => {
      // --- 1. INTRO ANIMATION ---
      const tlIntro = gsap.timeline();

      // Animate headline letters
      tlIntro.to(".headline-char", {
        y: 0,
        opacity: 1,
        stagger: 0.04,
        ease: "power3.out",
        duration: 0.8
      });

      // Animate stats sliding up
      tlIntro.to(".stat-item", {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power3.out",
        duration: 0.8
      }, "-=0.4");

      // Count up numbers
      const statNumbers = gsap.utils.toArray(".stat-number");
      statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute("data-target"), 10);
        // Using a dummy object to tween the value
        const obj = { val: 0 };
        tlIntro.to(obj, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            el.innerText = Math.round(obj.val);
          }
        }, "<");
      });

      // --- 2. SCROLL ANIMATION ---
      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isMobile } = context.conditions;
        
        const tlScroll = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
          }
        });

        // Initially hide the stats when scrolling starts, to reveal them later
        tlScroll.to(".stat-item", { opacity: 0, y: 20, duration: 0.1 }, 0);

        // Fade out headline and move up
        tlScroll.to(".headline-container", {
          opacity: 0,
          y: -50,
          duration: 0.2
        }, 0);

        // Parallax background layers
        tlScroll.to(".parallax-bg-1", { x: isMobile ? "-20%" : "-10%" }, 0);
        tlScroll.to(".parallax-bg-2", { x: isMobile ? "-40%" : "-20%" }, 0);
        
        // Dashed road line moving opposite for speed effect
        tlScroll.to(".road-line", { x: "-50%" }, 0);

        // Car moves across screen
        const carMoveX = isMobile ? "70vw" : "80vw";
        tlScroll.fromTo(".car-wrapper", 
          { x: isMobile ? "-40vw" : "-50vw", rotate: 0, scale: 1 },
          { x: carMoveX, rotate: 2, scale: 1.1, ease: "none", duration: 1 },
          0
        );
        
        // Reveal stats one by one as the car passes (roughly at 25%, 50%, 75% of the timeline)
        const stats = gsap.utils.toArray(".stat-item");
        if (stats.length === 3) {
          tlScroll.to(stats[0], { opacity: 1, y: 0, duration: 0.1 }, 0.25);
          tlScroll.to(stats[1], { opacity: 1, y: 0, duration: 0.1 }, 0.5);
          tlScroll.to(stats[2], { opacity: 1, y: 0, duration: 0.1 }, 0.75);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center">
      
      {/* Background Parallax Layers */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="parallax-bg-2 absolute top-[20%] left-0 w-[200%] h-full flex gap-10 will-change-transform">
          {/* Simple abstract city silhouette or stars */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-32 h-64 bg-white/5 rounded-t-lg mt-auto blur-[2px]"></div>
          ))}
        </div>
        <div className="parallax-bg-1 absolute top-[40%] left-0 w-[200%] h-full flex gap-10 will-change-transform">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="w-24 h-48 bg-white/10 rounded-t-md mt-auto blur-[1px]"></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="z-20 flex flex-col items-center w-full mt-[-10vh]">
        <div className="headline-container text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-[0.5em] text-white">
            {headlineChars}
          </h1>
        </div>
        
        <Stats />
      </div>

      {/* Road & Car */}
      <div className="absolute bottom-20 w-full z-30">
        {/* Car */}
        <div className="car-wrapper absolute bottom-4 left-1/2 will-change-transform -translate-x-1/2">
          {/* A slight glow behind the car */}
          <div className="absolute inset-0 bg-accent/30 blur-2xl rounded-full scale-150"></div>
          <Car className="w-48 md:w-64 h-auto relative z-10" />
        </div>

        {/* Road Line */}
        <div className="relative w-full h-1 mt-16 overflow-hidden">
          <div className="road-line absolute top-0 left-0 w-[200%] h-full flex will-change-transform">
            {/* Dashed pattern */}
            <div className="w-full h-full" style={{
              backgroundImage: 'linear-gradient(to right, #00f0ff 50%, transparent 50%)',
              backgroundSize: '100px 100%'
            }}></div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
