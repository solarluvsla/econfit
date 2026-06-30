export default async function handler(req: any, res: any) {
  try {
    const response = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/%5EKS11?interval=1d&range=1mo",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; econfit/1.0)",
          Accept: "application/json",
        },
      }
    )

    if (!response.ok) throw new Error(`Yahoo Finance: ${response.status}`)

    const json = await response.json()
    const result = json.chart.result[0]
    const timestamps: number[] = result.timestamp
    const closes: number[] = result.indicators.quote[0].close

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const filtered = timestamps
      .map((ts, i) => ({ ts: new Date(ts * 1000), close: closes[i] }))
      .filter((p) => p.ts < todayStart && p.close != null)

    const points = filtered.map((p) => ({
      date: `${p.ts.getMonth() + 1}/${p.ts.getDate()}`,
      close: Math.round(p.close * 100) / 100,
    }))

    const last = filtered.at(-1)
    const baseDate = last
      ? `${last.ts.getFullYear()}.${String(last.ts.getMonth() + 1).padStart(2, "0")}.${String(last.ts.getDate()).padStart(2, "0")}`
      : ""

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=7200")
    res.json({ points, baseDate })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}
