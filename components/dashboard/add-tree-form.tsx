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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newTree: TreeData = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      height: parseFloat(formData.height),
      healthStatus: formData.healthStatus,
      datePlanted: new Date().toISOString().split("T")[0],
      lat: parseFloat(formData.lat) || 20.5937,
      lng: parseFloat(formData.lng) || 78.9629,
      growthHistory: [
        { date: new Date().toISOString().slice(0, 7), height: parseFloat(formData.height) },
      ],
      imageUrl: imagePreview ?? undefined,
    }
    onAddTree(newTree)
    setSubmitted(true)
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
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                placeholder="e.g., 19.076"
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
                placeholder="e.g., 72.8777"
                value={formData.lng}
                onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tree-image">Tree Image</Label>
              <label
                htmlFor="tree-image"
                className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary/50"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Tree preview"
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Upload className="h-6 w-6" />
                    <span className="text-sm">Upload tree image</span>
                  </div>
                )}
                <input
                  id="tree-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                />
              </label>
            </div>

            <div className="md:col-span-2">
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Tree
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
