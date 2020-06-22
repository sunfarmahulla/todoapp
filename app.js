const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var jwt = require('jsonwebtoken');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'));
require('./models/db.js');

process.env.SECRET_KEY = 'secret'
const API = require('./routes/api');
app.use('/api', API);

const todo = require('./routes/todo');

function ensureAuthenticated(req, res, next) {
    jwt.verify(req.headers['x-access-token'],
        process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                res.json({ status: "error", message: err.message, data: null });

            } else {
                //
                next();
            }
        })
}


app.use('/todo', todo);

const port = process.env.port || 4000
app.listen(port, () => {
    console.log('port is listeninf in', port);
})
