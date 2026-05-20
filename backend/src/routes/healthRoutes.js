const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.json({
    ok: true,
    service: 'SimpleCRM Backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: connected ? 'connected' : 'disconnected',
    dbName: connected ? mongoose.connection.name : null,
    environment: process.env.NODE_ENV || 'development',
  });
});

module.exports = router;
