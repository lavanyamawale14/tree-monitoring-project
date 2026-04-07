"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusCircle, Upload, CheckCircle2 } from "lucide-react"
import type { TreeData } from "@/lib/tree-data"

interface AddTreeFormProps {
  onAddTree: (tree: TreeData) => void
}

export function AddTreeForm({ onAddTree }: AddTreeFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    height: "",
    healthStatus: "Healthy" as TreeData["healthStatus"],
    lat: "",
    lng: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  // ✅ FIXED HANDLE SUBMIT (ONLY CHANGE)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch(
        "https://tree-monitoring-project.onrender.com/api/trees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            species: formData.type,
            height: parseFloat(formData.height),
            health: formData.healthStatus,
            lat: parseFloat(formData.lat),
            lng: parseFloat(formData.lng),
          }),
        }
      )

      const data = await res.json()
      console.log("Saved:", data)

      setSubmitted(true)
      window.location.reload()

      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: "",
          type: "",
          height: "",
          healthStatus: "Healthy",
          lat: "",
          lng: "",
        })
        setImagePreview(null)
      }, 2000)

    } catch (err) {
      console.error(err)
      alert("Error saving tree ❌")
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Add New Tree</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Register a new tree with its details and GPS location
        </p>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-foreground">Tree Added Successfully!</h3>
              <p className="text-sm text-muted-foreground">
                The tree has been registered and will appear on the map.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tree-name">Tree Name</Label>
              <Input
                id="tree-name"
                placeholder="e.g., Mumbai Neem"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tree-type">Tree Type</Label>
              <Input
                id="tree-type"
                placeholder="e.g., Neem (Azadirachta indica)"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tree-height">Height (meters)</Label>
              <Input
                id="tree-height"
                type="number"
                step="0.1"
                min="0"
                placeholder="e.g., 5.2"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tree-health">Health Status</Label>
              <select
                id="tree-health"
                value={formData.healthStatus}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    healthStatus: e.target.value as TreeData["healthStatus"],
                  })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
              >
                <option value="Healthy">Healthy</option>
                <option value="Moderate">Moderate</option>
                <option value="Needs Attention">Needs Attention</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tree-lat">Latitude</Label>
              <Input
                id="tree-lat"
                type="number"
                step="0.0001"
                value={formData.lat}
                onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tree-lng">Longitude</Label>
              <Input
                id="tree-lng"
                type="number"
                step="0.0001"
                value={formData.lng}
                onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tree-image">Tree Image</Label>
              <label className="flex h-32 cursor-pointer flex-col items-center justify-center border-2 border-dashed">
                {imagePreview ? (
                  <img src={imagePreview} className="h-full w-full object-cover" />
                ) : (
                  <Upload className="h-6 w-6" />
                )}
                <input type="file" onChange={handleImageUpload} className="sr-only" />
              </label>
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                Add Tree
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}