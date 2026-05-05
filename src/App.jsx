import { useMemo, useState } from 'react'
import HomePage from './HomePage.jsx'
import Cryptocurrencies from './Cryptocurrencies.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import Profile from './Profile.jsx'
import useAuthState from './hooks/useAuthState.js'

const navLinks = [
  { label: 'Cryptocurrencies', href: '/cryptocurrencies' },
  { label: 'Individual', href: '/#individual' },
  { label: 'Businesses', href: '/#businesses' },
  { label: 'Institutions', href: '/#institutions' },
  { label: 'Developers', href: '/#developers' },
  { label: 'Company', href: '/#company' },
]

const menuItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9H9.5a2.5 2.5 0 000 5H14a2.5 2.5 0 010 5H9" />
        <path d="M12 7v2M12 15v2" />
      </svg>
    ),
    title: 'Buy and sell',
    desc: 'Buy, sell, and use crypto',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    title: 'Base App',
    desc: 'Post, earn, trade, and chat, all in one place',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
    title: 'Premium Trading',
    desc: 'Get zero trading fees and more',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Private Client',
    desc: 'For trusts, family offices, UHNWIs',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: 'Onchain',
    desc: 'Dive into the world of onchain apps',
  },
]

const rightItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: 'Advanced',
    desc: 'Professional-grade trading tools',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    title: 'Earn',
    desc: 'Stake your crypto and earn rewards',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
    title: 'Wealth Management',
    desc: 'Institutional-grade services for UHNW',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M7 15h2M11 15h6" />
      </svg>
    ),
    title: 'Credit Card',
    desc: 'Earn up to 4% bitcoin back',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    title: 'Debit Card',
    desc: 'Spend crypto, get crypto back',
  },
]

function MenuItem({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        console.log(`Clicked: ${title}`)
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex w-full items-start gap-3 rounded-2xl px-4 py-4 transition-all duration-200"
      style={{ background: hovered ? 'rgba(0,82,255,0.06)' : 'transparent' }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 shrink-0"
        style={{
          background: hovered ? 'rgba(0,82,255,0.12)' : '#f0f2f5',
          color: hovered ? '#0052FF' : '#4b5563',
        }}
      >
        {icon}
      </div>
      <div className="text-left">
        <p
          className="text-sm font-semibold transition-colors duration-200"
          style={{ color: hovered ? '#0052FF' : '#111827' }}
        >
          {title}
        </p>
        <p className="mt-1 text-xs leading-snug text-gray-500">{desc}</p>
      </div>
    </button>
  )
}

const IndividualDropdown = ({ onMouseEnter, onMouseLeave }) => (
  <div
    className="absolute top-full left-0 z-50 mt-2 rounded-2xl border border-gray-200 bg-white shadow-2xl"
    style={{ width: '900px', minWidth: '900px' }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={(e) => e.stopPropagation()}
  >
    <div className="grid gap-6 p-8 grid-cols-3">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <MenuItem key={item.title} {...item} />
        ))}
      </div>

      <div className="space-y-2 border-l border-gray-200 px-6">
        {rightItems.map((item) => (
          <MenuItem key={item.title} {...item} />
        ))}
      </div>

      <div className="rounded-3xl bg-linear-to-br from-[#0052FF] via-[#0038B8] to-[#001F6B] p-8 text-white shadow-xl">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13v2h2V7h-2zm0 4v6h2v-6h-2z" />
          </svg>
        </div>

        <h3 className="text-xl font-semibold leading-tight">System Update 2025</h3>
        <p className="mt-4 text-sm text-white/85 leading-relaxed">
          The next chapter of crypto trading is live. Discover the latest features and new ways to move crypto.
        </p>

        <button className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/20">
          Learn more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
)

const AppLogo = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#0052FF" />
    <path
      d="M16 8C11.582 8 8 11.582 8 16C8 20.418 11.582 24 16 24C19.858 24 23.096 21.476 24.124 18H19.876C19.108 19.364 17.652 20.286 16 20.286C13.636 20.286 11.714 18.364 11.714 16C11.714 13.636 13.636 11.714 16 11.714C17.652 11.714 19.108 12.636 19.876 14H24.124C23.096 10.524 19.858 8 16 8Z"
      fill="white"
    />
  </svg>
)

const AppNavbar = () => {
  const { isLoading, isAuthenticated, user, logout } = useAuthState()
  const [openMenu, setOpenMenu] = useState('')

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-100 bg-white overflow-visible">
      <div className="mx-auto flex flex-wrap items-center gap-4 px-6 py-3 sm:flex-nowrap overflow-visible">
        <a href="/" className="shrink-0" aria-label="Home">
          <AppLogo />
        </a>

        <div className="flex flex-1 justify-center overflow-visible">
          <div className="flex flex-wrap justify-center gap-2 overflow-visible">
            {navLinks.map((link) => {
              if (link.label === 'Individual') {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setOpenMenu('Individual')}
                    onMouseLeave={() => setTimeout(() => setOpenMenu(''), 150)}
                  >
                    <button
                      onClick={() => setOpenMenu(openMenu === 'Individual' ? '' : 'Individual')}
                      className="rounded-md px-3 py-2 text-[13px] font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    >
                      {link.label}
                    </button>

                    {openMenu === 'Individual' && (
                      <IndividualDropdown
                        onMouseEnter={() => setOpenMenu('Individual')}
                        onMouseLeave={() => setTimeout(() => setOpenMenu(''), 150)}
                      />
                    )}
                  </div>
                )
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-[13px] font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                >
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {!isAuthenticated && (
            <a
              href="/login"
              className="px-3 py-1.5 text-[13px] font-semibold text-gray-800 transition-colors hover:text-gray-900"
            >
              {isLoading ? 'Loading...' : 'Sign In'}
            </a>
          )}

          {!isAuthenticated && !isLoading && (
            <a
              href="/register"
              className="rounded-full bg-[#0052FF] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#0040CC]"
            >
              Sign up
            </a>
          )}

          {isAuthenticated && user && (
            <>
              <button
                type="button"
                onClick={() => {
                  void logout()
                  window.location.href = '/login'
                }}
                className="px-3 py-1.5 text-[13px] font-semibold text-gray-800 transition-colors hover:text-gray-900"
              >
                Logout
              </button>
              <a
                href="/profile"
                className="max-w-55 rounded-full bg-gray-100 px-4 py-2 text-[12px] font-semibold text-gray-800 transition-colors hover:bg-gray-200"
                title={`${user.name} (${user.email})`}
              >
                <span className="block truncate leading-tight">{user.name}</span>
                <span className="block truncate text-[10px] font-medium text-gray-500">{user.email}</span>
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

const normalizePath = (pathname) => {
  if (!pathname) {
    return '/'
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1).toLowerCase()
  }

  return pathname.toLowerCase()
}

export default function App() {
  const path = normalizePath(window.location.pathname)

  const pageContent = useMemo(() => {
    if (path === '/cryptocurrencies') {
      return <Cryptocurrencies />
    }

    if (path === '/login' || path === '/signin' || path === '/sign-in') {
      return <SignIn />
    }

    if (path === '/register' || path === '/signup' || path === '/sign-up') {
      return <SignUp />
    }

    if (path === '/profile') {
      return <Profile />
    }

    return <HomePage />
  }, [path])

  return (
    <>
      <div className="bg-yellow-100 border-b border-yellow-200 px-4 py-2 text-center text-sm text-yellow-800">
        <strong>Student Project:</strong> This is a demo application for educational purposes only and is not affiliated with Coinbase or any other company. Do not use real personal information.
      </div>
      <AppNavbar />
      <div className="pt-14">{pageContent}</div>
    </>
  )
}
