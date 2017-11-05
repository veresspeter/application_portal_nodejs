/**
 *  Logging in
 *      in case of any problem, log out the user and redirects to the root page (/)
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};