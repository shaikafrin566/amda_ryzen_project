import express from 'express';
const router = express.Router();

router.post('/login', (req, res) => {
  res.json({ token: 'mock_token', user: { name: 'Demo User', role: 'user' } });
});

router.post('/signup', (req, res) => {
  res.json({ token: 'mock_token', user: { name: 'Demo User', role: 'user' } });
});

export default router;
