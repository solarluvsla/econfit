import type { ReactNode } from "react"
import { useState } from "react"
import type { PageKey } from "../types/navigation"

type Props = {
  onNavigate: (page: PageKey) => void
}

type ChallengeItem = {
  id: string
  label: string
  title: string
  reward: number
  progress: number
  total: number
  icon: ReactNode
  startPage: "learn" | "finance"
  accent?: "yellow"
}

const financeCategories = ["전체", "주식", "카드 혜택", "예적금", "금융 뉴스"]

const communityPosts = [
  { badge: "부동산", title: "서울 아파트 경매 물건이 늘고 있어요. 지금은 어떤 흐름일까요?" },
  { badge: "Q&A", title: "첫 적금 추천 부탁드려요. 월 30만 원 정도로 시작해보려 합니다." },
]

const challengeItems: ChallengeItem[] = [
  {
    id: "attendance",
    label: "출석",
    title: "7일 연속 학습하기",
    reward: 35,
    progress: 3,
    total: 7,
    icon: <FlameIcon />,
    startPage: "learn",
  },
  {
    id: "content",
    label: "콘텐츠",
    title: "경제 콘텐츠 1개 보기",
    reward: 50,
    progress: 1,
    total: 1,
    icon: <BookIcon />,
    startPage: "learn",
    accent: "yellow",
  },
  {
    id: "news",
    label: "뉴스",
    title: "뉴스 해설 2개 읽기",
    reward: 20,
    progress: 0,
    total: 2,
    icon: <NewsIcon />,
    startPage: "finance",
  },
  {
    id: "dictionary",
    label: "용어",
    title: "용어 3개 학습하기",
    reward: 15,
    progress: 0,
    total: 3,
    icon: <BrainIcon />,
    startPage: "learn",
  },
  {
    id: "quiz",
    label: "퀴즈",
    title: "퀴즈 2문제 맞추기",
    reward: 30,
    progress: 0,
    total: 2,
    icon: <TargetIcon />,
    startPage: "learn",
  },
]

export default function HomePage({ onNavigate }: Props) {
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false)
  const [selectedChallengeId, setSelectedChallengeId] = useState(challengeItems[0].id)

  const selectedChallenge =
    challengeItems.find((item) => item.id === selectedChallengeId) ?? challengeItems[0]

  const openChallengeModal = (challengeId: string) => {
    setSelectedChallengeId(challengeId)
    setIsChallengeModalOpen(true)
  }

  const closeChallengeModal = () => {
    setIsChallengeModalOpen(false)
  }

  const startSelectedChallenge = () => {
    setIsChallengeModalOpen(false)
    onNavigate(selectedChallenge.startPage)
  }

  return (
    <div className="page-screen home-screen">
      <div className="home-statusbar" aria-hidden="true">
        <span>9:41</span>
        <div className="home-status-icons">
          <span className="home-signal">
            <i />
            <i />
            <i />
          </span>
          <span className="home-wifi" />
          <span className="home-battery">
            <span className="home-battery-level" />
          </span>
        </div>
      </div>

      <section className="home-hero">
        <div className="home-greeting">
          <div>
            <h1>안녕하세요</h1>
            <p>소정님의 오늘 금융 루틴을 시작해볼까요?</p>
          </div>
          <button type="button" className="home-settings" aria-label="설정">
            <SettingsIcon />
          </button>
        </div>

        <div className="home-profile-card">
          <div className="home-profile-badge" aria-hidden="true">
            <TrendIcon />
          </div>

          <div className="home-profile-content">
            <strong className="home-profile-name">김소정님</strong>
            <div className="home-level-pill">
              <CrownIcon />
              <span>Lv.3 초보 투자자</span>
            </div>

            <div className="home-stat-grid">
              <div>
                <span>학습일</span>
                <strong>7일</strong>
              </div>
              <div>
                <span>완료</span>
                <strong>20개</strong>
              </div>
              <div>
                <span>포인트</span>
                <strong className="home-stat-accent">1,050P</strong>
              </div>
            </div>

            <div className="home-card-divider" />

            <div className="home-card-heading">오늘의 챌린지</div>
            <div className="home-challenge-grid">
              {challengeItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="home-challenge-item"
                  onClick={() => openChallengeModal(item.id)}
                >
                  <span className="home-challenge-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <button type="button" className="home-primary-action" onClick={() => onNavigate("learn")}>
              학습 시작하기
            </button>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <h2>오늘의 금융</h2>
          <button type="button" className="home-link-button" onClick={() => onNavigate("finance")}>
            자세히 보기
          </button>
        </div>

        <div className="home-tabs" role="tablist" aria-label="금융 카테고리">
          {financeCategories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={index === 0 ? "home-tab active" : "home-tab"}
              onClick={() => onNavigate("finance")}
            >
              {category}
            </button>
          ))}
        </div>

        <button type="button" className="home-market-card" onClick={() => onNavigate("finance")}>
          <div className="home-market-chart" aria-hidden="true">
            <svg viewBox="0 0 320 170" className="home-market-svg">
              <defs>
                <linearGradient id="marketArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(247, 118, 92, 0.45)" />
                  <stop offset="100%" stopColor="rgba(247, 118, 92, 0)" />
                </linearGradient>
              </defs>
              <path
                d="M24 132 L50 102 L60 107 L72 94 L80 97 L90 88 L100 93 L112 83 L124 90 L140 87 L164 79 L182 82 L196 95 L214 78 L226 56 L236 64 L244 59 L254 68 L274 69 L284 92 L292 84 L308 96"
                fill="none"
                stroke="#ef7a63"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24 132 L50 102 L60 107 L72 94 L80 97 L90 88 L100 93 L112 83 L124 90 L140 87 L164 79 L182 82 L196 95 L214 78 L226 56 L236 64 L244 59 L254 68 L274 69 L284 92 L292 84 L308 96 L308 150 L24 150 Z"
                fill="url(#marketArea)"
              />
            </svg>
          </div>

          <div className="home-market-meta">
            <strong>KOSPI</strong>
            <div className="home-market-value">2,967.75</div>
            <div className="home-market-change">▲ +2.74%</div>
          </div>
        </button>

        <p className="home-market-date">데이터 기준일: 2026.06.30</p>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <h2>커뮤니티</h2>
          <button type="button" className="home-link-button">
            자세히 보기
          </button>
        </div>

        <div className="home-community-list">
          {communityPosts.map((post) => (
            <button key={post.title} type="button" className="home-community-item">
              <span className="home-community-badge">{post.badge}</span>
              <span className="home-community-title">{post.title}</span>
            </button>
          ))}
        </div>
      </section>

      {isChallengeModalOpen && (
        <div className="challenge-modal-overlay" role="presentation" onClick={closeChallengeModal}>
          <div
            className="challenge-modal-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="challenge-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="challenge-modal-head">
              <button
                type="button"
                className="challenge-modal-back"
                aria-label="모달 닫기"
                onClick={closeChallengeModal}
              >
                <BackArrowIcon />
              </button>
              <h2 id="challenge-modal-title">오늘의 챌린지</h2>
              <span className="challenge-modal-head-spacer" aria-hidden="true" />
            </div>

            <div className="challenge-modal-list">
              {challengeItems.map((item) => {
                const progressPercent = Math.min(100, (item.progress / item.total) * 100)
                const isSelected = item.id === selectedChallengeId

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={isSelected ? "challenge-mission-item active" : "challenge-mission-item"}
                    onClick={() => setSelectedChallengeId(item.id)}
                  >
                    <div
                      className={
                        item.accent === "yellow"
                          ? "challenge-mission-icon challenge-mission-icon--yellow"
                          : "challenge-mission-icon"
                      }
                    >
                      {item.icon}
                    </div>

                    <div className="challenge-mission-copy">
                      <div className="challenge-mission-title-row">
                        <h3>{item.title}</h3>
                        <ChevronRightIcon />
                      </div>
                      <span className="challenge-mission-progress-text">
                        {item.progress}/{item.total}
                      </span>
                      <div className="challenge-mission-track" aria-hidden="true">
                        <span className="challenge-mission-value" style={{ width: `${progressPercent}%` }} />
                      </div>
                    </div>

                    <strong className="challenge-mission-reward">+{item.reward}P</strong>
                  </button>
                )
              })}
            </div>

            <button type="button" className="challenge-modal-cta" onClick={startSelectedChallenge}>
              미션 시작하기
            </button>
          </div>
        </div>
      )}
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

function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 16.5h14M8.5 13.5l3-3l2.5 2.5l3.5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17.5 8H19v1.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 8.5l4.5 4L12 6l3.5 6.5L20 8.5l-1.5 8h-13Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M13.5 3.5c.4 2.2-.8 3.4-2 4.8c-1.7 1.9-3.5 3.8-3.5 6.3A4.98 4.98 0 0 0 13 19.5a5 5 0 0 0 4.6-7.2c-.8-1.7-2.2-2.8-2.8-4.2c-.4-.9-.6-1.8-1.3-4.6Z"
        fill="currentColor"
      />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 5.5h6a3 3 0 0 1 3 3v10H8a3 3 0 0 0-3 3Zm14 0h-6a3 3 0 0 0-3 3v10h6a3 3 0 0 1 3 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NewsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 4.5h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Zm2.5 4h5m-5 4h5m-5 4h3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 4.5v4h-2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9 7a3 3 0 0 1 6 0a2.5 2.5 0 0 1 2.5 2.5A2.5 2.5 0 0 1 18 14a3 3 0 0 1-3 5h-1.5M15 7v10M9 7v10M9 17H8a3 3 0 0 1-3-3a2.5 2.5 0 0 1-.5-4.5A2.5 2.5 0 0 1 7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" />
    </svg>
  )
}

function BackArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14.5 5.5L8 12l6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9.5 5.5L16 12l-6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
