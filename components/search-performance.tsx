"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SearchPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Performance</CardTitle>
        <CardDescription>Data from Google Search Console</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="clicks">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="clicks">Clicks</TabsTrigger>
            <TabsTrigger value="impressions">Impressions</TabsTrigger>
            <TabsTrigger value="ctr">CTR</TabsTrigger>
            <TabsTrigger value="position">Position</TabsTrigger>
          </TabsList>
          <TabsContent value="clicks" className="pt-4">
            <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Clicks chart would appear here</p>
            </div>
          </TabsContent>
          <TabsContent value="impressions" className="pt-4">
            <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Impressions chart would appear here</p>
            </div>
          </TabsContent>
          <TabsContent value="ctr" className="pt-4">
            <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">CTR chart would appear here</p>
            </div>
          </TabsContent>
          <TabsContent value="position" className="pt-4">
            <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Position chart would appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

