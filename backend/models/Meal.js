import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  mealType: { type: String }, // 'breakfast', 'lunch', 'dinner', 'snack'
  calories: { type: Number },
  isHealthy: { type: Boolean },
  scannedImage: { type: String }, // URL or path to uploaded image if scanned
  tags: [{ type: String }],
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Meal', mealSchema);
