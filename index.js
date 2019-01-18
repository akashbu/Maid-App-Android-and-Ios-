var express = require('express');
var bodyParser = require('body-parser');
var userRoutes = require('./routes/users');
var maidRoutes = require('./routes/maids');
var authRoutes = require('./routes/index');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(userRoutes);
app.use(maidRoutes);
app.use(authRoutes);

app.listen(4000, function () {
    console.log('Listening to port 4000');
});
