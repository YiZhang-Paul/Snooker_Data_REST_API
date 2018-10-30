const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 3000;
const root = '/api';

app.get('/', (req, res) => res.redirect(root));

app.use(`${root}/players`, routes.Players);

app.get('*', (req, res) => res.sendStatus(404));

app.listen(port, () => {

    console.log(`Service started listening on port ${port}.`);
});