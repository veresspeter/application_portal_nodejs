module.exports = function (app) {

    var authMW = require('../middlewares/general/auth');
    var renderMW = require('../middlewares/general/render');

    var updateNewsMW = require('../middlewares/news/updatenews');
    var deleteNewsMW = require('../middlewares/news/deletenews');
    var getNewsList = require('../middlewares/news/getnewslist');

    /**
     * The page for new news
     *      GET:    The page with the form where the admin give the datas
     *      POST:   Save the new new
     *                  -> than redirects to the news' page (/news)
     */
    app.use('/news/add',
        authMW(),
        updateNewsMW(),
        renderMW()
    );

    /**
     * Deletes the news with id ':id'
     *      -> than redirects to news' page (/news)
     */
    app.use('/news/del/:id',
        authMW(),
        deleteNewsMW()
    );

    /**
     * Updates the news with id ':id'
     *      -> than redirects to news' page (/news)
     */
    app.use('/news/mod/:id',
        authMW(),
        updateNewsMW()
    );

    /**
     * The news' page
     *      all the news are listed here
     *      admins can delete and modify the news here
     */
    app.use('/news',
        authMW(),
        getNewsList(),
        renderMW()
    );

};