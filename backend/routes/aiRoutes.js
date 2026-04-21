import express from 'express';
const router = express.Router();

const MEALS_DB = {
  stressed: {
    happy:    { name: 'Avocado Toast + Poached Eggs', calories: 380, reason: 'Great protein for a positive start!', alternatives: ['Smoothie Bowl', 'Greek Yogurt Parfait'] },
    stressed: { name: 'Warm Oatmeal with Banana & Honey', calories: 320, reason: 'Complex carbs lower cortisol & reduce stress.', alternatives: ['Chamomile Tea + Whole Grain Toast', 'Dark Chocolate & Almonds'] },
    tired:    { name: 'Spinach & Lentil Soup', calories: 290, reason: 'Iron-rich foods fight fatigue naturally.', alternatives: ['Banana Smoothie', 'Dates & Nuts'] },
    sad:      { name: 'Warm Dal with Brown Rice', calories: 410, reason: 'Tryptophan in lentils boosts serotonin (happiness hormone).', alternatives: ['Dark Chocolate', 'Banana Milkshake'] },
  }
};

// POST /api/ai/recommend
router.post('/recommend', (req, res) => {
  const { mood = 'happy', fitnessGoal, budget } = req.body;
  const meal = MEALS_DB.stressed[mood] || MEALS_DB.stressed.happy;
  const hydrationTip = 'Remember to drink at least 8 glasses of water today! 💧';
  
  res.json({
    recommendation: meal.name,
    reason: meal.reason,
    calories: meal.calories,
    alternatives: meal.alternatives,
    hydrationTip,
    emotionalAlert: ['stressed', 'sad', 'tired'].includes(mood)
      ? `Emotional eating detected. Here's a healthy comfort food choice instead of junk food.`
      : null,
    guardrailNote: 'This is a general suggestion. Always consult a nutritionist for medical dietary needs.'
  });
});

// POST /api/ai/scan
router.post('/scan', (req, res) => {
  const foods = [
    { food: 'Burger & Fries', status: 'Unhealthy', calories: 850, score: 28, healthierAlternative: 'Try a Grilled Chicken Wrap with Sweet Potato instead — saves ~400 calories!' },
    { food: 'Grilled Chicken Salad', status: 'Healthy', calories: 320, score: 91, healthierAlternative: 'Great choice! Add seeds for extra omega-3 benefits.' },
    { food: 'Pizza Slice', status: 'Unhealthy', calories: 620, score: 35, healthierAlternative: 'Try a Cauliflower crust pizza with veggies for a lighter option.' },
    { food: 'Fruit Bowl', status: 'Healthy', calories: 180, score: 96, healthierAlternative: 'Perfect snack! Add some nuts for a protein boost.' },
  ];
  const result = foods[Math.floor(Math.random() * foods.length)];
  setTimeout(() => res.json(result), 1200);
});

// POST /api/ai/chat
router.post('/chat', (req, res) => {
  const { query = '' } = req.body;
  const q = query.toLowerCase();
  
  let reply = "I'm your NutriVibe AI coach! Ask me anything about healthy eating, snacks, or meal planning.";
  
  if (q.includes('snack') && (q.includes('₹100') || q.includes('100')))
    reply = '🥜 Healthy snacks under ₹100: Roasted Chana (₹20), Banana (₹10), Mixed Nuts (₹80), Sprouts Salad (₹30). All power-packed options!';
  else if (q.includes('breakfast'))
    reply = '🌅 Best breakfasts: Oats with fruits, Idli with sambar, Poha, or Egg whites with veggies. Aim for 300-400 calories.';
  else if (q.includes('eat') || q.includes('now'))
    reply = '🍽️ Right now I recommend: Grilled Paneer with quinoa salad. It\'s protein-rich, calorie-smart, and takes just 15 minutes to prepare!';
  else if (q.includes('weight loss') || q.includes('fat loss'))
    reply = '📉 For weight loss: Eat a calorie deficit of 300-500 kcal/day. Focus on protein (eggs, dal, chicken), fibre (veggies), and cut sugar & refined carbs. Stay hydrated!';
  else if (q.includes('water') || q.includes('hydrat'))
    reply = '💧 You should drink at least 2-3 litres of water daily. Start your morning with 500ml, drink a glass before every meal, and keep a bottle with you at all times!';

  res.json({ reply });
});

export default router;
