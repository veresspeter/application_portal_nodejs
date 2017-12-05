/**
 *  Lists all the applications that are currently active
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        objectrepository.tenderModel.find( {'duedate': { $gte: Date.now() } } ).exec(function (err, result) {
            res.tpl.tenders = result;
            return next();
        })
    };

};