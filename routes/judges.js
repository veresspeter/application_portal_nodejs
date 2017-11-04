module.exports = function (app) {

    var authMW = require('../middlewares/general/auth');
    var renderMW = require('../middlewares/general/render');

    var changePermissionMW = require('../middlewares/users/admin/changepermission');
    var getUserListMW = require('../middlewares/users/admin/getuserlist');
    var getUserListPermissionMW = require('../middlewares/users/admin/getuserlistpermission');
    var filterAdminsMW = require('../middlewares/users/admin/filteradmins');

    /**
     * Updates a user's permission to admin
     */
    app.use('/judg/admin/add/:id',
        authMW(),
        changePermissionMW()
    );

    /**
     * Updates a user's permission to user
     */
    app.use('/judg/admin/del/:id',
        authMW(),
        changePermissionMW()
    );

    /**
     *  The users permission page for admins
     */
    app.use('/judg/admin',
        authMW(),
        getUserListMW(),
        getUserListPermissionMW(),
        renderMW()
    );

    /**
     * The page of the admins of the portal
     */
    app.use('/judg',
        authMW(),
        getUserListPermissionMW(),
        filterAdminsMW(),
        renderMW()
    );

};