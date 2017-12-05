/**
 * Lists all the portal's users
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        objectrepository.userModel.find(function (err, result) {
            console.log(err);
            res.tpl.users = result;
            return next();
        })
    };

};