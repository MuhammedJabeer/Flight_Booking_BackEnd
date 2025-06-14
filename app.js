// Import core modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors');

const FlightRouter = require('./routes/Flight');
const usersRouter = require('./routes/users');
const bookingRouter=require('./routes/Booking')
const PaymentRouter=require('./routes/Payment')
const connectDb = require('./connect/db');

const app = express();

connectDb();
// __dirname is available by default in CommonJS

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Routes
app.use('/', FlightRouter);
app.use('/', usersRouter);
app.use('/',bookingRouter);
app.use('/',PaymentRouter)

// Connect to DB


// Catch 404
app.use((req, res, next) => {
  next(createError(404));
});

// Server listen
const PORT =process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  });
});


module.exports = app;
