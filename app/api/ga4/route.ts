import { NextResponse } from "next/server"
import { BetaAnalyticsDataClient } from "@google-analytics/data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get("startDate") || "7daysAgo"
  const endDate = searchParams.get("endDate") || "today"

  try {
    const analyticsDataClient = new BetaAnalyticsDataClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    })

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],
      metrics: [{ name: "activeUsers" }, { name: "sessions" }, { name: "conversions" }, { name: "bounceRate" }],
    })

    const formattedResponse = response.rows?.[0].metricValues?.map((metric, index) => ({
      name: response.metricHeaders?.[index].name || "",
      value: metric.value || "0",
    }))

    return NextResponse.json(formattedResponse)
  } catch (error) {
    console.error("Error fetching GA4 data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

