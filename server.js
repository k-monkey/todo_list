    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var database = require('./config/database'); //load database config

    // configuration =================
    if (database.url) {
        mongoose.connect(database.url); 
    }
    else {
        console.error("Error: Unable to connect to datbase. current MONGOLAB_URI config is ", 
            database.url);
        //redirect every request to 400
    }

    app.set('port', (process.env.PORT || 3000)); 
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    //routes =====================================
    require('./app/routes')(app);
         
    // listen (start app with node server.js) ======================================
    app.listen(app.get('port'));
    console.log("App listening on port ", app.get('port'));
