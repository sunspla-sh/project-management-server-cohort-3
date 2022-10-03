const express = require('express');

const router = express.Router();

router.post('/tasks', (req, res, next) => {
  res.json({ message: 'POST tasks worked'})
});

module.exports = router;