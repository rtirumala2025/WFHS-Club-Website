const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('GET /api/clubs route hit');
  try {
    const clubs = await pool.query('SELECT * FROM clubs');
    console.log('Query successful:', clubs.rows.length, 'rows');
    res.json(clubs.rows);
  } catch (err) {
    console.error('Error in /api/clubs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
