import type { Metadata } from "next"
import ReportsPage from "@/components/reports-page"

export const metadata: Metadata = {
  title: "SEO Reports",
  description: "Generate and manage your SEO reports",
}

export default function Page() {
  return <ReportsPage />
}

