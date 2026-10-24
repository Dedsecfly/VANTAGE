'use client';

import React, { useEffect, useState } from 'react';
import { PressFeedback, HoverLift } from './MaskedHeadline';

interface TopHeaderProps {
  isSidebarCollapsed: boolean;
}

const TopHeader: React.FC<TopHeaderProps> = ({ isSidebarCollapsed }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
      setIsScrolled(scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 bg-surface/95 backdrop-blur-sm border-b border-border z-10 flex items-center justify-between px-4 transition-all duration-200"
      style={{
        backgroundColor: isScrolled ? 'rgba(27, 14, 23, 0.98)' : 'rgba(27, 14, 23, 0.95)',
        boxShadow: isScrolled ? '0 2px 16px rgba(0, 0, 0, 0.3)' : 'none',
      }}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5"
        style={{
          width: `${scrollProgress * 100}%`,
          backgroundColor: 'var(--color-accent)',
          transition: 'width 100ms linear',
          transformOrigin: 'left center',
        }}
      />

      <div className="flex items-center space-x-4">
        <PressFeedback
          onClick={() => alert('Global search functionality will be implemented')}
          className="p-1 rounded-md"
        >
          <HoverLift className="p-2 rounded-md">
            <span className="text-ink hover:text-accent transition-colors" style={{ fontSize: '1.25rem' }}>🔍</span>
          </HoverLift>
        </PressFeedback>
        <div className="text-lg font-medium text-ink" style={{ opacity: isSidebarCollapsed ? 0 : 1, width: isSidebarCollapsed ? '0' : 'auto', overflow: 'hidden', transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), width 200ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
          {isSidebarCollapsed ? 'Dashboard' : 'VANTAGE Executive Dashboard'}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          <span className="text-sm text-muted">Connected</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-warning"></span>
          <span className="text-sm text-muted">Data Syncing</span>
        </div>
        <PressFeedback
          onClick={() => alert('Settings menu will be implemented')}
          className="p-1 rounded-md"
        >
          <HoverLift className="p-2 rounded-md">
            <span className="text-ink hover:text-accent transition-colors" style={{ fontSize: '1.25rem' }}>⚙️</span>
          </HoverLift>
        </PressFeedback>
      </div>
    </header>
  );
};

export default TopHeader;