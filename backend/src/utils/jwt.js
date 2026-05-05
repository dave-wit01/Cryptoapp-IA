import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

const generateAuthToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  )
}

const buildAuthCookieOptions = () => {
  const isProduction = env.nodeEnv === 'production'

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: '/',
  }
}

export { generateAuthToken, buildAuthCookieOptions }
