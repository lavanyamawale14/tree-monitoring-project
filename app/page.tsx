"use client"

import { useState, useCallback } from "react"
import { DashboardSidebar, type DashboardTab } from "@/components/dashboard/dashboard-sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { TreeMap } from "@/components/dashboard/tree-map"
import { EnvironmentalCharts } from "@/components/dashboard/environmental-charts"
import { GrowthTracker } from "@/components/dashboard/growth-tracker"
import { AIHealthDetection } from "@/components/dashboard/ai-health-detection"
import { AddTreeForm } from "@/components/dashboard/add-tree-form"
import { TreeList } from "@/components/dashboard/tree-list"
import { sampleTrees, type TreeData } from "@/lib/tree-data"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview")
  const [trees, setTrees] = useState<TreeData[]>(sampleTrees)

  const handleAddTree = useCallback((tree: TreeData) => {
    setTrees((prev) => [...prev, tree])
  }, [])

  const handleSelectTree = useCallback(() => {
    // Tree selection handled internally by TreeMap
  }, [])

  return (
    <div className="flex h-screen flex-col bg-background lg:flex-row">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <StatsCards trees={trees} />
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                  <TreeMap trees={trees} onSelectTree={handleSelectTree} />
                </div>
                <div>
                  <TreeList trees={trees} />
                </div>
              </div>
              <EnvironmentalCharts />
            </div>
          )}

          {activeTab === "map" && (
            <div className="space-y-6">
              <TreeMap trees={trees} onSelectTree={handleSelectTree} />
            </div>
          )}

          {activeTab === "charts" && (
            <div className="space-y-6">
              <EnvironmentalCharts />
              <GrowthTracker trees={trees} />
            </div>
          )}

          {activeTab === "health" && (
            <div className="space-y-6">
              <AIHealthDetection />
            </div>
          )}

          {activeTab === "add-tree" && (
            <div className="space-y-6">
              <AddTreeForm onAddTree={handleAddTree} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
