const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const AppError = require('./utils/appError');
const httpStatusCodes = require('./utils/httpStatusCodes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const tweetRoute = require('./routes/tweetRoute');
const homeRoute = require('./routes/homeRoute');

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true,
  })
);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
// app.use(express.static(`${__dirname}/../client/build`));

// app.use((req, res, next) => {
//   console.log(`${req.method}: ${req.originalUrl}`);
//   next();
// });

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/tweets', tweetRoute);
app.use('/api/v1/home', homeRoute);

// app.get('*', (req,res) => {
//     res.sendFile()
// })

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Cannot find ${req.url} on this server`,
      httpStatusCodes.NOT_FOUND
    )
  );
});

app.use(errorMiddleware);

module.exports = app;
