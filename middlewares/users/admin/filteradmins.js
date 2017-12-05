/**
 * From a list of users, the function deletes all user with only normal permission
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        var admins = [];
        for ( var i = 0; i < res.tpl.users.length; i++ ){
            if ( res.tpl.users[i].isadmin ) {
                admins.push(res.tpl.users[i]);
            }
        }
        res.tpl.admins = admins;
        return next();
    };

};