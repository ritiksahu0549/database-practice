// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const roomsRouter = require('./routes/rooms');
const bookingsRouter = require('./routes/bookings');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

connectDB();
const app = express();
app.use(express.json());

// simple request logger (teaching middleware)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API routes
app.use('/api/rooms', roomsRouter);
app.use('/api/bookings', bookingsRouter);

// fallback and error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
