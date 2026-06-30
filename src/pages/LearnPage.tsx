const learningSections = {
  content: {
    badge: "초급",
    duration: "3분",
    title: "금리가 오르면 내 지갑은?",
  },
  news: {
    title: "3월 소비자물가 2.2% 상승",
    time: "23분",
    summary:
      "2월보다 생활 물가가 더 올랐습니다. 과일, 가공식품, 외식비 흐름을 함께 살펴봅니다.",
  },
  dictionary: {
    badge: "중급",
    title: "소비자물가상승률 (CPI Inflation)",
    summary:
      "가장 기본이 되는 지표입니다. 소비자가 일상생활을 위해 구매하는 상품과 서비스의 가격이 작년 같은 달과 비교해 얼마나 변했는지를 나타냅니다.",
  },
  course: {
    title: "주식 투자 기초",
    subtitle: "주식이 처음이라면 여기서 시작",
    progress: 60,
  },
}

function SectionDots() {
  return (
    <div className="learn-section-dots" aria-hidden="true">
      <span className="learn-section-dot learn-section-dot--active" />
      <span className="learn-section-dot" />
      <span className="learn-section-dot" />
    </div>
  )
}

function LearnSectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="learn-section-header">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  )
}

export default function LearnPage() {
  return (
    <div className="page-screen learn-screen-mock">
      <div className="learn-statusbar" aria-hidden="true">
        <span>9:41</span>
        <div className="learn-status-icons">
          <span className="learn-status-signal" />
          <span className="learn-status-wifi" />
          <span className="learn-status-battery" />
        </div>
      </div>

      <header className="learn-hero-panel">
        <div className="learn-hero-copy">
          <p className="learn-hero-level">Lv.3 초보 투자자</p>
          <div className="learn-hero-title-row">
            <h1>반가워요, 소정님! 👋</h1>
            <button className="learn-hero-alert" aria-label="알림">
              <span className="learn-hero-alert-dot" />
              🔔
            </button>
          </div>
        </div>

        <section className="learn-goal-card">
          <div className="learn-goal-row">
            <span>오늘의 학습 목표</span>
            <strong>3/5 완료</strong>
          </div>
          <div className="learn-goal-track" aria-hidden="true">
            <span className="learn-goal-value" />
          </div>
        </section>
      </header>

      <div className="learn-body">
        <section className="learn-section">
          <LearnSectionHeader title="경제 콘텐츠" subtitle="쉽고 빠르게 배우는 경제 지식" />
          <article className="learn-card learn-video-card">
            <div className="learn-video-frame">
              <div className="learn-video-meta">
                <span className="learn-chip learn-chip--yellow">{learningSections.content.badge}</span>
                <span className="learn-video-time">{learningSections.content.duration}</span>
              </div>
              <button className="learn-play-button" aria-label="콘텐츠 재생">
                ▶
              </button>
            </div>
            <div className="learn-video-title">{learningSections.content.title}</div>
          </article>
          <SectionDots />
        </section>

        <section className="learn-section">
          <LearnSectionHeader title="뉴스 브리핑" subtitle="오늘의 경제 뉴스를 쉽게 이해하기" />
          <article className="learn-card learn-news-card">
            <div className="learn-news-head">
              <div className="learn-news-icon">📄</div>
              <div>
                <h3>{learningSections.news.title}</h3>
              </div>
              <span className="learn-news-time">⏱ {learningSections.news.time}</span>
            </div>

            <div className="learn-news-graphic" aria-hidden="true">
              <div className="learn-news-bars">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="learn-news-line" />
            </div>

            <p className="learn-news-summary">{learningSections.news.summary}</p>
          </article>
          <SectionDots />
        </section>

        <section className="learn-section">
          <LearnSectionHeader title="머니 사전" subtitle="필수 경제 용어를 쉽게 배우기" />
          <article className="learn-card learn-dictionary-card">
            <span className="learn-chip learn-chip--mint">{learningSections.dictionary.badge}</span>
            <h3>{learningSections.dictionary.title}</h3>
            <p>{learningSections.dictionary.summary}</p>
          </article>
          <SectionDots />
        </section>

        <section className="learn-section">
          <LearnSectionHeader title="머니 퀴즈" subtitle="배운 내용을 확인해보세요" />
          <article className="learn-quiz-card">
            <div className="learn-quiz-badge">퀴즈 풀고</div>
            <h3>리워드 받으세요</h3>

            <div className="learn-quiz-visual" aria-hidden="true">
              <span className="learn-quiz-coin learn-quiz-coin--left" />
              <span className="learn-quiz-coin learn-quiz-coin--right" />
              <span className="learn-quiz-bubble learn-quiz-bubble--left">?</span>
              <span className="learn-quiz-bubble learn-quiz-bubble--right">✕</span>
              <div className="learn-quiz-book">
                <div className="learn-quiz-page">
                  <span>?</span>
                </div>
                <div className="learn-quiz-page learn-quiz-page--check">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="learn-quiz-chart">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <button className="learn-quiz-button">퀴즈 시작하기</button>
          </article>
        </section>

        <section className="learn-section">
          <LearnSectionHeader title="학습 코스" subtitle="투자 실력을 키워보세요" />
          <article className="learn-card learn-course-card">
            <div className="learn-course-head">
              <div className="learn-course-icon">✦</div>
              <div className="learn-course-copy">
                <h3>{learningSections.course.title}</h3>
                <p>{learningSections.course.subtitle}</p>
              </div>
              <strong>{learningSections.course.progress}%</strong>
            </div>
            <div className="learn-course-label-row">
              <span>진행률</span>
            </div>
            <div className="learn-course-track" aria-hidden="true">
              <span className="learn-course-value" />
            </div>
          </article>
        </section>
      </div>
    </div>
  )
}
