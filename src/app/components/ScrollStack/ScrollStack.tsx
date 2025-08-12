import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollStackItem {
  id: string;
  content: ReactNode;
  backgroundColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface ScrollStackProps {
  items: ScrollStackItem[];
  className?: string;
  stackHeight?: string;
}

const ScrollStack = ({ items, className = "", stackHeight = "100vh" }: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const stackItems = itemsRef.current.filter(Boolean);

    // Clear previous animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    stackItems.forEach((item, index) => {
      if (!item) return;

      // Set initial state
      gsap.set(item, {
        zIndex: items.length + index,
        y: index * 50,
      });

      // Create stacking animation
      if (index < stackItems.length - 1) {
        gsap.to(item, {
          y: -100,
          scale: 0.9,
          rotationY: 15,
          // filter: "brightness(0.7)",
          scrollTrigger: {
            trigger: item,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
            pinSpacing: false,
          }
        });
      }

      // Add parallax effect to content
      const content = item.querySelector('.stack-content');
      if (content) {
        gsap.to(content, {
          y: -50,
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [items]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={el => {itemsRef.current[index] = el}}
          className={`relative w-full overflow-hidden ${item.className || ''}`}
          style={{ 
            height: stackHeight,
            backgroundColor: item.backgroundColor,
            ...item.style
          }}
        >
          <div className="stack-content h-full w-full">
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScrollStack;