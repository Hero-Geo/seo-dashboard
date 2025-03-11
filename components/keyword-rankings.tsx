"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/data-table"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"

type Keyword = {
  keyword: string
  position: number
  change: number
  volume: number
  url: string
}

const columns = [
  {
    accessorKey: "keyword",
    header: "Keyword",
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => {
      const position = row.getValue("position") as number
      return <div className="font-medium">{position}</div>
    },
  },
  {
    accessorKey: "change",
    header: "Change",
    cell: ({ row }) => {
      const change = row.getValue("change") as number
      return (
        <div className="flex items-center">
          {change > 0 ? (
            <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
          ) : change < 0 ? (
            <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
          ) : (
            <Minus className="mr-1 h-4 w-4 text-muted-foreground" />
          )}
          <span className={change > 0 ? "text-green-500" : change < 0 ? "text-red-500" : ""}>
            {change === 0 ? "-" : Math.abs(change)}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "volume",
    header: "Search Volume",
    cell: ({ row }) => {
      const volume = row.getValue("volume") as number
      return <div className="font-medium">{volume.toLocaleString()}</div>
    },
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      const url = row.getValue("url") as string
      return (
        <div className="max-w-[200px] truncate">
          <a href={url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </div>
      )
    },
  },
]

const data: Keyword[] = [
  {
    keyword: "seo reporting dashboard",
    position: 3,
    change: 2,
    volume: 1200,
    url: "https://example.com/seo-reporting",
  },
  {
    keyword: "monthly seo report template",
    position: 5,
    change: -1,
    volume: 2400,
    url: "https://example.com/seo-templates",
  },
  {
    keyword: "google analytics dashboard",
    position: 8,
    change: 4,
    volume: 8500,
    url: "https://example.com/analytics",
  },
  {
    keyword: "search console integration",
    position: 12,
    change: 0,
    volume: 590,
    url: "https://example.com/search-console",
  },
  {
    keyword: "seo performance metrics",
    position: 7,
    change: 3,
    volume: 1800,
    url: "https://example.com/seo-metrics",
  },
]

export function KeywordRankings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Rankings</CardTitle>
        <CardDescription>Top performing keywords from Search Console</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  )
}

