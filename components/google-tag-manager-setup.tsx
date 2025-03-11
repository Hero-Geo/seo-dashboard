"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function GoogleTagManagerSetup() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Google Tag Manager</CardTitle>
          <CardDescription>Configure and manage your tracking tags in one place</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-muted p-4">
            <h3 className="mb-2 font-medium">Implementation Status</h3>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span>Google Tag Manager is properly installed</span>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Active Tags</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between rounded-md border p-3">
                <span>Google Analytics 4</span>
                <span className="text-sm text-green-500">Active</span>
              </li>
              <li className="flex items-center justify-between rounded-md border p-3">
                <span>Google Ads Conversion Tracking</span>
                <span className="text-sm text-green-500">Active</span>
              </li>
              <li className="flex items-center justify-between rounded-md border p-3">
                <span>Facebook Pixel</span>
                <span className="text-sm text-green-500">Active</span>
              </li>
              <li className="flex items-center justify-between rounded-md border p-3">
                <span>Microsoft Clarity</span>
                <span className="text-sm text-green-500">Active</span>
              </li>
            </ul>
          </div>

          <div className="rounded-md bg-muted/50 p-4">
            <h3 className="mb-2 font-medium">Implementation Code</h3>
            <p className="text-sm text-muted-foreground mb-2">
              For Next.js applications, you can use the @next/third-parties package to easily integrate Google Tag
              Manager [^1][^2]:
            </p>
            <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
              <code>{`import { GoogleTagManager } from '@next/third-parties/google'

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-XXXX" />
      <body>{children}</body>
    </html>
  )
}`}</code>
            </pre>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="gap-1">
            <ExternalLink className="h-4 w-4" />
            Open Tag Manager
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

