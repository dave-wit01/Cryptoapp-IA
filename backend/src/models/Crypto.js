import mongoose from 'mongoose'

const symbolPattern = /^[A-Z0-9.-]{2,12}$/
const isValidHttpUrl = (value) => {
  try {
    const parsedUrl = new URL(value)
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'
  } catch {
    return false
  }
}

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    symbol: {
      type: String,
      required: [true, 'Symbol is required'],
      uppercase: true,
      trim: true,
      unique: true,
      index: true,
      validate: {
        validator(value) {
          return symbolPattern.test(value)
        },
        message: 'Symbol must be 2-12 characters and use letters, numbers, dot, or dash',
      },
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0.00000001, 'Price must be greater than 0'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
      validate: {
        validator(value) {
          return isValidHttpUrl(value)
        },
        message: 'Image must be a valid http/https URL',
      },
    },
    change24h: {
      type: Number,
      required: [true, '24h change is required'],
    },
  },
  {
    timestamps: true,
  },
)

const Crypto = mongoose.model('Crypto', cryptoSchema)

export default Crypto
