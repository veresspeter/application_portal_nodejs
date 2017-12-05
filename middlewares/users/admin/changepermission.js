/**
 * Changes the user's permission to admin or to normal user
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if ( req.params.perm === 'admin'  ){
            res.tpl.user.isadmin = true;
        } else {
            res.tpl.user.isadmin = false;
        }
        res.tpl.user.save(function (err) {
            console.log(err);
            res.redirect('/judg/admin');
        });
    };

};