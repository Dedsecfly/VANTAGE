'use client';

import React, { useEffect, useState } from 'react';

interface MaskedHeadlineProps {
  text: string;
  className?: string;
  delay?: number;
}

/**
 * Masked Headline Reveal - per product-performs direction sheet
 * Each line rises and its mask slides away; stagger lines by --stagger-line
 */
export const MaskedHeadline: React.FC<MaskedHeadlineProps> = ({
  text,
  className = '',
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    // Split text into lines (by \n or by reasonable width)
    const textLines = text.split('\n').filter(line => line.trim().length > 0);
    setLines(textLines);

    // Trigger animation after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  if (lines.length === 0) return null;

  return (
    <div className={`masked-headline ${className}`} style={{ '--delay': `${delay}ms` }}>
      {lines.map((line, index) => (
        <div
          key={index}
          className="masked-line"
          style={{
            '--stagger': `${index * 80}ms`,
            '--t-reveal': '600ms',
            '--ease-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="masked-line__inner">{line}</span>
        </div>
      ))}
      <style jsx>{`
        .masked-headline {
          display: flex;
          flex-direction: column;
          gap: 0.25em;
        }
        .masked-line {
          overflow: hidden;
          position: relative;
        }
        .masked-line__inner {
          display: inline-block;
          transform: translateY(100%);
          opacity: 0;
          animation: reveal var(--t-reveal) var(--ease-expo) forwards;
          animation-delay: calc(var(--delay) + var(--stagger));
        }
        @keyframes reveal {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * Reveal on Scroll - per product-performs direction sheet
 * Content fades and rises into view when scrolled into viewport
 */
interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, hasAnimated]);

  return (
    <div
      ref={elementRef}
      className={`reveal-on-scroll ${className} ${isVisible ? 'is-visible' : ''}`}
      style={{
        '--t-reveal': '600ms',
        '--ease-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
      <style jsx>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity var(--t-reveal) var(--ease-expo),
                      transform var(--t-reveal) var(--ease-expo);
        }
        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

/**
 * Staggered Children - per product-performs direction sheet
 * Children reveal with staggered delays
 */
interface StaggeredChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerMs?: number;
}

export const StaggeredChildren: React.FC<StaggeredChildrenProps> = ({
  children,
  className = '',
  staggerMs = 120
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`staggered-children ${className}`}>
      {childrenArray.map((child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<any>, {
          style: {
            ...(child.props.style || {}),
            '--stagger': `${index * staggerMs}ms`,
            opacity: 0,
            transform: 'translateY(16px)',
            transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: `calc(var(--stagger))`,
          },
          className: `${child.props.className || ''} staggered-child`.trim(),
        });
      })}
      <style jsx>{`
        .staggered-children .staggered-child.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

/**
 * Press Feedback - per product-performs direction sheet
 * Scale down on press/touch, spring back on release
 */
interface PressFeedbackProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const PressFeedback: React.FC<PressFeedbackProps> = ({
  children,
  className = '',
  onClick
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);
  const handleTouchStart = () => setIsPressed(true);
  const handleTouchEnd = () => setIsPressed(false);

  return (
    <div
      className={`press-feedback ${className}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
      style={{
        '--t-press': '100ms',
        '--ease-soft': 'cubic-bezier(0.2, 0, 0.38, 1.15)',
        transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform var(--t-press) var(--ease-soft)',
      }}
    >
      {children}
    </div>
  );
};

/**
 * Hover Lift - per product-performs direction sheet
 * Subtle lift on hover with shadow
 */
interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
}

export const HoverLift: React.FC<HoverLiftProps> = ({
  children,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`hover-lift ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--t-hover': '180ms',
        '--ease-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 12px 32px rgba(0, 0, 0, 0.4)' : 'none',
        transition: 'transform var(--t-hover) var(--ease-out), box-shadow var(--t-hover) var(--ease-out)',
      }}
    >
      {children}
    </div>
  );
};