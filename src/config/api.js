const fallbackBaseUrl = 'http://localhost:5000'

const sanitizedEnvBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? fallbackBaseUrl).trim()
const normalizedBaseUrl = sanitizedEnvBaseUrl.replace(/\/+$/, '')

const buildApiUrl = (path) => {
  if (!path.startsWith('/')) {
    return `${normalizedBaseUrl}/${path}`
  }

  return `${normalizedBaseUrl}${path}`
}

class ApiError extends Error {
  constructor(message, status, payload) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

const parseResponseBody = async (response) => {
  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    try {
      return await response.json()
    } catch {
      return null
    }
  }

  try {
    const text = await response.text()
    return text ? { message: text } : null
  } catch {
    return null
  }
}

const request = async (path, options = {}) => {
  const { method = 'GET', body, headers = {}, credentials = 'include' } = options

  const requestHeaders = {
    ...headers,
  }

  const requestConfig = {
    method,
    credentials,
    headers: requestHeaders,
  }

  if (body !== undefined) {
    requestHeaders['Content-Type'] = 'application/json'
    requestConfig.body = JSON.stringify(body)
  }

  let response

  try {
    response = await fetch(buildApiUrl(path), requestConfig)
  } catch {
    throw new ApiError('Unable to connect to the server. Please check your internet connection.', 0, null)
  }

  const payload = await parseResponseBody(response)

  if (!response.ok) {
    const message =
      payload?.message ?? payload?.error ?? `Request failed with status ${response.status}`

    throw new ApiError(message, response.status, payload)
  }

  return payload
}

const apiClient = {
  baseUrl: normalizedBaseUrl,
  get: (path, options = {}) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options = {}) => request(path, { ...options, method: 'POST', body }),
}

export { ApiError, apiClient }
