const express = require('express');

const db = require('./data/dbConfig.js');

const accounts = require('./accounts/accounts');

const server = express();


server.use(express.json());


server.use("/api/accounts", accounts);


module.exports = server;