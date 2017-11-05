/**
 * Require all the middlewares
 */
var authMW = require('../middlewares/general/auth');
var renderMW = require('../middlewares/general/render');

var changePermissionMW = require('../middlewares/users/admin/changepermission');
var getUserListMW = require('../middlewares/users/admin/getuserlist');
var getUserListPermissionMW = require('../middlewares/users/admin/getuserlistpermission');
var filterAdminsMW = require('../middlewares/users/admin/filteradmins');

module.exports = function (app) {

    var objectRepository = {

    };

    /**
     * Updates a user's permission to admin
     */
    app.use('/judg/admin/add/:id',
        authMW(objectRepository),
        changePermissionMW(objectRepository)
    );

    /**
     * Updates a user's permission to user
     */
    app.use('/judg/admin/del/:id',
        authMW(objectRepository),
        changePermissionMW(objectRepository)
    );

    /**
     *  The users permission page for admins
     */
    app.use('/judg/admin',
        authMW(objectRepository),
        getUserListMW(objectRepository),
        getUserListPermissionMW(objectRepository),
        renderMW(objectRepository,'perms')
    );

    /**
     * The page of the admins of the portal
     */
    app.use('/judg',
        authMW(objectRepository),
        getUserListPermissionMW(objectRepository),
        filterAdminsMW(objectRepository),
        renderMW(objectRepository,'judges')
    );

};