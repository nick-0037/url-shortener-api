const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Database connected.')
  } catch (err) {
    console.error('Database connection error:', err.message)
  }
}

process.on('uncaughtException', () => {
  mongoose.connection.close();
})

module.exports = { connectDB, mongoose };