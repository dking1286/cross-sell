const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const dbPaths = JSON.parse(fs.readFileSync(path.join(
  __dirname, 'database_urls.json'
)));

const environment = process.env.NODE_ENV || 'development';

const dbPath = dbPaths[environment];

mongoose.connect(dbPath);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error(error);
});

db.once('open', () => {
  console.log('mongoose connected to database');
});

module.exports = db;
