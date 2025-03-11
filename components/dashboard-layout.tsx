"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, Download, LineChart, Menu, Search, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r md:block">
        <div className="flex h-full flex-col gap-6 p-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <LineChart className="h-6 w-6" />
            <span>SEO Analytics</span>
          </Link>
          <nav className="grid gap-4 text-sm font-medium">
            <Link
              href="/"
              className={`flex items-center gap-2 ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}
            >
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/reports"
              className={`flex items-center gap-2 ${isActive("/reports") ? "text-primary" : "text-muted-foreground"}`}
              title="Access and schedule custom reports, templates, and export options"
            >
              <Calendar className="h-5 w-5" />
              Reports
            </Link>
            <Link
              href="/settings"
              className={`flex items-center gap-2 ${isActive("/settings") ? "text-primary" : "text-muted-foreground"}`}
              title="Configure API connections, user access, and dashboard preferences"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <LineChart className="h-6 w-6" />
                  <span>SEO Analytics</span>
                </Link>
                <div className="grid gap-3">
                  <Link
                    href="/"
                    className={`flex items-center gap-2 ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <BarChart3 className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/reports"
                    className={`flex items-center gap-2 ${isActive("/reports") ? "text-primary" : "text-muted-foreground"}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Calendar className="h-5 w-5" />
                    Reports
                  </Link>
                  <Link
                    href="/settings"
                    className={`flex items-center gap-2 ${isActive("/settings") ? "text-primary" : "text-muted-foreground"}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ml-auto flex items-center gap-4">
            <form className="hidden md:flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </form>
            <Button variant="outline" size="icon">
              <Download className="h-5 w-5" />
              <span className="sr-only">Download report</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User account</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

