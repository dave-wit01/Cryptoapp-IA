import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const createHttpError = (statusCode, message) => {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

const buildCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production'

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }
}

const buildCookieClearOptions = () => {
  const options = buildCookieOptions()
  delete options.maxAge
  return options
}

const register = async (req, res) => {
  const { name, email, password } = req.body ?? {}

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    throw createHttpError(400, 'Name, email, and password are required')
  }

  if (!emailPattern.test(email)) {
    throw createHttpError(400, 'Email format is invalid')
  }

  if (password.length < 8) {
    throw createHttpError(400, 'Password must be at least 8 characters')
  }

  const normalizedEmail = email.trim().toLowerCase()

  const existingUser = await User.findOne({ email: normalizedEmail })

  if (existingUser) {
    throw createHttpError(409, 'Email already registered')
  }

  await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
  })

  return res.status(201).json({
    success: true,
    message: 'Account created',
  })
}

const login = async (req, res) => {
  const { email, password } = req.body ?? {}

  if (!email?.trim() || !password?.trim()) {
    throw createHttpError(400, 'Email and password are required')
  }

  const normalizedEmail = email.trim().toLowerCase()
  const user = await User.findOne({ email: normalizedEmail }).select('+password')

  if (!user) {
    throw createHttpError(401, 'Invalid email or password')
  }

  const passwordMatches = await user.comparePassword(password)

  if (!passwordMatches) {
    throw createHttpError(401, 'Invalid email or password')
  }

  const token = jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  )

  res.cookie('token', token, buildCookieOptions())

  return res.status(200).json({
    success: true,
    message: 'Login successful',
  })
}

const profile = async (req, res) => {
  const user = await User.findById(req.user.id).select('name email')

  if (!user) {
    throw createHttpError(404, 'User not found')
  }

  return res.status(200).json({
    success: true,
    message: 'Profile fetched',
    data: {
      name: user.name,
      email: user.email,
    },
  })
}

const logout = async (_req, res) => {
  res.clearCookie('token', buildCookieClearOptions())

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  })
}

export { register, login, profile, logout }
