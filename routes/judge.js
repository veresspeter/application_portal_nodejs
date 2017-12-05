
var authMW = require('../middlewares/general/auth');
var renderMW = require('../middlewares/general/render');
var requirePermissionMW = require('../middlewares/general/requirePermission');

var changePermissionMW = require('../middlewares/users/admin/changepermission');

var getUserMW = require('../middlewares/users/data/getuserbyid');
var getUserListMW = require('../middlewares/users/admin/getuserlist');
var filterAdminsMW = require('../middlewares/users/admin/filteradmins');

var UserModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        userModel: UserModel
    };

    /**
     * Updates a user's permission to admin
     */
    app.use('/judg/admin/:id/:perm/',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'admin'),
        getUserMW(objectRepository),
        changePermissionMW(objectRepository)
    );

    /**
     *  The users permission page for admins
     */
    app.use('/judg/admin',
        authMW(objectRepository),
        requirePermissionMW(objectRepository, 'admin'),
        getUserListMW(objectRepository),
        renderMW(objectRepository, 'userAdmin')
    );

    /**
     * The page of the admins of the portal
     */
    app.use('/judg',
        authMW(objectRepository),
        getUserListMW(objectRepository),
        filterAdminsMW(objectRepository),
        renderMW(objectRepository, 'userJudges')
    );

};