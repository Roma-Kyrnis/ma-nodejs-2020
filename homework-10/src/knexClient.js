const Knex = require('knex');
const dBOptions = require('./config/config').DB;

const knex = new Knex(dBOptions);

module.exports = knex;
