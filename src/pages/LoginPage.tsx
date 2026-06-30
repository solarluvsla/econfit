import { useState, type FormEvent } from "react"
import type { PageKey } from "../types/navigation"

type Props = {
  onNavigate: (page: PageKey) => void
}

const TEST_ACCOUNT = {
  id: "econfit_test",
  password: "econfit1234",
}

export default function LoginPage({ onNavigate }: Props) {
  const [loginId, setLoginId] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    onNavigate("home")
  }

  const handleQuickLogin = () => {
    setLoginId(TEST_ACCOUNT.id)
    setPassword(TEST_ACCOUNT.password)
  }

  return (
    <div className="page-screen login-screen">
      <div className="login-stage">
        <div className="login-brand-block">
          <h1 className="login-brand-title">EconFit</h1>
          <p className="login-tagline">내 삶에 경제 감각을 키워보세요!</p>
        </div>

        <form className="login-form-panel" onSubmit={handleLogin}>
          <div className="login-field">
            <label htmlFor="login-id">아이디</label>
            <div className="login-input-shell">
              <input
                id="login-id"
                className="login-input-control"
                type="text"
                value={loginId}
                onChange={(event) => setLoginId(event.target.value)}
                placeholder="아이디를 입력해주세요"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="login-password">비밀번호</label>
            <div className="login-input-shell login-input-shell--password">
              <input
                id="login-password"
                className="login-input-control"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="비밀번호를 입력해주세요"
                autoComplete="current-password"
              />
              <span className="login-eye" aria-hidden="true" />
            </div>
          </div>

          <button type="button" className="login-test-account-button" onClick={handleQuickLogin}>
            <span className="login-test-account-label">테스트 계정</span>
          </button>

          <button type="submit" className="login-submit-button">
            로그인
          </button>
        </form>

        <div className="login-divider">
          <span />
          <strong>또는</strong>
          <span />
        </div>

        <div className="login-social-list">
          <button type="button" className="login-social-button login-social-button--kakao">
            <span className="login-social-icon login-social-icon--kakao" aria-hidden="true">
              ●
            </span>
            카카오 계정으로 1초 만에 시작하기
          </button>
          <button type="button" className="login-social-button login-social-button--google">
            <span className="login-social-icon login-social-icon--google" aria-hidden="true">
              G
            </span>
            구글 계정으로 시작하기
          </button>
          <button type="button" className="login-social-button login-social-button--naver">
            <span className="login-social-icon login-social-icon--naver" aria-hidden="true">
              N
            </span>
            네이버 계정으로 시작하기
          </button>
        </div>

        <div className="login-footer-links">
          <button type="button">회원가입</button>
          <span>|</span>
          <button type="button">아이디 찾기</button>
          <span>|</span>
          <button type="button">비밀번호 찾기</button>
        </div>

        <button type="button" className="login-onboarding-link" onClick={() => onNavigate("onboarding")}>
          온보딩 다시 보기
        </button>
      </div>
    </div>
  )
}
