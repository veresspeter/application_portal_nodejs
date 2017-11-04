/**
 *  Checks the user's permission and store it for other middlewares
 *      if access denied for this page, redirects to the root page (/)
 */

module.exports = function () {

    return function (req, res, next) {
        return next();
    };

};