/*jshint esnext: true */
var express = require('express');
var router = express.Router();
var places = require('./places')

// ----- PUBLIC METHODS ------- //

/**
 * A route method to retrieve a place object.
 *
 */
router.get('/', (req, res, next) => {
    let bannerId = req.params.id;
    places.findById()
        .then((retrievedBanner) => {
            // let responseObj = responseUtils.buildBaseResponse();
            // responseObj.places = retrievedBanner;
            res.status(200).json(retrievedBanner);
        }, (error) => {
            let httpCode = 500;
            if (error.status) {
                httpCode = error.status;
            }
            res.status(httpCode).json(responseUtils.buildBaseResponse(error));
        });
});

module.exports = router;
