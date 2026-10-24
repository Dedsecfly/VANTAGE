'use client';

import React, { useEffect, useState } from 'react';
import { MaskedHeadline, RevealOnScroll, StaggeredChildren, PressFeedback, HoverLift } from './MaskedHeadline';
import { MovingPicture, ParallaxScroll } from './ShutterImage';

interface PlatformStatus {
  label: string;
  value: number | string;
  status: 'success' | 'warning' | 'error';
  trend: 'up' | 'down' | 'flat';
}

interface PlatformMetric {
  label: string;
  value: number;
  unit: string;
  status: 'success' | 'warning' | 'error';
}

const StatusCard: React.FC<{ status: PlatformStatus; index: number }> = ({ status, index }) => (
  <RevealOnScroll threshold={0.1} rootMargin="0px 0px -30px 0px" style={{ '--stagger': `${index * 120}ms` }}>
    <HoverLift className="bg-card p-4 rounded-lg border border-border">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-muted">{status.label}</span>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            status.status === 'success' ? 'bg-success/20 text-success' :
            status.status === 'warning' ? 'bg-warning/20 text-warning' :
            'bg-error/20 text-error'
          }`}
        >
          {status.status}
        </span>
      </div>
      <div className="text-2xl font-bold text-ink mb-1">
        {typeof status.value === 'number' ? status.value.toFixed(1) : status.value}
      </div>
      <div className="flex items-center text-sm text-muted">
        <span
          className={`mr-1 ${
            status.trend === 'up' ? 'text-success' :
            status.trend === 'down' ? 'text-error' :
            'text-muted'
          }`}
        >
          {status.trend === 'up' ? '▲' : status.trend === 'down' ? '▼' : '—'}
        </span>
        {status.trend}
      </div>
    </HoverLift>
  </RevealOnScroll>
);

const MetricCard: React.FC<{ metric: PlatformMetric; index: number }> = ({ metric, index }) => (
  <RevealOnScroll threshold={0.1} rootMargin="0px 0px -30px 0px" style={{ '--stagger': `${index * 120}ms` }}>
    <HoverLift className="text-center p-4">
      <div className="text-sm text-muted mb-1">{metric.label}</div>
      <div className="text-2xl font-bold text-ink">
        {metric.value.toLocaleString()}{metric.unit}</div>
      <div className="text-xs text-muted mt-1">
        <span
          className={`inline-block mr-1 ${
            metric.status === 'success' ? 'text-success' :
            metric.status === 'warning' ? 'text-warning' :
            'text-error'
          }`}
        >
          {metric.status === 'success' ? '✓' :
          metric.status === 'warning' ? '⚠' :
          '✗'}
        </span>
      </div>
    </HoverLift>
  </RevealOnScroll>
);

const ExecutiveDashboard: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const platformStatus: PlatformStatus[] = [
    {
      label: 'Platform Readiness',
      value: 98.7,
      status: 'success',
      trend: 'up',
    },
    {
      label: 'Data Sync',
      value: 'In Progress',
      status: 'warning',
      trend: 'flat',
    },
    {
      label: 'Alerts',
      value: 3,
      status: 'error',
      trend: 'up',
    },
    {
      label: 'System Health',
      value: 99.9,
      status: 'success',
      trend: 'up',
    },
    {
      label: 'User Activity',
      value: 124,
      status: 'success',
      trend: 'up',
    },
  ];

  const platformMetrics: PlatformMetric[] = [
    {
      label: 'Total Users',
      value: 4287,
      unit: '',
      status: 'success',
    },
    {
      label: 'Active Sessions',
      value: 124,
      unit: '',
      status: 'success',
    },
    {
      label: 'Data Points Processed',
      value: 1200000,
      unit: 'k',
      status: 'success',
    },
    {
      label: 'API Calls',
      value: 8421,
      unit: '',
      status: 'success',
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto mt-16">
      <RevealOnScroll threshold={0.05} rootMargin="0px 0px -100px 0px">
        <div className="text-center mb-12" style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <MaskedHeadline
            text="VANTAGE: Institutional\nFinancial Intelligence Terminal"
            className="text-step-head font-[Stack_Sans_Headline] font-light text-ink mb-4 leading-tight"
            delay={200}
          />
          <p className="text-lg text-muted max-w-2xl mx-auto" style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms' }}>
            A comprehensive platform for financial analysis, modeling, and intelligence
          </p>
        </div>
      </RevealOnScroll>

      {/* Moving Picture / Atmosphere - per product-performs direction sheet (Sky and space set) */}
      <RevealOnScroll threshold={0.1} rootMargin="0px 0px -50px 0px" style={{ marginBottom: '3rem' }}>
        <ParallaxScroll speed={0.3} className="max-w-4xl mx-auto">
          <MovingPicture
            videoSrc="https://assets.mixkit.co/videos/preview/mixkit-stars-in-night-sky-1695-large.mp4"
            posterSrc="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&h=675&fit=crop"
            alt="Deep space atmosphere - institutional financial terminal backdrop"
            aspectRatio="16/9"
            className="rounded-xl border border-border/50"
          />
        </ParallaxScroll>
      </RevealOnScroll>

      <RevealOnScroll threshold={0.1} rootMargin="0px 0px -50px 0px">
        <div className="bg-surface p-6 rounded-lg border border-border mb-12">
          <h2 className="text-xl font-semibold text-ink mb-6">Platform Status</h2>
          <StaggeredChildren staggerMs={120} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformStatus.map((status, index) => (
              <StatusCard key={status.label} status={status} index={index} />
            ))}
          </StaggeredChildren>
        </div>
      </RevealOnScroll>

      <RevealOnScroll threshold={0.1} rootMargin="0px 0px -50px 0px">
        <div className="bg-surface p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-ink mb-4">Platform Metrics</h2>
          <StaggeredChildren staggerMs={120} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformMetrics.map((metric, index) => (
              <MetricCard key={metric.label} metric={metric} index={index} />
            ))}
          </StaggeredChildren>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default ExecutiveDashboard;