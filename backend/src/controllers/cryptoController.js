import Crypto from '../models/Crypto.js'

const getAllCryptos = async (_req, res) => {
  const cryptos = await Crypto.find().sort({ name: 1 })

  return res.status(200).json({
    success: true,
    message: 'All tradable cryptocurrencies fetched',
    data: cryptos,
  })
}

const getGainers = async (_req, res) => {
  const gainers = await Crypto.find().sort({ change24h: -1, name: 1 })

  return res.status(200).json({
    success: true,
    message: 'Top gainers fetched',
    data: gainers,
  })
}

const getNewCryptos = async (_req, res) => {
  const newest = await Crypto.find().sort({ createdAt: -1, _id: -1 })

  return res.status(200).json({
    success: true,
    message: 'Newest cryptocurrencies fetched',
    data: newest,
  })
}

const createCrypto = async (req, res) => {
  const { name, symbol, price, image, change24h } = req.body ?? {}

  // Validation
  if (!name?.trim() || !symbol?.trim() || price === undefined || !image?.trim() || change24h === undefined) {
    const error = new Error('Name, symbol, price, image, and 24h change are all required')
    error.statusCode = 400
    throw error
  }

  if (name.trim().length < 2 || name.trim().length > 60) {
    const error = new Error('Name must be between 2 and 60 characters')
    error.statusCode = 400
    throw error
  }

  if (!/^[A-Z0-9.-]{2,12}$/i.test(symbol.trim())) {
    const error = new Error('Symbol must be 2-12 characters and use only letters, numbers, dots, or dashes')
    error.statusCode = 400
    throw error
  }

  const priceNum = Number(price)
  if (!Number.isFinite(priceNum) || priceNum <= 0) {
    const error = new Error('Price must be a positive number')
    error.statusCode = 400
    throw error
  }

  const isValidHttpUrl = (value) => {
    try {
      const parsedUrl = new URL(value)
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'
    } catch {
      return false
    }
  }

  if (!isValidHttpUrl(image.trim())) {
    const error = new Error('Image must be a valid http/https URL')
    error.statusCode = 400
    throw error
  }

  const change24hNum = Number(change24h)
  if (!Number.isFinite(change24hNum)) {
    const error = new Error('24h change must be a valid number')
    error.statusCode = 400
    throw error
  }

  // Check if symbol already exists
  const existingCrypto = await Crypto.findOne({ symbol: symbol.trim().toUpperCase() })
  if (existingCrypto) {
    const error = new Error('Cryptocurrency with this symbol already exists')
    error.statusCode = 409
    throw error
  }

  // Create and save
  const newCrypto = await Crypto.create({
    name: name.trim(),
    symbol: symbol.trim().toUpperCase(),
    price: priceNum,
    image: image.trim(),
    change24h: change24hNum,
  })

  return res.status(201).json({
    success: true,
    message: 'Cryptocurrency created successfully',
    data: newCrypto,
  })
}

export { getAllCryptos, getGainers, getNewCryptos, createCrypto }
