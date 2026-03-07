"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TreesIcon as Tree, Heart, CalendarPlus, Leaf } from "lucide-react"
import type { TreeData } from "@/lib/tree-data"

interface StatsCardsProps {
  trees: TreeData[]
}

export function StatsCards({ trees }: StatsCardsProps) {
  const totalTrees = trees.length
  const healthyTrees = trees.filter((t) => t.healthStatus === "Healthy").length
  const thisMonth = trees.filter((t) => {
    const planted = new Date(t.datePlanted)
    const now = new Date()
    return (
      planted.getMonth() === now.getMonth() &&
      planted.getFullYear() === now.getFullYear()
    )
  }).length

  const totalCO2 = trees.reduce((acc, t) => acc + t.height * 21.77, 0)

  const stats = [
    {
      label: "Total Trees",
      value: totalTrees,
      icon: Tree,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Healthy Trees",
      value: healthyTrees,
      icon: Heart,
      color: "text-chart-1",
      bg: "bg-chart-1/10",
    },
    {
      label: "Planted This Month",
      value: thisMonth,
      icon: CalendarPlus,
      color: "text-chart-2",
      bg: "bg-chart-2/10",
    },
    {
      label: "CO2 Absorbed (kg)",
      value: totalCO2.toFixed(0),
      icon: Leaf,
      color: "text-chart-3",
      bg: "bg-chart-3/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/50 shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
