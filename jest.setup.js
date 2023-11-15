// jest.setup.js
const supertest = require('supertest');
const server = require('../server/src/server');

global.server = supertest(server);
