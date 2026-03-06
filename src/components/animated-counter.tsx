
"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  target: number;
  duration?: number;
  className?: string;
  plus?: boolean;
};

export function AnimatedCounter({ target, duration = 2000, className, plus = false }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = target;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
      {plus && count === target ? '+' : ''}
    </span>
  );
}

