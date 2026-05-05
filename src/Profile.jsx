import { useEffect, useRef, useState } from 'react'
import { apiClient } from './config/api.js'

const userInitial = {
  name: '',
  email: '',
}

export default function Profile() {
  const isMountedRef = useRef(true)
  const [user, setUser] = useState(userInitial)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadProfile = async () => {
    setIsLoading(true)
    setError('')

    try {
      const payload = await apiClient.get('/profile', {
        credentials: 'include',
      })

      const profileData = payload?.data ?? payload

      if (isMountedRef.current) {
        setUser({
          name: profileData?.name ?? '',
          email: profileData?.email ?? '',
        })
      }
    } catch (requestError) {
      if (requestError.status === 401) {
        window.location.replace('/login')
        return
      }

      if (isMountedRef.current) {
        setError(requestError.message)
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void loadProfile()
    }, 0)

    return () => {
      window.clearTimeout(timerId)
      isMountedRef.current = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0b0d]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <main className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 pb-10">
        <section className="w-full max-w-md rounded-2xl border border-[#2e313a] bg-[#14161c] p-6">
          <h1 className="mb-5 text-2xl font-bold text-white">Your profile</h1>

          {isLoading && <p className="text-sm text-[#8a8f9a]">Loading profile...</p>}

          {!isLoading && error && (
            <div>
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
              <button
                type="button"
                className="mt-3 rounded-lg bg-[#3b6ef8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4f7ef8]"
                onClick={() => {
                  void loadProfile()
                }}
              >
                Retry
              </button>
            </div>
          )}

          {!isLoading && !error && (
            <div className="space-y-4">
              <div className="rounded-xl border border-[#2e313a] bg-[#1a1c22] p-4">
                <p className="mb-1 text-xs text-[#8a8f9a]">Name</p>
                <p className="text-base font-semibold text-white">{user.name}</p>
              </div>

              <div className="rounded-xl border border-[#2e313a] bg-[#1a1c22] p-4">
                <p className="mb-1 text-xs text-[#8a8f9a]">Email</p>
                <p className="text-base font-semibold text-white">{user.email}</p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
