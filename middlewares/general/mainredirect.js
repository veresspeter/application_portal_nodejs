/**
 *  Redirects to the main page (/news)
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        res.redirect('../news');
        return next();
    }

}