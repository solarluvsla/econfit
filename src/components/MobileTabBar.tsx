import type { JSX } from "react"
import type { MainPageKey } from "../types/navigation"

type Props = {
  currentPage: MainPageKey
  onNavigate: (page: MainPageKey) => void
}

const tabItems: Array<{
  key: MainPageKey
  label: string
  Icon: () => JSX.Element
}> = [
  { key: "home", label: "\uD648", Icon: HomeTabIcon },
  { key: "learn", label: "\uD559\uC2B5", Icon: LearnTabIcon },
  { key: "finance", label: "\uAE08\uC735", Icon: FinanceTabIcon },
  { key: "community", label: "\uCEE4\uBBA4\uB2C8\uD2F0", Icon: CommunityTabIcon },
  { key: "mypage", label: "\uB9C8\uC774\uD398\uC774\uC9C0", Icon: MyPageTabIcon },
]

export default function MobileTabBar({ currentPage, onNavigate }: Props) {
  return (
    <nav className="mobile-tabbar" aria-label="\uD558\uB2E8 \uD0ED">
      {tabItems.map(({ key, label, Icon }) => {
        const isActive = currentPage === key

        return (
          <button
            key={key}
            type="button"
            className={isActive ? "mobile-tabbar-item is-active" : "mobile-tabbar-item"}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onNavigate(key)}
          >
            <span className="mobile-tabbar-icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="mobile-tabbar-label">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}

function HomeTabIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path
        d="M5.75 11.25 14 4.75l8.25 6.5v10a1.5 1.5 0 0 1-1.5 1.5h-4.5v-7h-4.5v7h-4.5a1.5 1.5 0 0 1-1.5-1.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LearnTabIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path
        d="M10 5.75h8.25a3.5 3.5 0 0 1 3.5 3.5v11a2.5 2.5 0 0 1-2.5 2.5H9.75a3.5 3.5 0 0 1-3.5-3.5V9.5A3.75 3.75 0 0 1 10 5.75Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M11 11h6m-6 4h6m-6 4h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M6.25 10h2.5v8a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2v-5.75A2.25 2.25 0 0 1 7 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FinanceTabIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <rect
        x="4.75"
        y="7.25"
        width="18.5"
        height="13.5"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d="M8.5 12.25h11m-11 3.5h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle cx="19.5" cy="17.25" r="1.5" fill="currentColor" />
    </svg>
  )
}

function CommunityTabIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path
        d="M7.75 8.25h8.5a4 4 0 0 1 4 4v3.5a4 4 0 0 1-4 4h-1.75L11 22.75v-3H7.75a4 4 0 0 1-4-4v-3.5a4 4 0 0 1 4-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 14h5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MyPageTabIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="10.25" r="4" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <path
        d="M6.5 21.75a7.5 7.5 0 0 1 15 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle cx="14" cy="14" r="10.25" fill="none" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  )
}
