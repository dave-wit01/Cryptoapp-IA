const notFoundHandler = (req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  })
}

const errorHandler = (error, _req, res, next) => {
  void next

  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors)
      .map((item) => item.message)
      .join(', ')

    return res.status(400).json({
      success: false,
      message,
    })
  }

  if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyPattern ?? {})[0] ?? 'field'

    return res.status(409).json({
      success: false,
      message: `${duplicateField} already exists`,
    })
  }

  if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    })
  }

  const statusCode = error.statusCode ?? 500
  const responseBody = {
    success: false,
    message: error.message ?? 'Internal server error',
  }

  if (process.env.NODE_ENV !== 'production') {
    responseBody.stack = error.stack
  }

  return res.status(statusCode).json(responseBody)
}

export { notFoundHandler, errorHandler }
