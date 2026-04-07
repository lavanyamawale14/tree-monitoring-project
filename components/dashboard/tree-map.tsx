"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TreeData } from "@/lib/tree-data"
import { MapPin } from "lucide-react"

interface TreeMapProps {
  trees: TreeData[]
  onSelectTree: (tree: TreeData) => void
}

function healthColor(status: TreeData["healthStatus"]) {
  switch (status) {
    case "Healthy":
      return "#22c55e"
    case "Moderate":
      return "#f59e0b"
    case "Needs Attention":
      return "#ef4444"
  }
}

function healthBadgeVariant(status: TreeData["healthStatus"]) {
  switch (status) {
    case "Healthy":
      return "default"
    case "Moderate":
      return "secondary"
    case "Needs Attention":
      return "destructive"
  }
}

export function TreeMap({ onSelectTree }: TreeMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const [selectedTree, setSelectedTree] = useState<TreeData | null>(null)
  const [trees, setTrees] = useState<TreeData[]>([])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return
    

    const initMap = async () => {
      const res = await fetch("https://tree-monitoring-project.onrender.com/api/trees")
const treesData = await res.json()
console.log("Fetched trees:", treesData)

      const L = (await import("leaflet")).default
      await import("leaflet/dist/leaflet.css")

      const map = L.map(mapRef.current!, {
        center: [20.5937, 78.9629],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: true,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      treesData.forEach((tree) => {
        const color = healthColor(tree.healthStatus)
        const icon = L.divIcon({
          className: "custom-tree-marker",
          html: `<div style="
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            background: ${color};
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg style="transform: rotate(45deg);" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 14V2"/>
              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"/>
            </svg>
          </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        })

        const marker = L.marker([tree.lat, tree.lng], { icon }).addTo(map)

        marker.on("click", () => {
          setSelectedTree(tree)
          onSelectTree(tree)
        })

        marker.bindTooltip(tree.name, {
          direction: "top",
          offset: [0, -35],
          className: "tree-tooltip",
        })
      })

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const datePlanted = selectedTree ? new Date(selectedTree.datePlanted) : null
  const treeAge = datePlanted
    ? `${Math.floor((Date.now() - datePlanted.getTime()) / (365.25 * 24 * 60 * 60 * 1000))} years`
    : null

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <Card className="flex-1 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Tree Map - India</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div ref={mapRef} className="h-[400px] w-full lg:h-[500px]" />
          <style jsx global>{`
            .tree-tooltip {
              background: white;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 4px 10px;
              font-size: 13px;
              font-weight: 600;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .tree-tooltip::before {
              border-top-color: white !important;
            }
            .leaflet-control-zoom a {
              background: white !important;
              color: #1a1a1a !important;
              border-color: #e5e7eb !important;
            }
          `}</style>
        </CardContent>
      </Card>

      {selectedTree && (
        <Card className="w-full lg:w-80">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{selectedTree.name}</CardTitle>
            <Badge variant={healthBadgeVariant(selectedTree.healthStatus)} className={
              selectedTree.healthStatus === "Healthy"
                ? "bg-chart-1/15 text-chart-1 hover:bg-chart-1/20"
                : selectedTree.healthStatus === "Moderate"
                  ? "bg-chart-4/15 text-chart-4 hover:bg-chart-4/20"
                  : ""
            }>
              {selectedTree.healthStatus}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow label="Type" value={selectedTree.type} />
            <InfoRow label="Height" value={`${selectedTree.height} m`} />
            <InfoRow label="Date Planted" value={new Date(selectedTree.datePlanted).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })} />
            <InfoRow label="Age" value={treeAge ?? "N/A"} />
            <InfoRow label="Location" value={`${selectedTree.lat.toFixed(4)}, ${selectedTree.lng.toFixed(4)}`} />
            <div className="pt-2">
              <p className="text-xs font-semibold text-muted-foreground">Growth History</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selectedTree.growthHistory.slice(-4).map((g) => (
                  <span
                    key={g.date}
                    className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                  >
                    {g.date}: {g.height}m
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/50 pb-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}
