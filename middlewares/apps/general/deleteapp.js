/**
 *  Deletes the app, than redirects to the apps page (/apps)
 */

module.exports = function () {

    return function (req, res, next) {
        return next();
    };

};