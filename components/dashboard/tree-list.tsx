"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TreeData } from "@/lib/tree-data"
import { List } from "lucide-react"

interface TreeListProps {
  trees: TreeData[]
}

function healthBadgeClasses(status: TreeData["healthStatus"]) {
  switch (status) {
    case "Healthy":
      return "bg-chart-1/15 text-chart-1 border-chart-1/20"
    case "Moderate":
      return "bg-chart-4/15 text-chart-4 border-chart-4/20"
    case "Needs Attention":
      return "bg-destructive/15 text-destructive border-destructive/20"
  }
}

export function TreeList({ trees }: TreeListProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <List className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Recent Trees</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trees.slice(0, 5).map((tree) => (
            <div
              key={tree.id}
              className="flex items-center justify-between rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {tree.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{tree.name}</p>
                  <p className="text-xs text-muted-foreground">{tree.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  {tree.height}m
                </span>
                <Badge
                  variant="outline"
                  className={healthBadgeClasses(tree.healthStatus)}
                >
                  {tree.healthStatus}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
