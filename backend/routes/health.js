const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: '1.0.0',
    movement: 'chaos',
  });
});

module.exports = router;
