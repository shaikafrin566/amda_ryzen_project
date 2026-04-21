import express from 'express';
const router = express.Router();

router.post('/recommend', (req, res) => {
  const { profile, context } = req.body;
  res.json({
    recommendation: "Grilled Chicken Salad with Quinoa",
    reason: "High protein, fits your calorie goal, and good for hot weather.",
    calories: 450,
    alternatives: ["Tofu Stir-fry", "Lentil Soup"]
  });
});

router.post('/scan', (req, res) => {
  res.json({
    food: "Burger and Fries",
    status: "Unhealthy",
    calories: 850,
    healthierAlternative: "Try a Turkey Burger with Sweet Potato Fries."
  });
});

router.post('/chat', (req, res) => {
  res.json({
    reply: "I recommend eating a light snack like an apple with peanut butter if you are feeling hungry before dinner."
  });
});

export default router;
