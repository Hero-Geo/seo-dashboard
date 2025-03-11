import type { Metadata } from "next"
import SeoReportingDashboard from "@/components/seo-reporting-dashboard"

export const metadata: Metadata = {
  title: "SEO Dashboard",
  description: "Monitor and analyze your SEO performance",
}

export default function Page() {
  return <SeoReportingDashboard />
}

