var Schema = require('mongoose').Schema;
var db = require( '../db' );

var AppModel = db.model( 'App', {
    filename: String,
    received: Date,
    score: Number,
    _judge: String,
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _tender: {
        type: Schema.Types.ObjectId,
        ref: 'Tender'
    }
});

module.exports = AppModel;