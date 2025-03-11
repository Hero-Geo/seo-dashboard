"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function UserBehavior() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Behavior</CardTitle>
        <CardDescription>How users interact with your site</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">Avg. Session Duration</span>
            <span className="text-2xl font-bold">2m 34s</span>
            <span className="text-xs text-green-500">+12s from last month</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">Pages / Session</span>
            <span className="text-2xl font-bold">2.8</span>
            <span className="text-xs text-green-500">+0.3 from last month</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">Bounce Rate</span>
            <span className="text-2xl font-bold">42.6%</span>
            <span className="text-xs text-red-500">+1.8% from last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

