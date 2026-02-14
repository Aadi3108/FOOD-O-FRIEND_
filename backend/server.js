const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

// Modules
const analyzeRoutes = require('./routes/analyze.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const recipeRoutes = require('./routes/recipe.routes');
const errorMiddleware = require('./middlewares/errors');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rate Limiter for Analyzer
const analyzeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});

app.use('/api', analyzeLimiter, analyzeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/recipes', recipeRoutes);

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/analyze-food-app';
console.log("MONGO_URI:", MONGO_URI);
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
