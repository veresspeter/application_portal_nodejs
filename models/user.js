var Schema = require('mongoose').Schema;
var db = require( '../db' );

var UserModel = db.model( 'User', {
    username: String,
    password: String,
    name: String,
    isadmin: Boolean,
    birthdate: Date,
    birthplace: String,
    mothername: String,
    address: String,
    email: String,
    phone: String
});

module.exports = UserModel;