import express from 'express'
import {
  getAllCryptos,
  getGainers,
  getNewCryptos,
  createCrypto,
} from '../controllers/cryptoController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import asyncHandler from '../utils/asyncHandler.js'

const router = express.Router()

router.get('/', asyncHandler(getAllCryptos))
router.get('/gainers', asyncHandler(getGainers))
router.get('/new', asyncHandler(getNewCryptos))
router.post('/', authMiddleware, asyncHandler(createCrypto))

export default router
