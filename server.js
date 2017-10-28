//packages
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var morgan = require('morgan'); /// За рекуестите в браузъра GET POST и т.н.;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();// refinirenae na router
var appRoutes = require('./app/routes/api')(router); // callvame faila ot app/routes/api.js // izpolzvai router objecta s tezri routes
var path = require('path');


// middleware
app.use(morgan('dev'));
app.use(bodyParser.json()); // за parsvane na application/json;
app.use(bodyParser.urlencoded({ extended: true })); // за parsvane application/x-www-fore-urlencoded
app.use(express.static(__dirname + '/public'));// static files ... __dirname - kuvto i da e fila /public
app.use('/api', appRoutes);// tuka go izpolzvame

// Connectva се към дата базата чрез този порт.;
// Може да го сложим в друга папка.;
// mongodb connection
mongoose.connect('mongodb://ivan:ivan@ds237445.mlab.com:37445/bookshelf', function (err) {
    if (err) {
        console.log('Not connected to the database: ' + err);
        // може да thrownem error 
    } else {
        console.log('Successfuly connected to MongoDB');
    }
});

app.get('*', function (req, res) {
    // current path i joivame s drugoto ... * - kakvoto i da klikne tam da go prati // windows
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
})


// server port
app.listen(port, function () {
    console.log('Running the server on port: ' + port); // na koi port slusha 
});