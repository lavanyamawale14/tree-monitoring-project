"use client"

import { useEffect, useState } from "react"
import { TreeList } from "@/components/dashboard/tree-list"

export default function Home() {
  const [trees, setTrees] = useState([])

  useEffect(() => {
    fetch("https://tree-monitoring-project.onrender.com/api/trees")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((tree: any) => ({
          id: tree._id,
          name: tree.name,
          type: tree.species,
          height: tree.height,
          healthStatus: tree.health || "Healthy"
        }))
        setTrees(formatted)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="p-6">
      <TreeList trees={trees} />
    </div>
  )
}