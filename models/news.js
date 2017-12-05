var Schema = require('mongoose').Schema;
var db = require( '../db' );

var NewsModel = db.model( 'News', {
    title: String,
    description: String,
    realised: Date,
    _publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = NewsModel;