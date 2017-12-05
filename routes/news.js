
var authMW = require('../middlewares/general/auth');
var renderMW = require('../middlewares/general/render');
var requirePermissionMW = require('../middlewares/general/requirePermission');

var updateNewsMW = require('../middlewares/news/updatenews');
var deleteNewsMW = require('../middlewares/news/deletenews');
var getNewsListMW = require('../middlewares/news/getnewslist');
var getNewsMW = require('../middlewares/news/getnews');

var NewsModel = require('../models/news');
var UserModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        newsModel: NewsModel,
        userModel: UserModel
    };

    /**
     * Deletes the news with id ':id'
     *      -> than redirects to news' page (/news)
     */
    app.use('/news/:id/del',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'admin'),
        getNewsMW(objectRepository),
        deleteNewsMW(objectRepository)
    );

    /**
     * Updates the news with id ':id'
     *      -> than redirects to news' page (/news)
     */
    app.use('/news/:id/mod',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'admin'),
        getNewsMW(objectRepository),
        updateNewsMW(objectRepository),
        renderMW(objectRepository,'newsUpdate')
    );

    /**
     * The news' page
     *      all the news are listed here
     *      admins can delete and modify the news here
     */
    app.use('/news',
        authMW(objectRepository),
        getNewsListMW(objectRepository),
        renderMW(objectRepository,'newsAll')
    );

};