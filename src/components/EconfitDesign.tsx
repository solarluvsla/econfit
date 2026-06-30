import "./EconfitDesign.css";

const onboardingSlides = [
  {
    titleTop: "경제를 배우면",
    titleBottom: "세상이 보입니다",
    subtitle: ["어려운 경제, 이제 쉽고 재미있게", "시작해보세요."],
    imageLabel: "온보딩 이미지",
    activeIndex: 1,
  },
  {
    titleTop: "",
    titleBottom: "",
    subtitle: [""],
    imageLabel: "스플래시 이미지",
    activeIndex: 2,
    showStatus: true,
  },
  {
    titleTop: "짧게, 꾸준히,",
    titleBottom: "실력은 확실하게",
    subtitle: ["하루 3분 학습으로 경제 지식을 쌓고", "실생활에 바로 활용해요."],
    cards: [
      { title: "오늘의 학습", desc: "금리란 무엇일까?", badge: "3일 연속" },
      { title: "오늘의 퀴즈", desc: "+10P", badge: "" },
      { title: "학습 진행률", desc: "Lv.3", badge: "다음 레벨까지 60%" },
    ],
    activeIndex: 3,
  },
  {
    titleTop: "지금 시작하고",
    titleBottom: "똑똑한 습관을",
    titleLast: "만드세요!",
    subtitle: ["학습도, 자산도", "매일 성장하는 경험을 함께하세요."],
    imageLabel: "시작 이미지",
    buttonLabel: "시작하기",
    activeIndex: 4,
  },
];

const homeChallenges = [
  "출석",
  "콘텐츠",
  "뉴스",
  "용어",
  "퀴즈",
];

const communityItems = [
  { label: "부동산", title: "서울 아파트 급매물 나오기 시작... 지금 사도 될까요?" },
  { label: "Q&A", title: "청년 적금 추천 부탁드립니다! (월 30만원 가능)" },
];

export default function EconfitDesign() {
  return (
    <div className="econfit-root">
      <h1 className="econfit-title">Econfit 디자인 데모</h1>

      <section className="section-row">
        {onboardingSlides.map((slide, index) => (
          <article key={index} className="onboarding-card">
            {slide.showStatus && (
              <div className="status-bar">
                <span className="status-time">9:41</span>
                <span className="status-icons" />
              </div>
            )}
            <div className="onboarding-content">
              {slide.titleTop && (
                <div className="onboarding-title">
                  <h2>{slide.titleTop}</h2>
                  <h2>{slide.titleBottom}</h2>
                  {slide.titleLast && <h2>{slide.titleLast}</h2>}
                </div>
              )}
              {slide.subtitle.map((line, idx) => (
                <p key={idx} className="onboarding-subtitle">
                  {line}
                </p>
              ))}
              <div className="onboarding-image">
                <span>{slide.imageLabel}</span>
              </div>
              {slide.cards && (
                <div className="onboarding-cards">
                  {slide.cards.map((card, cardIndex) => (
                    <div key={cardIndex} className="small-card">
                      {card.badge && <span className="small-card-badge">{card.badge}</span>}
                      <strong>{card.title}</strong>
                      <p>{card.desc}</p>
                    </div>
                  ))}
                </div>
              )}
              {slide.buttonLabel && (
                <button className="primary-button">{slide.buttonLabel}</button>
              )}
            </div>
            <div className="onboarding-footer">
              <button className="skip-button">건너뛰기</button>
              <div className="pager-indicator">
                {[1, 2, 3, 4].map((item) => (
                  <span key={item} className={item === slide.activeIndex ? "dot active" : "dot"} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="section-row login-section">
        <article className="login-card">
          <div className="login-top">
            <h2>내 삶에 경제 감각을 키워보세요!</h2>
          </div>

          <div className="login-input-group">
            <label>아이디</label>
            <div className="login-input">아이디를 입력해주세요</div>
          </div>
          <div className="login-input-group">
            <label>비밀번호</label>
            <div className="login-input password">비밀번호를 입력해주세요</div>
          </div>
          <button className="primary-button">로그인</button>

          <div className="or-divider">
            <span />
            <strong>또는</strong>
            <span />
          </div>

          <div className="social-buttons">
            <button className="social kakao">카카오 계정으로 1초 만에 시작하기</button>
            <button className="social google">구글 계정으로 시작하기</button>
            <button className="social naver">네이버 계정으로 시작하기</button>
          </div>

          <div className="login-links">
            <button>회원가입</button>
            <button>아이디 찾기</button>
            <button>비밀번호 찾기</button>
          </div>
        </article>

        <article className="home-card">
          <div className="home-header">
            <div>
              <span className="subtitle">안녕하세요!</span>
              <p>꾸준함이 최고의 투자입니다.</p>
            </div>
            <div className="icon-circle" />
          </div>

          <div className="profile-card">
            <div className="profile-top">
              <div>
                <p className="small-label">소정님</p>
                <div className="level-pill">Lv.3 초보 투자자</div>
              </div>
              <div className="profile-avatar">소</div>
            </div>
            <div className="profile-stats">
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
                <strong>1,050P</strong>
              </div>
            </div>
          </div>

          <div className="challenge-card">
            <div className="challenge-title">오늘의 챌린지</div>
            <div className="challenge-list">
              {homeChallenges.map((item) => (
                <div key={item} className="challenge-item">{item}</div>
              ))}
            </div>
            <button className="secondary-button">자세히 보기</button>
          </div>

          <div className="finance-card">
            <div className="section-title">
              <strong>오늘의 금융</strong>
              <button className="text-button">자세히 보기</button>
            </div>
            <div className="finance-chips">
              <span>금융</span>
              <span>투자</span>
              <span>재테크</span>
            </div>
            <div className="finance-chart">차트 영역</div>
            <p className="caption">데이터 기준일: 2024.04.14</p>
          </div>

          <div className="community-card">
            <div className="section-title">
              <strong>커뮤니티</strong>
              <button className="text-button">자세히 보기</button>
            </div>
            <div className="community-list">
              {communityItems.map((item) => (
                <div key={item.title} className="community-item">
                  <span>{item.label}</span>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
