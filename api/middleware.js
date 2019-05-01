const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const atozRouter = require('../routers/atoz-router.js');
const atozAuthRouter = require('../auth/auth-router.js');
const logger = require('morgan')

const logMiddleware = logger('dev')

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(logMiddleware)
  
  server.use('/api/atoz', atozRouter)
  server.use('/api/atoz/auth', atozAuthRouter )
};
