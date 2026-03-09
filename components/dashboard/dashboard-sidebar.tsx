"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Map,
  BarChart3,
  ScanEye,
  PlusCircle,
  TreesIcon as Tree,
} from "lucide-react"

export type DashboardTab =
  | "overview"
  | "map"
  | "charts"
  | "health"
  | "add-tree"

interface DashboardSidebarProps {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
}

const navItems: { id: DashboardTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "map", label: "Tree Map", icon: Map },
  { id: "charts", label: "Analytics", icon: BarChart3 },
  { id: "health", label: "AI Health Check", icon: ScanEye },
  { id: "add-tree", label: "Add Tree", icon: PlusCircle },
]

export function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
          <Tree className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-sidebar-foreground">TreeGuard</h1>
          <p className="text-xs text-sidebar-foreground/60">Monitoring System</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              activeTab === item.id
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="h-4.5 w-4.5" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-lg bg-sidebar-accent/50 p-4">
          <p className="text-xs font-semibold text-sidebar-foreground">Environmental Impact</p>
          <p className="mt-1 text-xs text-sidebar-foreground/60">
            Your trees have absorbed over 2,000 kg of CO2 this year.
          </p>
        </div>
      </div>
    </aside>
  )
}
