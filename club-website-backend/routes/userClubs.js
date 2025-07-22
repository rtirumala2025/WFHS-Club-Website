const express = require('express');
const pool = require('../db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/join', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { clubId } = req.body;
  if (!clubId) return res.status(400).json({ error: 'Missing clubId' });

  try {
    // Prevent duplicate join
    const exists = await pool.query(
      'SELECT * FROM user_clubs WHERE user_id = $1 AND club_id = $2',
      [userId, clubId]
    );
    if (exists.rows.length > 0)
      return res.status(409).json({ error: 'Already joined' });

    await pool.query(
      'INSERT INTO user_clubs (user_id, club_id) VALUES ($1, $2)',
      [userId, clubId]
    );
    res.json({ message: 'Joined club successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
