const express = require('express');
const authRoutes = require('./routes/auth');
const clubsRoutes = require('./routes/clubs');
const userClubsRoutes = require('./routes/userClubs');

require('dotenv').config();

const app = express();
app.use(express.json());

// Root route for health check
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Log every request for debugging
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/clubs', clubsRoutes);
app.use('/api/user-clubs', userClubsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
