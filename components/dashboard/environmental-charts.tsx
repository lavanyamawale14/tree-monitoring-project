"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { environmentalData } from "@/lib/tree-data"
import { Wind, CloudSun } from "lucide-react"

export function EnvironmentalCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">CO2 Absorption (kg/month)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={environmentalData.co2Absorption}>
              <defs>
                <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.45 0.15 150)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.45 0.15 150)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 148)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.45 0.02 150)" />
              <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.45 0.02 150)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  border: "1px solid oklch(0.9 0.02 148)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  fontSize: 13,
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="oklch(0.45 0.15 150)"
                strokeWidth={2.5}
                fill="url(#co2Gradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <CloudSun className="h-5 w-5 text-chart-2" />
            <CardTitle className="text-lg">Oxygen Production (kg/month)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={environmentalData.oxygenProduction}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 148)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.45 0.02 150)" />
              <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.45 0.02 150)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  border: "1px solid oklch(0.9 0.02 148)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  fontSize: 13,
                }}
              />
              <Bar
                dataKey="amount"
                fill="oklch(0.55 0.18 155)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
