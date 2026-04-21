import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  age: { type: Number },
  gender: { type: String },
  height: { type: Number },
  weight: { type: Number },
  allergies: [{ type: String }],
  preferences: [{ type: String }],
  budget: { type: String }, // e.g. "Low", "Medium", "High"
  goal: { type: String }, // e.g. "fat loss", "muscle gain"
  healthScore: { type: Number, default: 80 },
  streak: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
