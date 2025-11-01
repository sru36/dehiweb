import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TextSplitter from '@/lib/TextSplitter';

interface AnimatedTextProps {
  text: string;
  textClass?: string;
  fromVars?: Record<string, any>;
  toVars?: Record<string, any>;
  splittingBy?: 'words' | 'chars';
}

export default function AnimatedText({
  text,
  textClass = '',
  fromVars = {},
  toVars = {},
  splittingBy = 'words'
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const textTarget = useRef<HTMLParagraphElement>(null);
  const revealTextRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!textTarget.current) return;

    // Ensure text is visible initially
    if (textTarget.current) {
      textTarget.current.style.opacity = '1';
    }

    const streaming = (e: HTMLParagraphElement) => {
      try {
        const splitter = new TextSplitter(e, {
          resizeCallback: () => streaming(e),
          splitTypeTypes: splittingBy
        });

        let animateTarget = splittingBy === 'words' ? splitter.getWords() : splitter.getChars();

        if (animateTarget.length === 0) {
          // If no elements to animate, just show text
          e.style.opacity = '1';
          return;
        }

        const timeline = gsap.fromTo(
          animateTarget,
          {
            opacity: 0,
            ...fromVars
          },
          {
            opacity: 1,
            stagger: 0.05,
            ...toVars
          }
        );

        revealTextRef.current = timeline;
      } catch (error) {
        // Fallback: if animation fails, ensure text is visible
        console.error('Text animation error:', error);
        e.style.opacity = '1';
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if (textTarget.current) {
        streaming(textTarget.current);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      revealTextRef.current?.kill();
    };
  }, [text, splittingBy, fromVars, toVars]);

  return (
    <div ref={textRef} className="w-full">
      <p className={`transform-gpu ${textClass}`} ref={textTarget}>
        {text}
      </p>
    </div>
  );
}

