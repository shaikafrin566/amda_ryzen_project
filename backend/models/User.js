import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileComplete: { type: Boolean, default: false },
  // Onboarding profile data
  age: { type: Number },
  gender: { type: String },
  height: { type: Number },
  weight: { type: Number },
  allergies: [{ type: String }],
  dietPreference: { type: String }, // e.g. 'veg', 'vegan', 'keto'
  budget: { type: String }, // 'low', 'medium', 'high'
  fitnessGoal: { type: String }, // 'fat loss', 'muscle gain', 'healthy lifestyle'
  // Gamification
  healthScore: { type: Number, default: 72 },
  streak: { type: Number, default: 0 },
  waterIntake: { type: Number, default: 0 },
  badges: [{ type: String }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);
