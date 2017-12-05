/**
 * Deletes the news with the given id
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        res.tpl.news.remove(function (err) {
            console.log(err);
            return next();
        })
    };

};