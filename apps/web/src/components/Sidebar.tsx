'use client';

import { useState } from 'react';
import {
  Activity, BarChart3, BookOpen, BriefcaseBusiness, Building2, Calculator,
  ChevronDown, ChevronRight, ChevronsLeft, ChevronsRight, Database,
  FileBarChart, FolderKanban, Gauge, Landmark, LineChart, ListFilter,
  PanelLeft, PieChart, Settings2, ShieldCheck, Sparkles, Table2, WalletCards,
} from 'lucide-react';

interface SidebarProps { isCollapsed: boolean; onToggle: () => void }

const groups = [
  { label: 'Overview', items: [['Executive Dashboard', Gauge], ['Company Intelligence', Building2], ['Market Intelligence', LineChart]] },
  { label: 'Financial Modeling', items: [['Financial Statements', Table2], ['Three-Statement Model', Calculator], ['DCF Valuation', BarChart3], ['WACC Calculator', Activity], ['Comparable Companies', ListFilter], ['Financial Ratios', PieChart]] },
  { label: 'Investment Banking', items: [['M&A Analysis', BriefcaseBusiness], ['LBO Modeling', Landmark], ['Equity Research', BookOpen]] },
  { label: 'Asset Management', items: [['Portfolio Analytics', WalletCards], ['Risk Management', ShieldCheck], ['Fixed Income', FileBarChart], ['Derivatives', Activity], ['Quantitative Analytics', BarChart3]] },
  { label: 'Corporate Finance', items: [['FP&A', Database], ['Capital Structure', Landmark], ['Private Equity & VC', BriefcaseBusiness]] },
  { label: 'Intelligence', items: [['AI Financial Analyst', Sparkles], ['Financial Data Intelligence', Database]] },
  { label: 'Workspace', items: [['Model Library', FolderKanban], ['Research Reports', BookOpen], ['Export Center', FileBarChart], ['Settings', Settings2]] },
] as const;

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [active, setActive] = useState('Executive Dashboard');
  const [open, setOpen] = useState<Record<string, boolean>>({ Overview: true, 'Financial Modeling': true, 'Investment Banking': true });

  return (
    <aside className={`flex h-screen shrink-0 flex-col border-r border-border bg-sidebar transition-[width] duration-200 ${isCollapsed ? 'w-[72px]' : 'w-[260px]'}`}>
      <div className="flex h-[68px] items-center justify-between border-b border-border px-4">
        <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'opacity-100'}`}>
          <div className="flex size-8 shrink-0 items-center justify-center border border-gold/50 bg-gold/10 text-xs font-bold text-gold">V</div>
          <div className="whitespace-nowrap"><div className="text-sm font-semibold tracking-[0.24em] text-foreground">VANTAGE</div><div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Financial intelligence</div></div>
        </div>
        <button aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={onToggle} className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground">
          {isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
        </button>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4" aria-label="Primary navigation">
        {groups.map((group) => {
          const isOpen = open[group.label];
          return <div key={group.label} className="mb-4">
            {!isCollapsed && <button onClick={() => setOpen((value) => ({ ...value, [group.label]: !isOpen }))} className="mb-1 flex w-full items-center justify-between px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"><span>{group.label}</span>{isOpen ? <ChevronDown /> : <ChevronRight />}</button>}
            {(isCollapsed || isOpen) && <div className="flex flex-col gap-0.5">{group.items.map(([label, Icon]) => <button key={label} onClick={() => setActive(label)} title={isCollapsed ? label : undefined} className={`flex items-center gap-3 rounded-md px-2.5 py-2 text-left text-xs transition-colors ${active === label ? 'bg-gold/10 text-gold' : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'} ${isCollapsed ? 'justify-center' : ''}`}><Icon /><span className={isCollapsed ? 'sr-only' : ''}>{label}</span>{active === label && !isCollapsed && <span className="ml-auto size-1.5 rounded-full bg-gold" />}</button>)}</div>}
          </div>;
        })}
      </nav>
      <div className={`border-t border-border p-3 ${isCollapsed ? 'flex justify-center' : ''}`}>
        {isCollapsed ? <PanelLeft className="text-muted-foreground" /> : <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><span className="size-1.5 rounded-full bg-emerald-500" /> Terminal ready <span className="ml-auto font-mono text-foreground">v0.1</span></div>}
      </div>
    </aside>
  );
}
