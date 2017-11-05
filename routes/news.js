/**
 * Require all the middlewares
 */
var authMW = require('../middlewares/general/auth');
var renderMW = require('../middlewares/general/render');
var mainRedirectMW = require('../middlewares/general/mainredirect');

var updateNewsMW = require('../middlewares/news/updatenews');
var deleteNewsMW = require('../middlewares/news/deletenews');
var getNewsList = require('../middlewares/news/getnewslist');

module.exports = function (app) {

    var objectRepository = {

    };

    /**
     * The page for new news
     *      GET:    The page with the form where the admin give the datas
     *      POST:   Save the new new
     *                  -> than redirects to the news' page (/news)
     */
    app.use('/news/add',
        authMW(objectRepository),
        updateNewsMW(objectRepository),
        renderMW(objectRepository, 'addnews')
    );

    /**
     * Deletes the news with id ':id'
     *      -> than redirects to news' page (/news)
     */
    app.use('/news/del/:id',
        authMW(objectRepository),
        deleteNewsMW(objectRepository)
    );

    /**
     * Updates the news with id ':id'
     *      -> than redirects to news' page (/news)
     */
    app.use('/news/mod/:id',
        authMW(objectRepository),
        updateNewsMW(objectRepository)
    );

    /**
     * The news' page
     *      all the news are listed here
     *      admins can delete and modify the news here
     */
    app.use('/news',
        authMW(objectRepository),
        getNewsList(objectRepository),
        renderMW(objectRepository,'news')
    );

    /**
     *
     */
    app.use('/',
        mainRedirectMW(objectRepository)
    );

};