"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Metric {
  name: string
  value: string
  change?: number
}

interface OverviewMetricsProps {
  dateRange: DateRange
}

export function OverviewMetrics({ dateRange }: OverviewMetricsProps) {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (!dateRange.from || !dateRange.to) return

      setLoading(true)
      try {
        const startDate = format(dateRange.from, "yyyy-MM-dd")
        const endDate = format(dateRange.to, "yyyy-MM-dd")

        const response = await fetch(`/api/ga4?startDate=${startDate}&endDate=${endDate}`)
        if (!response.ok) throw new Error("Failed to fetch data")
        const data = await response.json()

        // Add mock change data (in a real scenario, you'd calculate this from historical data)
        const processedMetrics = data.map((metric: Metric) => ({
          ...metric,
          change: Math.random() * 20 - 10, // Random number between -10 and 10
        }))

        setMetrics(processedMetrics)
      } catch (err) {
        setError("Failed to load data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [dateRange])

  if (loading) return <div>Loading metrics...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.name === "activeUsers"
                ? "Active Users"
                : metric.name === "sessions"
                  ? "Sessions"
                  : metric.name === "conversions"
                    ? "Conversions"
                    : metric.name === "bounceRate"
                      ? "Bounce Rate"
                      : metric.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metric.name === "bounceRate"
                ? `${Number.parseFloat(metric.value).toFixed(2)}%`
                : Number.parseInt(metric.value).toLocaleString()}
            </div>
            {metric.change && (
              <div className={`flex items-center text-xs ${metric.change > 0 ? "text-green-500" : "text-red-500"}`}>
                {metric.change > 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                <span>{Math.abs(metric.change).toFixed(1)}% from last period</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

