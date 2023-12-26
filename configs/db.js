const mongoose = require('mongoose');
const mongoUrl = require('../services/connectionString');

const connectDB = async () => {
  try {
    await mongoose.connect(
        // mongoUrl
        "mongodb+srv://cheeku:1234@cluster0.rrx7pc4.mongodb.net/?retryWrites=true&w=majority"
        , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
};

module.exports = connectDB;