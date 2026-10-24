'use client';

import { useState } from 'react';
import { Bell, ChevronDown, Command, Search, Settings2 } from 'lucide-react';

export default function TopHeader({ isSidebarCollapsed }: { isSidebarCollapsed: boolean }) {
  const [searchOpen, setSearchOpen] = useState(false);
  return <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
    <div className="flex min-w-0 items-center gap-3"><span className="text-xs text-muted-foreground">Workspace</span><ChevronDown className="text-muted-foreground" /><span className="hidden text-xs text-foreground sm:inline">Executive Dashboard</span><span className="text-border">/</span><span className="truncate text-xs text-muted-foreground">Platform overview</span></div>
    <div className="flex items-center gap-2">
      <button onClick={() => setSearchOpen((value) => !value)} className="hidden h-9 items-center gap-2 rounded-md border border-border bg-muted/20 px-3 text-xs text-muted-foreground transition-colors hover:border-gold/50 hover:text-foreground md:flex" aria-label="Open global search"><Search /><span>Search modules</span><kbd className="ml-5 rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">⌘ K</kbd></button>
      <button className="relative flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted/30 hover:text-foreground" aria-label="Notifications"><Bell /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-gold" /></button>
      <button className="flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted/30 hover:text-foreground" aria-label="Settings"><Settings2 /></button>
      <div className="ml-2 hidden items-center gap-2 border-l border-border pl-4 sm:flex"><div className="flex size-7 items-center justify-center rounded-full bg-gold/15 text-[10px] font-semibold text-gold">JD</div><span className="text-xs text-foreground">J. Doe</span></div>
    </div>
    {searchOpen && <div className={`absolute right-6 top-16 z-20 w-80 border border-border bg-panel p-3 shadow-2xl ${isSidebarCollapsed ? '' : ''}`}><div className="flex items-center gap-2 border-b border-border pb-2"><Command className="text-gold" /><input autoFocus className="w-full bg-transparent text-sm text-foreground outline-none" placeholder="Search VANTAGE modules..." /></div><p className="pt-3 text-[10px] uppercase tracking-widest text-muted-foreground">Try “DCF”, “portfolio”, or “research”</p></div>}
  </header>;
}
