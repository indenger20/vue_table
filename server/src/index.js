const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./routes/router');
const cors = require('cors');

app.use(morgan('combined'));
app.use(cors());
app.use(bodyparser.json({ type: '*/*' }))


router.configure(app);

const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
