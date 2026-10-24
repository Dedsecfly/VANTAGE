'use client';

/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef, useState } from 'react';

interface ShutterImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

/**
 * Image Shutter - per product-performs direction sheet
 * On load: clip-path closes shutter, then opens with image; mask slides off image
 * Hover: shutter sweeps across, image changes underneath
 */
export const ShutterImage: React.FC<ShutterImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '16/9'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) {
      setIsLoaded(true);
    } else if (img) {
      const handleLoad = () => setIsLoaded(true);
      img.addEventListener('load', handleLoad);
      return () => img.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`shutter-image ${className}`}
      style={{
        aspectRatio,
        '--t-open': '900ms',
        '--ease-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        '--ease-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
        '--t-hover': '180ms',
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shutter mask - closes then opens on load */}
      <div
        className="shutter-mask"
        style={{
          clipPath: isLoaded ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
          transition: `clip-path var(--t-open) var(--ease-expo) ${isLoaded ? '0ms' : '200ms'}`,
        } as React.CSSProperties}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="shutter-image__img"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 600ms var(--ease-out)',
          }}
        />
      </div>

      {/* Shutter sweep on hover */}
      <div
        className="shutter-sweep"
        style={{
          clipPath: isHovered ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
          transition: 'clip-path 400ms var(--ease-out)',
        }}
      />

      <style jsx>{`
        .shutter-image {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          background: var(--color-surface);
        }
        .shutter-mask {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .shutter-image__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .shutter-sweep {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(37, 111, 130, 0.15) 50%,
            transparent 100%
          );
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

/**
 * Moving Picture - per product-performs direction sheet
 * A muted video loop with poster frame, plays on hover/intersection
 */
interface MovingPictureProps {
  videoSrc: string;
  posterSrc: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export const MovingPicture: React.FC<MovingPictureProps> = ({
  videoSrc,
  posterSrc,
  alt,
  className = '',
  aspectRatio = '16/9'
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.25, rootMargin: '100px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const shouldPlay = isInView || isHovered;
    if (shouldPlay) {
      video.play().catch(() => {
        // Autoplay might be blocked, that's fine
      });
    } else {
      video.pause();
    }
  }, [isInView, isHovered]);

  return (
    <div
      ref={containerRef}
      className={`moving-picture ${className}`}
      style={{
        aspectRatio,
        '--t-ui': '200ms',
        '--ease-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        className="moving-picture__video"
        src={videoSrc}
        poster={posterSrc}
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          opacity: isInView || isHovered ? 1 : 0,
          transition: 'opacity var(--t-ui) var(--ease-out)',
        }}
      />
      <img
        src={posterSrc}
        alt={alt}
        className="moving-picture__poster"
        style={{
          opacity: (isInView || isHovered) ? 0 : 1,
          transition: 'opacity var(--t-ui) var(--ease-out)',
        }}
      />
      <style jsx>{`
        .moving-picture {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          background: var(--color-surface);
        }
        .moving-picture__video,
        .moving-picture__poster {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .moving-picture__poster {
          z-index: 1;
        }
        .moving-picture__video {
          z-index: 2;
        }
      `}</style>
    </div>
  );
};

/**
 * Parallax Scroll - per product-performs direction sheet
 * Image moves at different speed than scroll
 */
interface ParallaxScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 0.5 = half speed, 1 = same speed, 2 = double speed
}

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  className = '',
  speed = 0.5
}) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how far the element has scrolled through viewport
      const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      setOffset((clampedProgress - 0.5) * 100 * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={elementRef}
      className={`parallax-scroll ${className}`}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
