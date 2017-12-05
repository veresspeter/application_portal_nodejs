var db = require('mongodb');

/**
 * Creates / updates the news with the given id with the given datas
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        if( req.method === 'POST' ){

            res.tpl.news.title = req.body.title;
            res.tpl.news.description = req.body.description;
            res.tpl.news._publisher = db.ObjectId( res.tpl.user._id );

            res.tpl.news.save( function (err) {
                console.log(err);
                res.redirect('/news');
            });

        } else {
            return next();
        }

    };

};