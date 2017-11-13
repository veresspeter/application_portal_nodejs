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
        function(req,res,next){
            var news={
                    id: 1,
                    title: '1 - A hír címe',
                    duedate: '2016.05.06',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                };
            res.tpl.news = news;
            next();
        },
        authMW(objectRepository),
        updateNewsMW(objectRepository),
        renderMW(objectRepository,'addnews')
    );

    /**
     * The news' page
     *      all the news are listed here
     *      admins can delete and modify the news here
     */
    app.use('/news',
        function(req,res,next){
          var news= [
              {
                  id: 1,
                  title: '1 - A hír címe',
                  duedate: '2016.05.06',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              },
              {
                  id: 2,
                  title: '2 - A hír címe',
                  duedate: '2016.05.06',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              },
              {
                  id: 3,
                  title: '3 - A hír címe',
                  duedate: '2016.05.06',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              }
          ];
          res.tpl.news = news;
          next();
        },
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