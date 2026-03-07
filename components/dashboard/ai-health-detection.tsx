"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScanEye, Upload, Loader2, Leaf, AlertTriangle, CheckCircle2 } from "lucide-react"

type HealthResult = {
  status: "Healthy" | "Moderate" | "Needs Attention"
  confidence: number
  details: string[]
}

function simulateAIAnalysis(): Promise<HealthResult> {
  return new Promise((resolve) => {
    const results: HealthResult[] = [
      {
        status: "Healthy",
        confidence: 94,
        details: [
          "Leaf color is vibrant green",
          "No signs of pest damage detected",
          "Canopy density is optimal",
          "Trunk shows no visible disease markers",
        ],
      },
      {
        status: "Moderate",
        confidence: 78,
        details: [
          "Some leaf discoloration detected",
          "Minor signs of nutrient deficiency",
          "Canopy shows slight thinning",
          "Recommend soil testing within 2 weeks",
        ],
      },
      {
        status: "Needs Attention",
        confidence: 87,
        details: [
          "Significant leaf yellowing observed",
          "Possible fungal infection on bark",
          "Canopy density below healthy threshold",
          "Immediate arborist consultation advised",
        ],
      },
    ]
    setTimeout(() => {
      resolve(results[Math.floor(Math.random() * results.length)])
    }, 2500)
  })
}

export function AIHealthDetection() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<HealthResult | null>(null)

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string)
      setResult(null)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (!imagePreview) return
    setIsAnalyzing(true)
    const analysisResult = await simulateAIAnalysis()
    setResult(analysisResult)
    setIsAnalyzing(false)
  }, [imagePreview])

  const statusIcon = result?.status === "Healthy"
    ? CheckCircle2
    : result?.status === "Moderate"
      ? AlertTriangle
      : AlertTriangle

  const statusColor = result?.status === "Healthy"
    ? "text-chart-1"
    : result?.status === "Moderate"
      ? "text-chart-4"
      : "text-destructive"

  const StatusIcon = statusIcon

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <ScanEye className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">AI Tree Health Detection</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Upload a tree image and our AI will analyze leaf color, condition, and overall health
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <label
              htmlFor="tree-image-upload"
              className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary/50 hover:bg-muted/50"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Uploaded tree"
                  className="h-full w-full rounded-xl object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <Upload className="h-10 w-10" />
                  <div className="text-center">
                    <p className="text-sm font-medium">Click to upload tree image</p>
                    <p className="text-xs">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              )}
              <input
                id="tree-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
              />
            </label>
            <Button
              onClick={handleAnalyze}
              disabled={!imagePreview || isAnalyzing}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <ScanEye className="mr-2 h-4 w-4" />
                  Analyze Health
                </>
              )}
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {isAnalyzing && (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl bg-muted/30 p-8">
                <div className="relative">
                  <Leaf className="h-12 w-12 animate-pulse text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">Analyzing tree health...</p>
                  <p className="text-sm text-muted-foreground">
                    Processing leaf patterns and color data
                  </p>
                </div>
              </div>
            )}

            {result && !isAnalyzing && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
                  <StatusIcon className={`h-8 w-8 ${statusColor}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-foreground">{result.status}</h4>
                      <Badge
                        variant="outline"
                        className="text-xs"
                      >
                        {result.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">AI Health Assessment</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-semibold text-foreground">Analysis Details</h5>
                  {result.details.map((detail, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 rounded-lg bg-card p-3 text-sm"
                    >
                      <div className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                        result.status === "Healthy" ? "bg-chart-1" :
                        result.status === "Moderate" ? "bg-chart-4" : "bg-destructive"
                      }`} />
                      <span className="text-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!result && !isAnalyzing && (
              <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl bg-muted/30 p-8 text-center">
                <ScanEye className="h-12 w-12 text-muted-foreground/40" />
                <div>
                  <p className="font-medium text-muted-foreground">No analysis yet</p>
                  <p className="text-sm text-muted-foreground/70">
                    Upload a tree image to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
