"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Map,
  BarChart3,
  ScanEye,
  PlusCircle,
  TreesIcon as Tree,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import type { DashboardTab } from "./dashboard-sidebar"

interface MobileNavProps {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
}

const navItems: { id: DashboardTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "map", label: "Tree Map", icon: Map },
  { id: "charts", label: "Analytics", icon: BarChart3 },
  { id: "health", label: "AI Health", icon: ScanEye },
  { id: "add-tree", label: "Add Tree", icon: PlusCircle },
]

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Tree className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">TreeGuard</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {isOpen && (
        <div className="border-b border-border bg-card p-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id)
                  setIsOpen(false)
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  activeTab === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
