import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  mood: { type: String }, // e.g., 'happy', 'stressed', 'tired', 'sad'
  sleepHours: { type: Number },
  stressLevel: { type: Number, min: 1, max: 10 },
  cravings: [{ type: String }],
  activityLevel: { type: String }, // 'low', 'moderate', 'high'
  weather: { type: String },
  waterIntake: { type: Number, default: 0 }, // in ml or cups
  junkFoodEaten: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Log', logSchema);
