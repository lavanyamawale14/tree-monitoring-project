"use client"

import { useEffect, useRef, useState } from "react"
import type { TreeData } from "@/lib/tree-data"

interface TreeMapProps {
  onSelectTree: (tree: TreeData) => void
}

export function TreeMap({ onSelectTree }: TreeMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [selectedTree, setSelectedTree] = useState<TreeData | null>(null)

  // ✅ 1. Initialize map ONLY once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const initMap = async () => {
      const L = (await import("leaflet")).default
      await import("leaflet/dist/leaflet.css")

      const map = L.map(mapRef.current, {
        center: [20.5937, 78.9629],
        zoom: 5,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map)

      mapInstanceRef.current = map
    }

    initMap()
  }, [])

  // ✅ 2. Fetch data + render markers
  useEffect(() => {
    const loadTrees = async () => {
      if (!mapInstanceRef.current) return

      const L = (await import("leaflet")).default

      try {
        const res = await fetch("https://tree-monitoring-project.onrender.com/api/trees")
        const trees = await res.json()

        console.log("Trees from backend:", trees)

        // ❗ remove old markers
        mapInstanceRef.current.eachLayer((layer: any) => {
          if (layer instanceof L.Marker) {
            mapInstanceRef.current.removeLayer(layer)
          }
        })

        // ✅ add new markers
        trees.forEach((tree: any) => {
          if (!tree.lat || !tree.lng) return

          const marker = L.marker([tree.lat, tree.lng]).addTo(mapInstanceRef.current)

          marker.bindTooltip(tree.name)

          marker.on("click", () => {
            setSelectedTree(tree)
            onSelectTree(tree)
          })
        })

      } catch (err) {
        console.error("Error loading trees:", err)
      }
    }

    loadTrees()
  }, [])

  return (
    <div className="h-full w-full">
      {/* ✅ UI untouched */}
      <div ref={mapRef} className="h-[500px] w-full rounded-xl" />
    </div>
  )
}