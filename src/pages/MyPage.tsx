import { useState } from "react"
import "./MyPage.css"

type StoreCategory = "all" | "recommend" | "cafe" | "gifticon" | "other"

type Props = {
  onLogout: () => void
}

const activityStats = [
  { label: "나가는 퀴즈", value: "12" },
  { label: "저축일", value: "28" },
  { label: "절약 포인트", value: "1,050P", highlight: true },
]

const streakDays = [
  { day: "06", label: "월", active: true },
  { day: "07", label: "화", active: true },
  { day: "08", label: "수", active: true },
  { day: "09", label: "목" },
  { day: "10", label: "금" },
  { day: "11", label: "토" },
  { day: "12", label: "일" },
]

const studyRecords = [
  { title: "금리란 무엇일까?", tag: "경제 기초", date: "2026.04.04", points: "+20P" },
  { title: "ETF 투자 전략", tag: "주식", date: "2026.04.03", points: "+10P" },
  { title: "환율의 이해", tag: "금융", date: "2026.04.02", points: "+20P" },
]

const rewardHistory = [
  { title: "일일 학습 완료", date: "2026.04.04", points: "+20P" },
  { title: "7일 연속 학습 보너스", date: "2026.04.03", points: "+100P" },
  { title: "스타벅스 기프티콘 교환", date: "2026.04.02", points: "-500P", redeemed: true },
  { title: "퀴즈 정답", date: "2026.04.01", points: "+30P" },
]

const storeCategories: Array<{ key: StoreCategory; label: string }> = [
  { key: "all", label: "전체" },
  { key: "recommend", label: "추천" },
  { key: "cafe", label: "카페" },
  { key: "gifticon", label: "상품권" },
  { key: "other", label: "기타" },
]

const settingsItems = ["알림설정", "개인정보 관리", "고객센터"]

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.25 5.75 9 12l6.25 6.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 3.75 1.19 1.34a2.4 2.4 0 0 0 2.29.68l1.74-.48.83 1.45-1.03 1.5c-.4.57-.47 1.31-.19 1.95l.72 1.64-.72 1.64c-.28.64-.21 1.38.19 1.95l1.03 1.5-.83 1.45-1.74-.48a2.4 2.4 0 0 0-2.29.68L12 20.25l-1.19-1.34a2.4 2.4 0 0 0-2.29-.68l-1.74.48-.83-1.45 1.03-1.5c.4-.57.47-1.31.19-1.95l-.72-1.64.72-1.64c.28-.64.21-1.38-.19-1.95l-1.03-1.5.83-1.45 1.74.48a2.4 2.4 0 0 0 2.29-.68L12 3.75Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="2.7" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.5 5.5h8.5a2.5 2.5 0 0 1 2.5 2.5v9.5H8.5A2.5 2.5 0 0 0 6 18V6a.5.5 0 0 1 .5-.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M8.5 17.5H18v1H8.5A2.5 2.5 0 0 1 6 16V6" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="6.5" width="14" height="12.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 4.8v3.1M16 4.8v3.1M5 10h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  )
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.75 9.5h14.5v9.25a1.5 1.5 0 0 1-1.5 1.5H6.25a1.5 1.5 0 0 1-1.5-1.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.75 8A1.75 1.75 0 0 1 5.5 6.25h13A1.75 1.75 0 0 1 20.25 8v1.5H3.75Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 6.25v14M8.25 6.25c-.9 0-1.75-.66-1.75-1.56 0-.96.81-1.69 1.84-1.69 1.77 0 3.66 3.25 3.66 3.25S10.17 6.25 8.25 6.25Zm7.5 0c.9 0 1.75-.66 1.75-1.56 0-.96-.81-1.69-1.84-1.69-1.77 0-3.66 3.25-3.66 3.25s1.83 0 3.75 0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m10 6 6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

function MobileIndicators() {
  return (
    <div className="mypage-mobile-indicators" aria-hidden="true">
      <span className="mypage-mobile-signal">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="mypage-mobile-wifi" />
      <span className="mypage-mobile-battery">
        <span className="mypage-mobile-battery-level" />
      </span>
    </div>
  )
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle: string
  action?: string
}) {
  return (
    <div className="mypage-section-header">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {action ? (
        <button type="button" className="mypage-section-action">
          {action}
        </button>
      ) : null}
    </div>
  )
}

export default function MyPage({ onLogout }: Props) {
  const [storeCategory, setStoreCategory] = useState<StoreCategory>("all")

  return (
    <div className="page-screen mypage-mobile-screen">
      <header className="mypage-mobile-hero">
        <div className="mypage-mobile-status">
          <span>9:41</span>
          <MobileIndicators />
        </div>

        <div className="mypage-mobile-topbar">
          <button type="button" className="mypage-icon-button" aria-label="뒤로가기">
            <BackIcon />
          </button>
          <h1>마이페이지</h1>
          <button type="button" className="mypage-icon-button mypage-icon-button--light" aria-label="설정">
            <GearIcon />
          </button>
        </div>
      </header>

      <div className="mypage-mobile-body">
        <section className="mypage-section">
          <SectionHeader title="나의 활동" subtitle="" />
          <div className="mypage-activity-card">
            {activityStats.map((item) => (
              <article key={item.label} className="mypage-activity-stat">
                <span>{item.label}</span>
                <strong className={item.highlight ? "is-highlight" : undefined}>{item.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="mypage-section">
          <SectionHeader title="학습 레벨 및 진행량" subtitle="다음 레벨까지 얼마나 남았을까요?" />
          <div className="mypage-card-stack">
            <article className="mypage-progress-card">
              <div className="mypage-progress-summary">
                <div className="mypage-level-chip">
                  <span className="mypage-level-badge">Q</span>
                  <div>
                    <strong>Level 3</strong>
                    <span>초보 투자자</span>
                  </div>
                </div>
                <strong className="mypage-progress-percent">82%</strong>
              </div>
              <div className="mypage-progress-track" aria-hidden="true">
                <span className="mypage-progress-fill" />
              </div>
              <div className="mypage-progress-meta">
                <span>2,450 / 3,000 XP</span>
                <span>550 XP만 더 모으면 Level 4!</span>
              </div>
            </article>

            <article className="mypage-streak-card">
              <div className="mypage-streak-head">
                <strong>3일 연속 학습 중!</strong>
              </div>
              <div className="mypage-streak-days">
                {streakDays.map((item) => (
                  <div key={item.day} className={item.active ? "mypage-streak-day is-active" : "mypage-streak-day"}>
                    <strong>{item.day}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="mypage-section">
          <SectionHeader title="학습 기록" subtitle="최근에 완료한 학습" action="전체보기 >" />
          <div className="mypage-list-card">
            {studyRecords.map((item) => (
              <article key={item.title} className="mypage-list-row">
                <div className="mypage-list-icon">
                  <BookIcon />
                </div>
                <div className="mypage-list-copy">
                  <strong>{item.title}</strong>
                  <div className="mypage-list-meta">
                    <span className="mypage-tag">{item.tag}</span>
                    <span className="mypage-date">
                      <CalendarIcon />
                      {item.date}
                    </span>
                  </div>
                </div>
                <span className="mypage-points">{item.points}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="mypage-section">
          <SectionHeader title="리워드 히스토리" subtitle="포인트 사용 내역" action="전체보기 >" />
          <div className="mypage-list-card">
            {rewardHistory.map((item) => (
              <article key={item.title} className="mypage-list-row">
                <div className="mypage-list-icon">
                  {item.redeemed ? <GiftIcon /> : <CalendarIcon />}
                </div>
                <div className="mypage-list-copy">
                  <strong>{item.title}</strong>
                  <div className="mypage-list-meta">
                    <span className="mypage-date">{item.date}</span>
                  </div>
                </div>
                <span className={item.redeemed ? "mypage-points is-minus" : "mypage-points"}>{item.points}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="mypage-section">
          <SectionHeader title="리워드 스토어" subtitle="" />
          <div className="mypage-store-card">
            <div className="mypage-store-tabs" role="tablist" aria-label="리워드 카테고리">
              {storeCategories.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={storeCategory === item.key ? "mypage-store-tab is-active" : "mypage-store-tab"}
                  onClick={() => setStoreCategory(item.key)}
                  aria-pressed={storeCategory === item.key}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mypage-store-product">
              <div className="mypage-store-visual" aria-hidden="true">
                <span>☕</span>
              </div>
              <strong>스타벅스 아메리카노</strong>
              <span>500P</span>
            </div>

            <button type="button" className="mypage-store-button">
              교환하기
            </button>
          </div>
        </section>

        <section className="mypage-section">
          <SectionHeader title="설정" subtitle="" />
          <div className="mypage-settings-card">
            {settingsItems.map((item) => (
              <button key={item} type="button" className="mypage-setting-row">
                <span className="mypage-setting-main">
                  <span className="mypage-list-icon mypage-list-icon--small">
                    <CalendarIcon />
                  </span>
                  <span>{item}</span>
                </span>
                <span className="mypage-setting-arrow">
                  <ChevronIcon />
                </span>
              </button>
            ))}
          </div>
        </section>

        <button type="button" className="mypage-logout-button" onClick={onLogout}>
          로그아웃
        </button>
      </div>
    </div>
  )
}
