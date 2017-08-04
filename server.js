/**
 * API Service for APPesca 
 * @author Matheus Maia
 * * Imports
 */
const bodyParser = require('body-parser');
const compression = require('compression')
const cookieParser = require('cookie-parser');
const cors = require("cors");
const express = require('express');
const fs = require('fs');
const logger = require('morgan');
const mongoose = require("mongoose");
const path = require('path');
const timeout = require('connect-timeout');
const schedule = require('node-schedule');
//Endpoint imports
const places = require('./api/places/places.resources');
/**
 * Define App | Server initial Setup
 * * Port / compression / Engine setup / Response settings / base API Url 
 */
const app = express()  
const port = 3000
app.use(compression());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(timeout('120s'))
//
var baseURL = '/appesca/api';
//
/**
 * Define MongoDB connection
 * * Options / URL / Connection / Open Connect / Error Connect  
 */
//MONGOOSE INIT
var mongoOptions = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 300000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 300000 } }
};


var mongoURL = (process.env.MONGODB_URL || databaseConfig.developmentLocal.mongoURL) + "?socketTimeoutMS=120000";
mongoose.connect(mongoURL, mongoOptions);

var db = mongoose.connection;
db.on('error', function(callback) {
    console.error("Error connecting into mongodb: " + callback);
});
db.once('open', function() {
    console.log("MongoDB - Connection successfully");
});
/**
 * Define App Route for each module
 *  
 */
app.use('/places', places);

// ---- EXPORT MODULE APP ---//
module.exports = app;