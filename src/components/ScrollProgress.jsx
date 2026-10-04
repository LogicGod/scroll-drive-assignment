import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ScrollProgress() {
  const progressBarRef = useRef(null);

  useEffect(() => {
    // Simple scaleX animation tied to scroll progress
    gsap.to(progressBarRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      }
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 origin-left bg-accent/20">
      <div 
        ref={progressBarRef} 
        className="w-full h-full bg-accent origin-left scale-x-0 will-change-transform shadow-[0_0_10px_#00f0ff]"
      ></div>
    </div>
  );
}
