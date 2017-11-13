/**
 * Require all the middlewares
 */

var authMW = require('../middlewares/general/auth');
var renderMW = require('../middlewares/general/render');

var getAppMW = require('../middlewares/apps/general/getapp');
var getAppListMW = require('../middlewares/apps/general/getapplist');
var getActiveAppListMW = require('../middlewares/apps/general/getactiveapplist');

var loadAppMW = require('../middlewares/apps/general/loadapp');
var updateAppMW = require('../middlewares/apps/general/updateapp');
var deleteAppMW = require('../middlewares/apps/general/deleteapp');

var updateScoreMW = require('../middlewares/apps/scores/updatescore');
var deleteScoreMW = require('../middlewares/apps/scores/deletescore');

module.exports = function (app) {

    var objectRepository = {

    };

    /**
     * The creation of a new application
     *  GET:    the page with the form
     *  POST:   the data of the new application
     *          -> redirects to apps (/apps)
     */
    app.use('/apps/add',
        authMW(objectRepository),
        updateAppMW(objectRepository),
        renderMW(objectRepository, 'addapp')
    );

    /**
     * Deletes the application with id ':id'
     *          -> redirects to apps (/apps)
     */
    app.use('/apps/del/:id',
        authMW(objectRepository),
        loadAppMW(objectRepository),
        deleteAppMW(objectRepository)
    );

    /**
     * The update of an existing application
     *  GET:    the 'add app' page with data
     *  POST:   the data of the application
     *          -> redirects to apps (/apps)
     */
    app.use('/apps/mod/:id',
        function(req,res,next){
            var app={
                id: 1,
                title: '1 - Példa pályázat',
                duedate: '2016-06-29',
                filename: 'app1.pdf',
                description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
            };
            res.tpl.app = app;
            next();
        },
        authMW(objectRepository),
        loadAppMW(objectRepository),
        updateAppMW(objectRepository),
        renderMW(objectRepository, 'addapp')
    );

    /**
     * The page of all application that existing.
     *      (apps admin page)
     */
    app.use('/apps/all',
        function(req,res,next){
            var apps=[{
                id: 1,
                title: '1 - Példa pályázat',
                duedate: '2016-06-29',
                startdate: '2016-01-29',
                owner: 'Kiss Béla',
                filename: 'app1.pdf',
                description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
            }, {
                id: 2,
                title: '2 - Példa pályázat',
                duedate: '2016-06-29',
                startdate: '2016-01-29',
                owner: 'Kiss Béla',
                filename: 'app2.pdf',
                description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
            }, {
                id: 3,
                title: '3 - Példa pályázat',
                duedate: '2016-06-29',
                startdate: '2016-01-29',
                owner: 'Kiss Béla',
                filename: 'app3.pdf',
                description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
            }];
            res.tpl.apps = apps;
            next();
        },
        authMW(objectRepository),
        getAppListMW(objectRepository),
        renderMW(objectRepository, 'allapps')
    );

    /**
     * Updates the score with ':score' for app with id ':id'
     *          -> redirects to the app page of id ':id'
     *             (/apps/app/:id)
     */
    app.use('/apps/app/:id/mod/:score',
        authMW(objectRepository),
        loadAppMW(objectRepository),
        updateScoreMW(objectRepository)
    );

    /**
     * Deletes the score for app with id ':id'
     *          ->redirects to the apps admin page (/apps/all)
     */
    app.use('/apps/app/:id/del/',
        authMW(objectRepository),
        loadAppMW(objectRepository),
        deleteScoreMW(objectRepository)
    );
    
    /**
     * The page of app with id ':id' and it's apps received
     */
    app.use('/apps/app/:id',
        function(req,res,next){
            var apps=[{
                id: 1,
                name: 'Nagy János',
                filename: 'app1.pdf',
                score: '20',
                judge: 'Kiss Pista'
            },{
                id: 2,
                name: 'Kiss János',
                filename: 'app2.pdf',
                score: '',
                judge: ''
            },{
                id: 3,
                name: 'Fekete János',
                filename: 'app3.pdf',
                score: '',
                judge: ''
            }];
            res.tpl.apps = apps;
            next();
        },
        authMW(objectRepository),
        loadAppMW(objectRepository),
        getAppMW(objectRepository),
        renderMW(objectRepository, 'app')
    );

    /**
     * The page for applications that are currently active
     */
    app.use('/apps',
        function(req,res,next){
            var apps=[{
                id: 1,
                title: '1 - Példa pályázat',
                duedate: '2016-06-29',
                filename: 'app1.pdf',
                description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
            }, {
                id: 2,
                title: '2 - Példa pályázat',
                duedate: '2016-06-29',
                filename: 'app2.pdf',
                description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
            }, {
                id: 3,
                title: '3 - Példa pályázat',
                duedate: '2016-06-29',
                filename: 'app3.pdf',
                description: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
            }];
            res.tpl.apps = apps;
            next();
        },
        authMW(objectRepository),
        getActiveAppListMW(objectRepository),
        renderMW(objectRepository,'apps')
    );

};