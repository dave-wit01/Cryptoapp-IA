import { useEffect, useState } from 'react'
import { apiClient } from '../config/api.js'

const initialAuthState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
}

const extractUser = (payload) => {
  const data = payload?.data ?? payload

  if (!data?.name || !data?.email) {
    return null
  }

  return {
    name: data.name,
    email: data.email,
  }
}

export default function useAuthState() {
  const [authState, setAuthState] = useState(initialAuthState)

  const loadProfile = async () => {
    try {
      const payload = await apiClient.get('/profile')
      const user = extractUser(payload)

      if (user) {
        setAuthState({
          isLoading: false,
          isAuthenticated: true,
          user,
        })
        return
      }

      setAuthState({
        isLoading: false,
        isAuthenticated: false,
        user: null,
      })
    } catch (requestError) {
      if (requestError.status === 401) {
        setAuthState({
          isLoading: false,
          isAuthenticated: false,
          user: null,
        })
        return
      }

      setAuthState({
        isLoading: false,
        isAuthenticated: false,
        user: null,
      })
    }
  }

  const logout = async () => {
    try {
      await apiClient.post('/logout', {})
    } catch {
      // We still reset local auth state even if request fails.
    }

    setAuthState({
      isLoading: false,
      isAuthenticated: false,
      user: null,
    })
  }

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void loadProfile()
    }, 0)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [])

  return {
    ...authState,
    logout,
  }
}
