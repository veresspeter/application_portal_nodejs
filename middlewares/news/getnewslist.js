/**
 * Lists and store the list of the news'
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        objectrepository.newsModel.find().exec(function (err,result) {
            res.tpl.news = result;
            return next();
        })

    };

};