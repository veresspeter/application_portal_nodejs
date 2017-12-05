var Schema = require('mongoose').Schema;
var db = require( '../db' );

var TenderModel = db.model( 'Tender', {
    title: String,
    description: String,
    duedate: Date,
    startdate: Date,
    _publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = TenderModel;