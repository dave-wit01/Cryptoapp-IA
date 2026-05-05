import { useEffect, useRef, useState } from 'react'
import IndividualMenu from './individual.jsx'
import useAuthState from './hooks/useAuthState.js'

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const GlobeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const ChevronDown = ({ open = false }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    aria-hidden="true"
    style={{
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
    }}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const TrendUp = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#05B169"
    strokeWidth="2.5"
    aria-hidden="true"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const SparklineChart = () => {
  const points = [
    [0, 80],
    [30, 72],
    [60, 78],
    [90, 65],
    [120, 70],
    [150, 60],
    [180, 55],
    [210, 62],
    [240, 48],
    [270, 52],
    [300, 42],
    [330, 38],
    [360, 45],
    [390, 32],
    [420, 28],
    [450, 35],
    [480, 20],
    [510, 15],
    [520, 10],
  ]
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
  const fillPath = `${path} L520,120 L0,120 Z`
  const [lastX, lastY] = points[points.length - 1]

  return (
    <svg viewBox="0 0 520 120" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4F8BFF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4F8BFF" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill="url(#chartFill)" />
      <path
        d={path}
        fill="none"
        stroke="#4F8BFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastX} cy={lastY} r="5" fill="#4F8BFF" />
      <circle cx={lastX} cy={lastY} r="9" fill="#4F8BFF" fillOpacity="0.2" />
    </svg>
  )
}

const portfolioItems = [
  { label: 'Crypto', value: '$14,186.12', change: null },
  { label: 'Stocks', value: '$8,133.98', change: null },
  { label: 'Derivatives', value: '$148.84', change: true },
  { label: 'Predictions', value: '$42.69', change: true },
  { label: 'Cash', value: '$10,124.22', change: null },
]

const timeframes = ['1H', '1D', '1W', '1M', '1Y', 'All']

const PhoneMockup = () => {
  const [active, setActive] = useState('1D')

  return (
    <div className="relative h-[520px] w-[340px] shrink-0">
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(145deg, #1a3fcc 0%, #0a1a6e 100%)',
        }}
      />

      <div
        className="absolute top-8 left-1/2 w-[260px] -translate-x-1/2 overflow-hidden rounded-3xl shadow-2xl"
        style={{ background: '#fff' }}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <div className="mx-2 flex flex-1 items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#888"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className="text-xs text-gray-400">Search</span>
          </div>
          <div className="flex gap-2">
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="h-4 w-4 rounded-full bg-gray-200" />
            <div className="h-4 w-4 rounded-full bg-gray-200" />
          </div>
        </div>

        <div className="px-4 pt-4 pb-2">
          <div className="text-xl font-bold tracking-tight text-gray-900">$33,683.80</div>
          <div className="mt-0.5 flex items-center gap-1">
            <TrendUp />
            <span className="text-xs font-semibold text-[#05B169]">$131.36 (1.38%) 1D</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#05B169"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        <div className="h-[90px] px-2">
          <SparklineChart />
        </div>

        <div className="flex items-center justify-between px-3 pb-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setActive(tf)}
              className={`rounded-full px-2 py-1 text-[10px] font-semibold transition-colors ${
                active === tf ? 'bg-[#0052FF] text-white' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="border-t border-gray-100">
          {portfolioItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between border-b border-gray-50 px-4 py-2.5 last:border-0"
            >
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-gray-200" />
                <span className="text-xs font-medium text-gray-800">{item.label}</span>
              </div>
              <span className={`text-xs font-semibold ${item.change ? 'text-[#05B169]' : 'text-gray-800'}`}>
                {item.change && '+ '}
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const tickers = ['GOOG', 'TSLA', 'NVDA', 'AMZN', 'META', 'MSFT', 'AAPL', 'SPY']

const perpSizes = [
  { symbol: 'META', size: 'text-5xl', x: 'right-[38%]', y: 'top-[12%]' },
  { symbol: 'MSFT', size: 'text-4xl', x: 'right-[28%]', y: 'top-[42%]' },
  { symbol: 'AMZN', size: 'text-4xl', x: 'right-[35%]', y: 'top-[62%]' },
  { symbol: 'NVDA', size: 'text-3xl', x: 'right-[50%]', y: 'top-[65%]' },
  { symbol: 'GOOG', size: 'text-xl', x: 'right-[52%]', y: 'top-[10%]' },
  { symbol: 'TSLA', size: 'text-xl', x: 'right-[54%]', y: 'top-[35%]' },
  { symbol: 'AAPL', size: 'text-sm', x: 'right-[40%]', y: 'top-[82%]' },
]

const PerpsBanner = () => (
  <section className="w-full bg-[#0a0a0f] px-6 py-20">
    <div className="mx-auto max-w-7xl">
      <div
        className="relative w-full overflow-hidden rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, #0d1117 0%, #0f1520 60%, #080c14 100%)',
          minHeight: 420,
        }}
      >
        <div className="absolute inset-0">
          {perpSizes.map((t, i) => (
            <span
              key={t.symbol}
              className={`absolute select-none font-bold text-[#2a5cff] ${t.size} ${t.x} ${t.y}`}
              style={{
                opacity: i < 2 ? 0.85 : i < 4 ? 0.55 : 0.3,
                filter: i > 3 ? 'blur(1.5px)' : 'none',
                fontFamily: "'SF Pro Display', 'Helvetica Neue', sans-serif",
                letterSpacing: '-0.02em',
              }}
            >
              {t.symbol}
            </span>
          ))}

          <div className="absolute top-[15%] left-[5%] flex flex-col gap-3 opacity-20">
            {tickers.slice(0, 4).map((ticker) => (
              <span key={ticker} className="text-sm font-semibold text-blue-300" style={{ filter: 'blur(2px)' }}>
                {ticker}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex h-full min-h-[420px] max-w-sm flex-col justify-center px-10 py-14">
          <h2 className="mb-4 text-3xl leading-tight font-bold text-white">Trade stock and metal perps, get paid</h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-400">
            Trade stock, gold, and silver perpetuals with up to 25x leverage. Grab your share of a $200K reward pool
            by trading at least $1M before 15 May (23:59 UTC).
          </p>
          <button
            type="button"
            className="self-start rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
          >
            Learn more
          </button>
        </div>

        <p className="absolute right-0 bottom-4 left-0 px-8 text-center text-[10px] text-gray-600">
          Only available in eligible jurisdictions. Stock perpetuals are offered by Bermuda Technologies Ltd., a class F
          regulated entity in Bermuda licensed by the Bermuda Monetary Authority. Trading stock perps involve risk,
          including liquidity (especially during nonmarket hours), execution, and price volatility related risks.
        </p>
      </div>
    </div>
  </section>
)

const CandlestickChart = () => {
  const candles = [
    { x: 20, open: 80, close: 60, high: 50, low: 90, green: false },
    { x: 38, open: 62, close: 45, high: 38, low: 68, green: false },
    { x: 56, open: 48, close: 62, high: 40, low: 70, green: true },
    { x: 74, open: 60, close: 45, high: 38, low: 65, green: false },
    { x: 92, open: 47, close: 65, high: 38, low: 72, green: true },
    { x: 110, open: 63, close: 50, high: 42, low: 70, green: false },
    { x: 128, open: 52, close: 68, high: 42, low: 75, green: true },
    { x: 146, open: 66, close: 48, high: 40, low: 72, green: false },
    { x: 164, open: 50, close: 70, high: 40, low: 78, green: true },
    { x: 182, open: 68, close: 52, high: 44, low: 74, green: false },
    { x: 200, open: 54, close: 72, high: 44, low: 80, green: true },
    { x: 218, open: 70, close: 38, high: 28, low: 78, green: false },
    { x: 236, open: 40, close: 75, high: 28, low: 84, green: true },
    { x: 254, open: 72, close: 55, high: 46, low: 80, green: false },
    { x: 272, open: 57, close: 80, high: 44, low: 88, green: true },
  ]

  return (
    <svg viewBox="0 0 300 120" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      {candles.map((candle) => (
        <g key={candle.x}>
          <line
            x1={candle.x}
            y1={candle.high}
            x2={candle.x}
            y2={candle.low}
            stroke={candle.green ? '#00C087' : '#FF4D4D'}
            strokeWidth="1"
          />
          <rect
            x={candle.x - 6}
            y={Math.min(candle.open, candle.close)}
            width={12}
            height={Math.abs(candle.close - candle.open)}
            fill={candle.green ? '#00C087' : '#FF4D4D'}
            rx="1"
          />
        </g>
      ))}
    </svg>
  )
}

const TabletMockup = ({ small = false }) => (
  <div
    className={`relative overflow-hidden rounded-2xl border-2 border-blue-500 shadow-2xl ${
      small ? 'h-[110px] w-[160px]' : 'h-[185px] w-[280px]'
    }`}
    style={{ background: '#0d1117' }}
  >
    <div className="flex items-center gap-2 border-b border-gray-700 px-3 py-2">
      <div className="h-3 w-3 rounded-full bg-[#0052FF]" />
      <div className="h-1.5 flex-1 rounded bg-gray-700" />
      <div className="flex gap-1">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-1.5 w-6 rounded bg-gray-700" />
        ))}
      </div>
    </div>

    <div className="flex h-full">
      <div className="flex w-10 flex-col gap-1 border-r border-gray-700 p-1">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-2 rounded bg-gray-700 opacity-60" />
        ))}
      </div>

      <div className="flex-1 p-1">
        <div className="h-[55%]">
          <CandlestickChart />
        </div>
        <div className="mt-1 flex flex-col gap-0.5">
          {[
            { pct: '85%', color: '#00C087' },
            { pct: '60%', color: '#00C087' },
            { pct: '75%', color: '#FF4D4D' },
            { pct: '50%', color: '#FF4D4D' },
          ].map((row, index) => (
            <div key={index} className="relative h-2 overflow-hidden rounded bg-gray-800">
              <div
                className="absolute top-0 left-0 h-full rounded opacity-40"
                style={{ width: row.pct, background: row.color }}
              />
            </div>
          ))}
        </div>
      </div>

      {!small && (
        <div className="flex w-16 flex-col gap-1 border-l border-gray-700 p-1">
          <div className="h-4 rounded bg-[#0052FF] opacity-80" />
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-2 rounded bg-gray-700 opacity-50" />
          ))}
          <div className="mt-1 h-5 rounded bg-[#00C087] opacity-70" />
        </div>
      )}
    </div>
  </div>
)

const AdvancedTraderSection = () => (
  <section className="w-full bg-white px-6 py-20">
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
      <div className="flex justify-center lg:justify-start">
        <div
          className="relative flex h-[280px] w-[420px] items-end gap-4 rounded-3xl p-8"
          style={{
            background: '#0a0a0f',
          }}
        >
          <div className="relative z-10">
            <TabletMockup />
          </div>
          <div className="relative z-0 mb-6 opacity-90">
            <TabletMockup small />
          </div>
          <div
            className="absolute bottom-0 left-1/4 h-24 w-48 rounded-full opacity-20 blur-2xl"
            style={{ background: '#0052FF' }}
          />
        </div>
      </div>

      <div className="flex max-w-md flex-col gap-5">
        <h2 className="text-4xl leading-tight font-bold tracking-tight text-gray-900 lg:text-[42px]">
          Powerful tools, designed for the advanced trader.
        </h2>
        <p className="text-sm leading-relaxed text-gray-500">
          Powerful analytical tools with modern security deliver the ultimate trading experience.
          Tap into sophisticated charting capabilities, real-time order books, and deep liquidity across hundreds of
          markets.
        </p>
        <div className="mt-2">
          <button
            type="button"
            className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
          >
            Start trading
          </button>
        </div>
      </div>
    </div>
  </section>
)

const cryptoData = {
  tradable: [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 'GHS 859,855.38',
      change: '-0.17%',
      up: false,
      color: '#F7931A',
      letter: 'B',
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      price: 'GHS 25,614.76',
      change: '-0.54%',
      up: false,
      color: '#627EEA',
      letter: 'E',
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      price: 'GHS 11.09',
      change: '+0.01%',
      up: true,
      color: '#26A17B',
      letter: 'T',
    },
    {
      name: 'XRP',
      symbol: 'XRP',
      price: 'GHS 15.82',
      change: '+0.83%',
      up: true,
      color: '#346AA9',
      letter: 'X',
    },
    {
      name: 'BNB',
      symbol: 'BNB',
      price: 'GHS 7,028.64',
      change: '+0.03%',
      up: true,
      color: '#F3BA2F',
      letter: 'B',
    },
    {
      name: 'USDC',
      symbol: 'USDC',
      price: 'GHS 11.08',
      change: '--',
      up: null,
      color: '#2775CA',
      letter: 'U',
    },
  ],
  gainers: [
    {
      name: 'Solana',
      symbol: 'SOL',
      price: 'GHS 1,204.55',
      change: '+8.42%',
      up: true,
      color: '#9945FF',
      letter: 'S',
    },
    {
      name: 'Avalanche',
      symbol: 'AVAX',
      price: 'GHS 542.30',
      change: '+6.17%',
      up: true,
      color: '#E84142',
      letter: 'A',
    },
    {
      name: 'Chainlink',
      symbol: 'LINK',
      price: 'GHS 198.44',
      change: '+4.95%',
      up: true,
      color: '#2A5ADA',
      letter: 'C',
    },
    {
      name: 'Polygon',
      symbol: 'MATIC',
      price: 'GHS 12.88',
      change: '+4.33%',
      up: true,
      color: '#8247E5',
      letter: 'M',
    },
    {
      name: 'Arbitrum',
      symbol: 'ARB',
      price: 'GHS 14.62',
      change: '+3.89%',
      up: true,
      color: '#28A0F0',
      letter: 'A',
    },
    {
      name: 'Optimism',
      symbol: 'OP',
      price: 'GHS 22.10',
      change: '+3.21%',
      up: true,
      color: '#FF0420',
      letter: 'O',
    },
  ],
  new: [
    {
      name: 'Jupiter',
      symbol: 'JUP',
      price: 'GHS 14.28',
      change: '+1.20%',
      up: true,
      color: '#C7F284',
      letter: 'J',
    },
    {
      name: 'Starknet',
      symbol: 'STRK',
      price: 'GHS 18.54',
      change: '-0.88%',
      up: false,
      color: '#EC796B',
      letter: 'S',
    },
    {
      name: 'Manta',
      symbol: 'MANTA',
      price: 'GHS 21.30',
      change: '+2.44%',
      up: true,
      color: '#6CF7F7',
      letter: 'M',
    },
    {
      name: 'Dymension',
      symbol: 'DYM',
      price: 'GHS 88.74',
      change: '-1.10%',
      up: false,
      color: '#FF6B00',
      letter: 'D',
    },
    {
      name: 'Saga',
      symbol: 'SAGA',
      price: 'GHS 44.20',
      change: '+5.60%',
      up: true,
      color: '#A78BFA',
      letter: 'S',
    },
    {
      name: 'Omni',
      symbol: 'OMNI',
      price: 'GHS 312.00',
      change: '+0.75%',
      up: true,
      color: '#3B82F6',
      letter: 'O',
    },
  ],
}

const tabs = [
  { key: 'tradable', label: 'Tradable' },
  { key: 'gainers', label: 'Top gainers' },
  { key: 'new', label: 'New Listings' },
]

const CryptoExplorerSection = () => {
  const [activeTab, setActiveTab] = useState('tradable')
  const [hovered, setHovered] = useState(null)
  const coins = cryptoData[activeTab]

  return (
    <section className="w-full px-6 py-20" style={{ background: '#f2f4f7' }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="order-2 flex max-w-sm flex-col gap-5 lg:order-1">
          <h2 className="text-4xl leading-tight font-bold tracking-tight text-gray-900 lg:text-[42px]">
            Explore crypto like Bitcoin, Ethereum, and Dogecoin.
          </h2>
          <p className="text-sm leading-relaxed text-gray-500">
            Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
          </p>
          <div className="mt-2">
            <button
              type="button"
              className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
            >
              See more assets
            </button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-3xl shadow-xl" style={{ background: '#14151a', minWidth: 340 }}>
            <div className="flex items-center gap-1 px-5 pt-5 pb-3">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    activeTab === tab.key ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pb-3">
              {coins.map((coin, index) => (
                <div
                  key={coin.symbol}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  className={`cursor-pointer px-5 py-3.5 transition-colors ${
                    hovered === index ? 'bg-white/5' : ''
                  } flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: coin.color }}
                    >
                      {coin.letter}
                    </div>
                    <span className="text-base font-semibold text-white">{coin.name}</span>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">{coin.price}</div>
                    <div
                      className={`flex items-center justify-end gap-0.5 text-xs font-semibold ${
                        coin.up === true ? 'text-[#00C087]' : coin.up === false ? 'text-[#FF4D4D]' : 'text-gray-500'
                      }`}
                    >
                      {coin.up === true && '+'}
                      {coin.up === false && '-'}
                      {coin.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const SparkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FACC15" aria-hidden="true">
    <path d="M12 2 L13.5 9 L20 10 L13.5 11 L12 22 L10.5 11 L4 10 L10.5 9 Z" />
  </svg>
)

const PremiumTradingMockup = () => (
  <div
    className="relative overflow-hidden rounded-3xl shadow-2xl"
    style={{ background: '#f0f2f5', width: 320, minHeight: 340 }}
  >
    <div
      className="absolute top-6 left-1/2 -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-xl"
      style={{ width: 220, minHeight: 300 }}
    >
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <span className="text-[10px] font-semibold text-gray-800">3:57</span>
        <div className="flex items-center gap-1">
          <svg width="12" height="10" viewBox="0 0 24 18" fill="#111" aria-hidden="true">
            <rect x="0" y="6" width="4" height="12" rx="1" />
            <rect x="6" y="4" width="4" height="14" rx="1" />
            <rect x="12" y="1" width="4" height="17" rx="1" />
            <rect x="18" y="0" width="4" height="18" rx="1" />
          </svg>
          <svg width="12" height="10" viewBox="0 0 24 18" fill="#111" aria-hidden="true">
            <path d="M12 3C7.5 3 3.5 5 0.5 8.2L12 21 23.5 8.2C20.5 5 16.5 3 12 3Z" />
          </svg>
          <svg width="20" height="10" viewBox="0 0 40 18" fill="none" aria-hidden="true">
            <rect x="0" y="2" width="35" height="14" rx="3" stroke="#111" strokeWidth="2" />
            <rect x="2" y="4" width="26" height="10" rx="1.5" fill="#111" />
            <rect x="36" y="6" width="4" height="6" rx="1" fill="#111" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center px-4 pt-4 pb-3">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0052FF] shadow-lg">
            <CheckIcon />
          </div>
          <div className="absolute -top-1 -right-1">
            <SparkIcon />
          </div>
        </div>

        <p className="mt-3 text-sm font-bold text-gray-900">Trade successful!</p>
        <p className="mt-0.5 text-[10px] text-gray-400">You got 0.012423 BTC</p>

        <div className="mt-3 flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
          <span className="text-xs font-semibold text-gray-700">$14.68</span>
          <div className="ml-auto flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-[#0052FF]" />
            <span className="text-[9px] font-semibold text-gray-600">No trading fees with Premium Trading</span>
          </div>
        </div>

        <div className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm">
          <p className="text-[10px] font-bold text-gray-900">Exclusive member benefits</p>
          <p className="mt-0.5 text-[9px] leading-relaxed text-gray-400">
            Premium Trading members get boosted staking rewards.
          </p>
          <button type="button" className="mt-1 text-[9px] font-semibold text-[#0052FF]">
            Learn more
          </button>
        </div>
      </div>
    </div>

    <div style={{ height: 360 }} />
  </div>
)

const PremiumTradingSection = () => (
  <section className="w-full bg-white px-6 py-20">
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
      <div className="flex max-w-md flex-col gap-5">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0052FF]">
            <svg width="8" height="8" viewBox="0 0 12 12" fill="white" aria-hidden="true">
              <circle cx="6" cy="6" r="3" />
            </svg>
          </div>
          <span className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Premium Trading</span>
        </div>

        <h2 className="text-4xl leading-tight font-bold tracking-tight text-gray-900 lg:text-[42px]">
          Zero trading fees, more rewards.
        </h2>
        <p className="text-sm leading-relaxed text-gray-500">
          Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more.
        </p>
        <div className="mt-2">
          <button
            type="button"
            className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
          >
            Claim free trial
          </button>
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <PremiumTradingMockup />
      </div>
    </div>
  </section>
)

const MiniSparkline = () => {
  const points = [
    [0, 18],
    [10, 14],
    [20, 16],
    [30, 10],
    [40, 13],
    [50, 8],
    [60, 5],
  ]
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point[0]},${point[1]}`).join(' ')

  return (
    <svg viewBox="0 0 60 22" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <path d={path} fill="none" stroke="#00C087" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const BaseAppMockup = () => (
  <div
    className="relative overflow-hidden rounded-3xl shadow-2xl"
    style={{ background: '#f0f2f5', width: 300, minHeight: 360 }}
  >
    <div
      className="absolute top-8 left-1/2 -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-xl"
      style={{ width: 200, minHeight: 320 }}
    >
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <span className="text-[10px] font-semibold text-gray-800">4:20</span>
        <div className="flex items-center gap-1">
          <svg width="10" height="8" viewBox="0 0 24 18" fill="#111" aria-hidden="true">
            <rect x="0" y="6" width="4" height="12" rx="1" />
            <rect x="6" y="4" width="4" height="14" rx="1" />
            <rect x="12" y="1" width="4" height="17" rx="1" />
            <rect x="18" y="0" width="4" height="18" rx="1" />
          </svg>
          <svg width="12" height="8" viewBox="0 0 24 18" fill="#111" aria-hidden="true">
            <path d="M12 3C7.5 3 3.5 5 0.5 8.2L12 21 23.5 8.2C20.5 5 16.5 3 12 3Z" />
          </svg>
          <svg width="18" height="8" viewBox="0 0 40 18" fill="none" aria-hidden="true">
            <rect x="0" y="2" width="35" height="14" rx="3" stroke="#111" strokeWidth="2" />
            <rect x="2" y="4" width="26" height="10" rx="1.5" fill="#111" />
            <rect x="36" y="6" width="4" height="6" rx="1" fill="#111" />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between px-3 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-purple-400 to-blue-400" />
          <span className="text-[10px] font-semibold text-gray-800">jasmine</span>
        </div>
        <div className="flex gap-1">
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 w-3 rounded-full bg-gray-200" />
        </div>
      </div>

      <div className="flex border-b border-gray-100 px-3">
        <button type="button" className="mr-3 border-b-2 border-gray-900 pb-1.5 text-[10px] font-bold text-gray-900">
          Trade
        </button>
        <button type="button" className="pb-1.5 text-[10px] text-gray-400">
          Talk
        </button>
        <div className="ml-auto h-3 w-3 self-center rounded bg-gray-200" />
      </div>

      <div className="px-3 pt-2 pb-1">
        <p className="text-[8px] text-gray-500">Detail on my new painting</p>
      </div>

      <div className="relative mx-3 overflow-hidden rounded-xl" style={{ height: 90 }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 25%, #6bcb77 50%, #4d96ff 75%, #ff6bff 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at 30% 40%, rgba(255,100,100,0.8) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(100,100,255,0.6) 0%, transparent 50%)',
          }}
        />
        <div className="absolute right-2 bottom-2 flex gap-1">
          {['#ff4444', '#4444ff', '#44ff44', '#ffff44'].map((color) => (
            <div key={color} className="h-3 w-3 rounded-sm" style={{ background: color, opacity: 0.9 }} />
          ))}
        </div>

        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white px-2 py-0.5 shadow">
          <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#0052FF]">
            <span className="text-[6px] font-bold text-white">$</span>
          </div>
          <span className="text-[9px] font-bold text-gray-800">$1.00</span>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 pt-1.5 pb-2">
        <span className="text-[8px] text-gray-400">Like 1.5K</span>
        <span className="text-[8px] text-gray-400">Share 21K</span>
      </div>

      <div className="flex items-center gap-2 px-3 pb-2">
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-orange-400 to-pink-400" />
        <p className="flex-1 text-[8px] text-gray-500">
          <span className="font-semibold text-gray-700">@Fox</span> bought $10 of $VIRTUAL{' '}
          <span className="text-gray-400">10m</span>
        </p>
      </div>

      <div className="mx-3 mb-3 flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2">
        <div>
          <p className="text-[9px] font-bold text-gray-900">Virtual Protocol</p>
          <p className="text-[8px] text-gray-400">VIRTUAL</p>
        </div>
        <div className="ml-auto h-5 w-12">
          <MiniSparkline />
        </div>
        <div className="text-right">
          <p className="text-[9px] font-semibold text-gray-800">$742M</p>
          <p className="text-[8px] text-gray-400">Market Cap</p>
        </div>
      </div>

      <div className="flex justify-around border-t border-gray-100 px-4 py-2">
        {['H', 'S', 'T', 'N', 'M'].map((icon, index) => (
          <button key={icon} type="button" className={`text-sm ${index === 0 ? 'text-gray-900' : 'text-gray-400'}`}>
            {icon}
          </button>
        ))}
      </div>
    </div>

    <div style={{ height: 400 }} />
  </div>
)

const BaseAppSection = () => (
  <section className="w-full bg-white px-6 py-20">
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
      <div className="flex justify-center lg:justify-start">
        <BaseAppMockup />
      </div>

      <div className="flex max-w-md flex-col gap-5">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0052FF]">
            <svg width="8" height="8" viewBox="0 0 12 12" fill="white" aria-hidden="true">
              <circle cx="6" cy="6" r="3" />
            </svg>
          </div>
          <span className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Base App</span>
        </div>

        <h2 className="text-4xl leading-tight font-bold tracking-tight text-gray-900 lg:text-[42px]">
          Countless ways to earn crypto with the Base App.
        </h2>
        <p className="text-sm leading-relaxed text-gray-500">
          An everything app to trade, create, discover, and chat, all in one place.
        </p>
        <div className="mt-2">
          <button
            type="button"
            className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  </section>
)

const clusterCoins = [
  { bg: '#1a1a2e', symbol: 'AR', textColor: '#fff', size: 80, style: { top: '0%', left: '46%' } },
  { bg: '#0052FF', symbol: 'C', textColor: '#fff', size: 90, style: { top: '22%', left: '28%' }, isFeatured: true },
  { bg: '#FACC15', symbol: '>', textColor: '#111', size: 84, style: { top: '12%', left: '64%' } },
  { bg: '#F7931A', symbol: 'BTC', textColor: '#fff', size: 88, style: { top: '36%', left: '47%' } },
  { bg: '#C2A633', symbol: 'DOGE', textColor: '#fff', size: 80, style: { top: '54%', left: '30%' } },
  { bg: '#0033AD', symbol: 'ADA', textColor: '#fff', size: 84, style: { top: '52%', left: '64%' } },
  { bg: '#8A92B2', symbol: 'ETH', textColor: '#fff', size: 82, style: { top: '72%', left: '46%' } },
]

const CoinCluster = () => (
  <div className="relative h-[380px] w-[340px] shrink-0">
    {clusterCoins.map((coin) => (
      <div
        key={`${coin.symbol}-${coin.style.top}-${coin.style.left}`}
        className="absolute flex select-none items-center justify-center rounded-full shadow-lg"
        style={{
          width: coin.size,
          height: coin.size,
          background: coin.bg,
          color: coin.textColor,
          fontSize: coin.size * 0.26,
          fontWeight: 700,
          transform: 'translate(-50%, -50%)',
          left: coin.style.left,
          top: coin.style.top,
        }}
      >
        {coin.isFeatured ? (
          <svg width={coin.size * 0.52} height={coin.size * 0.52} viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path
              d="M16 4C9.373 4 4 9.373 4 16C4 22.627 9.373 28 16 28C21.43 28 26.048 24.488 27.748 19.5H22.376C21.176 21.432 19.232 22.75 16 22.75C11.858 22.75 8.5 19.392 8.5 16C8.5 12.608 11.858 9.25 16 9.25C19.232 9.25 21.176 10.568 22.376 12.5H27.748C26.048 7.512 21.43 4 16 4Z"
              fill="white"
            />
          </svg>
        ) : (
          coin.symbol
        )}
      </div>
    ))}
  </div>
)

const CtaSection = () => {
  const [email, setEmail] = useState('')

  return (
    <section className="w-full bg-white px-6 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex max-w-md flex-col gap-6">
          <h2 className="text-5xl leading-[1.05] font-bold tracking-tight text-gray-900 lg:text-6xl">
            Take control of your money
          </h2>
          <p className="text-sm text-gray-500">Start your portfolio today and discover crypto</p>
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="satoshi@nakamoto.com"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#0052FF] focus:outline-none"
            />
            <a
              href="/register"
              className="whitespace-nowrap rounded-lg bg-[#0052FF] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0040CC]"
            >
              Sign up
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <CoinCluster />
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-2xl text-center">
        <p className="mb-3 text-xs text-gray-400">DEX trading is offered by Bermuda Technologies Ltd.</p>
        <p className="text-xs leading-relaxed text-gray-400">
          Products and features may not be available in all regions. Information is for informational purposes only,
          and is not (i) an offer, or solicitation of an offer, to invest in, or to buy or sell, any interests or
          shares, or to participate in any investment or trading strategy or (ii) intended to provide accounting,
          legal, or tax advice, or investment recommendations. Trading cryptocurrency comes with risk.
        </p>
      </div>
    </section>
  )
}

const UsdcIllustration = () => (
  <div className="relative h-[170px] w-full overflow-hidden rounded-xl" style={{ background: '#0a0a0f' }}>
    {[70, 95, 118].map((radius, index) => (
      <div
        key={`${radius}-${index}`}
        className="absolute rounded-full border"
        style={{
          width: radius * 2,
          height: radius * 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderColor: ['#00C087', '#4F8BFF', '#FACC15'][index],
          opacity: 0.55,
        }}
      />
    ))}

    <div className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0052FF] shadow-lg shadow-blue-500/40">
      <span className="text-2xl font-bold text-white">$</span>
    </div>

    {[
      { angle: 30, radius: 70, color: '#00C087' },
      { angle: 150, radius: 95, color: '#4F8BFF' },
      { angle: 270, radius: 118, color: '#FACC15' },
    ].map((dot, index) => {
      const radians = (dot.angle * Math.PI) / 180
      const top = `calc(50% + ${(Math.sin(radians) * dot.radius).toFixed(1)}px - 6px)`
      const left = `calc(50% + ${(Math.cos(radians) * dot.radius).toFixed(1)}px - 6px)`

      return (
        <div
          key={`${dot.angle}-${index}`}
          className="absolute h-3 w-3 rounded-full"
          style={{
            background: dot.color,
            top,
            left,
          }}
        />
      )
    })}
  </div>
)

const BankIllustration = () => (
  <div
    className="relative flex h-[170px] w-full items-end justify-center overflow-hidden rounded-xl pb-0"
    style={{ background: '#2563EB' }}
  >
    <div className="absolute top-4 left-1/2 flex -translate-x-1/2 flex-col items-center">
      <div className="h-3 w-32 rounded-t-sm bg-white opacity-90" />
      <div className="mt-1 flex gap-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-14 w-3 rounded-sm bg-white opacity-85" />
        ))}
      </div>
      <div className="mt-1 h-3 w-36 rounded-b-sm bg-white opacity-90" />
      <div className="mt-1 h-2 w-40 bg-white opacity-70" />
      <div className="mt-0.5 h-2 w-44 bg-white opacity-60" />
    </div>

    {[{ left: '22%', top: '18%' }, { left: '72%', top: '14%' }].map((position, index) => (
      <div
        key={`${position.left}-${index}`}
        className="absolute flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shadow"
        style={{ background: '#FACC15', color: '#7c5c00', left: position.left, top: position.top }}
      >
        $
      </div>
    ))}

    <div
      className="relative z-10 w-20 overflow-hidden rounded-2xl border-2 border-gray-700 shadow-2xl"
      style={{ background: '#111', height: 110 }}
    >
      <div className="flex justify-center pt-1">
        <div className="h-1 w-8 rounded-full bg-gray-600" />
      </div>
      <div className="flex flex-col gap-1 px-2 pt-2">
        <div className="h-2 rounded bg-gray-700" />
        <div className="flex h-6 items-center justify-around rounded bg-gray-800 px-1">
          {['#FF4444', '#44AA44', '#4488FF'].map((color) => (
            <div key={color} className="h-3 w-3 rounded" style={{ background: color }} />
          ))}
        </div>
        <div className="h-2 w-2/3 rounded bg-gray-700" />
        <div className="mt-1 flex justify-around">
          {['#FACC15', '#FACC15', '#FACC15'].map((color, index) => (
            <div key={`${color}-${index}`} className="text-[8px] text-yellow-400">
              *
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const BitcoinHandIllustration = () => (
  <div className="relative h-[170px] w-full overflow-hidden rounded-xl" style={{ background: '#9ca891' }}>
    {[
      { label: 'CH', left: '65%', top: '10%' },
      { label: 'LK', left: '78%', top: '30%' },
      { label: 'AN', left: '68%', top: '52%' },
      { label: 'ST', left: '55%', top: '68%' },
    ].map((icon, index) => (
      <div
        key={`${icon.label}-${index}`}
        className="absolute flex h-9 w-9 items-center justify-center rounded-xl bg-white text-xs font-semibold shadow-md"
        style={{ left: icon.left, top: icon.top }}
      >
        {icon.label}
      </div>
    ))}

    <div
      className="absolute rounded-tl-3xl"
      style={{
        background: '#D4956A',
        width: 120,
        height: 60,
        bottom: 0,
        left: '8%',
        borderRadius: '60% 60% 0 0 / 80% 80% 0 0',
      }}
    />

    {[0, 1, 2, 3].map((fingerIndex) => (
      <div
        key={fingerIndex}
        className="absolute rounded-t-full"
        style={{
          background: '#D4956A',
          width: 16,
          height: 38,
          bottom: 50,
          left: `${12 + fingerIndex * 18}%`,
          borderRadius: '50% 50% 0 0',
        }}
      />
    ))}

    <div
      className="absolute flex h-14 w-14 items-center justify-center rounded-full shadow-xl"
      style={{ background: '#F7931A', bottom: '42%', left: '28%' }}
    >
      <span className="text-lg font-bold text-white">B</span>
    </div>
  </div>
)

const articles = [
  {
    title: 'USDC: The digital dollar for the global crypto economy',
    excerpt:
      'We believe crypto will be part of the solution for creating an open financial system that is both more efficient and more...',
    Illustration: UsdcIllustration,
  },
  {
    title: 'Can crypto really replace your bank account?',
    excerpt:
      'If you are a big enough fan of crypto, you have probably heard the phrase "be your own bank" or the term "bankless" and the idea behind it...',
    Illustration: BankIllustration,
  },
  {
    title: 'When is the best time to invest in crypto?',
    excerpt:
      'Cryptocurrencies like Bitcoin can experience daily or even hourly price volatility. As with any kind of investment, volatility may cause...',
    Illustration: BitcoinHandIllustration,
  },
]

const LearnSection = () => (
  <section className="w-full px-6 py-16" style={{ background: '#f2f4f7' }}>
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <h2 className="text-4xl leading-tight font-bold tracking-tight text-gray-900 lg:text-5xl">
          New to crypto?
          <br />
          Learn some
          <br />
          crypto basics
        </h2>
        <div className="flex flex-col gap-4 lg:pt-2">
          <p className="max-w-sm text-sm leading-relaxed text-gray-500">
            Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone
            in between.
          </p>
          <button
            type="button"
            className="self-start rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
          >
            Read more
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {articles.map((article, index) => {
          const Illustration = article.Illustration

          return (
            <div key={`${article.title}-${index}`} className="group flex cursor-pointer flex-col gap-3">
              <Illustration />
              <h3 className="text-base leading-snug font-bold text-gray-900 transition-colors group-hover:text-[#0052FF]">
                {article.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">{article.excerpt}</p>
            </div>
          )
        })}
      </div>
    </div>
  </section>
)

const FooterBrandIcon = () => (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#0052FF" />
    <path
      d="M16 8C11.582 8 8 11.582 8 16C8 20.418 11.582 24 16 24C19.858 24 23.096 21.476 24.124 18H19.876C19.108 19.364 17.652 20.286 16 20.286C13.636 20.286 11.714 18.364 11.714 16C11.714 13.636 13.636 11.714 16 11.714C17.652 11.714 19.108 12.636 19.876 14H24.124C23.096 10.524 19.858 8 16 8Z"
      fill="white"
    />
  </svg>
)

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.27 8.27 0 004.84 1.55V6.85a4.85 4.85 0 01-1.07-.16z" />
  </svg>
)

const FooterGlobeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const footerColumns = [
  {
    heading: 'Company',
    links: [
      'About',
      'Careers',
      'Affiliates',
      'Blog',
      'Press',
      'Security',
      'Investors',
      'Vendors',
      'Legal & privacy',
      'Cookie policy',
      'Cookie preferences',
      'Digital Asset Disclosures',
    ],
  },
  {
    heading: 'Learn',
    links: [
      'Explore crypto',
      'Explore stocks',
      'Market statistics',
      'Crypto Bytes newsletter',
      'Crypto basics',
      'Tips & tutorials',
      'Crypto glossary',
      'Market updates',
      'What is Bitcoin?',
      'What is crypto?',
      'What is a blockchain?',
      'How to set up a crypto wallet?',
      'How to send crypto?',
      'Taxes',
    ],
  },
  {
    heading: 'Individuals',
    links: ['Buy & sell', 'Trading App', 'Premium Trading', 'Debit Card'],
    extra: [
      { heading: 'Businesses', links: ['Asset Listings', 'Business Solutions', 'Payments', 'Token Manager'] },
      {
        heading: 'Institutions',
        links: [
          'Prime',
          'Staking',
          'Exchange',
          'International Exchange',
          'Derivatives Exchange',
          'Verified Pools',
        ],
      },
    ],
  },
  {
    heading: 'Developers',
    links: [
      'Developer Platform',
      'Base',
      'Server Wallets',
      'Embedded Wallets',
      'Base Accounts (Smart Wallets)',
      'Onramp & Offramp',
      'x402',
      'Trade API',
      'Paymaster',
      'OnchainKit',
      'Data API',
      'Verifications',
      'Node',
      'AgentKit',
      'Staking',
      'Faucet',
      'Exchange API',
      'International Exchange API',
      'Prime API',
      'Derivatives API',
    ],
  },
  {
    heading: 'Support',
    links: [
      'Help center',
      'Contact us',
      'Create account',
      'ID verification',
      'Account information',
      'Payment methods',
      'Account access',
      'Supported crypto',
      'Status',
    ],
    extra: [
      { heading: 'Asset prices', links: ['Bitcoin price', 'Ethereum price', 'Solana price', 'XRP price'] },
      { heading: 'Stock prices', links: ['NVIDIA price', 'Apple price', 'Microsoft price', 'Amazon price'] },
    ],
  },
]

const FooterLinkGroup = ({ heading, links }) => (
  <div>
    <p className="mb-3 text-xs font-bold text-gray-900">{heading}</p>
    <ul className="flex flex-col gap-2">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="text-xs text-gray-600 transition-colors hover:text-gray-900">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

export const Footer = () => (
  <footer className="w-full px-6 pt-12 pb-6" style={{ background: '#f2f4f7' }}>
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-2 gap-8 pb-10 md:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <FooterBrandIcon />
        </div>

        <FooterLinkGroup heading={footerColumns[0].heading} links={footerColumns[0].links} />
        <FooterLinkGroup heading={footerColumns[1].heading} links={footerColumns[1].links} />

        <div className="flex flex-col gap-6">
          <FooterLinkGroup heading={footerColumns[2].heading} links={footerColumns[2].links} />
          {footerColumns[2].extra.map((group) => (
            <FooterLinkGroup key={group.heading} heading={group.heading} links={group.links} />
          ))}
        </div>

        <FooterLinkGroup heading={footerColumns[3].heading} links={footerColumns[3].links} />

        <div className="flex flex-col gap-6">
          <FooterLinkGroup heading={footerColumns[4].heading} links={footerColumns[4].links} />
          {footerColumns[4].extra.map((group) => (
            <FooterLinkGroup key={group.heading} heading={group.heading} links={group.links} />
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300 pt-6">
        <div className="mb-5 flex items-center gap-4">
          {[
            { Icon: XIcon, href: '#', label: 'X' },
            { Icon: LinkedInIcon, href: '#', label: 'LinkedIn' },
            { Icon: InstagramIcon, href: '#', label: 'Instagram' },
            { Icon: TikTokIcon, href: '#', label: 'TikTok' },
          ].map(({ Icon, href, label }) => (
            <a key={label} href={href} aria-label={label} className="text-gray-500 transition-colors hover:text-gray-900">
              <Icon />
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Copyright 2024 Crypto App</span>
            <span>|</span>
            <a href="#" className="transition-colors hover:text-gray-900">
              Privacy
            </a>
            <span>|</span>
            <a href="#" className="transition-colors hover:text-gray-900">
              Terms & Conditions
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FooterGlobeIcon />
            <span>Global</span>
            <span>|</span>
            <span>English</span>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          <strong>Disclaimer:</strong> This is a demo project for educational purposes only. Not affiliated with any real company. Do not enter real personal information or passwords.
        </div>
      </div>
    </div>
  </footer>
)

const HeroSection = () => {
  const [email, setEmail] = useState('')

  return (
    <section className="flex min-h-screen items-center bg-white pt-0">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <div className="flex justify-center lg:justify-start">
          <PhoneMockup />
        </div>

        <div className="flex max-w-lg flex-col gap-6">
          <h1 className="text-5xl leading-[1.05] font-bold tracking-tight text-gray-900 lg:text-6xl">
            The future of finance is here.
          </h1>
          <p className="text-base text-gray-500">Trade crypto and more on a platform you can trust.</p>

          <div className="mt-2 flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="satoshi@nakamoto.com"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#0052FF] focus:outline-none"
            />
            <a
              href="/register"
              className="whitespace-nowrap rounded-lg bg-[#0052FF] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0040CC]"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <HeroSection />
      <PerpsBanner />
      <AdvancedTraderSection />
      <CryptoExplorerSection />
      <PremiumTradingSection />
      <BaseAppSection />
      <CtaSection />
      <LearnSection />
      <Footer />
    </div>
  )
}
