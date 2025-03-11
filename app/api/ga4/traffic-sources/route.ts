import { NextResponse } from "next/server"
import { BetaAnalyticsDataClient } from "@google-analytics/data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get("startDate") || "7daysAgo"
  const endDate = searchParams.get("endDate") || "today"

  try {
    const analyticsDataClient = new BetaAnalyticsDataClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],
      dimensions: [{ name: "sessionSource" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 5,
    })

    const formattedResponse =
      response.rows?.map((row) => ({
        name: row.dimensionValues?.[0].value || "Unknown",
        value: Number.parseInt(row.metricValues?.[0].value || "0"),
      })) || []

    return NextResponse.json(formattedResponse)
  } catch (error) {
    console.error("Error fetching GA4 traffic sources data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

