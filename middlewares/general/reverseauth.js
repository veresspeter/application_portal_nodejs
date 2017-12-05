/**
 *  Checks the user's logout
 *      if logged in, redirects to the root page (/)
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};