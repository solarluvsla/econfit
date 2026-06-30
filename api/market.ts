const OUNCE_TO_GRAM = 31.1034768

type SymbolKey = "domestic" | "overseas" | "fx" | "gold"

type YahooChartResponse = {
  chart: {
    error: null | { description?: string }
    result?: Array<{
      meta: {
        chartPreviousClose?: number
        currency?: string
        exchangeTimezoneName?: string
        regularMarketPrice?: number
        regularMarketTime?: number
      }
      timestamp?: number[]
      indicators?: {
        quote?: Array<{
          close?: Array<number | null>
        }>
      }
    }>
  }
}

type TimeSeriesPoint = {
  close: number
  dateKey: string
  timestamp: number
}

type MarketCardPayload = {
  asOf: string
  changePercent: string
  changeValue: string
  label: string
  points: number[]
  trend: "down" | "up"
  unit?: string
  value: string
}

type MarketApiResponse = {
  quotes: {
    fx: MarketCardPayload
    gold: MarketCardPayload
  }
  stocks: {
    domestic: MarketCardPayload
    overseas: MarketCardPayload
  }
}

const yahooSymbols: Record<SymbolKey, string> = {
  domestic: "^KS11",
  overseas: "^IXIC",
  fx: "KRW=X",
  gold: "GC=F",
}

async function fetchChart(symbol: string) {
  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1mo`,
    {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; econfit/1.0)",
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Yahoo Finance ${symbol}: ${response.status}`)
  }

  const json = (await response.json()) as YahooChartResponse
  const result = json.chart.result?.[0]

  if (!result) {
    throw new Error(`Yahoo Finance ${symbol}: empty result`)
  }

  return result
}

function formatDate(timestamp: number | undefined, timeZone = "Asia/Seoul") {
  if (!timestamp) return ""

  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone,
    year: "numeric",
  }).formatToParts(new Date(timestamp * 1000))

  const year = parts.find((part) => part.type === "year")?.value ?? "0000"
  const month = parts.find((part) => part.type === "month")?.value ?? "00"
  const day = parts.find((part) => part.type === "day")?.value ?? "00"

  return `${year}.${month}.${day}`
}

function getSeriesPoints(result: Awaited<ReturnType<typeof fetchChart>>) {
  const timestamps = result.timestamp ?? []
  const closes = result.indicators?.quote?.[0]?.close ?? []

  return timestamps
    .map((timestamp, index) => {
      const close = closes[index]

      if (typeof close !== "number" || Number.isNaN(close)) {
        return null
      }

      return {
        close,
        dateKey: new Date(timestamp * 1000).toISOString().slice(0, 10),
        timestamp,
      } satisfies TimeSeriesPoint
    })
    .filter((point): point is TimeSeriesPoint => point !== null)
}

function formatSignedNumber(value: number, digits = 2) {
  const sign = value >= 0 ? "+" : "-"
  return `${sign}${Math.abs(value).toLocaleString("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })}`
}

function formatPercent(value: number) {
  return `${Math.abs(value).toFixed(2)}%`
}

function buildCard({
  asOf,
  current,
  label,
  points,
  previous,
  unit,
  valueDigits = 2,
  changeDigits = 2,
}: {
  asOf: string
  current: number
  label: string
  points: number[]
  previous: number
  unit?: string
  valueDigits?: number
  changeDigits?: number
}): MarketCardPayload {
  const change = current - previous
  const changePercent = previous === 0 ? 0 : (change / previous) * 100

  return {
    asOf,
    changePercent: formatPercent(changePercent),
    changeValue: formatSignedNumber(change, changeDigits),
    label,
    points,
    trend: change >= 0 ? "up" : "down",
    unit,
    value: current.toLocaleString("en-US", {
      maximumFractionDigits: valueDigits,
      minimumFractionDigits: valueDigits,
    }),
  }
}

function buildGoldSeries(goldSeries: TimeSeriesPoint[], fxSeries: TimeSeriesPoint[]) {
  const fxMap = new Map(fxSeries.map((point) => [point.dateKey, point.close]))

  return goldSeries
    .map((point) => {
      const fx = fxMap.get(point.dateKey)

      if (!fx) return null

      return {
        close: (point.close * fx) / OUNCE_TO_GRAM,
        dateKey: point.dateKey,
        timestamp: point.timestamp,
      } satisfies TimeSeriesPoint
    })
    .filter((point): point is TimeSeriesPoint => point !== null)
}

function pickBaseTimestamp(...timestamps: Array<number | undefined>) {
  const definedTimestamps = timestamps.filter((timestamp): timestamp is number => typeof timestamp === "number")
  return definedTimestamps.length ? Math.min(...definedTimestamps) : undefined
}

export default async function handler(_req: any, res: any) {
  try {
    const [kospi, nasdaq, fx, gold] = await Promise.all([
      fetchChart(yahooSymbols.domestic),
      fetchChart(yahooSymbols.overseas),
      fetchChart(yahooSymbols.fx),
      fetchChart(yahooSymbols.gold),
    ])

    const kospiSeries = getSeriesPoints(kospi)
    const nasdaqSeries = getSeriesPoints(nasdaq)
    const fxSeries = getSeriesPoints(fx)
    const rawGoldSeries = getSeriesPoints(gold)
    const goldSeries = buildGoldSeries(rawGoldSeries, fxSeries)

    const payload: MarketApiResponse = {
      quotes: {
        fx: buildCard({
          asOf: formatDate(fx.meta.regularMarketTime, fx.meta.exchangeTimezoneName),
          current: fx.meta.regularMarketPrice ?? fxSeries.at(-1)?.close ?? 0,
          label: "원/달러",
          points: fxSeries.slice(-16).map((point) => point.close),
          previous: fx.meta.chartPreviousClose ?? fxSeries.at(-2)?.close ?? 0,
          unit: "환율",
          valueDigits: 2,
          changeDigits: 2,
        }),
        gold: buildCard({
          asOf: formatDate(pickBaseTimestamp(fx.meta.regularMarketTime, gold.meta.regularMarketTime), "Asia/Seoul"),
          current:
            ((gold.meta.regularMarketPrice ?? rawGoldSeries.at(-1)?.close ?? 0) *
              (fx.meta.regularMarketPrice ?? fxSeries.at(-1)?.close ?? 0)) /
            OUNCE_TO_GRAM,
          label: "금(원화 환산)",
          points: goldSeries.slice(-16).map((point) => point.close),
          previous:
            ((gold.meta.chartPreviousClose ?? rawGoldSeries.at(-2)?.close ?? 0) *
              (fx.meta.chartPreviousClose ?? fxSeries.at(-2)?.close ?? 0)) /
            OUNCE_TO_GRAM,
          unit: "원/g",
          valueDigits: 0,
          changeDigits: 0,
        }),
      },
      stocks: {
        domestic: buildCard({
          asOf: formatDate(kospi.meta.regularMarketTime, kospi.meta.exchangeTimezoneName),
          current: kospi.meta.regularMarketPrice ?? kospiSeries.at(-1)?.close ?? 0,
          label: "KOSPI",
          points: kospiSeries.slice(-16).map((point) => point.close),
          previous: kospi.meta.chartPreviousClose ?? kospiSeries.at(-2)?.close ?? 0,
          valueDigits: 2,
          changeDigits: 2,
        }),
        overseas: buildCard({
          asOf: formatDate(nasdaq.meta.regularMarketTime, nasdaq.meta.exchangeTimezoneName),
          current: nasdaq.meta.regularMarketPrice ?? nasdaqSeries.at(-1)?.close ?? 0,
          label: "NASDAQ",
          points: nasdaqSeries.slice(-16).map((point) => point.close),
          previous: nasdaq.meta.chartPreviousClose ?? nasdaqSeries.at(-2)?.close ?? 0,
          valueDigits: 2,
          changeDigits: 2,
        }),
      },
    }

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=900")
    res.status(200).json(payload)
  } catch (error: any) {
    res.status(500).json({ error: error?.message ?? "market fetch failed" })
  }
}
