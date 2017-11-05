/**
 *  Logging out
 *      in case of any problem, the log out is failed and redirects to the root page (/)
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};