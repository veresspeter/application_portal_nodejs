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

    var objectRepository = {};

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
        function (req, res, next) {
            var users = [{
                id: 1,
                name: 'Kiss Béla',
                perm: 'admin'
            },{
                id: 2,
                name: 'Nagy Béla',
                perm: 'admin'
            },{
                id: 3,
                name: 'Fekete Béla',
                perm: 'admin'
            },{
                id: 4,
                name: 'Nagy Gizi',
                perm: 'user'
            },{
                id: 5,
                name: 'Fehér Béla',
                perm: 'admin'
            },{

                id: 6,
                name: 'Kovács János',
                perm: 'user'
            }];
            res.tpl.users = users;
            next();
        },
        authMW(objectRepository),
        getUserListMW(objectRepository),
        getUserListPermissionMW(objectRepository),
        renderMW(objectRepository, 'admin')
    );

    /**
     * The page of the admins of the portal
     */
    app.use('/judg',
        function (req, res, next) {
            var judges = [{
                name: 'Kiss Béla'
            },{
                name: 'Nagy Béla'
            },{
                name: 'Fekete Béla'
            },{
                name: 'Fehér Béla'
            }];
            res.tpl.judges = judges;
            next();
        },
        authMW(objectRepository),
        getUserListPermissionMW(objectRepository),
        filterAdminsMW(objectRepository),
        renderMW(objectRepository, 'judges')
    );

};