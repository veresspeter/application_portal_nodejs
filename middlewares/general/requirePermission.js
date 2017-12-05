
module.exports = function (objectrepository, perm) {

    return function (req, res, next) {

        if ( perm === 'admin' && !res.tpl.user.isadmin ){
            res.redirect('/');
            return;
        }


        if ( perm === 'user' && req.session.userid === undefined ){
            res.redirect('/');
            return;
        }

        return next();

    }

}