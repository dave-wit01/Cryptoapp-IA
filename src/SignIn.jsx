import { useState } from 'react'
import { apiClient } from './config/api.js'

const PasskeyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="1.8" fill="none" />
    <path d="M2 21c0-4 3.134-7 7-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="18" cy="15" r="3" stroke="white" strokeWidth="1.8" fill="none" />
    <path d="M18 18v4M16 20h4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
)

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
)

const inputBaseStyles =
  'w-full rounded-xl bg-[#1a1c22] px-4 py-3 text-sm text-white outline-none transition-colors duration-150 placeholder:text-[#7f8592]'

const altButtonBaseStyles =
  'w-full rounded-xl border border-[#2e313a] bg-[#1a1c22] px-5 py-3.5 text-sm font-medium text-white transition-all duration-150 hover:brightness-125 active:scale-[0.98]'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [focusedField, setFocusedField] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = formData.email.trim() && formData.password.trim()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))

    if (error) {
      setError('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const normalizedEmail = formData.email.trim().toLowerCase()

    if (!emailPattern.test(normalizedEmail)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!formData.password.trim()) {
      setError('Please enter your password.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await apiClient.post('/login', {
        email: normalizedEmail,
        password: formData.password,
      })

      window.location.replace('/')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0b0d]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <main className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 pb-10">
        <section className="w-full max-w-sm">
          <h1 className="mb-1 text-center text-2xl font-bold tracking-[-0.3px] text-white">Sign in to Crypto App</h1>
          <p className="mb-8 text-center text-sm text-[#8a8f9a]">Use your account credentials to continue.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#d1d5db]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                placeholder="Your email address"
                className={inputBaseStyles}
                style={{ border: focusedField === 'email' ? '1.5px solid #4f7ef8' : '1.5px solid #2e313a' }}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#d1d5db]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                placeholder="Enter your password"
                className={inputBaseStyles}
                style={{ border: focusedField === 'password' ? '1.5px solid #4f7ef8' : '1.5px solid #2e313a' }}
                required
              />
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="mt-4 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #3b6ef8 0%, #4f7ef8 100%)' }}
            >
              {isSubmitting ? 'Signing in...' : 'Continue'}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#2e313a]" />
            <span className="text-xs text-[#5a5e6b]">OR</span>
            <div className="h-px flex-1 bg-[#2e313a]" />
          </div>

          <div className="flex flex-col gap-3">
            <button type="button" className={`${altButtonBaseStyles} flex items-center gap-3`}>
              <PasskeyIcon />
              <span className="flex-1 text-center">Sign in with passkey</span>
            </button>

            <button type="button" className={`${altButtonBaseStyles} flex items-center gap-3`}>
              <GoogleIcon />
              <span className="flex-1 text-center">Sign in with Google</span>
            </button>

            <button type="button" className={`${altButtonBaseStyles} flex items-center gap-3`}>
              <AppleIcon />
              <span className="flex-1 text-center">Sign in with Apple</span>
            </button>
          </div>

          <p className="mt-7 text-center text-sm text-[#8a8f9a]">
            Don&apos;t have an account?{' '}
            <a href="/register" className="font-medium text-[#4f7ef8] transition-colors hover:opacity-80">
              Sign up
            </a>
          </p>

          <p className="mt-4 text-center text-xs leading-relaxed text-[#5a5e6b]">
            Not your device? Use a private window. See our{' '}
            <a href="#" className="underline transition-colors hover:opacity-80">
              Privacy Policy
            </a>{' '}
            for more info.
          </p>

          <p className="mt-4 text-center text-xs text-yellow-400">
            <strong>Demo app – do not use your real password</strong>
          </p>
        </section>
      </main>
    </div>
  )
}
