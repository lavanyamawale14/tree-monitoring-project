"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type { TreeData } from "@/lib/tree-data"
import { TrendingUp } from "lucide-react"

interface GrowthTrackerProps {
  trees: TreeData[]
}

export function GrowthTracker({ trees }: GrowthTrackerProps) {
  const [selectedTreeId, setSelectedTreeId] = useState(trees[0]?.id ?? 0)
  const selectedTree = trees.find((t) => t.id === selectedTreeId)

  if (!selectedTree) return null

  const datePlanted = new Date(selectedTree.datePlanted)
  const ageInYears = (
    (Date.now() - datePlanted.getTime()) /
    (365.25 * 24 * 60 * 60 * 1000)
  ).toFixed(1)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Tree Growth Tracker</CardTitle>
          </div>
          <select
            value={selectedTreeId}
            onChange={(e) => setSelectedTreeId(Number(e.target.value))}
            className="rounded-lg border border-input bg-muted/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Select tree"
          >
            {trees.map((tree) => (
              <option key={tree.id} value={tree.id}>
                {tree.name}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-4">
          <div className="rounded-lg bg-primary/10 px-4 py-2">
            <p className="text-xs text-muted-foreground">Current Height</p>
            <p className="text-lg font-bold text-primary">{selectedTree.height}m</p>
          </div>
          <div className="rounded-lg bg-chart-2/10 px-4 py-2">
            <p className="text-xs text-muted-foreground">Tree Age</p>
            <p className="text-lg font-bold text-chart-2">{ageInYears} years</p>
          </div>
          <div className="rounded-lg bg-chart-3/10 px-4 py-2">
            <p className="text-xs text-muted-foreground">Growth Rate</p>
            <p className="text-lg font-bold text-chart-3">
              {selectedTree.growthHistory.length >= 2
                ? (
                    (selectedTree.growthHistory[selectedTree.growthHistory.length - 1].height -
                      selectedTree.growthHistory[0].height) /
                    (selectedTree.growthHistory.length - 1)
                  ).toFixed(1)
                : "N/A"}{" "}
              m/period
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={selectedTree.growthHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 148)" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke="oklch(0.45 0.02 150)"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="oklch(0.45 0.02 150)"
              unit="m"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid oklch(0.9 0.02 148)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: 13,
              }}
            />
            <Line
              type="monotone"
              dataKey="height"
              stroke="oklch(0.45 0.15 150)"
              strokeWidth={3}
              dot={{
                fill: "oklch(0.45 0.15 150)",
                r: 5,
                strokeWidth: 2,
                stroke: "white",
              }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
