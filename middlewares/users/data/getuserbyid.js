/**
 *  Return with the user profile ( user datas )
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        objectrepository.userModel.findOne( {'_id':req.params.id} ).exec(function (err, result) {
            res.tpl.user = result;
            return next();
        });

    };

};