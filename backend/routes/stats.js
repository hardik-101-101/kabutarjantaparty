const express = require('express');
const router = express.Router();

// Simulated viral stats - in production, fetch from DB
const viralStats = {
  members: 42069,
  memesCreated: 1337420,
  countries: 42,
  sleepHours: 999999,
  lastUpdated: new Date().toISOString(),
};

router.get('/', (req, res) => {
  res.json(viralStats);
});

router.get('/live', (req, res) => {
  // Simulate live counter
  res.json({
    ...viralStats,
    members: viralStats.members + Math.floor(Math.random() * 10),
    memesCreated: viralStats.memesCreated + Math.floor(Math.random() * 50),
    timestamp: Date.now(),
  });
});

module.exports = router;
