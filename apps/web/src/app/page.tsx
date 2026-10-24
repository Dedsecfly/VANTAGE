'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopHeader from '@/components/TopHeader';
import ExecutiveDashboard from '@/components/ExecutiveDashboard';

export default function HomePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return <div className="flex h-screen overflow-hidden bg-background"><Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed((value) => !value)} /><div className="flex min-w-0 flex-1 flex-col"><TopHeader isSidebarCollapsed={isSidebarCollapsed} /><div className="min-h-0 flex-1 overflow-y-auto"><ExecutiveDashboard /></div></div></div>;
}
