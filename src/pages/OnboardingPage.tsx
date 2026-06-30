import { useEffect, useState } from "react"
import splashImage from "../assets/img/onboarding/splah.svg"
import studyImage from "../assets/img/onboarding/onboarding_img1.png"
import growthImage from "../assets/img/onboarding/onboarding_img2.png"

type Props = {
  onComplete: () => void
}

type TitleLine = {
  text: string
  accent?: boolean
}

type Slide =
  | {
      kind: "splash"
    }
  | {
      kind: "content"
      title: TitleLine[]
      description: string[]
      visual: "study" | "cards" | "growth"
      ctaLabel?: string
    }

const slides: Slide[] = [
  {
    kind: "splash",
  },
  {
    kind: "content",
    title: [{ text: "경제를 배우면" }, { text: "세상이 보입니다" }],
    description: ["어려운 경제, 이제 쉽고 재밌게", "시작해보세요."],
    visual: "study",
  },
  {
    kind: "content",
    title: [{ text: "짧게, 꾸준히," }, { text: "실력을 확실하게" }],
    description: ["하루 3분 학습으로 경제 지식을 쌓고", "실생활에 바로 활용해요."],
    visual: "cards",
  },
  {
    kind: "content",
    title: [{ text: "지금 시작하고" }, { text: "똑똑한 습관을", accent: true }, { text: "만드세요!" }],
    description: ["학습도, 자산도", "매일 성장하는 경험을 함께하세요."],
    visual: "growth",
    ctaLabel: "시작하기",
  },
]

export default function OnboardingPage({ onComplete }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slide = slides[currentSlide]

  useEffect(() => {
    if (currentSlide !== 0) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setCurrentSlide(1)
    }, 1400)

    return () => window.clearTimeout(timer)
  }, [currentSlide])

  const goToSlide = (nextIndex: number) => {
    setCurrentSlide(nextIndex)
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))
  }

  if (slide.kind === "splash") {
    return (
      <div className="page-screen onboarding-screen onboarding-screen--splash" onClick={() => goToSlide(1)}>
        <div className="onboarding-splash-mark">
          <div className="onboarding-splash-logo-wrap">
            <img src={splashImage} alt="EconFit" className="onboarding-splash-logo" />
            <span className="onboarding-splash-arrow" aria-hidden="true" />
          </div>
        </div>
      </div>
    )
  }

  const contentIndex = currentSlide - 1
  const indicatorCount = slides.length - 1
  const isLastSlide = currentSlide === slides.length - 1

  return (
    <div className="page-screen onboarding-screen">
      <div className="onboarding-topbar">
        <button className="onboarding-skip" onClick={onComplete}>
          건너뛰기
        </button>
      </div>

      <div className="onboarding-body" onClick={!isLastSlide ? goToNextSlide : undefined}>
        <div className="onboarding-copy">
          <h1 className="onboarding-title">
            {slide.title.map((line) => (
              <span
                key={line.text}
                className={line.accent ? "onboarding-title-line onboarding-title-line--accent" : "onboarding-title-line"}
              >
                {line.text}
              </span>
            ))}
          </h1>
          <div className="onboarding-description">
            {slide.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        {slide.visual === "study" && (
          <div className="onboarding-visual onboarding-visual--study">
            <img src={studyImage} alt="경제를 공부하는 캐릭터" className="onboarding-image onboarding-image--study" />
          </div>
        )}

        {slide.visual === "cards" && (
          <div className="onboarding-visual onboarding-visual--cards">
            <article className="onboarding-info-card">
              <div className="onboarding-card-row">
                <div>
                  <span className="onboarding-badge">3일 연속</span>
                  <strong>오늘의 학습</strong>
                  <p>금리란 무엇일까?</p>
                </div>
                <span className="onboarding-card-icon">📘</span>
              </div>
            </article>

            <article className="onboarding-info-card">
              <div className="onboarding-card-row">
                <div>
                  <strong>오늘의 퀴즈</strong>
                  <p className="onboarding-points">+10P</p>
                </div>
                <span className="onboarding-card-icon">◎</span>
              </div>
            </article>

            <article className="onboarding-info-card onboarding-info-card--progress">
              <span className="onboarding-progress-label">학습 진행률</span>
              <div className="onboarding-progress-row">
                <strong>Lv.3</strong>
                <span>다음 레벨까지 60%</span>
              </div>
              <div className="onboarding-progress-track">
                <span className="onboarding-progress-value" />
              </div>
            </article>
          </div>
        )}

        {slide.visual === "growth" && (
          <div className="onboarding-visual onboarding-visual--growth">
            <img src={growthImage} alt="성장 그래프와 코인 일러스트" className="onboarding-image onboarding-image--growth" />
          </div>
        )}
      </div>

      <div className="onboarding-footer">
        {slide.ctaLabel && (
          <button className="onboarding-cta" onClick={onComplete}>
            {slide.ctaLabel}
          </button>
        )}

        <div className="onboarding-indicators" aria-label="온보딩 진행 상태">
          {Array.from({ length: indicatorCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === contentIndex ? "onboarding-indicator active" : "onboarding-indicator"}
              onClick={() => goToSlide(index + 1)}
              aria-label={`${index + 1}번째 온보딩 화면`}
            />
          ))}
        </div>
        <div className="onboarding-home-indicator" />
      </div>
    </div>
  )
}
