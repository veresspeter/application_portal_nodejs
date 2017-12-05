/**
 * Lists and store the list of the news'
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {

        if (req.params.id === 'new'){
            if( req.method === 'GET' ){
                res.tpl.news = new objectrepository.newsModel();
                res.tpl.news.isnew = true;
            } else {
                res.tpl.news = new objectrepository.newsModel();
                res.tpl.news.realised = Date.now();
            }
            return next();
        } else {
            objectrepository.newsModel.findOne( {'_id': req.params.id}, function (err, result) {
                res.tpl.news = result;
                res.tpl.news.isnew = false;
                return next();
            } );
        }

    };

};