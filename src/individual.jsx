const BuySellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
)

const BaseAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 12h8M8 8h5M8 16h6" />
  </svg>
)

const PremiumTradingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8C9.8 8 8 9.8 8 12s1.8 4 4 4c1.8 0 3.4-1.2 3.9-3H13c-.4.6-1 1-1.6 1-1.1 0-2-.9-2-2s.9-2 2-2c.7 0 1.3.4 1.6 1H16c-.5-1.8-2.1-3-3.9-3z" />
  </svg>
)

const PrivateIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" aria-hidden="true">
    <path d="M6 22V12a6 6 0 0112 0v10" />
    <rect x="2" y="12" width="20" height="10" rx="2" />
  </svg>
)

const OnchainIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" aria-hidden="true">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
)

const LearnIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" aria-hidden="true">
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
  </svg>
)

const AdvancedIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" aria-hidden="true">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

const EarnIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" aria-hidden="true">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
)

const WealthIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const CreditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" aria-hidden="true">
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
)

const DebitIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" aria-hidden="true">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

const individualLeftItems = [
  { Icon: BuySellIcon, label: 'Buy and sell', desc: 'Buy, sell, and use crypto' },
  { Icon: BaseAppIcon, label: 'Base App', desc: 'Post, earn, trade, and chat in one place' },
  { Icon: PremiumTradingIcon, label: 'Premium Trading', desc: 'Get zero trading fees and more' },
  { Icon: PrivateIcon, label: 'Private Client', desc: 'For trusts, family offices, and UHNWIs' },
  { Icon: OnchainIcon, label: 'Onchain', desc: 'Dive into the world of onchain apps' },
  { Icon: LearnIcon, label: 'Learn', desc: 'Crypto tips, tutorials, and practical guides' },
]

const individualRightItems = [
  { Icon: AdvancedIcon, label: 'Advanced', desc: 'Professional-grade trading tools' },
  { Icon: EarnIcon, label: 'Earn', desc: 'Stake your crypto and earn rewards' },
  { Icon: WealthIcon, label: 'Wealth Management', desc: 'Institutional-grade services for UHNW' },
  { Icon: CreditIcon, label: 'Credit Card', desc: 'Earn up to 4% bitcoin back' },
  { Icon: DebitIcon, label: 'Debit Card', desc: 'Spend crypto and get crypto back' },
]

const IndividualMenuItem = ({ Icon, label, desc }) => (
  <button
    type="button"
    className="group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-gray-50"
  >
    <div className="mt-0.5 shrink-0 rounded-lg bg-gray-100 p-1.5 transition-colors group-hover:bg-gray-200">
      <Icon />
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-900">{label}</p>
      <p className="mt-0.5 text-xs leading-snug text-gray-500">{desc}</p>
    </div>
  </button>
)

export default function IndividualMenu() {
  return (
    <div
      className="absolute top-full left-1/2 z-50 mt-2 w-[840px] -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
      role="menu"
      aria-label="Individual menu"
    >
      <div className="grid grid-cols-3">
        <div className="border-r border-gray-100 px-4 py-4">
          {individualLeftItems.map((item) => (
            <IndividualMenuItem key={item.label} {...item} />
          ))}
        </div>

        <div className="border-r border-gray-100 px-4 py-4">
          {individualRightItems.map((item) => (
            <IndividualMenuItem key={item.label} {...item} />
          ))}
        </div>

        <div className="flex flex-col justify-center bg-[#f8f9fb] p-6">
          <div
            className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg"
            style={{ background: 'linear-gradient(145deg, #1a5fff, #0033cc)' }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="2.5" />
                <path
                  d="M16 8C11.582 8 8 11.582 8 16C8 20.418 11.582 24 16 24C19.858 24 23.096 21.476 24.124 18H19.876C19.108 19.364 17.652 20.286 16 20.286C13.636 20.286 11.714 18.364 11.714 16C11.714 13.636 13.636 11.714 16 11.714C17.652 11.714 19.108 12.636 19.876 14H24.124C23.096 10.524 19.858 8 16 8Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <h3 className="mb-1 text-base leading-snug font-bold text-gray-900">System update 2025</h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-500">
            The next chapter of crypto trading. Join the live product update on X, December 17.
          </p>
          <button
            type="button"
            className="text-left text-sm font-semibold text-gray-900 underline underline-offset-2 transition-colors hover:text-[#0052FF]"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  )
}
