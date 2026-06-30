import { useState } from "react"
import "./App.css"
import MobileTabBar from "./components/MobileTabBar"
import CommunityPage from "./pages/CommunityPage"
import FinancePage from "./pages/FinancePage"
import HomePage from "./pages/HomePage"
import LearnPage from "./pages/LearnPage"
import LoginPage from "./pages/LoginPage"
import MyPage from "./pages/MyPage"
import OnboardingPage from "./pages/OnboardingPage"
import type { MainPageKey, PageKey } from "./types/navigation"

const mainPages: MainPageKey[] = ["home", "learn", "finance", "community", "mypage"]

const desktopLabels: Record<Exclude<PageKey, "onboarding">, string> = {
  login: "\uB85C\uADF8\uC778",
  home: "\uD648",
  learn: "\uD559\uC2B5",
  finance: "\uAE08\uC735",
  community: "\uCEE4\uBBA4\uB2C8\uD2F0",
  mypage: "\uB9C8\uC774\uD398\uC774\uC9C0",
}

function isMainPage(page: PageKey): page is MainPageKey {
  return mainPages.includes(page as MainPageKey)
}

export default function App() {
  const [page, setPage] = useState<PageKey>("mypage")
  const hideTabBar = page === "onboarding" || page === "login"
  const currentMainPage = isMainPage(page) ? page : "home"

  return (
    <div className="app-root">
      {page !== "onboarding" && (
        <header className="app-header">
          <div className="app-brand">Econfit</div>
          <nav className="app-nav">
            <button className={page === "login" ? "nav-active" : ""} onClick={() => setPage("login")}>
              {desktopLabels.login}
            </button>
            <button className={page === "home" ? "nav-active" : ""} onClick={() => setPage("home")}>
              {desktopLabels.home}
            </button>
            <button className={page === "learn" ? "nav-active" : ""} onClick={() => setPage("learn")}>
              {desktopLabels.learn}
            </button>
            <button className={page === "finance" ? "nav-active" : ""} onClick={() => setPage("finance")}>
              {desktopLabels.finance}
            </button>
            <button className={page === "community" ? "nav-active" : ""} onClick={() => setPage("community")}>
              {desktopLabels.community}
            </button>
            <button className={page === "mypage" ? "nav-active" : ""} onClick={() => setPage("mypage")}>
              {desktopLabels.mypage}
            </button>
          </nav>
        </header>
      )}

      <main className={page === "onboarding" ? "app-content app-content--onboarding" : "app-content"}>
        <div
          className={
            page === "onboarding"
              ? "app-phone-shell app-phone-shell--onboarding"
              : !hideTabBar
                ? "app-phone-shell app-phone-shell--tabbed"
                : "app-phone-shell"
          }
        >
          {page === "onboarding" && <OnboardingPage onComplete={() => setPage("login")} />}
          {page === "login" && <LoginPage onNavigate={setPage} />}
          {page === "home" && <HomePage onNavigate={setPage} />}
          {page === "learn" && <LearnPage />}
          {page === "finance" && <FinancePage />}
          {page === "community" && <CommunityPage />}
          {page === "mypage" && <MyPage onLogout={() => setPage("login")} />}
          {!hideTabBar && <MobileTabBar currentPage={currentMainPage} onNavigate={setPage} />}
        </div>
      </main>
    </div>
  )
}
