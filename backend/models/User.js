const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const quizResultSchema = new mongoose.Schema({
  answers: {
    skinType: { type: String },
    concern: { type: String },
    sensitivity: { type: String },
    age: { type: String },
    lifestyle: { type: String }
  },
  recommendedProducts: [
    {
      name: String,
      brand: String,
      category: String,
      description: String,
      price: String,
      link: String,
      image: String,
      tags: [String]
    }
  ],
  takenAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  skinProfile: {
    skinType: { type: String, enum: ['oily', 'dry', 'combination', 'normal', 'sensitive', ''] },
    concerns: [String],
    sensitivity: String,
    age: String,
    lifestyle: String
  },
  quizHistory: [quizResultSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  this.updatedAt = Date.now();
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
