const express = require('express');
const cors = require('cors');  // <-- import cors
const app = express();
const db = require('./models'); // Sequelize models
require('dotenv').config(); // Load environment variables from .env file

// Enable CORS for your frontend origin
app.use(cors({
  origin: 'https://nikichiam.github.io'  // replace with your actual frontend URL
}));

// Middleware
app.use(express.json());

// Import Routes
const userRoutes = require('./routes/userRoutes');
const visitorAccessCodeRoutes = require('./routes/visitorAccessCodeRoutes'); // Import the new route
const accessRequestRoutes = require('./routes/accessRequestRoutes');

// Use Routes
app.use('/users', userRoutes);
app.use('/visitor-access-code', visitorAccessCodeRoutes);  
app.use('/access-request', accessRequestRoutes);

// Test route
app.get('/', (_req, res) => {
  res.send('Smart Door backend: OK');
});

// Use environment variables for database connection
const dbConfig = {
  username: process.env.DB_USERNAME || 'smartuser',
  password: process.env.DB_PASSWORD || 'smartpass',
  database: process.env.DB_NAME || 'smartdoor',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306
};

// Create the Sequelize instance with the above configuration
db.sequelize = new db.Sequelize(dbConfig);

// Start server after DB sync
const PORT = process.env.PORT || 3000; // Use Heroku's port or default to 3000
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
