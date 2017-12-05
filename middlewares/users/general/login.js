/**
 *  Logging in
 *      in case of any problem, log out the user and redirects to the root page (/)
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        if( req.body.username === undefined || req.body.password === undefined )
            return next();

        objectrepository.userModel.findOne({ 'username': req.body.username  }, function (err, result) {
            res.tpl.user = result;

            if ( err || ! result ){
                res.tpl.error.push(err);
                return next();
            }

            if ( result.password !== req.body.password )
                res.tpl.error.push('Wrong password');
                req.session.userid = result._id;
                return next();
        });

    };

};