var authMW = require('../middlewares/general/auth');
var renderMW = require('../middlewares/general/render');
var requirePermissionMW = require('../middlewares/general/requirePermission');

var getTenderMW = require('../middlewares/tender/gettender');
var getTenderAllMW = require('../middlewares/tender/gettenderall');
var getTenderActiveMW = require('../middlewares/tender/gettenderactive');

var getTenderAppMW = require('../middlewares/apps/general/gettenderapp');
var getAppListW = require('../middlewares/apps/general/getapplistbytenderid');

var updateTenderMW = require('../middlewares/tender/updatetender');
var deleteTenderMW = require('../middlewares/tender/deletetender');

var TenderModel = require('../models/tender');
var UserModel = require('../models/user');
var AppModel = require('../models/app');

module.exports = function (app) {

    var objectRepository = {
        appModel: AppModel,
        tenderModel: TenderModel,
        userModel: UserModel
    };

    /**
     * The page of all tenders that existing.
     *      (apps admin page)
     */
    app.use('/tender/all',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'admin'),
        getTenderAllMW(objectRepository),
        renderMW(objectRepository, 'tenderAll')
    );

    /**
     * Deletes the tender with id ':id'
     */
    app.use('/tender/:id/del',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'admin'),
        getTenderMW(objectRepository),
        deleteTenderMW(objectRepository)
    );

    /**
     * The update of an existing tender
     */
    app.use('/tender/:id/mod',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'admin'),
        getTenderMW(objectRepository),
        updateTenderMW(objectRepository),
        renderMW(objectRepository, 'tenderUpdate')
    );
    
    /**
     * The page of tender with id ':id' and it's apps received
     */
    app.use('/tender/:id/app',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'admin'),
        getTenderMW(objectRepository),
        getAppListW(objectRepository),
        renderMW(objectRepository, 'tenderDetails')
    );

    /**
     * The page for applications that are currently active
     */
    app.use('/tender/',
        authMW(objectRepository),
        getTenderActiveMW(objectRepository),
        getTenderAppMW(objectRepository),
        renderMW(objectRepository,'tenderActual')
    );

};