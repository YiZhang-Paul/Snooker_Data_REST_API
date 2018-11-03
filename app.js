process.env.NODE_ENV = process.env.NODE_ENV || 'development';
global.config = require('config');

const connection = require('mongoose_model').connection;
const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 3000;
const root = '/api';

connection.on('error', error => console.log(error));
connection.once('open', () => console.log('Database connected.'));

app.get('/', (req, res) => res.redirect(root));

app.use(`${root}/players`, routes.Player);

app.get('*', (req, res) => res.sendStatus(404));

const server = app.listen(port, () => {

    console.log(`Service started listening on port ${port}.`);
});

module.exports = { server, connection };