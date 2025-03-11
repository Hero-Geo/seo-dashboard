import type { Metadata } from "next"
import SettingsPage from "@/components/settings-page"

export const metadata: Metadata = {
  title: "SEO Dashboard Settings",
  description: "Configure your SEO dashboard settings",
}

export default function Page() {
  return <SettingsPage />
}

