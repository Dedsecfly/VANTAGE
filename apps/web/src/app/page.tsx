'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopHeader from '@/components/TopHeader';
import ExecutiveDashboard from '@/components/ExecutiveDashboard';

export default function HomePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-bg">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col">
        <TopHeader isSidebarCollapsed={isSidebarCollapsed} />
        <div className="flex-1 overflow-y-auto">
          <ExecutiveDashboard />
        </div>
      </div>
    </div>
  );
}