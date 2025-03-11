import type React from "react"
import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import { Providers } from "@/components/providers"

import "@/app/globals.css"

export const metadata: Metadata = {
  title: "SEO Dashboard",
  description: "Monitor and analyze your SEO performance",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <DashboardLayout>{children}</DashboardLayout>
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'