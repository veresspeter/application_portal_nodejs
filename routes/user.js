var authMW = require('../middlewares/general/auth');
var renderMW = require('../middlewares/general/render');
var requirePermissionMW = require('../middlewares/general/requirePermission');

var getAppListMW = require('../middlewares/users/apps/getapplist');

var updateDataMW = require('../middlewares/users/data/updatedata');
var updatePWMW = require('../middlewares/users/data/updatepw');
var getUserByID = require('../middlewares/users/data/getuserbyid');

var UserModel = require('../models/user');
var AppModel = require('../models/app');

module.exports = function (app) {

    var objectRepository = {
        userModel: UserModel,
        appModel: AppModel
    };

    /**
     * The page of the applications that the user uploaded
     */
    app.use('/usr/app',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'user'),
        getAppListMW(objectRepository),
        renderMW(objectRepository, 'userApp')
    );

    /**
     * The password update page of the user
     *      GET:    The page for new password
     *      POST:   Updates the users's password
     *                  ->than redirects to the same page (/user/:id)
     */
    app.use('/usr/mod/psw',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'user'),
        updatePWMW(objectRepository),
        renderMW(objectRepository, 'userPassword')
    );

    /**
     * The data update page of the user
     *      GET:    The page of the user's data, editing is enabled
     *      POST:   Updates the users's datas
     *                  ->than redirects to the same page (/user/:id)
     */
    app.use('/usr/mod/data',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'user'),
        updateDataMW(objectRepository),
        renderMW(objectRepository, 'userProfile')
    );

};