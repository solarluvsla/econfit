import { useEffect, useMemo, useState } from "react"
import cardImage from "../assets/img/card/card_img.png"

type StockTab = "domestic" | "overseas" | "popular"
type SavingsTab = "deposit" | "installment"
type CardTab = "credit" | "check"
type QuoteTab = "gold" | "fx"
type Trend = "up" | "down"

type MarketCardData = {
  label: string
  unit?: string
  value: string
  changeValue: string
  changePercent: string
  trend: Trend
  asOf: string
  lineColor: string
  glowColor: string
  points: number[]
}

type MarketApiResponse = {
  quotes?: Partial<Record<QuoteTab, MarketCardData>>
  stocks?: Partial<Record<Exclude<StockTab, "popular">, MarketCardData>>
}

type SavingsProduct = {
  kind: SavingsTab
  bank: string
  bankCode: string
  bankColor: string
  name: string
  rate: string
  note: string
}

const stockTabs: Array<{ key: StockTab; label: string }> = [
  { key: "domestic", label: "국내" },
  { key: "overseas", label: "해외" },
  { key: "popular", label: "인기 종목" },
]

const stockCards: Record<StockTab, MarketCardData> = {
  domestic: {
    label: "KOSPI",
    value: "6,259.31",
    changeValue: "+67.39",
    changePercent: "1.09%",
    trend: "up",
    asOf: "2024.04.20",
    lineColor: "#f57e68",
    glowColor: "rgba(245, 126, 104, 0.42)",
    points: [18, 44, 63, 52, 60, 55, 74, 126, 114, 118, 78, 85, 62, 46, 46, 46],
  },
  overseas: {
    label: "NASDAQ",
    value: "18,402.11",
    changeValue: "+204.18",
    changePercent: "1.12%",
    trend: "up",
    asOf: "2024.04.20",
    lineColor: "#6fb7ff",
    glowColor: "rgba(111, 183, 255, 0.4)",
    points: [32, 40, 52, 50, 68, 72, 70, 92, 120, 116, 124, 136, 140, 148, 146, 154],
  },
  popular: {
    label: "AI 반도체",
    value: "3,281.55",
    changeValue: "-18.22",
    changePercent: "0.55%",
    trend: "down",
    asOf: "2024.04.20",
    lineColor: "#9b8cff",
    glowColor: "rgba(155, 140, 255, 0.42)",
    points: [132, 128, 120, 124, 112, 108, 96, 104, 88, 76, 82, 70, 72, 64, 60, 54],
  },
}

const savingsTabs: Array<{ key: SavingsTab; label: string }> = [
  { key: "deposit", label: "예금" },
  { key: "installment", label: "적금" },
]

const savingsProducts: SavingsProduct[] = [
  {
    kind: "deposit",
    bank: "토스뱅크",
    bankCode: "T",
    bankColor: "#ff6b57",
    name: "토스 먼저 이자 받는 예금",
    rate: "최고 3.50%",
    note: "기본 3.00% / 3개월",
  },
  {
    kind: "deposit",
    bank: "광주은행",
    bankCode: "GJ",
    bankColor: "#ff6a3d",
    name: "행운예금",
    rate: "최고 3.40%",
    note: "기본 3.20% / 12개월",
  },
  {
    kind: "deposit",
    bank: "케이뱅크",
    bankCode: "K",
    bankColor: "#5d7dff",
    name: "코드K 정기예금",
    rate: "최고 3.35%",
    note: "기본 3.15% / 12개월",
  },
  {
    kind: "installment",
    bank: "신한은행",
    bankCode: "S",
    bankColor: "#4c8cf5",
    name: "신한 안녕, 반가워 적금",
    rate: "최고 3.40%",
    note: "기본 3.10% / 12개월",
  },
  {
    kind: "installment",
    bank: "IBK기업은행",
    bankCode: "IBK",
    bankColor: "#335dcb",
    name: "IBK 중기근로자 우대적금",
    rate: "최고 3.30%",
    note: "기본 3.00% / 12개월",
  },
  {
    kind: "installment",
    bank: "수협은행",
    bankCode: "SH",
    bankColor: "#6e95ff",
    name: "Sh 월복리 자유적금",
    rate: "최고 3.25%",
    note: "기본 2.95% / 12개월",
  },
]

const cardTabs: Array<{ key: CardTab; label: string }> = [
  { key: "credit", label: "신용" },
  { key: "check", label: "체크" },
]

const cardContent: Record<
  CardTab,
  {
    title: string
    benefitTitle: string
    benefitBody: string
    buttonLabel: string
  }
> = {
  credit: {
    title: "AI 구독비, 어떻게 줄일 수 있을까?",
    benefitTitle: "카드의정석 SHOPPING+",
    benefitBody: "정기결제와 쇼핑 영역을 묶어 할인받는 추천 카드",
    buttonLabel: "혜택 자세히 보기",
  },
  check: {
    title: "고정 지출 관리, 체크카드로 더 쉬워질까?",
    benefitTitle: "오늘의 생활 체크",
    benefitBody: "생활비 카테고리를 중심으로 캐시백을 챙기는 카드",
    buttonLabel: "체크 혜택 보기",
  },
}

const quoteTabs: Array<{ key: QuoteTab; label: string }> = [
  { key: "gold", label: "금" },
  { key: "fx", label: "외화" },
]

const quoteCards: Record<QuoteTab, MarketCardData> = {
  gold: {
    label: "금(원화 환산)",
    unit: "원/g",
    value: "227,240",
    changeValue: "-760",
    changePercent: "0.33%",
    trend: "down",
    asOf: "2024.04.20",
    lineColor: "#73d38c",
    glowColor: "rgba(115, 211, 140, 0.34)",
    points: [136, 110, 92, 98, 84, 94, 90, 86, 92, 96, 70, 44, 58, 56, 88, 80, 96, 108, 108, 108],
  },
  fx: {
    label: "원/달러",
    unit: "환율",
    value: "1,384.20",
    changeValue: "+6.10",
    changePercent: "0.44%",
    trend: "up",
    asOf: "2024.04.20",
    lineColor: "#f0c75d",
    glowColor: "rgba(240, 199, 93, 0.34)",
    points: [62, 70, 74, 72, 80, 96, 92, 104, 110, 118, 112, 120, 128, 124, 132, 138, 136, 142],
  },
}

function buildChartPath(points: number[], width: number, height: number, padding = 18) {
  if (!points.length) {
    return {
      areaPath: "",
      lastPoint: { x: width - padding, y: height - padding },
      linePath: "",
    }
  }

  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const usableWidth = width - padding * 2
  const usableHeight = height - padding * 2
  const step = points.length > 1 ? usableWidth / (points.length - 1) : usableWidth

  const scaledPoints = points.map((point, index) => {
    const x = padding + step * index
    const y = height - padding - ((point - min) / range) * usableHeight
    return { x, y }
  })

  const linePath =
    scaledPoints.length < 3
      ? scaledPoints.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ")
      : scaledPoints.reduce((path, point, index, allPoints) => {
          if (index === 0) {
            return `M${point.x} ${point.y}`
          }

          const previous = allPoints[index - 1]
          const controlX = (previous.x + point.x) / 2
          return `${path} Q${controlX} ${previous.y}, ${point.x} ${point.y}`
        }, "")

  const firstPoint = scaledPoints[0]
  const lastPoint = scaledPoints[scaledPoints.length - 1]
  const areaPath = `${linePath} L${lastPoint.x} ${height - padding / 2} L${firstPoint.x} ${height - padding / 2} Z`

  return { areaPath, lastPoint, linePath }
}

function getChartPalette(tone: "warm" | "cool", trend: Trend) {
  if (tone === "warm") {
    return trend === "up"
      ? {
          glowColor: "rgba(245, 126, 104, 0.42)",
          pointColor: "#ffb09e",
          strokeColor: "#f57e68",
        }
      : {
          glowColor: "rgba(123, 182, 255, 0.38)",
          pointColor: "#b3d8ff",
          strokeColor: "#7bb6ff",
        }
  }

  return trend === "up"
    ? {
        glowColor: "rgba(240, 199, 93, 0.34)",
        pointColor: "#ffe59a",
        strokeColor: "#f0c75d",
      }
    : {
        glowColor: "rgba(115, 211, 140, 0.34)",
        pointColor: "#baf0c6",
        strokeColor: "#73d38c",
      }
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="finance-mobile-section-head">
      <h2>{title}</h2>
      <button type="button" className="finance-mobile-link">
        자세히 보기
      </button>
    </div>
  )
}

function PillTabs<T extends string>({
  items,
  value,
  onChange,
}: {
  items: Array<{ key: T; label: string }>
  value: T
  onChange: (nextValue: T) => void
}) {
  return (
    <div className="finance-mobile-pills" role="tablist">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={item.key === value ? "finance-mobile-pill is-active" : "finance-mobile-pill"}
          onClick={() => onChange(item.key)}
          aria-pressed={item.key === value}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

function MarketChartCard({ data, tone }: { data: MarketCardData; tone: "warm" | "cool" }) {
  const chart = useMemo(() => buildChartPath(data.points, 320, 150, 18), [data.points])
  const palette = useMemo(() => getChartPalette(tone, data.trend), [tone, data.trend])
  const gradientId = useMemo(
    () => `finance-grad-${tone}-${data.label.replace(/\s+/g, "-")}-${data.trend}`,
    [data.label, data.trend, tone]
  )

  return (
    <article className={`finance-mobile-market-card finance-mobile-market-card--${tone}`}>
      <svg
        viewBox="0 0 320 150"
        className="finance-mobile-chart"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={palette.glowColor} />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </linearGradient>
        </defs>
        <path d={chart.areaPath} fill={`url(#${gradientId})`} />
        <path
          d={chart.linePath}
          fill="none"
          stroke={palette.strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={chart.lastPoint.x} cy={chart.lastPoint.y} r="4" fill={palette.pointColor} />
      </svg>

      <div className="finance-mobile-market-copy">
        <div className="finance-mobile-market-label">
          <strong>{data.label}</strong>
          {data.unit && <span>{data.unit}</span>}
        </div>
        <div className="finance-mobile-market-value">{data.value}</div>
        <div
          className={
            data.trend === "up"
              ? "finance-mobile-market-change is-up"
              : "finance-mobile-market-change is-down"
          }
        >
          <span>{data.trend === "up" ? "▲" : "▼"}</span>
          <span>
            {data.changeValue}({data.changePercent})
          </span>
        </div>
      </div>

      <p className="finance-mobile-market-date">데이터 기준일: {data.asOf}</p>
    </article>
  )
}

export default function FinancePage() {
  const [selectedStockTab, setSelectedStockTab] = useState<StockTab>("domestic")
  const [selectedSavingsTab, setSelectedSavingsTab] = useState<SavingsTab>("deposit")
  const [selectedCardTab, setSelectedCardTab] = useState<CardTab>("credit")
  const [selectedQuoteTab, setSelectedQuoteTab] = useState<QuoteTab>("gold")
  const [stockCardsState, setStockCardsState] = useState(stockCards)
  const [quoteCardsState, setQuoteCardsState] = useState(quoteCards)

  const savingsList = useMemo(
    () => savingsProducts.filter((product) => product.kind === selectedSavingsTab),
    [selectedSavingsTab]
  )

  const selectedCard = cardContent[selectedCardTab]

  useEffect(() => {
    let isMounted = true

    fetch("/api/market")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`market api ${response.status}`)
        }

        return response.json() as Promise<MarketApiResponse>
      })
      .then((data) => {
        if (!isMounted) return

        if (data.stocks) {
          setStockCardsState((current) => ({
            ...current,
            domestic: data.stocks?.domestic ? { ...current.domestic, ...data.stocks.domestic } : current.domestic,
            overseas: data.stocks?.overseas ? { ...current.overseas, ...data.stocks.overseas } : current.overseas,
          }))
        }

        if (data.quotes) {
          setQuoteCardsState((current) => ({
            ...current,
            gold: data.quotes?.gold ? { ...current.gold, ...data.quotes.gold } : current.gold,
            fx: data.quotes?.fx ? { ...current.fx, ...data.quotes.fx } : current.fx,
          }))
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="page-screen finance-screen finance-screen--market">
      <div className="finance-mobile-status" aria-hidden="true">
        <span>9:41</span>
        <div className="finance-mobile-status-icons">
          <span className="finance-mobile-signal">
            <i />
            <i />
            <i />
          </span>
          <span className="finance-mobile-wifi" />
          <span className="finance-mobile-battery">
            <span className="finance-mobile-battery-level" />
          </span>
        </div>
      </div>

      <header className="finance-mobile-hero">
        <p className="finance-mobile-level">Lv.3 초보 투자자</p>
        <div className="finance-mobile-hero-row">
          <div>
            <h1>반가워요, 소정님! 👋</h1>
          </div>
          <button type="button" className="finance-mobile-settings" aria-label="설정">
            <SettingsIcon />
          </button>
        </div>
      </header>

      <section className="finance-mobile-section">
        <SectionHeader title="주식" />
        <PillTabs items={stockTabs} value={selectedStockTab} onChange={setSelectedStockTab} />
        <MarketChartCard data={stockCardsState[selectedStockTab]} tone="warm" />
      </section>

      <section className="finance-mobile-section">
        <SectionHeader title="예/적금" />
        <PillTabs items={savingsTabs} value={selectedSavingsTab} onChange={setSelectedSavingsTab} />
        <div className="finance-mobile-savings-list">
          {savingsList.map((product) => (
            <article key={product.name} className="finance-mobile-savings-item">
              <div className="finance-mobile-savings-main">
                <span
                  className="finance-mobile-bank-badge"
                  style={{ backgroundColor: product.bankColor }}
                  aria-hidden="true"
                >
                  {product.bankCode}
                </span>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.bank}</p>
                </div>
              </div>
              <div className="finance-mobile-savings-rate">
                <strong>{product.rate}</strong>
                <span>{product.note}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="finance-mobile-disclaimer">
          금융상품과 금통위 소식은 게시일 정보 또는 금융사 사정에 따라 변경될 수 있습니다.
        </p>
      </section>

      <section className="finance-mobile-section">
        <div className="finance-mobile-section-head">
          <h2>카드 혜택</h2>
        </div>
        <PillTabs items={cardTabs} value={selectedCardTab} onChange={setSelectedCardTab} />

        <article className="finance-mobile-promo-card">
          <strong>{selectedCard.title}</strong>
          <button type="button">자세한 내용 확인하기</button>
        </article>

        <article className="finance-mobile-card-showcase">
          <div className="finance-mobile-card-title">
            <span className="finance-mobile-card-icon">
              <CardStarIcon />
            </span>
            <div>
              <h3>{selectedCard.benefitTitle}</h3>
              <p>{selectedCard.benefitBody}</p>
            </div>
          </div>

          <div className="finance-mobile-card-visual">
            <img src={cardImage} alt={selectedCard.benefitTitle} />
          </div>
        </article>

        <button type="button" className="finance-mobile-cta">
          {selectedCard.buttonLabel}
        </button>
      </section>

      <section className="finance-mobile-section">
        <SectionHeader title="금/환율" />
        <PillTabs items={quoteTabs} value={selectedQuoteTab} onChange={setSelectedQuoteTab} />
        <MarketChartCard data={quoteCardsState[selectedQuoteTab]} tone="cool" />
      </section>
    </div>
  )
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 8.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7Zm8 3.5l-1.7-.56a6.74 6.74 0 0 0-.56-1.36l.82-1.6l-1.6-1.6l-1.6.82c-.43-.23-.89-.42-1.36-.56L14 3h-4l-.56 1.7c-.47.14-.93.33-1.36.56l-1.6-.82l-1.6 1.6l.82 1.6c-.23.43-.42.89-.56 1.36L3 12l1.7.56c.14.47.33.93.56 1.36l-.82 1.6l1.6 1.6l1.6-.82c.43.23.89.42 1.36.56L10 21h4l.56-1.7c.47-.14.93-.33 1.36-.56l1.6.82l1.6-1.6l-.82-1.6c.23-.43.42-.89.56-1.36L20 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CardStarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.5 5.5h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m12 8.2.85 1.72 1.9.28-1.38 1.34.33 1.88L12 12.5l-1.7.92.33-1.88-1.38-1.34 1.9-.28L12 8.2Z"
        fill="currentColor"
      />
    </svg>
  )
}
