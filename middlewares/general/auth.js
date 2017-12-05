/**
 *  Checks the user's login and permission and store it for other middlewares
 *      if access denied for this page, redirects to the root page (/)
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {

        if ( req.session === undefined || req.session.userid === undefined ){
            res.tpl.loggedin = false;
            return next();
        } else{
            res.tpl.loggedin = true;
            objectrepository.userModel.findOne( { '_id': req.session.userid }, function (err, result) {
                if ( err !== null )
                    res.tpl.error.push(err);
                if ( result !== undefined )
                        res.tpl.user = result;
                return next();
            } );
        }


    };

};