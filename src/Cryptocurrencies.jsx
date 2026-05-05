import { useEffect, useMemo, useState } from 'react'
import { apiClient } from './config/api.js'
import { Footer } from './HomePage.jsx'
import useAuthState from './hooks/useAuthState.js'

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: price >= 1 ? 2 : 6,
  }).format(price)

const formatChange = (change24h) => {
  if (!Number.isFinite(change24h)) {
    return '--'
  }

  const sign = change24h > 0 ? '+' : ''
  return `${sign}${change24h.toFixed(2)}%`
}

const changeClassName = (change24h) => {
  if (!Number.isFinite(change24h) || change24h === 0) {
    return 'text-gray-500'
  }

  return change24h > 0 ? 'text-[#00C087]' : 'text-red-500'
}

const coinLetter = (coin) => (coin.symbol?.[0] ?? coin.name?.[0] ?? '?').toUpperCase()

const CoinAvatarFallback = ({ coin, hidden = false }) => (
  <div
    className={`${hidden ? 'hidden' : 'flex'} h-8 w-8 items-center justify-center rounded-full bg-[#0052FF] text-xs font-semibold text-white`}
  >
    {coinLetter(coin)}
  </div>
)

const CoinRow = ({ coin }) => (
  <div className="flex items-center justify-between gap-3 border-b border-gray-100 py-3 last:border-0">
    <div className="flex min-w-0 items-center gap-3">
      <div className="relative h-8 w-8 shrink-0">
        {coin.image ? (
          <>
            <img
              src={coin.image}
              alt={`${coin.name} logo`}
              className="h-8 w-8 rounded-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = 'none'
                const fallback = event.currentTarget.nextElementSibling
                if (fallback) {
                  fallback.classList.remove('hidden')
                  fallback.classList.add('flex')
                }
              }}
            />
            <CoinAvatarFallback coin={coin} hidden />
          </>
        ) : (
          <CoinAvatarFallback coin={coin} />
        )}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-900">{coin.name}</p>
        <p className="text-xs text-gray-500">{coin.symbol}</p>
      </div>
    </div>

    <div className="text-right">
      <p className="text-sm font-semibold text-gray-900">{formatPrice(coin.price)}</p>
      <p className={`text-xs font-semibold ${changeClassName(coin.change24h)}`}>
        {formatChange(coin.change24h)}
      </p>
    </div>
  </div>
)

const SectionStatus = ({ loadingMessage, isLoading, error, emptyMessage, items }) => {
  if (isLoading) {
    return <p className="py-5 text-sm text-gray-500">{loadingMessage}</p>
  }

  if (error) {
    return (
      <p className="py-5 text-sm text-red-500" role="alert">
        {error}
      </p>
    )
  }

  if (!items.length) {
    return <p className="py-5 text-sm text-gray-500">{emptyMessage}</p>
  }

  return null
}

export default function Cryptocurrencies() {
  const { isLoading: authLoading, isAuthenticated, user, logout } = useAuthState()
  const [coins, setCoins] = useState([])
  const [gainers, setGainers] = useState([])
  const [newListings, setNewListings] = useState([])

  const [loadingCoins, setLoadingCoins] = useState(true)
  const [loadingGainers, setLoadingGainers] = useState(true)
  const [loadingNew, setLoadingNew] = useState(true)

  const [coinsError, setCoinsError] = useState('')
  const [gainersError, setGainersError] = useState('')
  const [newError, setNewError] = useState('')

  const [search, setSearch] = useState('')

  const fetchAllCoins = async () => {
    setLoadingCoins(true)
    setCoinsError('')

    try {
      const payload = await apiClient.get('/crypto')
      const items = Array.isArray(payload?.data) ? payload.data : []
      setCoins(items)
    } catch (requestError) {
      setCoinsError(requestError.message)
    } finally {
      setLoadingCoins(false)
    }
  }

  const fetchGainers = async () => {
    setLoadingGainers(true)
    setGainersError('')

    try {
      const payload = await apiClient.get('/crypto/gainers')
      const items = Array.isArray(payload?.data) ? payload.data : []
      setGainers(items)
    } catch (requestError) {
      setGainersError(requestError.message)
    } finally {
      setLoadingGainers(false)
    }
  }

  const fetchNewListings = async () => {
    setLoadingNew(true)
    setNewError('')

    try {
      const payload = await apiClient.get('/crypto/new')
      const items = Array.isArray(payload?.data) ? payload.data : []
      setNewListings(items)
    } catch (requestError) {
      setNewError(requestError.message)
    } finally {
      setLoadingNew(false)
    }
  }

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void fetchAllCoins()
      void fetchGainers()
      void fetchNewListings()
    }, 0)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [])

  const filteredCoins = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return coins
    }

    return coins.filter((coin) => {
      return (
        coin.name?.toLowerCase().includes(query) ||
        coin.symbol?.toLowerCase().includes(query)
      )
    })
  }, [coins, search])

  return (
    <div className="min-h-screen font-sans" style={{ background: '#f8f9fb' }}>
      <main className="mx-auto max-w-7xl px-6 pb-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Crypto market</h1>
          
          </div>

          <label className="flex w-72 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
            <SearchIcon />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by coin name or symbol"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">All cryptocurrencies</h2>
              <button
                type="button"
                className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-200"
                onClick={() => {
                  void fetchAllCoins()
                }}
              >
                Refresh
              </button>
            </div>

            <SectionStatus
              loadingMessage="Loading cryptocurrency list..."
              isLoading={loadingCoins}
              error={coinsError}
              emptyMessage="No cryptocurrencies available yet."
              items={filteredCoins}
            />

            {!loadingCoins && !coinsError && filteredCoins.length > 0 && (
              <div>
                {filteredCoins.map((coin) => (
                  <CoinRow key={coin._id ?? `${coin.symbol}-${coin.name}`} coin={coin} />
                ))}
              </div>
            )}

            {!loadingCoins && !coinsError && coins.length > 0 && filteredCoins.length === 0 && (
              <p className="py-5 text-sm text-gray-500">No coins match your search.</p>
            )}
          </section>

          <aside className="flex flex-col gap-6">
            <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">Top gainers</h3>
                <button
                  type="button"
                  className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-700 transition-colors hover:bg-gray-200"
                  onClick={() => {
                    void fetchGainers()
                  }}
                >
                  Refresh
                </button>
              </div>

              <SectionStatus
                loadingMessage="Loading top gainers..."
                isLoading={loadingGainers}
                error={gainersError}
                emptyMessage="No gainers data available."
                items={gainers}
              />

              {!loadingGainers && !gainersError && gainers.length > 0 && (
                <div>
                  {gainers.slice(0, 6).map((coin) => (
                    <CoinRow key={coin._id ?? `g-${coin.symbol}-${coin.name}`} coin={coin} />
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">New listings</h3>
                <button
                  type="button"
                  className="rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-700 transition-colors hover:bg-gray-200"
                  onClick={() => {
                    void fetchNewListings()
                  }}
                >
                  Refresh
                </button>
              </div>

              <SectionStatus
                loadingMessage="Loading new listings..."
                isLoading={loadingNew}
                error={newError}
                emptyMessage="No new listings available."
                items={newListings}
              />

              {!loadingNew && !newError && newListings.length > 0 && (
                <div>
                  {newListings.slice(0, 6).map((coin) => (
                    <CoinRow key={coin._id ?? `n-${coin.symbol}-${coin.name}`} coin={coin} />
                  ))}
                </div>
              )}
            </section>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
