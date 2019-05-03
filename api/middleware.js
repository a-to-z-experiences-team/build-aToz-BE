const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const atozAuthRouter = require('../auth/auth-router.js');
const logger = require('morgan')


const logMiddleware = logger('dev')
const { authenticate } = require('../auth/restricted-middleware.js')
const atozRouter = require('../routers/atoz-router.js');

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(logMiddleware)
  
  server.use('/api/atoz/auth', atozAuthRouter )
  server.use('/api/atoz', authenticate, atozRouter)
};
