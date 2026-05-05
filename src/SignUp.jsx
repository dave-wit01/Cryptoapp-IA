import { useState } from 'react'
import { apiClient } from './config/api.js'

const inputBaseStyles =
  'w-full rounded-xl bg-[#1a1c22] px-4 py-3 text-sm text-white outline-none transition-colors duration-150 placeholder:text-[#7f8592]'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [focusedField, setFocusedField] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit =
    formData.name.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.password.trim().length > 0

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (error) {
      setError('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const normalizedName = formData.name.trim()
    const normalizedEmail = formData.email.trim().toLowerCase()

    if (!normalizedName) {
      setError('Please enter your full name.')
      return
    }

    if (!emailPattern.test(normalizedEmail)) {
      setError('Please enter a valid email address.')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      await apiClient.post('/register', {
        name: normalizedName,
        email: normalizedEmail,
        password: formData.password,
      })

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
          <h1 className="mb-1 text-center text-2xl font-bold tracking-[-0.3px] text-white">Create your account</h1>
          <p className="mb-8 text-center text-sm text-[#8a8f9a]">Sign up to start trading crypto securely.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#d1d5db]">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField('')}
                placeholder="Your full name"
                className={inputBaseStyles}
                style={{ border: focusedField === 'name' ? '1.5px solid #4f7ef8' : '1.5px solid #2e313a' }}
                required
              />
            </div>

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
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                placeholder="At least 8 characters"
                className={inputBaseStyles}
                style={{ border: focusedField === 'password' ? '1.5px solid #4f7ef8' : '1.5px solid #2e313a' }}
                required
              />
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="mt-5 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #3b6ef8 0%, #4f7ef8 100%)' }}
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#8a8f9a]">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-[#4f7ef8] transition-colors hover:opacity-80">
              Sign in
            </a>
          </p>

          <p className="mt-4 text-center text-xs text-yellow-400">
            <strong>Demo app – do not use your real password</strong>
          </p>
        </section>
      </main>
    </div>
  )
}
