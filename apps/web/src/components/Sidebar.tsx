'use client';

import React, { useState } from 'react';
import { PressFeedback, HoverLift } from './MaskedHeadline';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const sections = [
  { id: 'executive-dashboard', label: 'Executive Dashboard', icon: '📊' },
  { id: 'company-intelligence', label: 'Company Intelligence', icon: '🏢' },
  { id: 'market-intelligence', label: 'Market Intelligence', icon: '📈' },
  { id: 'financial-modeling', label: 'Financial Modeling', icon: '📊' },
  { id: 'investment-banking', label: 'Investment Banking', icon: '💰' },
  { id: 'asset-management', label: 'Asset Management', icon: '📈' },
  { id: 'corporate-finance', label: 'Corporate Finance', icon: '📊' },
  { id: 'intelligence', label: 'Intelligence', icon: '🤖' },
  { id: 'workspace', label: 'Workspace', icon: '📁' },
];

const NavItem: React.FC<{ section: typeof sections[0]; isActive: boolean; onClick: () => void; isCollapsed: boolean }> = ({
  section,
  isActive,
  onClick,
  isCollapsed
}) => (
  <PressFeedback onClick={onClick} className="w-full">
    <HoverLift
      className={`px-4 py-2 rounded-md transition-colors flex items-center ${
        isActive
          ? 'bg-accent/10 text-accent font-medium'
          : 'hover:bg-accent/5 text-muted'
      }`}
      style={{ opacity: isCollapsed ? 0 : 1, width: isCollapsed ? '0' : 'auto', overflow: 'hidden' }}
    >
      <span className="mr-3 text-lg flex-shrink-0">{section.icon}</span>
      <span className="truncate">{section.label}</span>
    </HoverLift>
  </PressFeedback>
);

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const [activeSection, setActiveSection] = useState<string>('executive-dashboard');

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-surface/95 backdrop-blur-sm border-r border-border transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      style={{
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-ink" style={{ opacity: isCollapsed ? 0 : 1, transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
          VANTAGE
        </div>
        <PressFeedback onClick={onToggle} className="p-1 rounded-md">
          <div
            className="text-ink hover:text-accent transition-colors flex items-center justify-center"
            style={{ width: '32px', height: '32px' }}
          >
            {isCollapsed ? '≡' : '☰'}
          </div>
        </PressFeedback>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {sections.map((section) => (
            <li key={section.id}>
              <NavItem
                section={section}
                isActive={activeSection === section.id}
                onClick={() => setActiveSection(section.id)}
                isCollapsed={isCollapsed}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border" style={{ opacity: isCollapsed ? 0 : 1, transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
        <div className="text-sm text-muted mb-2">Status</div>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <span className="w-2 h-2 rounded-full bg-success mr-2"></span>
            <span>Platform Ready</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="w-2 h-2 rounded-full bg-warning mr-2"></span>
            <span>Data Syncing</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="w-2 h-2 rounded-full bg-error mr-2"></span>
            <span>Alerts: 3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;