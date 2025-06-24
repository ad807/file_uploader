const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,         // No two users can have same username
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,         // Ensure each email is unique
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5         // Minimum password length
  }
}, {
  timestamps: true        // Adds createdAt and updatedAt fields
});

// Create the model
const UserModel = mongoose.model('User', userSchema);

// Export the model
module.exports = UserModel;
