const app = require('./app');
const dotenv = require('dotenv');
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production')
  dotenv.config({ path: 'server/config/config.env' });

process.on('uncaughtException', () => {
  console.error('UNCAUGHT EXCEPTION 💥💥💥💥');
  process.exit(1);
});

mongoose.connect(process.env.DATABASE_LOCAL_URI).then(() => {
  console.log('Database has successfully connected...');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}`);
});

process.on('unhandledRejection', () => {
  console.error('UNHANDLED REJECTION 💥💥💥💥');
  server.close(() => {
    process.exit(1);
  });
});
