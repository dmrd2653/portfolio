const express = require('express');

const app = express();

app.use('/', express.static('docs'));



const host = 'localhost';
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`You are listening on ${host} ${port}.`));