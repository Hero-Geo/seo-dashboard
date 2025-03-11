"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Download, Filter, Share2 } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { subDays } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { OverviewMetrics } from "@/components/overview-metrics"
import { SearchPerformance } from "@/components/search-performance"
import { TrafficSources } from "@/components/traffic-sources"
import { UserBehavior } from "@/components/user-behavior"
import { KeywordRankings } from "@/components/keyword-rankings"

export default function SeoReportingDashboard() {
  const today = new Date()
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(today, 30),
    to: today,
  })
  const [refreshKey, setRefreshKey] = useState(0)

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range)
    // Increment the refresh key to trigger a re-fetch of data
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Monthly Report</h1>
          <p className="text-muted-foreground">Performance overview for your website across all tracking platforms</p>
        </div>
        <div className="flex items-center gap-2">
          <DatePickerWithRange date={dateRange} setDate={setDateRange} onRangeChange={handleDateRangeChange} />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </div>

      <OverviewMetrics key={`overview-${refreshKey}`} dateRange={dateRange} />

      <Tabs defaultValue="google-analytics">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="google-analytics">GA4</TabsTrigger>
          <TabsTrigger value="search-console">Search Console</TabsTrigger>
          <TabsTrigger value="bing-webmaster">Bing Webmaster</TabsTrigger>
          <TabsTrigger value="clarity">Microsoft Clarity</TabsTrigger>
          <TabsTrigger value="tag-manager">Tag Manager</TabsTrigger>
        </TabsList>
        <TabsContent value="google-analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,589</div>
                <div className="flex items-center text-sm text-green-500">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  12.5% from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18,472</div>
                <div className="flex items-center text-sm text-green-500">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  8.2% from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.6%</div>
                <div className="flex items-center text-sm text-red-500">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  0.8% from last month
                </div>
              </CardContent>
            </Card>
          </div>

          <TrafficSources key={`traffic-${refreshKey}`} dateRange={dateRange} />
          <UserBehavior key={`behavior-${refreshKey}`} dateRange={dateRange} />
        </TabsContent>

        <TabsContent value="search-console" className="space-y-6">
          <SearchPerformance key={`search-${refreshKey}`} dateRange={dateRange} />
          <KeywordRankings key={`keywords-${refreshKey}`} dateRange={dateRange} />
        </TabsContent>

        {/* Other tabs remain the same */}
      </Tabs>
    </div>
  )
}

